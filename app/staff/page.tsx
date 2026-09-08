import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PaperEdge } from "@/components/Decor";
import { staff } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Teachers & Staff | Kids & Me Preschool, Redding CA",
  description:
    "Meet the qualified, experienced teachers and staff at Kids & Me Preschool in Redding, California — the people who would be with your child every day.",
};

const accent: Record<string, { fill: string; soft: string; text: string }> = {
  coral: { fill: "bg-coral", soft: "bg-coral-soft", text: "text-coral-deep" },
  teal: { fill: "bg-teal", soft: "bg-teal-soft", text: "text-teal-deep" },
  gold: { fill: "bg-gold", soft: "bg-gold-soft", text: "text-coral-deep" },
  mauve: { fill: "bg-mauve", soft: "bg-mauve-soft", text: "text-slate-deep" },
};

export default function StaffPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Teachers & Staff"
        title="The people who would be with your child"
        crayon="every day."
        blurb="Our highly trained and experienced teachers provide a caring, supportive and enjoyable environment, which fosters the physical, mental, emotional and social development of each child. Many of them have been here for years."
        edge="#F7EDE2"
      />

      <section className="bg-cream-deep py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {staff.map((person, i) => {
              const a = accent[person.accent];
              const named = Boolean(person.name);
              return (
                <Reveal key={`${person.role}-${i}`} delay={i * 70}>
                  <article className="sticker flex h-full flex-col overflow-hidden rounded-[32px] bg-shell">
                    {/* ---- portrait ---- */}
                    <div
                      className={`relative flex aspect-[4/3.4] items-center justify-center ${a.soft}`}
                    >
                      {/* TODO(client): drop the supplied headshot in here. Until
                          then this is a deliberate placeholder, not a broken image. */}
                      <Image
                        src="/HandGraphic.png"
                        alt=""
                        width={38}
                        height={34}
                        aria-hidden
                        className="absolute bottom-3 right-3 h-auto w-14 opacity-20"
                      />
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        aria-hidden
                        className={`h-20 w-20 ${a.text} opacity-45`}
                      >
                        <circle
                          cx="32"
                          cy="23"
                          r="12"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M11 57c0-11.6 9.4-21 21-21s21 9.4 21 21"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span
                        className={`absolute left-4 top-4 rounded-full ${a.fill} px-3 py-1 font-display text-[12px] font-medium text-ink shadow-sm`}
                      >
                        {person.role}
                      </span>
                    </div>

                    {/* ---- identity ---- */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      {named ? (
                        <h2 className="font-display text-[22px] font-semibold leading-tight text-ink">
                          {person.name}
                        </h2>
                      ) : (
                        <h2 className="font-display text-[22px] font-semibold leading-tight text-ink-muted/70">
                          Name &amp; photo to come
                        </h2>
                      )}

                      {person.room && (
                        <p className="mt-1.5 text-[13.5px] font-medium text-ink-muted">
                          {person.room}
                        </p>
                      )}

                      <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-ink-muted text-pretty">
                        {person.bio ?? (
                          <span className="italic text-ink-muted/70">
                            A short bio for this member of the team will appear
                            here once the school supplies it.
                          </span>
                        )}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* ---- honest note about the state of this page ---- */}
          <Reveal delay={140}>
            <div className="mx-auto mt-12 flex max-w-[860px] flex-col items-center gap-5 rounded-[28px] border border-sand/50 bg-shell px-7 py-6 text-center sm:flex-row sm:text-left">
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
              <p className="flex-1 text-[15px] leading-[1.65] text-ink-muted">
                This page is built and waiting on content. Headshots and a
                sentence or two per person are all it needs — send them over and
                every card fills in. Roles and rooms can change too; nothing
                here is fixed.
              </p>
            </div>
          </Reveal>
        </div>

        <PaperEdge fill="#FDF7F0" className="relative -mb-px mt-20" />
      </section>

      {/* ================= Join our team ================= */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[36px] shadow-[0_36px_70px_-40px_rgba(51,58,69,.6)]">
                <Image
                  src="/images/gallery-playground-redding-preschools-04.jpg"
                  alt="The playground at Kids &amp; Me Preschool"
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="font-hand text-[26px] leading-none text-coral-deep">
                Work with us
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,2.7rem)] font-semibold leading-[1.06] tracking-[-0.015em] text-ink text-balance">
                Thinking about teaching here?
              </h2>
              <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.75] text-ink-muted text-pretty">
                We are always glad to hear from qualified, experienced early
                childhood teachers, whether or not a position is posted. Call
                the office or send an email and tell us a little about yourself.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.email.href}
                  className="inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 font-display text-[16px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
                >
                  Email the director
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex items-center justify-center rounded-full border-2 border-slate/40 px-7 py-3.5 font-display text-[16px] font-medium text-slate-deep transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-deep"
                >
                  Call {site.phone.label}
                </a>
              </div>

              <p className="mt-6 text-[14px] text-ink-muted">
                Prefer to look around first?{" "}
                <Link
                  href="/gallery"
                  className="font-medium text-coral-deep underline decoration-coral/40 underline-offset-4 transition-colors hover:decoration-coral"
                >
                  See the rooms and grounds
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
