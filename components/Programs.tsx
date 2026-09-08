import Image from "next/image";
import Reveal from "./Reveal";
import { PaperEdge } from "./Decor";

const programs = [
  {
    age: "Ages 2 & 3",
    name: "Toddler Room",
    photo: "/images/gallery-classroom-redding-preschools-02.jpg",
    alt: "Toddlers at work in the Kids & Me toddler classroom",
    blurb:
      "First school, first friendships. Colors and shapes, counting to ten, and a hands-on look at magnets, seasons, insects and plants.",
    points: [
      "Letters, vocabulary and name recognition",
      "Manners, sharing and taking turns",
      "Glue, paint, watercolor and chalk",
      "Fine motor work with play dough and puzzles",
    ],
    tint: "bg-teal",
    soft: "bg-teal-soft",
    text: "text-teal-deep",
  },
  {
    age: "Age 4",
    name: "Pre-K One",
    photo: "/images/gallery-classroom-redding-preschools-03.jpg",
    alt: "A Pre-K classroom at Kids & Me Preschool",
    blurb:
      "The year curiosity turns into skill. Numbers to twenty, patterns and matching, and big questions about weather, seeds, bubbles and the ocean.",
    points: [
      "The alphabet by name and by sound",
      "Phonics woven into daily circle time",
      "Correct pencil grip and writing their name",
      "Following directions and transitions",
    ],
    tint: "bg-gold",
    soft: "bg-gold-soft",
    text: "text-coral-deep",
  },
  {
    age: "Age 5",
    name: "Pre-K Two",
    photo: "/images/gallery-classroom-redding-preschools-05.jpg",
    alt: "Older preschoolers at Kids & Me Preschool",
    blurb:
      "Everything aims at kindergarten. Long and short vowels, consonant sounds, and the confidence to walk into a new school ready.",
    points: [
      "Upper and lowercase letters, all phonetic sounds",
      "Rhyming words and three-step directions",
      "Recognizing numbers to 20, counting to 50",
      "Kindergarten readiness assessments each May",
    ],
    tint: "bg-mauve",
    soft: "bg-mauve-soft",
    text: "text-slate-deep",
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="relative scroll-mt-24 bg-cream-deep pt-20 sm:pt-24 lg:pt-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 pb-16 lg:pb-20">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Our Classrooms
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
            Three rooms, grouped by age, so every day fits the child.
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
            Separating by age lets us pitch material at exactly the right level,
            which is how children stay inquisitive, creative and proud of what
            they can do.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3 md:gap-6 lg:gap-8">
          {programs.map((p, i) => (
            <Reveal key={p.name} delay={i * 110}>
              <article className="sticker group relative flex h-full flex-col overflow-hidden rounded-[34px] bg-shell transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_36px_60px_-30px_rgba(51,58,69,.45)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.photo}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full ${p.tint} px-3.5 py-1.5 font-display text-[13px] font-medium text-ink shadow-sm`}
                  >
                    {p.age}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[26px] font-semibold leading-tight text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.65] text-ink-muted text-pretty md:min-h-[7.4rem] lg:min-h-[5.4rem]">
                    {p.blurb}
                  </p>

                  <ul className={`mt-5 space-y-2.5 rounded-2xl ${p.soft} p-4`}>
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          className={`mt-[3px] h-3.5 w-3.5 shrink-0 ${p.text}`}
                        >
                          <path
                            d="m4 12.6 5.2 5.2L20 6.6"
                            stroke="currentColor"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[14px] leading-snug text-ink">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <a
                      href="#enroll"
                      className={`inline-flex items-center gap-2 font-display text-[15px] font-medium ${p.text} transition-colors hover:text-ink`}
                    >
                      Ask about availability
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path
                          d="M5 12h13m0 0-5.2-5.2M18 12l-5.2 5.2"
                          stroke="currentColor"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>

      <PaperEdge fill="#FDF7F0" className="relative -mb-px" />
    </section>
  );
}
