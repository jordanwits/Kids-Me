"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

/**
 * Client review mode — lets the client leave change requests section by
 * section on the real pages, then send them all in one go.
 *
 * Off for everyone by default. Visiting any page with `?review=1` turns it on
 * (and it stays on across pages via localStorage); `?review=0` or the Exit
 * button turns it off. Notes are kept in localStorage too, so closing the tab
 * halfway through loses nothing.
 *
 * Sections are found automatically — every top-level <section> inside <main>,
 * labelled by its first heading — so new sections need no wiring.
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
  quote?: string;
  text: string;
};

type Target = { el: HTMLElement; label: string };

type Draft = {
  id?: string;
  path: string;
  page: string;
  section: string;
  quote?: string;
  text: string;
};

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

function clean(s: string, max = 70) {
  const t = s.replace(/\s+/g, " ").trim();
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

function buildMessage(notes: Note[], name: string) {
  const lines: string[] = [`Change requests from ${name || "the client"}`, ""];
  const byPage = new Map<string, Note[]>();
  for (const n of notes) {
    const list = byPage.get(n.page) ?? [];
    list.push(n);
    byPage.set(n.page, list);
  }
  for (const [page, list] of byPage) {
    lines.push(`=== ${page} ===`);
    for (const n of list) {
      lines.push(`• ${n.section}`);
      if (n.quote) lines.push(`  About: "${n.quote}"`);
      for (const l of n.text.split("\n")) lines.push(`  ${l}`);
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
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "nokey"
  >("idle");
  const [copied, setCopied] = useState(false);
  const lastSelection = useRef<{ text: string; node: Node | null }>({
    text: "",
    node: null,
  });

  /* ---- switch on/off from the URL, restore saved state ---- */
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("review");
    if (param === "1") store(FLAG_KEY, true);
    if (param === "0") store(FLAG_KEY, false);
    setOn(store<boolean>(FLAG_KEY) === true);
    setNotes(store<Note[]>(NOTES_KEY) ?? []);
    setName(store<string>(NAME_KEY) ?? "");
    setTrayOpen(!isNarrow());
  }, []);

  useEffect(() => {
    if (on) store(NOTES_KEY, notes);
  }, [notes, on]);

  useEffect(() => {
    if (on) store(NAME_KEY, name);
  }, [name, on]);

  /* ---- find this page's sections (after each navigation) ---- */
  useEffect(() => {
    if (!on) return;
    const scan = () => setTargets(findSections());
    const t = window.setTimeout(scan, 150);
    return () => window.clearTimeout(t);
  }, [on, pathname]);

  /* Buttons are absolutely positioned inside each section. */
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

  /* Outline the section whose button is hovered, so it is obvious what a note is about. */
  useEffect(() => {
    if (!hovered) return;
    hovered.style.outline = "3px dashed var(--color-coral-deep)";
    hovered.style.outlineOffset = "-6px";
    return () => {
      hovered.style.outline = "";
      hovered.style.outlineOffset = "";
    };
  }, [hovered]);

  /* Remember the last highlighted words — tapping the button can clear the selection. */
  useEffect(() => {
    if (!on) return;
    const onSel = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim() ?? "";
      if (text) lastSelection.current = { text, node: sel?.anchorNode ?? null };
    };
    document.addEventListener("selectionchange", onSel);
    return () => document.removeEventListener("selectionchange", onSel);
  }, [on]);

  const startNote = useCallback(
    (section: string, el?: HTMLElement) => {
      const { text, node } = lastSelection.current;
      const quote = el && node && el.contains(node) ? clean(text, 200) : undefined;
      lastSelection.current = { text: "", node: null };
      setDraft({ path: pathname, page: pageLabel(pathname), section, quote, text: "" });
    },
    [pathname],
  );

  const saveDraft = () => {
    if (!draft || !draft.text.trim()) return;
    const text = draft.text.trim();
    setNotes((prev) =>
      draft.id
        ? prev.map((n) => (n.id === draft.id ? { ...n, text, quote: draft.quote } : n))
        : [...prev, { ...draft, text, id: crypto.randomUUID?.() ?? String(Date.now()) }],
    );
    setDraft(null);
    setTrayOpen(!isNarrow());
    setStatus("idle");
  };

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
            onClick={() => startNote(label, el)}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(el)}
            onBlur={() => setHovered(null)}
            className="absolute right-3 top-3 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-coral-deep px-4 py-2 font-sans text-[14px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(51,58,69,.6)] ring-2 ring-white transition-transform hover:scale-105 sm:right-5 sm:top-5"
          >
            <PencilIcon />
            Suggest a change
            {count > 0 && (
              <span className="rounded-full bg-white px-2 text-[12px] text-coral-deep">
                {count}
              </span>
            )}
          </button>,
          el,
          label,
        );
      })}

      {/* ---------- notes tray ---------- */}
      <div className="fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px]">
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
                  Go through each page and tap{" "}
                  <strong className="text-coral-deep">Suggest a change</strong> on any
                  section. Tip: highlight words first to quote them in your note.
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
                <QuickButton onClick={() => startNote("Footer")}>
                  Note on the footer
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
                        {n.quote && (
                          <p className="mt-1 border-l-2 border-gold pl-2 text-[13px] italic text-ink-muted">
                            “{n.quote}”
                          </p>
                        )}
                        <p className="mt-1 whitespace-pre-wrap text-[14px]">{n.text}</p>
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
                            onClick={() => setNotes((prev) => prev.filter((x) => x.id !== n.id))}
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

      {/* ---------- note editor ---------- */}
      {draft && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/50 p-3 sm:items-center"
          onClick={(e) => e.target === e.currentTarget && setDraft(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-draft-title"
            className="w-full max-w-[520px] rounded-2xl bg-shell p-5 font-sans text-ink shadow-2xl"
          >
            <p className="text-[13px] font-semibold text-coral-deep">{draft.page}</p>
            <h2 id="review-draft-title" className="mt-0.5 font-display text-[20px] font-semibold leading-tight">
              {draft.section}
            </h2>
            {draft.quote && (
              <div className="mt-3 flex items-start gap-2 border-l-2 border-gold pl-3">
                <p className="flex-1 text-[14px] italic text-ink-muted">“{draft.quote}”</p>
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, quote: undefined })}
                  className="text-[12px] text-ink-muted underline"
                >
                  remove quote
                </button>
              </div>
            )}
            <label htmlFor="review-text" className="mt-4 block text-[15px] font-semibold">
              What would you like changed?
            </label>
            <textarea
              id="review-text"
              autoFocus
              value={draft.text}
              onChange={(e) => setDraft({ ...draft, text: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) saveDraft();
                if (e.key === "Escape") setDraft(null);
              }}
              rows={5}
              placeholder="e.g. Change the wording to…, swap this photo for one of the playground, this looks great — keep it"
              className="mt-2 w-full rounded-xl border border-sand bg-cream p-3 text-[16px] leading-relaxed"
            />
            <div className="mt-4 flex justify-end gap-2">
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
                disabled={!draft.text.trim()}
                className="min-h-11 rounded-full bg-coral-deep px-6 text-[15px] font-semibold text-white disabled:opacity-45"
              >
                Save note
              </button>
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
