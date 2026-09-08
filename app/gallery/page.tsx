import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery | Kids & Me Preschool, Redding CA",
  description:
    "Photos of the classrooms, the shaded playground, the two-story indoor playhouse and the lunchroom at Kids & Me Preschool in Redding, California.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The rooms, the grounds, and the two-story"
        crayon="playhouse."
        blurb="A look around before you look around. The playground is shaded by mature oaks, the play room is built around a two-story wooden playhouse, and there are three classrooms grouped by age."
        edge="#F7EDE2"
      />

      <section className="bg-cream-deep py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-5">
          <GalleryGrid />
        </div>
      </section>

      {/* ---- photography note + CTA ---- */}
      <section className="bg-cream py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-[720px] px-5 text-center">
            <p className="font-hand text-[26px] leading-none text-coral-deep">
              Better in person
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-tight text-ink text-balance">
              Photos only get you so far.
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              You are welcome to visit at any time during normal working hours.
              No appointment is needed, and we look forward to meeting you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/enrollment#tour"
                className="inline-flex w-full items-center justify-center rounded-full bg-coral px-8 py-4 font-display text-[17px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white sm:w-auto"
              >
                Request a tour
              </Link>
              <a
                href={site.phone.href}
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate/40 px-8 py-4 font-display text-[17px] font-medium text-slate-deep transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-deep sm:w-auto"
              >
                Call {site.phone.label}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
