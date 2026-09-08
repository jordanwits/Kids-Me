import Reveal from "./Reveal";
import { testimonials } from "@/lib/site";
import { PaperEdge } from "./Decor";

const tape: Record<string, string> = {
  coral: "bg-coral",
  teal: "bg-teal",
  gold: "bg-gold",
};

const tilt = ["-rotate-[1.4deg]", "rotate-[0.8deg]", "-rotate-[0.6deg]"];

export default function Testimonials() {
  return (
    <section className="relative bg-cream-deep pt-16 sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 lg:pb-20">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Applause
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
            What Redding parents say.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-7">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 110}>
              <figure
                className={`sticker group relative h-full ${tilt[i]} rounded-[30px] bg-shell p-7 transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 sm:p-8`}
              >
                {/* washi tape */}
                <span
                  aria-hidden
                  className={`absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-sm ${tape[t.accent]} opacity-85`}
                />
                <svg
                  viewBox="0 0 40 30"
                  aria-hidden
                  className="h-7 w-9 text-sand"
                  fill="currentColor"
                >
                  <path d="M0 30V17.4C0 7.9 5.2 1.6 15.3 0l1.9 5.2c-5.6 1.5-8.4 4.6-8.4 9.3h7.6V30H0Zm22.8 0V17.4C22.8 7.9 28 1.6 38.1 0L40 5.2c-5.6 1.5-8.4 4.6-8.4 9.3h7.6V30H22.8Z" />
                </svg>
                <blockquote className="mt-4 text-[15.5px] leading-[1.72] text-ink text-pretty">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-sand/40 pt-5">
                  <span
                    aria-hidden
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${tape[t.accent]} font-display text-[16px] font-semibold text-ink`}
                  >
                    {t.author[0]}
                  </span>
                  <span className="font-display text-[16px] font-medium text-ink">
                    {t.author}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <PaperEdge fill="#FDF7F0" className="relative -mb-px" />
    </section>
  );
}
