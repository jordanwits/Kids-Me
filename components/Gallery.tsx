"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const shots = [
  {
    src: "/images/gallery-playground-redding-preschools-01.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[280px] sm:w-[340px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1.5deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-classroom-redding-preschools-01.jpg",
    alt: "Inside a Kids & Me classroom",
    w: "w-[300px] sm:w-[370px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.2deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playroom-redding-preschools-01.jpg",
    alt: "The indoor play room at Kids & Me Preschool",
    w: "w-[260px] sm:w-[310px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[0.6deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-lunchroom-redding-preschools-01.jpg",
    alt: "Lunch time at Kids & Me Preschool",
    w: "w-[330px] sm:w-[400px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-02.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[280px] sm:w-[340px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.4deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-classroom-redding-preschools-02.jpg",
    alt: "Inside a Kids & Me classroom",
    w: "w-[300px] sm:w-[370px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[0.8deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-playroom-redding-preschools-02.jpg",
    alt: "The indoor play room at Kids & Me Preschool",
    w: "w-[260px] sm:w-[310px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1.5deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-lunchroom-redding-preschools-02.jpg",
    alt: "Lunch time at Kids & Me Preschool",
    w: "w-[330px] sm:w-[400px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.2deg]",
    iw: 640,
    ih: 360,
  },
  {
    src: "/images/gallery-playground-redding-preschools-03.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[200px] sm:w-[240px]",
    h: "h-[280px] sm:h-[340px]",
    tilt: "rotate-[0.6deg]",
    iw: 320,
    ih: 480,
  },
  {
    src: "/images/gallery-classroom-redding-preschools-03.jpg",
    alt: "Inside a Kids & Me classroom",
    w: "w-[280px] sm:w-[340px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-playroom-redding-preschools-03.jpg",
    alt: "The indoor play room at Kids & Me Preschool",
    w: "w-[300px] sm:w-[370px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.4deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-playground-redding-preschools-04.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[200px] sm:w-[240px]",
    h: "h-[280px] sm:h-[340px]",
    tilt: "-rotate-[0.8deg]",
    iw: 320,
    ih: 480,
  },
  {
    src: "/images/gallery-classroom-redding-preschools-04.jpg",
    alt: "Inside a Kids & Me classroom",
    w: "w-[260px] sm:w-[310px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1.5deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playroom-redding-preschools-04.jpg",
    alt: "The indoor play room at Kids & Me Preschool",
    w: "w-[330px] sm:w-[400px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.2deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-05.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[280px] sm:w-[340px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[0.6deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-classroom-redding-preschools-05.jpg",
    alt: "Inside a Kids & Me classroom",
    w: "w-[300px] sm:w-[370px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playroom-redding-preschools-05.jpg",
    alt: "The indoor play room at Kids & Me Preschool",
    w: "w-[260px] sm:w-[310px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.4deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-06.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[330px] sm:w-[400px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[0.8deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-classroom-redding-preschools-06.jpg",
    alt: "Inside a Kids & Me classroom",
    w: "w-[280px] sm:w-[340px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1.5deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-playroom-redding-preschools-06.jpg",
    alt: "The indoor play room at Kids & Me Preschool",
    w: "w-[300px] sm:w-[370px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.2deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-playground-redding-preschools-07.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[260px] sm:w-[310px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[0.6deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-classroom-redding-preschools-07.jpg",
    alt: "Inside a Kids & Me classroom",
    w: "w-[330px] sm:w-[400px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playroom-redding-preschools-07.jpg",
    alt: "The indoor play room at Kids & Me Preschool",
    w: "w-[280px] sm:w-[340px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.4deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-08.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[300px] sm:w-[370px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[0.8deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-09.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[260px] sm:w-[310px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1.5deg]",
    iw: 640,
    ih: 427,
  },
  {
    src: "/images/gallery-playground-redding-preschools-10.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[330px] sm:w-[400px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.2deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-11.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[280px] sm:w-[340px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[0.6deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-12.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[300px] sm:w-[370px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "-rotate-[1deg]",
    iw: 640,
    ih: 457,
  },
  {
    src: "/images/gallery-playground-redding-preschools-13.jpg",
    alt: "Children playing on the shaded Kids & Me playground",
    w: "w-[260px] sm:w-[310px]",
    h: "h-[230px] sm:h-[280px]",
    tilt: "rotate-[1.4deg]",
    iw: 640,
    ih: 457,
  },
];

