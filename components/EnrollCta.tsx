import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import { PaperEdge } from "./Decor";

/**
 * Replaces the old on-home embedded registration iframe.
 *
 * The client's ask was that the form be ON the site rather than linked out to
 * Procare — /enrollment satisfies that. Keeping the 820px third-party frame off
 * the home page stops it burying the testimonials and gallery, and leaves the
 * landing page's job as routing people to it.
 */

const steps = [
  {
    n: "01",
    title: "Send the form",
    body: "Fill it in on the enrollment page. It takes about three minutes.",
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

export default function EnrollCta() {
  return (
    <section className="relative overflow-hidden bg-cream pt-16 sm:pt-20 lg:pt-24">
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
            Two ways in. Both take about{" "}
            <span className="crayon crayon-coral">three minutes.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
            Register online, or simply walk in during operating hours. Parents
            are welcome any weekday, with no advance notice.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-8">
          {/* ---------- register ---------- */}
          <Reveal>
            <div className="sticker relative flex h-full flex-col justify-between overflow-hidden rounded-[34px] bg-coral p-8 sm:p-10">
              <Image
                src="/HandGraphic.png"
                alt=""
                width={38}
                height={34}
                aria-hidden
                className="absolute -bottom-8 -right-6 h-auto w-44 opacity-25 [filter:brightness(0)_invert(1)]"
              />
              <div className="relative">
                <p className="font-hand text-[26px] leading-none text-ink/70">
                  Ready to start?
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-semibold leading-tight text-ink">
                  Register online
                </h3>
                <p className="mt-3 max-w-[38ch] text-[16px] leading-[1.65] text-ink/80">
                  The registration and interest form is on the enrollment page —
                  no download, no printing, no trip to the office.
                </p>
              </div>

              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/enrollment#form"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-[16px] font-medium text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-deep"
                >
                  Open the form
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="h-4 w-4"
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
                <Link
                  href="/enrollment#rates"
                  className="inline-flex items-center justify-center rounded-full border-2 border-ink/35 px-7 py-3.5 font-display text-[16px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink"
                >
                  See the rates
                </Link>
              </div>
            </div>
          </Reveal>

          {/* ---------- tour + steps ---------- */}
          <Reveal delay={110}>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-[34px] border border-sand/40 bg-shell p-7 sm:p-8">
                <h3 className="font-display text-[20px] font-medium text-ink">
                  Or just turn up
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-muted">
                  No appointment needed, any weekday.
                </p>
                <a
                  href={site.phone.href}
                  className="mt-5 inline-flex items-center gap-2 font-display text-[19px] font-medium text-coral-deep transition-colors hover:text-ink"
                >
                  {site.phone.label}
                </a>
                <p className="mt-1.5 text-[13.5px] text-ink-muted">
                  {site.hours}
                </p>
              </div>

              <div className="flex-1 rounded-[34px] border border-sand/40 bg-shell/70 p-7 sm:p-8">
                <h3 className="font-display text-[18px] font-medium text-ink">
                  What happens next
                </h3>
                <ol className="mt-5 space-y-4">
                  {steps.map((s) => (
                    <li key={s.n} className="flex gap-3.5">
                      <span className="font-display text-[14px] font-semibold text-teal-deep">
                        {s.n}
                      </span>
                      <span>
                        <span className="block font-display text-[15.5px] font-medium text-ink">
                          {s.title}
                        </span>
                        <span className="mt-0.5 block text-[14px] leading-snug text-ink-muted">
                          {s.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <PaperEdge fill="#F7EDE2" className="relative -mb-px mt-16" />
    </section>
  );
}
