import Reveal from "./Reveal";
import { rates, site } from "@/lib/site";
import { ConfettiDots, Wave } from "./Decor";

const accents: Record<string, { chip: string; price: string; check: string }> = {
  teal: { chip: "bg-teal", price: "text-teal-deep", check: "text-teal-deep" },
  gold: { chip: "bg-gold", price: "text-coral-deep", check: "text-coral-deep" },
  mauve: { chip: "bg-mauve", price: "text-slate-deep", check: "text-slate-deep" },
};

export default function Tuition() {
  return (
    <section id="tuition" className="relative scroll-mt-24 bg-cream">
      <Wave fill="#4A5567" className="relative -mb-px" />

      <div className="relative overflow-hidden bg-slate-deep pt-8">
        <ConfettiDots
          aria-hidden
          className="pointer-events-none absolute left-[8%] top-10 h-16 w-28 opacity-50"
        />

        <div className="mx-auto max-w-[1240px] px-5 pb-16 sm:pb-20">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-cream/60">
              Tuition &amp; Rates
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-cream text-balance">
              Our rates, published plainly.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-[1.7] text-cream/75 text-pretty">
              No packages to decode and no per-day penalty. Every daily rate is
              the same, however many days a week your child attends.
            </p>
          </Reveal>

          <div className="mt-14 grid items-start gap-6 md:grid-cols-3">
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

                    <div className="mt-2 flex items-center gap-3">
                      <h3 className="font-display text-[22px] font-semibold text-ink">
                        {r.name}
                      </h3>
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
                        href="#enroll"
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

          <Reveal delay={160}>
            <div className="mx-auto mt-12 flex max-w-[900px] flex-col items-center gap-5 rounded-[28px] border border-cream/15 bg-cream/[0.07] px-7 py-6 text-center sm:flex-row sm:text-left">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-ink">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
                  <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M12 11v5.4M12 7.8h.01"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="flex-1 text-[15px] leading-[1.65] text-cream/80">
                Rates shown are per child, per day. Schedules are flexible and
                available year round. Call{" "}
                <a
                  href={site.phone.href}
                  className="font-medium text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
                >
                  {site.phone.label}
                </a>{" "}
                and we&apos;ll walk you through what your week would look like.
              </p>
            </div>
          </Reveal>
        </div>

        <Wave fill="#FDF7F0" className="relative -mb-px" />
      </div>
    </section>
  );
}
