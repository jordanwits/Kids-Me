"use client";

import { useCallback, useState } from "react";
import { testimonials } from "@/lib/site";

/**
 * The full reviews, one at a time.
 *
 * Four verbatim testimonials shown as four simultaneous blocks was a wall of
 * text — two of them run past 800 characters. Here the parents are a selectable
 * list and only the chosen review is on screen, so each one actually gets read.
 * Arrow keys and the prev/next controls step through them.
 */

const accent: Record<
  string,
  { dot: string; tape: string; soft: string }
> = {
  coral: {
    dot: "bg-coral",
    tape: "bg-coral",
    soft: "bg-coral-soft",
  },
  teal: {
    dot: "bg-teal",
    tape: "bg-teal",
    soft: "bg-teal-soft",
  },
  gold: {
    dot: "bg-gold",
    tape: "bg-gold",
    soft: "bg-gold-soft",
  },
  mauve: {
    dot: "bg-mauve",
    tape: "bg-mauve",
    soft: "bg-mauve-soft",
  },
};

export default function Applause() {
  const [i, setI] = useState(0);
  const active = testimonials[i];
  const a = accent[active.accent];

  const step = useCallback(
    (dir: number) =>
      setI((n) => (n + dir + testimonials.length) % testimonials.length),
    [],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(200px,.62fr)_1.38fr] lg:gap-14">
      {/* ---------- who is speaking ---------- */}
      <div>
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Four families
        </p>

        <div
          role="tablist"
          aria-label="Choose a review to read"
          aria-orientation="vertical"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            }
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            }
          }}
          className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
        >
          {testimonials.map((t, n) => {
            const on = n === i;
            const ta = accent[t.accent];
            return (
              <button
                key={t.author}
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setI(n)}
                className={`group flex shrink-0 items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5 text-left transition-colors lg:rounded-none lg:border-b lg:border-sand/40 lg:px-0 lg:py-4 lg:last:border-0 ${
                  on ? "bg-shell lg:bg-transparent" : "hover:bg-shell/60 lg:hover:bg-transparent"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold text-ink transition-transform duration-200 ${
                    on ? `${ta.dot} scale-105` : `${ta.soft} group-hover:scale-105`
                  }`}
                >
                  {t.author[0]}
                </span>
                <span className="min-w-0 lg:flex-1">
                  <span
                    className={`block font-display text-[17px] font-medium leading-tight transition-colors ${
                      on ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {t.author}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`hidden h-1.5 w-1.5 rounded-full transition-opacity lg:block ${
                    ta.dot
                  } ${on ? "opacity-100" : "opacity-0"}`}
                />
              </button>
            );
          })}
        </div>

        {/* prev / next */}
        <div className="mt-6 flex items-center gap-3">
          <ArrowButton dir="left" onClick={() => step(-1)} />
          <ArrowButton dir="right" onClick={() => step(1)} />
          <p className="ml-1 text-[13.5px] text-ink-muted">
            {i + 1} of {testimonials.length}
          </p>
        </div>
      </div>

      {/* ---------- the review ---------- */}
      <figure
        role="tabpanel"
        aria-live="polite"
        className="sticker relative flex min-h-[340px] flex-col rounded-[32px] bg-shell p-8 sm:p-10"
      >
        <span
          aria-hidden
          className={`absolute -top-3 left-12 h-6 w-28 -rotate-2 rounded-sm ${a.tape} opacity-85`}
        />

        {/* keyed so each change replays the rise, which reads as a page turn */}
        <div key={i} className="anim-rise flex flex-1 flex-col">
          <blockquote className="flex-1 text-[16.5px] leading-[1.8] text-ink text-pretty sm:text-[17px]">
            {active.quote}
          </blockquote>

          <figcaption className="mt-8 flex items-center gap-3 border-t border-sand/45 pt-6">
            <span
              aria-hidden
              className={`flex h-11 w-11 items-center justify-center rounded-full ${a.dot} font-display text-[17px] font-semibold text-ink`}
            >
              {active.author[0]}
            </span>
            <span>
              <span className="block font-display text-[17px] font-medium leading-tight text-ink">
                {active.author}
              </span>
              <span className="mt-0.5 block text-[13px] text-ink-muted">
                Kids &amp; Me parent
              </span>
            </span>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous review" : "Next review"}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-sand text-slate-deep transition-all duration-200 hover:-translate-y-0.5 hover:border-coral hover:bg-coral hover:text-ink"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[18px] w-[18px]">
        <path
          d={
            dir === "left"
              ? "M19 12H6m0 0 5.2-5.2M6 12l5.2 5.2"
              : "M5 12h13m0 0-5.2-5.2M18 12l-5.2 5.2"
          }
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
