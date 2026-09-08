import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ConfettiDots, PaperEdge, featureIcons } from "@/components/Decor";
import { activities, goodToKnow, offerings } from "@/lib/content";
import { site, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Kids & Me Preschool, Redding CA",
  description:
    "A licensed preschool and daycare serving Redding, California since 1978. Ages 2 to 6, three age-grouped classrooms, nutritious meals included, and an open door during all operating hours.",
};

const whyFeatures = [
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

const tape: Record<string, string> = {
  coral: "bg-coral",
  teal: "bg-teal",
  gold: "bg-gold",
  mauve: "bg-mauve",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A place where your child is known, not just"
        crayon="watched."
        blurb="Kids & Me is a licensed day care center serving the Redding, California community. Established in 1978, we have been caring for and educating young children here ever since."
        edge="#FDF7F0"
      />

      {/* ================= Our story ================= */}
      <section className="bg-cream pb-20 pt-4 sm:pb-24">
        <div className="mx-auto grid max-w-[1240px] items-start gap-14 px-5 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-[520px]">
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

          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-ink text-balance">
                Preschool and toddler programs for ages two to six.
              </h2>
              <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-ink-muted text-pretty">
                Kids &amp; Me Preschool is a place where the social, emotional
                and intellectual needs of your child are addressed under the
                guidance of our nurturing staff members. It is our goal to
                provide an attentive setting that is fun and safe for your
                child.
              </p>
              <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.75] text-ink-muted text-pretty">
                Our school is operated by a team of committed teachers who work
                together to create a stimulating and comforting environment,
                where children can feel safe and happy.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {offerings.map((o, i) => (
                  <li key={o} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className={`mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full ${
                        [
                          "bg-coral",
                          "bg-teal",
                          "bg-gold",
                          "bg-mauve",
                          "bg-sand",
                        ][i % 5]
                      }`}
                    />
                    <span className="text-[15.5px] leading-snug text-ink">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-sand/45 pt-8 sm:grid-cols-3">
                {[
                  { k: "Since 1978", v: "caring for Redding children" },
                  { k: site.hours.replace("Monday – Friday, ", ""), v: "Monday through Friday" },
                  { k: `#${site.license}`, v: "California state license" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="font-display text-[19px] font-semibold leading-tight text-teal-deep">
                      {s.k}
                    </dt>
                    <dd className="mt-1.5 text-[13.5px] leading-snug text-ink-muted">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Why choose us ================= */}
      <section id="why" className="relative scroll-mt-24 overflow-hidden bg-cream-deep py-20 sm:py-24">
        <Image
          src="/HandGraphic.png"
          alt=""
          width={38}
          height={34}
          aria-hidden
          className="anim-drift pointer-events-none absolute -right-10 top-16 h-auto w-64 opacity-[0.1]"
        />

        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Why choose us
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
                Your children are <span className="crayon">worth it.</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-[16.5px] leading-[1.75] text-ink-muted text-pretty">
                The most important investment we can make in our children is the
                investment in their education. During their pre-kindergarten
                years, children develop characteristics which affect their
                life-long ability to learn.
              </p>
              <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.75] text-ink-muted text-pretty">
                Those who develop basic skills early, and find enjoyment in
                social interaction and learning right from the beginning, are
                much more likely to achieve success during their school years.
              </p>
              <Link
                href="/enrollment#tour"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-deep px-7 py-3.5 font-display text-[16px] font-medium text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink"
              >
                Book a visit
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {whyFeatures.map((f, i) => {
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

        {/* ---- what a program actually includes ---- */}
        <div className="mx-auto mt-16 max-w-[1240px] px-5">
          <Reveal>
            <div className="rounded-[34px] border border-sand/40 bg-shell p-7 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight text-ink text-balance">
                    What a week here actually includes.
                  </h3>
                  <p className="mt-4 max-w-[44ch] text-[15.5px] leading-[1.7] text-ink-muted text-pretty">
                    Our programs use spacious and well-equipped indoor and
                    outdoor facilities, and cover every part of a child&rsquo;s
                    developmental growth.
                  </p>

                  <div className="mt-7 space-y-3.5 border-t border-sand/40 pt-6">
                    <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Equally important
                    </p>
                    {[
                      "Safety and close supervision of the children",
                      "Ongoing communication with parents",
                      "Qualified, dedicated staff",
                      "Clean facilities",
                    ].map((item) => (
                      <p
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] leading-snug text-ink"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-coral"
                        />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <ul className="grid gap-2.5 sm:grid-cols-2 lg:content-start">
                  {activities.map((a, i) => (
                    <li
                      key={a}
                      className="flex items-center gap-3 rounded-2xl bg-cream-deep/60 px-4 py-3"
                    >
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 shrink-0 rounded-[3px] ${
                          [
                            "bg-coral",
                            "bg-teal",
                            "bg-gold",
                            "bg-mauve",
                            "bg-sand",
                            "bg-slate",
                          ][i % 6]
                        }`}
                      />
                      <span className="text-[14.5px] leading-snug text-ink">
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---- good to know ---- */}
        <div className="mx-auto mt-14 max-w-[1240px] px-5">
          <Reveal>
            <h3 className="text-center font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-tight text-ink text-balance">
              Good to know before you call.
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {goodToKnow.map((item, i) => (
              <Reveal key={item.q} delay={i * 80}>
                <div className="h-full rounded-[26px] border border-sand/40 bg-shell p-6">
                  <p className="font-display text-[16.5px] font-medium leading-snug text-ink">
                    {item.q}
                  </p>
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-ink-muted text-pretty">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <PaperEdge fill="#FDF7F0" className="relative -mb-px mt-20" />
      </section>

      {/* ================= Applause ================= */}
      <section id="applause" className="scroll-mt-24 bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <Reveal className="mx-auto max-w-[620px] text-center">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Applause
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              What Redding parents say.
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              In their own words, unedited, from families who have had children
              in these rooms.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-7">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 90}>
                <figure className="sticker relative flex h-full flex-col rounded-[30px] bg-shell p-7 sm:p-8">
                  <span
                    aria-hidden
                    className={`absolute -top-3 left-10 h-6 w-24 -rotate-2 rounded-sm ${tape[t.accent]} opacity-85`}
                  />
                  <svg
                    viewBox="0 0 40 30"
                    aria-hidden
                    className="h-7 w-9 text-sand"
                    fill="currentColor"
                  >
                    <path d="M0 30V17.4C0 7.9 5.2 1.6 15.3 0l1.9 5.2c-5.6 1.5-8.4 4.6-8.4 9.3h7.6V30H0Zm22.8 0V17.4C22.8 7.9 28 1.6 38.1 0L40 5.2c-5.6 1.5-8.4 4.6-8.4 9.3h7.6V30H22.8Z" />
                  </svg>
                  <blockquote className="mt-4 flex-1 text-[15.5px] leading-[1.72] text-ink text-pretty">
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

          <Reveal delay={120}>
            <div className="mx-auto mt-14 max-w-[640px] text-center">
              <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.2rem)] font-semibold leading-tight text-ink text-balance">
                Come see whether they were right.
              </h3>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/enrollment#form"
                  className="inline-flex w-full items-center justify-center rounded-full bg-coral px-8 py-4 font-display text-[17px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white sm:w-auto"
                >
                  Start your registration
                </Link>
                <Link
                  href="/staff"
                  className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate/40 px-8 py-4 font-display text-[17px] font-medium text-slate-deep transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-deep sm:w-auto"
                >
                  Meet the teachers
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
