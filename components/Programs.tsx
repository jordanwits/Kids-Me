import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { PaperEdge } from "./Decor";
import { classrooms } from "@/lib/content";

/**
 * Home page teaser for the three classrooms. Blurb only — the per-room
 * curriculum detail lives on /programs so it isn't said twice.
 */

const accent: Record<string, { chip: string; text: string }> = {
  teal: { chip: "bg-teal", text: "text-teal-deep" },
  gold: { chip: "bg-gold", text: "text-coral-deep" },
  mauve: { chip: "bg-mauve", text: "text-slate-deep" },
};

export default function Programs() {
  return (
    <section
      id="programs"
      className="relative scroll-mt-24 bg-cream-deep pt-20 sm:pt-24 lg:pt-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 pb-16 lg:pb-20">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Our Classrooms
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
            Three rooms, grouped by age, so every day fits the child.
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
            Separating by age lets us pitch material at exactly the right level,
            which is how children stay inquisitive, creative and proud of what
            they can do.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3 md:gap-6 lg:gap-8">
          {classrooms.map((p, i) => {
            const a = accent[p.accent];
            return (
              <Reveal key={p.name} delay={i * 110}>
                <article className="sticker group relative flex h-full flex-col overflow-hidden rounded-[34px] bg-shell transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_36px_60px_-30px_rgba(51,58,69,.45)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.photo}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-full ${a.chip} px-3.5 py-1.5 font-display text-[13px] font-medium text-ink shadow-sm`}
                    >
                      {p.age}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-[26px] font-semibold leading-tight text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[15.5px] leading-[1.65] text-ink-muted text-pretty">
                      {p.blurb}
                    </p>

                    <div className="mt-6 border-t border-sand/40 pt-5">
                      <Link
                        href={`/programs#${p.slug}`}
                        className={`inline-flex items-center gap-2 font-display text-[15px] font-medium ${a.text} transition-colors hover:text-ink`}
                      >
                        See the full curriculum
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <path
                            d="M5 12h13m0 0-5.2-5.2M18 12l-5.2 5.2"
                            stroke="currentColor"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={180}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-full bg-slate-deep px-7 py-3.5 font-display text-[16px] font-medium text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink"
            >
              Programs &amp; curriculum
            </Link>
            <Link
              href="/programs#themes"
              className="inline-flex items-center gap-2 font-display text-[16px] font-medium text-teal-deep transition-colors hover:text-ink"
            >
              See twelve months of themes
              <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                <path
                  d="M5 12h13m0 0-5.2-5.2M18 12l-5.2 5.2"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>

      <PaperEdge fill="#FDF7F0" className="relative -mb-px" />
    </section>
  );
}
