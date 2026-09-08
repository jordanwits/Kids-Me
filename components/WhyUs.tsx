import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { featureIcons } from "./Decor";

const features = [
  {
    icon: featureIcons.shield,
    title: "Safety, always first",
    body: "Close supervision, secure grounds, and a clean facility designed around small children.",
    ring: "bg-coral-soft text-coral-deep",
  },
  {
    icon: featureIcons.heart,
    title: "Teachers who stay",
    body: "Qualified, experienced staff who know your child's name, moods and milestones.",
    ring: "bg-teal-soft text-teal-deep",
  },
  {
    icon: featureIcons.apple,
    title: "Meals included",
    body: "Nutritious hot lunches and snacks every day. No packing a cooler at 6 a.m.",
    ring: "bg-gold-soft text-coral-deep",
  },
  {
    icon: featureIcons.tree,
    title: "A shady playground",
    body: "A spacious, park-like outdoor area with mature oaks. Rare, and worth seeing.",
    ring: "bg-teal-soft text-teal-deep",
  },
  {
    icon: featureIcons.house,
    title: "Two-story playhouse",
    body: "A full indoor play room built around a two-story wooden playhouse. Rainy days sorted.",
    ring: "bg-mauve-soft text-slate-deep",
  },
  {
    icon: featureIcons.chat,
    title: "We keep you posted",
    body: "Ongoing communication with parents, and an open door during all operating hours.",
    ring: "bg-sand-soft text-ink",
  },
];

/* The special-events band that used to close this section now lives on
   /programs, where it sits beside the monthly-themes calendar. */

export default function WhyUs() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden bg-cream pb-16 pt-16 sm:pt-20 lg:pb-20 lg:pt-24">
      <Image
        src="/HandGraphic.png"
        alt=""
        width={38}
        height={34}
        aria-hidden
        className="anim-drift pointer-events-none absolute -right-10 top-16 h-auto w-64 opacity-[0.1]"
      />

      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        {/* sticky statement */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Why Choose Us
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              Your children are{" "}
              <span className="crayon">worth it.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-[16.5px] leading-[1.75] text-ink-muted text-pretty">
              Children who find enjoyment in learning early are far more likely
              to keep finding it later. Everything here is built to make those
              first years feel good.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/enrollment#tour"
                className="inline-flex items-center justify-center rounded-full bg-slate-deep px-7 py-3.5 font-display text-[16px] font-medium text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink"
              >
                Book a visit
              </Link>
              <Link
                href="/about#why"
                className="group inline-flex items-center gap-2 font-display text-[16px] font-medium text-teal-deep transition-colors hover:text-ink"
              >
                Why choose us
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                >
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

        {/* feature tiles */}
        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 70}>
                <div className="group h-full rounded-[28px] border border-sand/35 bg-shell/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sand/60 hover:bg-shell hover:shadow-[0_28px_50px_-32px_rgba(51,58,69,.55)]">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.ring} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-[19px] font-medium leading-tight text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-muted text-pretty">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

    </section>
  );
}
