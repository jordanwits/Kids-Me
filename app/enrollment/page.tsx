import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ConfettiDots, PaperEdge, Wave } from "@/components/Decor";
import { rates, registration, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tuition & Enrollment | Kids & Me Preschool, Redding CA",
  description:
    "Published daily rates, a $100 one-time registration fee per family, and the registration form itself. Enroll online or drop in for a tour any weekday, no appointment needed.",
};

const accents: Record<string, { chip: string; price: string; check: string }> = {
  teal: { chip: "bg-teal", price: "text-teal-deep", check: "text-teal-deep" },
  gold: { chip: "bg-gold", price: "text-coral-deep", check: "text-coral-deep" },
};

const steps = [
  {
    n: "01",
    title: "Send the form",
    body: "Fill it in right here. It takes about three minutes.",
  },
  {
    n: "02",
    title: "We call you back",
    body: "Usually the same day, to talk through days, hours and availability.",
  },
  {
    n: "03",
    title: "Come and look around",
    body: "Meet the teachers, see the rooms, watch the playground at full tilt.",
  },
];

export default function EnrollmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Tuition & Enrollment"
        title="Our rates, published"
        crayon="plainly."
        blurb="No packages to decode and no per-day penalty. Every daily rate is the same, however many days a week your child attends, and registration is charged once per family rather than per child."
        edge="#4A5567"
      />

      {/* ================= Rates ================= */}
      <section id="rates" className="relative scroll-mt-24 bg-cream">
        <div className="relative overflow-hidden bg-slate-deep pt-16 sm:pt-20">
          <ConfettiDots
            aria-hidden
            className="pointer-events-none absolute left-[8%] top-10 h-16 w-28 opacity-50"
          />

          <div className="mx-auto max-w-[1240px] px-5 pb-16 sm:pb-20">
            <div className="mx-auto grid max-w-[820px] items-start gap-6 md:grid-cols-2">
              {rates.map((r, i) => {
                const a = accents[r.accent];
                return (
                  <Reveal key={r.name} delay={i * 110}>
                    <div
                      className={`relative flex h-full flex-col overflow-hidden rounded-[34px] bg-shell p-7 sm:p-8 ${
                        r.featured
                          ? "ring-2 ring-coral/60 shadow-[0_40px_70px_-30px_rgba(0,0,0,.65)]"
                          : "shadow-[0_28px_50px_-30px_rgba(0,0,0,.5)]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 top-0 h-1.5 ${a.chip}`}
                      />

                      <div className="mt-2 flex flex-wrap items-center gap-2.5">
                        <h2 className="font-display text-[22px] font-semibold text-ink">
                          {r.name}
                        </h2>
                        {r.featured && (
                          <span className="rounded-full bg-coral px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink">
                            Most chosen
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 min-h-[2.6rem] text-[13.5px] leading-snug text-ink-muted">
                        {r.hours}
                      </p>

                      <p className="mt-6 flex items-end gap-1.5">
                        <span
                          className={`font-display text-[54px] font-semibold leading-none ${a.price}`}
                        >
                          {r.price}
                        </span>
                        <span className="pb-1.5 text-[14px] font-medium text-ink-muted">
                          {r.unit}
                        </span>
                      </p>

                      {/* TODO(client): remove this chip once Brett confirms the
                          real figure. The current site publishes no daily rate. */}
                      {r.placeholder && (
                        <p className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full border border-dashed border-coral/70 px-3 py-1 text-[11.5px] font-medium text-coral-deep">
                          Rate to be confirmed
                        </p>
                      )}

                      <ul className="mt-7 space-y-3 border-t border-sand/40 pt-6">
                        {r.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden
                              className={`mt-[3px] h-3.5 w-3.5 shrink-0 ${a.check}`}
                            >
                              <path
                                d="m4 12.6 5.2 5.2L20 6.6"
                                stroke="currentColor"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-[14.5px] leading-snug text-ink">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-7">
                        <a
                          href="#form"
                          className={`block rounded-full py-3.5 text-center font-display text-[15.5px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                            r.featured
                              ? "bg-coral text-ink hover:bg-coral-deep hover:text-white"
                              : "border-2 border-sand text-slate-deep hover:border-slate-deep"
                          }`}
                        >
                          {r.featured ? "Enroll now" : "Get started"}
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Registration is a fee, not a plan. A full-width line under the
                cards — no button, no matching shape — so it reads as something
                you also pay rather than a third thing you choose. */}
            <Reveal delay={140}>
              <div className="mx-auto mt-7 flex max-w-[820px] flex-col gap-5 rounded-[24px] border border-cream/15 bg-cream/[0.07] px-7 py-6 sm:flex-row sm:items-center sm:gap-7">
                <div className="flex items-baseline gap-2.5 sm:flex-col sm:items-start sm:gap-1">
                  <span className="font-display text-[34px] font-semibold leading-none text-gold">
                    {registration.price}
                  </span>
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-cream/55">
                    {registration.unit}
                  </span>
                </div>

                <span
                  aria-hidden
                  className="hidden h-14 w-px shrink-0 bg-cream/15 sm:block"
                />

                <div className="flex-1">
                  <h3 className="font-display text-[17.5px] font-medium leading-tight text-cream">
                    Registration fee
                    <span className="ml-2 text-[14px] font-normal text-cream/60">
                      {registration.summary}
                    </span>
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-cream/70 text-pretty">
                    {registration.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Wave fill="#FDF7F0" className="relative -mb-px" />
        </div>
      </section>

      {/* ================= Form + tour ================= */}
      <section
        id="form"
        className="relative scroll-mt-24 overflow-hidden bg-cream pt-16 sm:pt-20"
      >
        <Image
          src="/HandGraphic.png"
          alt=""
          width={38}
          height={34}
          aria-hidden
          className="anim-float pointer-events-none absolute right-[3%] top-14 hidden h-auto w-16 opacity-30 lg:block"
        />

        <div className="relative mx-auto max-w-[1240px] px-5">
          <Reveal className="mx-auto max-w-[700px] text-center">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Register
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.015em] text-ink text-balance">
              Two ways in. Both start{" "}
              <span className="crayon crayon-coral">right here.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              Register online below, or simply walk in during operating hours.
              Parents are welcome any weekday, with no advance notice.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-10">
            {/* ---------- left: tour + steps ---------- */}
            <div className="flex flex-col gap-6">
              <Reveal>
                <div
                  id="tour"
                  className="relative scroll-mt-24 overflow-hidden rounded-[34px] bg-coral p-7 sm:p-8"
                >
                  <Image
                    src="/HandGraphic.png"
                    alt=""
                    width={38}
                    height={34}
                    aria-hidden
                    className="absolute -bottom-6 -right-4 h-auto w-36 opacity-25 [filter:brightness(0)_invert(1)]"
                  />
                  <p className="font-hand text-[24px] leading-none text-ink/70">
                    Prefer to see it first?
                  </p>
                  <h3 className="relative mt-2 font-display text-[28px] font-semibold leading-tight text-ink">
                    Request a tour
                  </h3>
                  <p className="relative mt-3 max-w-[34ch] text-[15.5px] leading-[1.6] text-ink/80">
                    No appointment needed. Look at the playground, the
                    classrooms and the playhouse, and meet the staff
                    who&apos;d be with your child every day.
                  </p>
                  <a
                    href={site.phone.href}
                    className="relative mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 font-display text-[16px] font-medium text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-deep"
                  >
                    Call {site.phone.label}
                  </a>
                  <p className="relative mt-3 text-[13.5px] text-ink/70">
                    {site.hours}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={110}>
                <div className="rounded-[34px] border border-sand/40 bg-shell/70 p-7 sm:p-8">
                  <h3 className="font-display text-[20px] font-medium text-ink">
                    What happens next
                  </h3>
                  <ol className="mt-5 space-y-5">
                    {steps.map((s) => (
                      <li key={s.n} className="flex gap-4">
                        <span className="font-display text-[15px] font-semibold text-teal-deep">
                          {s.n}
                        </span>
                        <span>
                          <span className="block font-display text-[16px] font-medium text-ink">
                            {s.title}
                          </span>
                          <span className="mt-1 block text-[14.5px] leading-snug text-ink-muted">
                            {s.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            {/* ---------- right: embedded registration form ---------- */}
            <Reveal delay={80}>
              <div className="sticker overflow-hidden rounded-[34px] border border-sand/40 bg-shell">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand/40 bg-cream-deep/60 px-6 py-4 sm:px-7">
                  <div>
                    <h3 className="font-display text-[20px] font-semibold leading-tight text-ink">
                      Registration &amp; interest form
                    </h3>
                    <p className="mt-0.5 text-[13.5px] text-ink-muted">
                      Secure form · about 3 minutes
                    </p>
                  </div>
                  <a
                    href={site.registrationFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-sand px-3.5 py-1.5 text-[13px] font-medium text-slate-deep transition-colors hover:border-slate-deep hover:bg-shell"
                  >
                    Open in new tab
                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden>
                      <path
                        d="M9 5h10v10M19 5 6.5 17.5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>

                <iframe
                  src={site.registrationFormUrl}
                  title="Kids &amp; Me Preschool registration and interest form"
                  loading="lazy"
                  className="h-[760px] w-full border-0 bg-white sm:h-[820px]"
                />

                <p className="border-t border-sand/40 px-6 py-3.5 text-[12.5px] text-ink-muted sm:px-7">
                  Trouble with the form? Call{" "}
                  <a
                    href={site.phone.href}
                    className="font-medium text-coral-deep underline decoration-coral/40 underline-offset-4"
                  >
                    {site.phone.label}
                  </a>{" "}
                  or email{" "}
                  <a
                    href={site.email.href}
                    className="font-medium text-coral-deep underline decoration-coral/40 underline-offset-4"
                  >
                    {site.email.label}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <PaperEdge fill="#F7EDE2" className="relative -mb-px mt-16" />
      </section>

      {/* ================= Registration fee note ================= */}
      <section className="bg-cream-deep py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-[720px] px-5 text-center">
            <p className="font-hand text-[26px] leading-none text-coral-deep">
              One fee, one family
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-tight text-ink text-balance">
              Registration is $100 per family, charged once.
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              Not per child, and never charged twice — one fee covers every
              child you enroll.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
