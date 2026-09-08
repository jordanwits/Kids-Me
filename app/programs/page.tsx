import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ThemeCalendar from "@/components/ThemeCalendar";
import { PaperEdge, Wave } from "@/components/Decor";
import { classrooms, dailyRhythm } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programs & Curriculum | Kids & Me Preschool, Redding CA",
  description:
    "Three age-grouped classrooms for ages 2 to 6, the full curriculum for each room, twelve months of themes, and how a day at Kids & Me is actually shaped.",
};

const accent: Record<
  string,
  { chip: string; soft: string; text: string; rule: string }
> = {
  teal: {
    chip: "bg-teal",
    soft: "bg-teal-soft",
    text: "text-teal-deep",
    rule: "bg-teal",
  },
  gold: {
    chip: "bg-gold",
    soft: "bg-gold-soft",
    text: "text-coral-deep",
    rule: "bg-gold",
  },
  mauve: {
    chip: "bg-mauve",
    soft: "bg-mauve-soft",
    text: "text-slate-deep",
    rule: "bg-mauve",
  },
  coral: {
    chip: "bg-coral",
    soft: "bg-coral-soft",
    text: "text-coral-deep",
    rule: "bg-coral",
  },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Three rooms, grouped by age, so every day fits"
        crayon="the child."
        blurb="Kids & Me offers preschool and toddler programs for children two to six years of age. Separating by age lets us pitch material at exactly the right level, which is how children stay inquisitive, creative and proud of what they can do."
        edge="#F7EDE2"
      >
        <div className="flex flex-wrap gap-2.5">
          {classrooms.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-sand/60 bg-shell px-4 py-2 font-display text-[14.5px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-coral hover:text-coral-deep"
            >
              <span
                aria-hidden
                className={`h-2.5 w-2.5 rounded-full ${accent[c.accent].chip}`}
              />
              {c.name}
              <span className="text-[13px] font-normal text-ink-muted">
                {c.age}
              </span>
            </a>
          ))}
        </div>
      </PageHero>

      {/* ================= Classrooms & curriculum ================= */}
      <section id="curriculum" className="scroll-mt-24 bg-cream-deep py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Curriculum by age
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              What they actually learn, room by room.
            </h2>
            <p className="mx-auto mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              Each room builds on the one before it. Nothing here is a surprise
              on the first day of kindergarten.
            </p>
          </Reveal>

          <div className="mt-16 space-y-16 lg:space-y-24">
            {classrooms.map((room, i) => {
              const a = accent[room.accent];
              const flip = i % 2 === 1;
              return (
                <Reveal key={room.slug}>
                  <article
                    id={room.slug}
                    className="scroll-mt-24 grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14"
                  >
                    {/* ---- photo + identity ---- */}
                    <div className={flip ? "lg:order-2" : ""}>
                      <div className="lg:sticky lg:top-28">
                        <div className="relative aspect-[5/4] overflow-hidden rounded-[34px] shadow-[0_36px_70px_-40px_rgba(51,58,69,.6)]">
                          <Image
                            src={room.photo}
                            alt={room.alt}
                            fill
                            sizes="(max-width: 1024px) 92vw, 440px"
                            className="object-cover"
                          />
                          <span
                            className={`absolute left-4 top-4 rounded-full ${a.chip} px-3.5 py-1.5 font-display text-[13px] font-medium text-ink shadow-sm`}
                          >
                            {room.age}
                          </span>
                        </div>

                        <h3 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight text-ink">
                          {room.name}
                        </h3>
                        <span
                          aria-hidden
                          className={`mt-3 block h-1.5 w-16 rounded-full ${a.rule}`}
                        />
                        <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.7] text-ink-muted text-pretty">
                          {room.blurb}
                        </p>

                        <Link
                          href="/enrollment#form"
                          className={`mt-6 inline-flex items-center gap-2 font-display text-[15.5px] font-medium ${a.text} transition-colors hover:text-ink`}
                        >
                          Ask about availability
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                            className="h-3.5 w-3.5"
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

                    {/* ---- curriculum, as a spec sheet rather than cards ----
                        Label left, items right, hairlines between. Reads as one
                        syllabus for the room instead of five floating boxes. */}
                    <div className={flip ? "lg:order-1" : ""}>
                      <dl className="divide-y divide-sand/45 border-y border-sand/45">
                        {room.curriculum.map((group) => (
                          <div
                            key={group.heading}
                            className="grid gap-x-10 gap-y-2.5 py-6 sm:grid-cols-[minmax(8.5rem,.85fr)_1.6fr] sm:py-7"
                          >
                            <dt className="flex items-start gap-2.5">
                              <span
                                aria-hidden
                                className={`mt-[7px] h-2 w-2 shrink-0 -rotate-[8deg] rounded-[2px] ${a.rule}`}
                              />
                              <span className="font-display text-[15.5px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
                                {group.heading}
                              </span>
                            </dt>
                            <dd>
                              <ul className="space-y-[7px]">
                                {group.items.map((item) => (
                                  <li
                                    key={item}
                                    className="text-[15.5px] leading-[1.55] text-ink-muted"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <PaperEdge fill="#FDF7F0" className="relative -mb-px mt-20" />
      </section>

      {/* ================= Monthly themes calendar ================= */}
      <section id="themes" className="scroll-mt-24 bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <Reveal className="mx-auto max-w-[700px] text-center">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Monthly themes
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              Twelve months, thirty-six subjects, and a reason to look forward
              to Monday.
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              Kids &amp; Me has monthly themes the children love to take part
              in. We teach on those subjects and build the activities, crafts
              and story time around them.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <ThemeCalendar />
          </Reveal>
        </div>
      </section>

      {/* ================= A day at Kids & Me ================= */}
      <section id="day" className="relative scroll-mt-24 bg-cream">
        <Wave fill="#4A5567" className="relative -mb-px" />

        <div className="bg-slate-deep py-16 sm:py-20">
          <div className="mx-auto max-w-[1240px] px-5">
            <Reveal className="mx-auto max-w-[660px] text-center">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-cream/60">
                A day at Kids &amp; Me
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-cream text-balance">
                How a day is actually shaped.
              </h2>
              <p className="mx-auto mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-cream/75 text-pretty">
                Doors open at 7:00 and close at 5:30. In between, the rhythm is
                the same every day, which is exactly what small children want.
              </p>
            </Reveal>

            {/* A day is a sequence, so it reads as one continuous timeline
                rather than eight identical tiles. */}
            <ol className="mx-auto mt-14 max-w-[720px]">
              {dailyRhythm.map((step, i) => {
                const last = i === dailyRhythm.length - 1;
                return (
                  <Reveal key={step.part} delay={i * 60}>
                    <li
                      className={`grid grid-cols-[auto_1fr] gap-x-5 sm:grid-cols-[6.5rem_auto_1fr] sm:gap-x-7 ${
                        last ? "" : "pb-9"
                      }`}
                    >
                      <p className="hidden pt-[1px] text-right text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/50 sm:block">
                        {step.time}
                      </p>

                      {/* marker + connector */}
                      <div className="relative flex justify-center">
                        <span
                          aria-hidden
                          className={`z-10 mt-[3px] h-3.5 w-3.5 shrink-0 rounded-full ${
                            accent[step.accent].rule
                          } ring-4 ring-slate-deep`}
                        />
                        {!last && (
                          <span
                            aria-hidden
                            className="absolute -bottom-9 left-1/2 top-5 w-px -translate-x-1/2 bg-cream/20"
                          />
                        )}
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/50 sm:hidden">
                          {step.time}
                        </p>
                        <h3 className="font-display text-[19px] font-medium leading-tight text-cream">
                          {step.part}
                        </h3>
                        <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.65] text-cream/70 text-pretty">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>

            <Reveal delay={140}>
              <p className="mx-auto mt-10 max-w-[62ch] text-center text-[14px] leading-relaxed text-cream/55">
                Every class gets outside every day the weather allows, and every
                child is welcome to be dropped in on. Parents may visit at any
                time during operating hours with no advance notice.
              </p>
            </Reveal>
          </div>
        </div>

        <Wave fill="#FDF7F0" className="relative -mb-px" />
      </section>

      {/* ================= Closing ================= */}
      <section className="bg-cream py-20 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-[720px] px-5 text-center">
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-tight text-ink text-balance">
              Come and see a room in use.
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              One tour tells you more than any curriculum list can. Visit any
              weekday, no appointment needed.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/enrollment#form"
                className="inline-flex w-full items-center justify-center rounded-full bg-coral px-8 py-4 font-display text-[17px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white sm:w-auto"
              >
                Start your registration
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
