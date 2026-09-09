import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Applause from "@/components/Applause";
import { PaperEdge, Wave, featureIcons } from "@/components/Decor";
import { activities, goodToKnow, offerings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us | Kids & Me Preschool, Redding CA",
  description:
    "A licensed preschool and daycare serving Redding, California since 1978. Ages 2 to 6, three age-grouped classrooms, nutritious meals included, and an open door during all operating hours.",
};

/* The six reasons, shared with the home page's Why Us tiles. Here they are
   rows on the slate band rather than cards: same copy, no box per idea. */
const whyFeatures = [
  {
    icon: featureIcons.shield,
    title: "Safety, always first",
    body: "Close supervision, secure grounds, and a clean facility designed around small children.",
    tint: "text-coral",
  },
  {
    icon: featureIcons.heart,
    title: "Teachers who stay",
    body: "Qualified, experienced staff who know your child's name, moods and milestones.",
    tint: "text-teal",
  },
  {
    icon: featureIcons.apple,
    title: "Meals included",
    body: "Nutritious hot lunches and snacks every day. No packing a cooler at 6 a.m.",
    tint: "text-gold",
  },
  {
    icon: featureIcons.tree,
    title: "A shady playground",
    body: "A spacious, park-like outdoor area with mature oaks. Rare, and worth seeing.",
    tint: "text-teal",
  },
  {
    icon: featureIcons.house,
    title: "Two-story playhouse",
    body: "A full indoor play room built around a two-story wooden playhouse. Rainy days sorted.",
    tint: "text-mauve",
  },
  {
    icon: featureIcons.chat,
    title: "We keep you posted",
    body: "Ongoing communication with parents, and an open door during all operating hours.",
    tint: "text-gold",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A place where your child is known, not just"
        crayon="watched."
        blurb="Kids & Me is a licensed day care center serving the Redding, California community. Established in 1978, we have been caring for and educating young children here ever since."
        edge="#FDF7F0"
        media={
          <div
            className="anim-rise relative mx-auto w-full max-w-[520px]"
            style={{ animationDelay: "220ms" }}
          >
            <div className="relative aspect-[4/4.3]">
              <div className="blob-c absolute inset-x-0 top-0 h-[68%] overflow-hidden shadow-[0_36px_70px_-40px_rgba(51,58,69,.6)]">
                <Image
                  src="/images/gallery-classroom-redding-preschools-01.jpg"
                  alt="Circle time in a Kids &amp; Me classroom"
                  fill
                  sizes="(max-width: 1024px) 90vw, 520px"
                  priority
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
            </div>
          </div>
        }
      />

      {/* ================= Our story ================= */}
      <section className="bg-cream pb-20 pt-6 sm:pb-24">
        <div className="mx-auto grid max-w-[1240px] items-start gap-12 px-5 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Our story
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-ink text-balance">
                Preschool and toddler programs for ages two to six.
              </h2>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.75] text-ink-muted text-pretty">
                Kids &amp; Me Preschool is a place where the social, emotional
                and intellectual needs of your child are addressed under the
                guidance of our nurturing staff members. It is our goal to
                provide an attentive setting that is fun and safe for your
                child.
              </p>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.75] text-ink-muted text-pretty">
                Our school is operated by a team of committed teachers who work
                together to create a stimulating and comforting environment,
                where children can feel safe and happy.
              </p>

              <Link
                href="/programs"
                className="group mt-8 inline-flex items-center gap-2 font-display text-[16px] font-medium text-teal-deep transition-colors hover:text-ink"
              >
                See the Classrooms
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
            </Reveal>
          </div>

          {/* What the school offers, as a spec sheet rather than a dotted
              grid — the same hairline language the curriculum on /programs
              and the questions further down this page use. */}
          <Reveal delay={100}>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              What Kids &amp; Me offers
            </p>
            <ul className="mt-5 divide-y divide-sand/45 border-y border-sand/45">
              {offerings.map((o, i) => (
                <li key={o} className="flex items-start gap-3.5 py-4">
                  <span
                    aria-hidden
                    className={`mt-[7px] h-2 w-2 shrink-0 -rotate-[8deg] rounded-[2px] ${
                      ["bg-coral", "bg-teal", "bg-gold", "bg-mauve", "bg-sand"][
                        i % 5
                      ]
                    }`}
                  />
                  <span className="text-[16px] leading-[1.5] text-ink">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ================= Why choose us ================= */}
      {/* The page's one dark band, the way /programs and /enrollment each have
          one. The six reasons are hairline rows here, not six cards. */}
      <section id="why" className="relative scroll-mt-24 bg-cream">
        <Wave fill="#4A5567" className="relative -mb-px" />

        <div className="relative overflow-hidden bg-slate-deep pt-16 sm:pt-20">
          <Image
            src="/HandGraphic.png"
            alt=""
            width={38}
            height={34}
            aria-hidden
            className="anim-drift pointer-events-none absolute -right-10 top-10 h-auto w-64 opacity-[0.07]"
          />

          <div className="relative mx-auto max-w-[1240px] px-5 pb-16 sm:pb-20">
            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-cream/60">
                    Why choose us
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-cream text-balance">
                    Your children are{" "}
                    <span className="crayon crayon-coral">worth it.</span>
                  </h2>
                  <p className="mt-6 max-w-[44ch] text-[16.5px] leading-[1.75] text-cream/75 text-pretty">
                    The most important investment we can make in our children is
                    the investment in their education. During their
                    pre-kindergarten years, children develop characteristics
                    which affect their life-long ability to learn.
                  </p>
                  <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.75] text-cream/75 text-pretty">
                    Those who develop basic skills early, and find enjoyment in
                    social interaction and learning right from the beginning,
                    are much more likely to achieve success during their school
                    years.
                  </p>
                  <Link
                    href="/enrollment#tour"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 font-display text-[16px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
                  >
                    Book a visit
                  </Link>
                </Reveal>
              </div>

              <ul className="divide-y divide-cream/15 border-y border-cream/15">
                {whyFeatures.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <Reveal key={f.title} delay={i * 60} as="li">
                      <div className="grid grid-cols-[auto_1fr] gap-x-5 py-6 sm:py-7">
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cream/10 ${f.tint}`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="font-display text-[19px] font-medium leading-tight text-cream">
                            {f.title}
                          </h3>
                          <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.65] text-cream/70 text-pretty">
                            {f.body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Inside the slate band, not after it, so the wave reads as the
              transition out of the dark ground. */}
          <Wave fill="#F7EDE2" className="relative -mb-px" />
        </div>
      </section>

      {/* ================= A week here, and the questions ================= */}
      <section className="bg-cream-deep pt-16 sm:pt-20">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* The page is copy-heavy from here on, so this section carries a
                photo the way the join-the-team split on /staff does. */}
            <Reveal>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[36px] shadow-[0_36px_70px_-40px_rgba(51,58,69,.6)]">
                <Image
                  src="/images/gallery-playroom-redding-preschools-01.jpg"
                  alt="The indoor play room and its two-story playhouse at Kids &amp; Me Preschool"
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal delay={100}>
                <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  Inside a week
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,2.7rem)] font-semibold leading-[1.06] tracking-[-0.015em] text-ink text-balance">
                  What a week here actually includes.
                </h2>
                <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.75] text-ink-muted text-pretty">
                  Our programs use spacious and well-equipped indoor and outdoor
                  facilities, and cover every part of a child&rsquo;s
                  developmental growth.
                </p>
              </Reveal>

              <Reveal delay={160}>
                <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {activities.map((a, i) => (
                    <li key={a} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={`mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full ${
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
                      <span className="text-[15.5px] leading-snug text-ink">
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ---- good to know ---- */}
        <div className="mx-auto mt-20 max-w-[1240px] px-5">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Questions we get
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              Good to know before you call.
            </h2>
          </Reveal>
          {/* Question left, answer right, hairlines between — same spec-sheet
              language as the curriculum on /programs, rather than a 2x2 grid
              of identical boxes. One Reveal around the whole list keeps the
              dl > div > dt/dd nesting valid. */}
          <Reveal>
            <dl className="mx-auto mt-10 max-w-[940px] divide-y divide-sand/45 border-y border-sand/45">
              {goodToKnow.map((item) => (
                <div
                  key={item.q}
                  className="grid gap-x-10 gap-y-2 py-6 sm:grid-cols-[minmax(11rem,.9fr)_1.5fr] sm:py-7"
                >
                  <dt className="font-display text-[16px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink">
                    {item.q}
                  </dt>
                  <dd className="text-[15.5px] leading-[1.65] text-ink-muted text-pretty">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <PaperEdge fill="#FDF7F0" className="relative -mb-px mt-20" />
      </section>

      {/* ================= Applause ================= */}
      <section id="applause" className="scroll-mt-24 bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <p className="font-hand text-[26px] leading-none text-coral-deep">
              Applause
            </p>
            <h2 className="mt-2.5 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              What Redding parents say.
            </h2>
            <p className="mx-auto mt-5 max-w-[50ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              In their own words, unedited, from families who have had children
              in these rooms. Pick a name to read theirs.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <Applause />
          </Reveal>
        </div>
      </section>

      {/* ================= Closing ================= */}
      <section className="bg-cream py-20 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-[700px] px-5 text-center">
            <p className="font-hand text-[26px] leading-none text-coral-deep">
              The door is open
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-tight text-ink text-balance">
              Come and see a room in use.
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              Visit any weekday during operating hours. No appointment needed,
              and you are welcome to look at every room and meet the staff.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
      </section>
    </>
  );
}
