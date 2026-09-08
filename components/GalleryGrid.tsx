"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { galleryCategories, galleryPhotos } from "@/lib/content";

/**
 * The gallery page proper: the four categories the current site groups by,
 * as filter pills over one grid, plus a lightbox.
 *
 * Filtering is client state rather than four routes — the whole set is ~30
 * images and they are all needed for the lightbox's prev/next anyway.
 */

const filters = [
  { slug: "all", label: "Everything", blurb: "Every room and the grounds." },
  ...galleryCategories.map((c) => ({
    slug: c.slug,
    label: c.label,
    blurb: c.blurb,
  })),
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const shots =
    filter === "all"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === filter);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? i : (i + dir + shots.length) % shots.length,
      ),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const active = open === null ? null : shots[open];
  const activeLabel =
    active &&
    galleryCategories.find((c) => c.slug === active.category)?.label;

  return (
    <>
      {/* ---------- filters ---------- */}
      <div
        role="tablist"
        aria-label="Filter photos by area"
        className="flex flex-wrap justify-center gap-2.5"
      >
        {filters.map((f) => {
          const on = filter === f.slug;
          return (
            <button
              key={f.slug}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setFilter(f.slug);
                setOpen(null);
              }}
              className={`rounded-full px-5 py-2.5 font-display text-[15px] font-medium transition-all duration-200 ${
                on
                  ? "bg-coral text-ink shadow-[0_12px_26px_-14px_rgba(217,123,87,.9)]"
                  : "border border-sand/60 bg-shell text-ink-muted hover:-translate-y-0.5 hover:border-coral hover:text-coral-deep"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[15px] text-ink-muted">
        {filters.find((f) => f.slug === filter)?.blurb}{" "}
        <span className="text-ink-muted/70">
          ({shots.length} photo{shots.length === 1 ? "" : "s"})
        </span>
      </p>

      {/* ---------- grid ---------- */}
      <ul className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {shots.map((shot, i) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-[22px] bg-cream-deep focus-visible:outline-none"
            >
              <span className="block aspect-[4/3]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 290px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </span>
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
              <span className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-shell/95 px-3 py-1 font-display text-[12px] font-medium text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                View
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ---------- lightbox ---------- */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink/93 px-4 py-6 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="flex max-h-full w-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sized the same way as the home page carousel's viewer: drive the
                WIDTH explicitly and let height follow, capping width by the
                image's own ratio so a tall photo still fits the viewport.
                Leaving width on `auto` lays the photo out at its intrinsic
                size instead, which is what made the small sources (the two
                320px portraits especially) open tiny. */}
            <div className="flex w-full items-center justify-center">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.w}
                height={active.h}
                sizes="(max-width: 768px) 94vw, 1100px"
                priority
                style={{
                  width: `min(94vw, 1100px, calc(84vh * ${(
                    active.w / active.h
                  ).toFixed(4)}))`,
                }}
                className="h-auto rounded-[18px] border-[6px] border-shell shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]"
              />
            </div>

            <div className="mt-5 flex w-full items-center justify-center gap-5">
              <ViewerButton dir="left" onClick={() => step(-1)} />
              <p className="min-w-[140px] text-center">
                <span className="block font-display text-[15px] font-medium text-cream">
                  {activeLabel}
                </span>
                <span className="mt-0.5 block text-[13px] text-cream/60">
                  {open! + 1} / {shots.length}
                </span>
              </p>
              <ViewerButton dir="right" onClick={() => step(1)} />
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-cream/70 hover:bg-cream/10 sm:right-6 sm:top-6"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

function ViewerButton({
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
      aria-label={dir === "left" ? "Previous photo" : "Next photo"}
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-cream/30 text-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-coral hover:bg-coral hover:text-ink"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
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