/** Pixels per second the strip travels. Duration is derived from this and the
 *  measured track width, so adding photos or changing breakpoint never changes
 *  the perceived speed. */
const SPEED = 42;

export default function Gallery() {
  const track = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  /* Measure one copy of the strip and translate that into a duration. The two
     copies are identical, so half the scroll width is exactly the -50% the
     keyframe travels. */
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const oneCopy = el.scrollWidth / 2;
      if (oneCopy > 0) {
        el.style.setProperty("--gal-duration", `${Math.max(20, oneCopy / SPEED)}s`);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: -1 | 1) =>
      setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [],
  );

  // Keyboard control + scroll lock while the viewer is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const strip = (dupe: boolean) => (
    <div
      className={`flex items-center gap-5 pr-5 sm:gap-6 sm:pr-6 ${dupe ? "gal-dupe" : ""}`}
      aria-hidden={dupe || undefined}
    >
      {shots.map((s, i) => (
        <button
          key={`${dupe ? "d" : "o"}-${s.src}`}
          type="button"
          onClick={() => setOpen(i)}
          tabIndex={dupe ? -1 : 0}
          aria-label={`Open larger view: ${s.alt}`}
          className={`group relative shrink-0 ${s.w} ${s.h} ${s.tilt} cursor-pointer overflow-hidden rounded-[26px] border-[6px] border-shell shadow-[0_26px_50px_-30px_rgba(51,58,69,.6)] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5`}
        >
          <Image
            src={s.src}
            alt={dupe ? "" : s.alt}
            fill
            sizes="(max-width: 640px) 70vw, 420px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </button>
      ))}
    </div>
  );

  const current = open === null ? null : shots[open];
  const position = open === null ? 0 : open + 1;

  return (
    <section id="gallery" className="scroll-mt-24 bg-cream pb-14 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1240px] px-5">
        <Reveal>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Gallery
          </p>
          <h2 className="mt-3 max-w-[520px] font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
            Have a look around.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="gal-viewport mt-10 pb-6">
          <div ref={track} className="gal-track" data-paused={open !== null}>
            {strip(false)}
            {strip(true)}
          </div>
        </div>
      </Reveal>

      {/* ---------- Larger view ---------- */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Click-away scrim. Decorative: the labelled X button and Escape are
              the accessible ways out, so this must not duplicate that label. */}
          <div
            aria-hidden
            onClick={close}
            className="absolute inset-0 bg-ink/[0.93] backdrop-blur-md"
          />

          <div className="relative z-10 flex max-h-full w-full flex-col items-center">
            <div className="relative flex items-center justify-center">
              {/* Width is the smallest of: the viewport-width cap, an absolute
                  cap, and the width implied by the height cap for this photo's
                  own aspect ratio. That lets a photo grow to fill the viewport
                  without ever distorting or letterboxing inside its border. */}
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.iw}
                height={current.ih}
                sizes="(max-width: 768px) 94vw, 1100px"
                priority
                style={{
                  width: `min(94vw, 1100px, calc(84vh * ${(current.iw / current.ih).toFixed(4)}))`,
                }}
                className="h-auto rounded-[18px] border-[6px] border-shell shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]"
              />
            </div>

            <div className="mt-5 flex w-full items-center justify-center gap-5">
              <ViewerButton dir="left" onClick={() => step(-1)} />
              <p className="min-w-[72px] text-center font-display text-[15px] font-medium text-cream">
                {position} / {shots.length}
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
    </section>
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
