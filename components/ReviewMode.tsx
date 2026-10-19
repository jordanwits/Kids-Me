"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

/**
 * Client review mode — lets the client leave notes on any line or block of
 * text on the real pages, then send them all in one go.
 *
 * Off for everyone by default. Visiting any page with `?review=1` turns it on
 * (and it stays on across pages via localStorage); `?review=0` or the Exit
 * button turns it off. Notes are kept in localStorage too, so closing the tab
 * halfway through loses nothing.
 *
 * Text blocks are found automatically: every visible run of text in <main>
 * and the footer, grouped up to its nearest non-inline element, gets
 * `data-review-text`. Hover styles live in globals.css. Clicking one opens a
 * note window instead of following any link it sits in. Buttons are left
 * alone so tabs, accordions and galleries still work.
 *
 * Each top-level <section> also gets a "Note on this section" button for
 * comments that aren't about one piece of text.
 *
 * Submissions go to Web3Forms (NEXT_PUBLIC_WEB3FORMS_KEY). Without a key the
 * Send step falls back to "copy your notes" so nothing is ever stuck.
 */

const FLAG_KEY = "kidsme-review-on";
const NOTES_KEY = "kidsme-review-notes";
const NAME_KEY = "kidsme-review-name";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Note = {
  id: string;
  path: string;
  page: string;
  section: string;
  /** The text on the page the note is about (absent for section/general notes). */
  original?: string;
  /** Suggested new wording, when the client edited it. */
  rewrite?: string;
  /** Free-form comment. */
  text: string;
};

type Draft = Omit<Note, "id"> & { id?: string };

type Target = { el: HTMLElement; label: string };

const pages = nav.map((n) => ({ label: n.label, href: n.href }));

function pageLabel(path: string) {
  return pages.find((p) => p.href === path)?.label ?? path;
}

function store<T>(key: string, value?: T): T | null {
  try {
    if (value === undefined) {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    }
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or blocked storage — review still works for this visit */
  }
  return null;
}

/** Phones: the open tray covers the page, so it stays tucked away by default. */
function isNarrow() {
  return window.matchMedia("(max-width: 639px)").matches;
}

function squash(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function clean(s: string, max = 70) {
  const t = squash(s);
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

/** Top-level sections in <main>, each named by its heading. */
function findSections(): Target[] {
  const main = document.querySelector("main");
  if (!main) return [];
  const all = Array.from(main.querySelectorAll<HTMLElement>("section")).filter(
    (s) => !s.parentElement?.closest("section"),
  );
  return all.map((el, i) => {
    const heading = el.querySelector("h1, h2");
    const text =
      heading?.textContent ||
      el.getAttribute("aria-label") ||
      el.textContent ||
      "";
    return { el, label: `${i + 1}. ${clean(text, 60) || "Untitled section"}` };
  });
}

const SKIP = "button, svg, script, style, noscript, iframe, [aria-hidden='true'], [data-review-ui]";

/**
 * Mark every visible block of text as clickable. A text node's block is its
 * nearest ancestor that isn't plain `display: inline`, so a paragraph with a
 * link in it is one target, while a pill-style link (inline-flex) is its own.
 */
function markText() {
  const roots = document.querySelectorAll<HTMLElement>("main, footer");
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent || node.textContent.trim().length < 2) continue;
      let el = node.parentElement;
      if (!el || el.closest(SKIP) || el.closest("[data-review-text]")) continue;
      while (
        el.parentElement &&
        el.parentElement !== root &&
        getComputedStyle(el).display === "inline"
      ) {
        el = el.parentElement;
      }
      const box = el.getBoundingClientRect();
      if (box.width <= 2 || box.height <= 2) continue; // sr-only labels
      el.setAttribute("data-review-text", "");
    }
  }
}

function unmarkText() {
  document
    .querySelectorAll("[data-review-text]")
    .forEach((el) => el.removeAttribute("data-review-text"));
  document
    .querySelectorAll("[data-review-noted]")
    .forEach((el) => el.removeAttribute("data-review-noted"));
}

function textOf(el: HTMLElement) {
  return squash(el.innerText || el.textContent || "");
}

