import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { ConfettiDots, PaperEdge } from "./Decor";

const offerings = [
  "Full day and half day, ages 2–6",
  "Nutritious lunches and snacks",
  "Qualified, experienced teachers",
  "Clean facility built for small children",
  "Spacious, shaded outdoor play area",
  "Flexible scheduling, year round",
];

export default function Welcome() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-cream pt-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 pb-20 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:pb-24">
        {/* ---------- photo collage ---------- */}
        <Reveal className="relative order-2 mx-auto w-full max-w-[520px] lg:order-1">
          <div className="relative aspect-[4/4.3]">
            <div className="blob-c absolute inset-x-0 top-0 h-[68%] overflow-hidden shadow-[0_36px_70px_-40px_rgba(51,58,69,.6)]">
              <Image
                src="/images/gallery-classroom-redding-preschools-01.jpg"
                alt="Circle time in a Kids &amp; Me classroom"
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[62%] rotate-[3deg] overflow-hidden rounded-[30px] border-[7px] border-shell shadow-[0_30px_56px_-28px_rgba(51,58,69,.65)]">
              <Image
                src="/images/gallery-lunchroom-redding-preschools-01.jpg"
                alt="Children eating lunch together at Kids &amp; Me Preschool"
                width={640}
                height={457}
                sizes="320px"
                className="h-full w-full object-cover"
              />
            </div>

            {/* est. stamp */}
            <div className="absolute bottom-[10%] left-0 flex h-[112px] w-[112px] -rotate-[10deg] flex-col items-center justify-center rounded-full bg-gold text-center shadow-[0_18px_36px_-18px_rgba(51,58,69,.7)]">
              <span className="font-hand text-[15px] leading-none text-ink/70">
                established
              </span>
              <span className="font-display text-[30px] font-semibold leading-none text-ink">
                1978
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/70">
                Redding, CA
              </span>
            </div>

            <ConfettiDots
              aria-hidden
              className="absolute -left-6 top-[6%] h-12 w-20 opacity-80"
            />
          </div>
        </Reveal>

        {/* ---------- copy ---------- */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="font-hand text-[26px] leading-none text-coral-deep">
              Hello from Churn Creek Road
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              A place where your child is{" "}
              <span className="crayon crayon-coral">known</span>, not just
              watched.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-ink-muted text-pretty">
              Kids &amp; Me has been caring for and educating young children in
              Redding since 1978. The social, emotional and intellectual needs
              of your child are addressed under the guidance of nurturing staff
              members who have, in many cases, been here for years.
            </p>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.75] text-ink-muted text-pretty">
              Our school is run by a team of committed teachers who work
              together to create a stimulating and comforting environment,
              somewhere children genuinely feel safe and happy.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {offerings.map((o, i) => (
                <li key={o} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className={`mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full ${
                      ["bg-coral", "bg-teal", "bg-gold", "bg-mauve", "bg-sand", "bg-coral"][i]
                    }`}
                  />
                  <span className="text-[15.5px] leading-snug text-ink">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-display text-[16px] font-medium text-teal-deep transition-colors hover:text-ink"
              >
                More about the school
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
              <span aria-hidden className="hidden h-4 w-px bg-sand sm:block" />
              {/* The old "licensed capacity of 72" line was removed: no source
                  on the current site or in the scope of work supports it. */}
              <p className="text-[14px] text-ink-muted">
                Three age-grouped rooms · ages 2 to 6
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <PaperEdge fill="#F7EDE2" className="relative -mb-px" />
    </section>
  );
}
