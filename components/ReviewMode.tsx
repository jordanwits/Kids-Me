"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

/**
 * Client review mode — a "Note on this section" button at the top of every
 * section of the real pages. Notes are saved as the client goes (one per
 * section) and a single "Send all notes" button emails them together.
 *
 * Off for everyone by default. Visiting any page with `?review=1` turns it on
 * (and it stays on across pages via localStorage); `?review=0` turns it off.
 * Notes are kept in localStorage too, so closing the tab halfway through
 * loses nothing.
 *
 * Sections are found automatically — every top-level <section> inside <main>,
 * labelled by its first heading — so new sections need no wiring.
 *
 * Submissions go to Web3Forms (NEXT_PUBLIC_WEB3FORMS_KEY). Without a key the
 * send window offers "copy your notes" instead so nothing is ever stuck.
 */

const FLAG_KEY = "kidsme-review-on";
const NOTES_KEY = "kidsme-review-notes";
const NAME_KEY = "kidsme-review-name";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Note = { path: string; page: string; section: string; text: string };

type Target = { el: HTMLElement; label: string };

const keyOf = (n: { path: string; section: string }) => `${n.path}|${n.section}`;

function pageLabel(path: string) {
  return nav.find((p) => p.href === path)?.label ?? path;
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

/** Notes grouped by page, in site-nav order. */
function byPage(notes: Note[]) {
  const order = (p: string) => {
    const i = nav.findIndex((n) => n.href === p);
    return i === -1 ? nav.length : i;
  };
  const groups = new Map<string, Note[]>();
  for (const n of [...notes].sort((a, b) => order(a.path) - order(b.path))) {
    groups.set(n.page, [...(groups.get(n.page) ?? []), n]);
  }
  return groups;
}

function buildMessage(notes: Note[], name: string) {
  const lines: string[] = [`Website notes from ${name || "the client"}`, ""];
  for (const [page, list] of byPage(notes)) {
    lines.push(`=== ${page} ===`, "");
    for (const n of list) {
      lines.push(`• ${n.section}`, ...n.text.split("\n").map((l) => `  ${l}`), "");
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
  const [draft, setDraft] = useState<Note | null>(null);
  const [sendOpen, setSendOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "nokey">("idle");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");

  /* ---- switch on/off from the URL, restore saved state ---- */
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("review");
    if (param === "1") store(FLAG_KEY, true);
    if (param === "0") store(FLAG_KEY, false);
    setOn(store<boolean>(FLAG_KEY) === true);
    // Older saved notes may carry extra fields; keep only what's used now.
    const saved = store<Note[]>(NOTES_KEY) ?? [];
    setNotes(saved.map(({ path, page, section, text }) => ({ path, page, section, text })));
    setName(store<string>(NAME_KEY) ?? "");
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
    const t = window.setTimeout(() => setTargets(findSections()), 150);
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

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 6000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const noteMap = useMemo(() => new Map(notes.map((n) => [keyOf(n), n])), [notes]);

  /** One note per section: reopening a section edits its note. */
  const openNote = (section: string) => {
    const existing = noteMap.get(keyOf({ path: pathname, section }));
    setDraft(existing ? { ...existing } : { path: pathname, page: pageLabel(pathname), section, text: "" });
  };

  const saveDraft = () => {
    if (!draft) return;
    const text = draft.text.trim();
    setNotes((prev) => {
      const rest = prev.filter((n) => keyOf(n) !== keyOf(draft));
      return text ? [...rest, { ...draft, text }] : rest;
    });
    setDraft(null);
  };

  const removeNote = (n: Note) => setNotes((prev) => prev.filter((x) => keyOf(x) !== keyOf(n)));

  const message = useMemo(() => buildMessage(notes, name), [notes, name]);

  const sendAll = async () => {
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
          subject: `Website notes from ${name || "client"} (${notes.length})`,
          from_name: name || "Kids & Me review mode",
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message);
      setNotes([]);
      setSendOpen(false);
      setStatus("idle");
      setToast("Your notes were sent — thank you!");
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

  const groups = byPage(notes);

  return (
    <>
      {/* ---------- per-section buttons ---------- */}
      {targets.map(({ el, label }) => {
        const has = noteMap.has(keyOf({ path: pathname, section: label }));
        return createPortal(
          <button
            key={label}
            type="button"
            onClick={() => openNote(label)}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(el)}
            onBlur={() => setHovered(null)}
            className={`absolute left-1/2 top-3 z-40 inline-flex min-h-10 -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-[13px] font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(51,58,69,.6)] backdrop-blur-sm transition-colors hover:bg-coral-deep sm:top-5 ${
              has ? "bg-teal-deep" : "bg-ink/85"
            }`}
          >
            {has ? <CheckIcon /> : <PencilIcon />}
            {has ? "Note added · edit" : "Note on this section"}
          </button>,
          el,
          label,
        );
      })}

      {/* ---------- send all ---------- */}
      {notes.length > 0 && !draft && !sendOpen && (
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSendOpen(true);
          }}
          className="fixed bottom-5 left-1/2 z-[80] inline-flex min-h-12 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-coral-deep px-6 font-display text-[17px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(51,58,69,.6)] ring-2 ring-white"
        >
          Send all notes ({notes.length})
        </button>
      )}

      {toast && notes.length === 0 && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 p-4"
          onClick={() => setToast("")}
        >
          <div
            role="status"
            className="anim-rise w-full max-w-[440px] rounded-3xl bg-shell px-8 py-10 text-center font-sans text-ink shadow-2xl"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-deep text-white">
              <CheckIcon className="h-8 w-8" />
            </span>
            <p className="mt-5 font-display text-[clamp(1.6rem,5vw,2.1rem)] font-semibold leading-tight">
              {toast}
            </p>
            <button
              type="button"
              onClick={() => setToast("")}
              className="mt-6 min-h-11 rounded-full bg-ink px-6 text-[15px] font-semibold text-cream"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------- note window ---------- */}
      {draft && (
        <Modal onClose={() => setDraft(null)} labelledBy="review-draft-title">
          <p className="text-[13px] font-semibold text-coral-deep">{draft.page}</p>
          <h2 id="review-draft-title" className="mt-0.5 font-display text-[20px] font-semibold leading-tight">
            {draft.section}
          </h2>
          <label htmlFor="review-text" className="mt-4 block text-[15px] font-semibold">
            What would you like changed?
          </label>
          <textarea
            id="review-text"
            autoFocus
            value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && (e.metaKey || e.ctrlKey) && saveDraft()}
            rows={5}
            placeholder="e.g. Change the wording to…, swap this photo for one of the playground, this looks great — keep it"
            className="mt-2 w-full rounded-xl border border-sand bg-cream p-3 text-[16px] leading-relaxed"
          />
          <p className="mt-2 text-[13px] text-ink-muted">
            Saved notes are sent together when you tap <strong>Send all notes</strong>.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {noteMap.has(keyOf(draft)) && (
              <button
                type="button"
                onClick={() => {
                  removeNote(draft);
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
                disabled={!draft.text.trim()}
                className="min-h-11 rounded-full bg-coral-deep px-6 text-[15px] font-semibold text-white disabled:opacity-45"
              >
                Save note
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------- send window ---------- */}
      {sendOpen && (
        <Modal onClose={() => setSendOpen(false)} labelledBy="review-send-title">
          <h2 id="review-send-title" className="font-display text-[21px] font-semibold leading-tight">
            Send your notes
          </h2>
          <p className="mt-1 text-[14px] text-ink-muted">
            Check everything over, then send it all in one email.
          </p>

          <div className="mt-4 max-h-[42vh] space-y-4 overflow-y-auto pr-1">
            {[...groups].map(([page, list]) => (
              <div key={page}>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-muted">
                  {page}
                </p>
                <ul className="mt-1.5 space-y-2">
                  {list.map((n) => (
                    <li key={keyOf(n)} className="rounded-xl border border-sand-soft bg-cream p-3">
                      <p className="text-[12px] font-semibold text-coral-deep">{n.section}</p>
                      <p className="mt-1 whitespace-pre-wrap text-[14px]">{n.text}</p>
                      <div className="mt-1.5 flex gap-3 text-[13px] font-semibold">
                        <button
                          type="button"
                          className="min-h-8 text-teal-deep hover:underline"
                          onClick={() => {
                            setSendOpen(false);
                            setDraft({ ...n });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="min-h-8 text-ink-muted hover:underline"
                          onClick={() => removeNote(n)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {notes.length === 0 && (
              <p className="text-[14px] text-ink-muted">No notes left to send.</p>
            )}
          </div>

          <label htmlFor="review-name" className="mt-4 block text-[13px] font-semibold text-ink-muted">
            Your name
          </label>
          <input
            id="review-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Brett"
            className="mt-1 min-h-11 w-full rounded-lg border border-sand bg-cream px-3 text-[16px]"
          />

          {status === "nokey" && (
            <div className="mt-4 rounded-xl border border-gold bg-gold-soft p-3 text-[14px]">
              <p className="font-semibold">Sending isn’t set up yet.</p>
              <p className="mt-1 text-ink-muted">
                Copy your notes and paste them into an email instead.
              </p>
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
              Something went wrong sending. Your notes are saved — please try again in a moment.
            </p>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSendOpen(false)}
              className="min-h-11 rounded-full px-5 text-[15px] font-semibold text-ink-muted hover:bg-cream-deep"
            >
              Keep reviewing
            </button>
            <button
              type="button"
              onClick={sendAll}
              disabled={!notes.length || status === "sending"}
              className="min-h-11 rounded-full bg-coral-deep px-6 text-[15px] font-semibold text-white disabled:opacity-45"
            >
              {status === "sending" ? "Sending…" : `Send ${notes.length} ${notes.length === 1 ? "note" : "notes"}`}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({
  children,
  onClose,
  labelledBy,
}: {
  children: React.ReactNode;
  onClose: () => void;
  labelledBy: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/50 p-3 sm:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        className="max-h-[92vh] w-full max-w-[540px] overflow-y-auto rounded-2xl bg-shell p-5 font-sans text-ink shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M13.6 2.6a2 2 0 0 1 2.8 0l1 1a2 2 0 0 1 0 2.8l-9.7 9.7-4.2 1.2 1.2-4.2 8.9-10.5Z" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