function buildMessage(notes: Note[], name: string) {
  const lines: string[] = [`Change requests from ${name || "the client"}`, ""];
  const byPage = new Map<string, Note[]>();
  for (const n of notes) {
    const list = byPage.get(n.page) ?? [];
    list.push(n);
    byPage.set(n.page, list);
  }
  for (const [page, list] of byPage) {
    lines.push(`=== ${page} ===`, "");
    for (const n of list) {
      lines.push(`• ${n.section}`);
      if (n.original) lines.push(`  Text: "${n.original}"`);
      if (n.rewrite) lines.push(`  Change to: "${n.rewrite}"`);
      if (n.text) {
        const [first, ...rest] = n.text.split("\n");
        lines.push(`  Note: ${first}`, ...rest.map((l) => `        ${l}`));
      }
      lines.push("");
    }
  }
  return lines.join("\n").trim();
}

export default function ReviewMode() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [targets, setTargets] = useState<Target[]>([]);
  const [hovered, setHovered] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [trayOpen, setTrayOpen] = useState(true);
  const [scanTick, setScanTick] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "nokey"
  >("idle");
  const [copied, setCopied] = useState(false);
  const targetsRef = useRef<Target[]>([]);
  targetsRef.current = targets;

  /* ---- switch on/off from the URL, restore saved state ---- */
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("review");
    if (param === "1") store(FLAG_KEY, true);
    if (param === "0") store(FLAG_KEY, false);
    setOn(store<boolean>(FLAG_KEY) === true);
    // Notes saved by the first version of review mode used `quote`.
    const saved = (store<(Note & { quote?: string })[]>(NOTES_KEY) ?? []).map(
      ({ quote, ...n }) => ({ ...n, original: n.original ?? quote }),
    );
    setNotes(saved);
    setName(store<string>(NAME_KEY) ?? "");
    setTrayOpen(!isNarrow());
  }, []);

  useEffect(() => {
    if (on) store(NOTES_KEY, notes);
  }, [notes, on]);

  useEffect(() => {
    if (on) store(NAME_KEY, name);
  }, [name, on]);

  useEffect(() => {
    document.documentElement.classList.toggle("review-on", on);
  }, [on]);

  /* ---- find this page's sections and text (after each navigation) ---- */
  useEffect(() => {
    if (!on) return;
    let timer = 0;
    const scan = () => {
      markText();
      setScanTick((t) => t + 1);
    };
    const first = window.setTimeout(() => {
      setTargets(findSections());
      scan();
    }, 150);
    // Tabs, accordions and scroll reveals add text after load.
    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 250);
    });
    const main = document.querySelector("main");
    if (main) observer.observe(main, { childList: true, subtree: true, characterData: true });
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [on, pathname]);

  useEffect(() => {
    if (!on) unmarkText();
  }, [on]);

  /* Show which pieces of text already have a note. */
  useEffect(() => {
    if (!on) return;
    const noted = new Set(
      notes.filter((n) => n.path === pathname && n.original).map((n) => n.original),
    );
    document.querySelectorAll<HTMLElement>("[data-review-text]").forEach((el) => {
      el.toggleAttribute("data-review-noted", noted.has(textOf(el)));
    });
  }, [notes, pathname, on, scanTick]);

  /* Section buttons are absolutely positioned inside each section. */
  useEffect(() => {
    const touched: HTMLElement[] = [];
    for (const { el } of targets) {
      if (getComputedStyle(el).position === "static") {
        el.style.position = "relative";
        touched.push(el);
      }
    }
    return () => touched.forEach((el) => (el.style.position = ""));
  }, [targets]);

  /* Outline the section whose button is hovered. */
  useEffect(() => {
    if (!hovered) return;
    hovered.style.outline = "3px dashed var(--color-coral-deep)";
    hovered.style.outlineOffset = "-6px";
    return () => {
      hovered.style.outline = "";
      hovered.style.outlineOffset = "";
    };
  }, [hovered]);

  const sectionFor = useCallback((el: HTMLElement) => {
    if (el.closest("footer")) return "Footer";
    const hit = targetsRef.current.find((t) => t.el.contains(el));
    return hit?.label ?? "Page";
  }, []);

  /* ---- clicking a piece of text opens a note for it ---- */
  const notesRef = useRef(notes);
  notesRef.current = notes;
  useEffect(() => {
    if (!on) return;
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-review-text]");
      if (!t || t.closest("[data-review-ui]")) return;
      e.preventDefault();
      e.stopPropagation();
      const original = textOf(t);
      const existing = notesRef.current.find(
        (n) => n.path === pathname && n.original === original,
      );
      setDraft(
        existing
          ? { ...existing }
          : {
              path: pathname,
              page: pageLabel(pathname),
              section: sectionFor(t),
              original,
              text: "",
            },
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [on, pathname, sectionFor]);

  const startNote = (section: string) =>
    setDraft({ path: pathname, page: pageLabel(pathname), section, text: "" });

  const draftRewrite =
    draft?.original && draft.rewrite && squash(draft.rewrite) !== draft.original
      ? draft.rewrite.trim()
      : undefined;
  const canSave = !!draft && (!!draft.text.trim() || !!draftRewrite);

  const saveDraft = () => {
    if (!draft || !canSave) return;
    const note = { ...draft, text: draft.text.trim(), rewrite: draftRewrite };
    setNotes((prev) =>
      note.id
        ? prev.map((n) => (n.id === note.id ? (note as Note) : n))
        : [...prev, { ...note, id: crypto.randomUUID?.() ?? String(Date.now()) }],
    );
    setDraft(null);
    setStatus("idle");
  };

  const removeNote = (id: string) => setNotes((prev) => prev.filter((x) => x.id !== id));

  const exit = () => {
    store(FLAG_KEY, false);
    setOn(false);
    setTargets([]);
  };

  const message = useMemo(() => buildMessage(notes, name), [notes, name]);

  const send = async () => {
    if (!notes.length) return;
    if (!WEB3FORMS_KEY) {
      setStatus("nokey");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website changes from ${name || "client"} (${notes.length})`,
          from_name: name || "Kids & Me review mode",
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message);
      setStatus("sent");
      setNotes([]);
    } catch {
      setStatus("error");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the text is selectable in the box */
    }
  };

  if (!on) return null;

  const countFor = (href: string) => notes.filter((n) => n.path === href).length;
  const hereNotes = notes.filter((n) => n.path === pathname);

  return (
    <>
      {/* ---------- per-section buttons ---------- */}
      {targets.map(({ el, label }) => {
        const count = hereNotes.filter((n) => n.section === label).length;
        return createPortal(
          <button
            key={label}
            type="button"
            data-review-ui
            onClick={() => startNote(label)}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(el)}
            onBlur={() => setHovered(null)}
            className="absolute left-1/2 top-3 z-40 inline-flex -translate-x-1/2 whitespace-nowrap min-h-10 items-center gap-1.5 rounded-full bg-ink/85 px-3.5 py-1.5 font-sans text-[13px] font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(51,58,69,.6)] backdrop-blur-sm transition-colors hover:bg-coral-deep sm:top-5"
          >
            <PencilIcon />
            Note on this section
            {count > 0 && (
              <span className="rounded-full bg-cream px-1.5 text-[12px] text-ink">{count}</span>
            )}
          </button>,
          el,
          label,
        );
      })}

      {/* ---------- notes tray ---------- */}
      <div
        data-review-ui
        className="fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px]"
      >
        {!trayOpen ? (
          <button
            type="button"
            onClick={() => setTrayOpen(true)}
            className="ml-auto flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 py-3 font-sans text-[15px] font-semibold text-cream shadow-xl"
          >
            <PencilIcon />
            Your notes ({notes.length})
          </button>
        ) : (
          <div className="flex max-h-[min(80vh,640px)] flex-col overflow-hidden rounded-2xl border border-sand bg-shell font-sans text-ink shadow-[0_24px_60px_-20px_rgba(51,58,69,.55)]">
            <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-cream">
              <p className="font-display text-[17px] font-semibold">
                Review mode · {notes.length} {notes.length === 1 ? "note" : "notes"}
              </p>
              <button
                type="button"
                onClick={() => setTrayOpen(false)}
                className="min-h-9 rounded-full px-3 text-[14px] text-cream/80 hover:bg-white/10"
              >
                Hide
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4">
              {status === "sent" ? (
                <div className="rounded-xl bg-teal-soft p-4 text-[15px]">
                  <p className="font-semibold">Thank you — your changes were sent!</p>
                  <p className="mt-1 text-ink-muted">
                    You can keep adding notes and send again any time.
                  </p>
                </div>
              ) : (
                <p className="text-[14px] leading-relaxed text-ink-muted">
                  <strong className="text-ink">Click any text on the page</strong> to leave a
                  note or suggest new wording. Text you’ve commented on is outlined in{" "}
                  <span className="font-semibold text-teal-deep">teal</span>.
                </p>
              )}

              {/* page checklist */}
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-ink-muted">
                Pages
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-1.5">
                {pages.map((p) => {
                  const c = countFor(p.href);
                  const here = p.href === pathname;
                  return (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        onClick={() => isNarrow() && setTrayOpen(false)}
                        className={`flex min-h-10 items-center justify-between gap-2 rounded-lg border px-3 py-1.5 text-[14px] ${
                          here
                            ? "border-coral-deep bg-coral-soft font-semibold"
                            : "border-sand-soft bg-cream hover:border-sand"
                        }`}
                      >
                        <span className="truncate">{p.label}</span>
                        {c > 0 && (
                          <span className="shrink-0 rounded-full bg-coral-deep px-1.5 text-[12px] font-semibold text-white">
                            {c}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 flex flex-wrap gap-2">
                <QuickButton onClick={() => startNote("Top menu / header")}>
                  Note on the menu
                </QuickButton>
                <QuickButton onClick={() => startNote("General (whole page)")}>
                  General note
                </QuickButton>
              </div>

              {/* notes */}
              {notes.length > 0 && (
                <>
                  <p className="mt-5 text-[12px] font-semibold uppercase tracking-wider text-ink-muted">
                    Your notes
                  </p>
                  <ul className="mt-2 space-y-2">
                    {notes.map((n) => (
                      <li key={n.id} className="rounded-xl border border-sand-soft bg-cream p-3">
                        <p className="text-[12px] font-semibold text-coral-deep">
                          {n.page} · {n.section}
                        </p>
                        {n.original && (
                          <p className="mt-1 border-l-2 border-gold pl-2 text-[13px] italic text-ink-muted">
                            “{clean(n.original, 120)}”
                          </p>
                        )}
                        {n.rewrite && (
                          <p className="mt-1 text-[13px]">
                            <span className="font-semibold text-teal-deep">Change to: </span>
                            {clean(n.rewrite, 160)}
                          </p>
                        )}
                        {n.text && (
                          <p className="mt-1 whitespace-pre-wrap text-[14px]">{n.text}</p>
                        )}
                        <div className="mt-2 flex gap-3 text-[13px] font-semibold">
                          <button
                            type="button"
                            className="min-h-8 text-teal-deep hover:underline"
                            onClick={() => setDraft({ ...n })}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="min-h-8 text-ink-muted hover:underline"
                            onClick={() => removeNote(n.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {status === "nokey" && (
                <div className="mt-4 rounded-xl border border-gold bg-gold-soft p-3 text-[14px]">
                  <p className="font-semibold">Sending isn’t set up yet.</p>
                  <p className="mt-1 text-ink-muted">
                    Copy your notes below and paste them into an email instead.
                  </p>
                  <textarea
                    readOnly
                    value={message}
                    className="mt-2 h-32 w-full rounded-lg border border-sand bg-shell p-2 text-[12px]"
                  />
                  <button
                    type="button"
                    onClick={copy}
                    className="mt-2 min-h-10 rounded-full bg-ink px-4 text-[14px] font-semibold text-cream"
                  >
                    {copied ? "Copied!" : "Copy my notes"}
                  </button>
                </div>
              )}
              {status === "error" && (
                <p className="mt-4 rounded-xl bg-coral-soft p-3 text-[14px]">
                  Something went wrong sending. Your notes are saved — please try again
                  in a moment.
                </p>
              )}
            </div>

            {/* send */}
            <div className="border-t border-sand-soft bg-cream px-4 py-3">
              <label className="block text-[13px] font-semibold text-ink-muted" htmlFor="review-name">
                Your name
              </label>
              <input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 min-h-11 w-full rounded-lg border border-sand bg-shell px-3 text-[16px]"
                placeholder="e.g. Brett"
              />
              <button
                type="button"
                onClick={send}
                disabled={!notes.length || status === "sending"}
                className="mt-3 min-h-12 w-full rounded-full bg-coral-deep px-5 font-display text-[17px] font-semibold text-white transition-opacity disabled:opacity-45"
              >
                {status === "sending"
                  ? "Sending…"
                  : `Send my changes${notes.length ? ` (${notes.length})` : ""}`}
              </button>
              <button
                type="button"
                onClick={exit}
                className="mt-2 min-h-9 w-full text-[13px] text-ink-muted hover:underline"
              >
                Exit review mode (notes are kept)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---------- note window ---------- */}
      {draft && (
        <div
          data-review-ui
          className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/50 p-3 sm:items-center"
          onClick={(e) => e.target === e.currentTarget && setDraft(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-draft-title"
            className="flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-y-auto rounded-2xl bg-shell p-5 font-sans text-ink shadow-2xl"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) saveDraft();
              if (e.key === "Escape") setDraft(null);
            }}
          >
            <p className="text-[13px] font-semibold text-coral-deep">
              {draft.page} · {draft.section}
            </p>
            <h2 id="review-draft-title" className="mt-1 font-display text-[21px] font-semibold leading-tight">
              {draft.original ? "Note on this text" : `Note on ${draft.section}`}
            </h2>

            {draft.original && (
              <blockquote className="mt-3 max-h-36 overflow-y-auto rounded-xl border-l-4 border-gold bg-cream-deep px-4 py-3 text-[15px] leading-relaxed text-ink">
                {draft.original}
              </blockquote>
            )}

            <label htmlFor="review-text" className="mt-4 block text-[15px] font-semibold">
              Your note or comment
            </label>
            <textarea
              id="review-text"
              autoFocus
              value={draft.text}
              onChange={(e) => setDraft({ ...draft, text: e.target.value })}
              rows={3}
              placeholder={
                draft.original
                  ? "e.g. This isn’t accurate anymore, we now… / Love this, keep it"
                  : "What would you like changed in this part of the page?"
              }
              className="mt-2 w-full rounded-xl border border-sand bg-cream p-3 text-[16px] leading-relaxed"
            />

            {draft.original && (
              <>
                <label htmlFor="review-rewrite" className="mt-4 block text-[15px] font-semibold">
                  Want different wording?{" "}
                  <span className="font-normal text-ink-muted">Edit it here (optional)</span>
                </label>
                <textarea
                  id="review-rewrite"
                  value={draft.rewrite ?? draft.original}
                  onChange={(e) => setDraft({ ...draft, rewrite: e.target.value })}
                  rows={Math.min(6, Math.max(2, Math.ceil(draft.original.length / 60)))}
                  className="mt-2 w-full rounded-xl border border-sand bg-cream p-3 text-[16px] leading-relaxed"
                />
              </>
            )}

            <div className="mt-4 flex items-center gap-2">
              {draft.id && (
                <button
                  type="button"
                  onClick={() => {
                    removeNote(draft.id!);
                    setDraft(null);
                  }}
                  className="min-h-11 rounded-full px-3 text-[14px] font-semibold text-ink-muted hover:text-coral-deep"
                >
                  Delete note
                </button>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="min-h-11 rounded-full px-5 text-[15px] font-semibold text-ink-muted hover:bg-cream-deep"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={!canSave}
                  className="min-h-11 rounded-full bg-coral-deep px-6 text-[15px] font-semibold text-white disabled:opacity-45"
                >
                  Save note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function QuickButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-9 rounded-full border border-sand bg-shell px-3 text-[13px] font-semibold text-ink hover:border-coral-deep"
    >
      {children}
    </button>
  );
}

function PencilIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M13.6 2.6a2 2 0 0 1 2.8 0l1 1a2 2 0 0 1 0 2.8l-9.7 9.7-4.2 1.2 1.2-4.2 8.9-10.5Z" />
    </svg>
  );
}
