import Image from "next/image";
import { site } from "@/lib/site";
import { ConfettiDots, PaperEdge } from "./Decor";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream pt-10 sm:pt-14 lg:pt-16">
      {/* ---- atmosphere ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* HandGraphic.png is 38x34, so heights are left auto to keep its
            natural aspect rather than stretching it to the old SVG's. */}
        <Image
          src="/HandGraphic.png"
          alt=""
          width={38}
          height={34}
          className="anim-drift absolute -left-16 top-1/3 h-auto w-56 opacity-[0.13]"
        />
        <Image
          src="/HandGraphic.png"
          alt=""
          width={38}
          height={34}
          className="anim-float absolute right-[6%] top-[8%] hidden h-auto w-14 opacity-40 lg:block"
          style={{ ["--tilt" as string]: "18deg" }}
        />
        <ConfettiDots className="absolute left-[46%] top-[10%] hidden h-14 w-24 opacity-70 lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-24 sm:pb-28 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:pb-36">
        {/* ---------- copy ---------- */}
        <div className="relative z-10 max-w-[640px]">
          <h1
            className="anim-rise mt-6 font-display text-[clamp(2.6rem,6.6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-ink text-balance"
            style={{ animationDelay: "160ms" }}
          >
            Come see the{" "}
            <span className="crayon text-coral-deep">happiest kids</span> in
            Redding.
          </h1>

          <p
            className="anim-rise mt-6 max-w-[52ch] text-[17px] leading-[1.7] text-ink-muted text-pretty sm:text-[18px]"
            style={{ animationDelay: "260ms" }}
          >
            Just one tour of the Preschool and you&rsquo;ll want to get your
            child enrolled! We invite you to look at the premises, our colorful
            and well kept playground, clean and organized classrooms, and meet
            our friendly, loving teachers and staff.
          </p>

          <div
            className="anim-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#enroll"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-coral px-8 py-4 font-display text-[17px] font-medium text-ink shadow-[0_16px_34px_-16px_rgba(217,123,87,1)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white hover:shadow-[0_22px_44px_-18px_rgba(217,123,87,1)]"
            >
              Start Your Registration
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
            </a>
            <a
              href="#enroll"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-slate/40 px-8 py-4 font-display text-[17px] font-medium text-slate-deep transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-deep hover:bg-shell"
            >
              Request a Tour
            </a>
          </div>

          <dl
            className="anim-rise mt-11 flex flex-wrap gap-x-8 gap-y-4 border-t border-sand/45 pt-7"
            style={{ animationDelay: "460ms" }}
          >
            {[
              { k: "47 years", v: "caring for Redding kids" },
              { k: "Ages 2–6", v: "three age-grouped classrooms" },
              { k: "7:00–5:30", v: "Monday through Friday" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-[22px] font-semibold leading-none text-teal-deep">
                  {s.k}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-tight text-ink-muted">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------- photo cluster ---------- */}
        <div className="relative z-0 mx-auto w-full max-w-[560px] lg:max-w-none">
          <div
            className="anim-rise relative aspect-[5/4.4]"
            style={{ animationDelay: "300ms" }}
          >
            {/* offset outline, like a crayon tracing around the photo */}
            <div
              aria-hidden
              className="blob-b absolute inset-0 translate-x-4 translate-y-5 border-[3px] border-dashed border-teal/55"
            />
            <div className="blob-b relative h-full w-full overflow-hidden shadow-[0_40px_80px_-42px_rgba(51,58,69,.65)]">
              <Image
                src="/images/gallery-playground-redding-preschools-11.jpg"
                alt="Children playing on the shaded playground at Kids &amp; Me Preschool"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover"
              />
            </div>

            {/* overlapping secondary photo */}
            <div
              className="anim-float absolute -bottom-10 -left-4 w-[46%] max-w-[230px] rotate-[-5deg] overflow-hidden rounded-[28px] border-[6px] border-shell shadow-[0_28px_50px_-26px_rgba(51,58,69,.7)] sm:-left-8"
              style={{ ["--tilt" as string]: "-5deg" }}
            >
              <Image
                src="/images/gallery-playroom-redding-preschools-01.jpg"
                alt="The two-story indoor playhouse in the Kids &amp; Me playroom"
                width={640}
                height={457}
                sizes="230px"
                className="h-full w-full object-cover"
              />
            </div>

            {/* floating badge */}
            <div className="absolute -right-2 top-6 max-w-[190px] rotate-[4deg] rounded-2xl bg-shell px-4 py-3 shadow-[0_20px_40px_-22px_rgba(51,58,69,.7)] sm:-right-6">
              <p className="font-hand text-[20px] leading-tight text-coral-deep">
                Drop in any weekday,
              </p>
              <p className="mt-0.5 font-display text-[13px] font-medium leading-tight text-ink">
                no appointment needed!
              </p>
            </div>

            {/* license chip */}
            <div className="absolute -bottom-3 right-2 hidden rounded-full border border-sand/50 bg-shell/95 px-4 py-2 backdrop-blur sm:right-6 sm:block">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.12em] text-ink-muted">
                State License #{site.license}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaperEdge fill="#7BABAB" className="relative -mb-px" />
    </section>
  );
}
