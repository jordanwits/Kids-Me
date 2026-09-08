import Reveal from "./Reveal";
import { site } from "@/lib/site";
import Image from "next/image";
import { PaperEdge } from "./Decor";

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

export default function Enroll() {
  return (
    <section
      id="enroll"
      className="relative scroll-mt-24 overflow-hidden bg-cream pt-16 sm:pt-20 lg:pt-24"
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
            Tours &amp; Enrollment
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4.6vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.015em] text-ink text-balance">
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
              <div className="relative overflow-hidden rounded-[34px] bg-coral p-7 sm:p-8">
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
                  No appointment needed. Look at the playground, the classrooms
                  and the playhouse, and meet the staff who&apos;d be with your
                  child every day.
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
  );
}
