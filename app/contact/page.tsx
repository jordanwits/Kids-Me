import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PaperEdge } from "@/components/Decor";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Kids & Me Preschool, Redding CA",
  description:
    "Kids & Me Preschool, 3695 Churn Creek Road, Redding CA 96002. Call (530) 215-1033. Open Monday to Friday, 7:00 a.m. to 5:30 p.m. Visit any weekday, no appointment needed.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Churn Creek Road, and the door is"
        crayon="open."
        blurb="Call, email, or simply turn up. Parents are welcome at Kids & Me at any time during normal operating hours, with no advance notification."
        edge="#F7EDE2"
      />

      <section className="bg-cream-deep pt-16 sm:pt-20">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
            {/* ---------- details ---------- */}
            <Reveal>
              <div className="flex h-full flex-col gap-5">
                <div className="rounded-[34px] border border-sand/40 bg-shell p-7 sm:p-8">
                  <h2 className="font-display text-[24px] font-semibold leading-tight text-ink">
                    {site.name}
                  </h2>

                  <dl className="mt-6 space-y-6">
                    <div className="flex gap-4">
                      <dt className="sr-only">Address</dt>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-coral-soft text-coral-deep">
                        <PinIcon className="h-5 w-5" />
                      </span>
                      <dd>
                        <a
                          href={site.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-display text-[17px] font-medium leading-snug text-ink transition-colors hover:text-coral-deep"
                        >
                          {site.address.street}
                          <br />
                          {site.address.city}, {site.address.state}{" "}
                          {site.address.zip}
                        </a>
                        <p className="mt-1 text-[13.5px] text-ink-muted">
                          Open in Google Maps
                        </p>
                      </dd>
                    </div>

                    <div className="flex gap-4">
                      <dt className="sr-only">Phone</dt>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal-deep">
                        <PhoneIcon className="h-5 w-5" />
                      </span>
                      <dd className="space-y-1.5">
                        <a
                          href={site.phone.href}
                          className="block font-display text-[20px] font-medium leading-none text-ink transition-colors hover:text-coral-deep"
                        >
                          {site.phone.label}
                          <span className="ml-2 align-middle text-[12.5px] font-normal text-ink-muted">
                            {site.phone.note}
                          </span>
                        </a>
                        <a
                          href={site.phoneAlt.href}
                          className="block text-[15px] text-ink-muted transition-colors hover:text-coral-deep"
                        >
                          {site.phoneAlt.label}
                          <span className="ml-2 text-[12.5px] text-ink-muted/75">
                            {site.phoneAlt.note}
                          </span>
                        </a>
                      </dd>
                    </div>

                    <div className="flex gap-4">
                      <dt className="sr-only">Email</dt>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-coral-deep">
                        <MailIcon className="h-5 w-5" />
                      </span>
                      <dd>
                        <a
                          href={site.email.href}
                          className="break-all font-display text-[16.5px] font-medium text-ink transition-colors hover:text-coral-deep"
                        >
                          {site.email.label}
                        </a>
                      </dd>
                    </div>

                    <div className="flex gap-4">
                      <dt className="sr-only">Hours</dt>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mauve-soft text-slate-deep">
                        <ClockIcon className="h-5 w-5" />
                      </span>
                      <dd>
                        <p className="font-display text-[16.5px] font-medium text-ink">
                          {site.hours}
                        </p>
                        <p className="mt-1 text-[13.5px] text-ink-muted">
                          Drop in any weekday, no appointment needed
                        </p>
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-7 border-t border-sand/40 pt-5 text-[13px] leading-relaxed text-ink-muted">
                    California state license #{site.license} · Serving Redding
                    since {site.established}
                  </p>
                </div>

                <div className="rounded-[34px] bg-coral p-7 sm:p-8">
                  <p className="font-hand text-[24px] leading-none text-ink/70">
                    Ready when you are
                  </p>
                  <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-ink">
                    Enroll or book a tour
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[15.5px] leading-[1.6] text-ink/80">
                    Registration is $100 per family, one time, and covers every
                    child you enroll.
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                    <Link
                      href="/enrollment#form"
                      className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 font-display text-[15.5px] font-medium text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-deep"
                    >
                      Start registration
                    </Link>
                    <Link
                      href="/enrollment#rates"
                      className="inline-flex items-center justify-center rounded-full border-2 border-ink/35 px-6 py-3.5 font-display text-[15.5px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink"
                    >
                      See our rates
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ---------- map + photo ---------- */}
            <Reveal delay={100}>
              <div className="flex h-full flex-col gap-5">
                <div className="overflow-hidden rounded-[34px] border border-sand/40 bg-shell shadow-[0_28px_56px_-34px_rgba(51,58,69,.55)]">
                  <iframe
                    src={site.mapEmbedUrl}
                    title={`Map to ${site.name}, ${site.address.full}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[380px] w-full border-0 sm:h-[440px]"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand/40 px-6 py-4">
                    <p className="text-[14px] text-ink-muted">
                      {site.address.full}
                    </p>
                    <a
                      href={site.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-sand px-3.5 py-1.5 text-[13px] font-medium text-slate-deep transition-colors hover:border-slate-deep"
                    >
                      Get directions
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-3 w-3"
                        aria-hidden
                      >
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
                </div>

                <div className="relative flex-1 overflow-hidden rounded-[34px]">
                  <Image
                    src="/images/home-redding-preschools.jpg"
                    alt="Kids &amp; Me Preschool on Churn Creek Road"
                    width={900}
                    height={500}
                    sizes="(max-width: 1024px) 92vw, 640px"
                    className="h-full min-h-[200px] w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <PaperEdge fill="#FDF7F0" className="relative -mb-px mt-16" />
      </section>

      {/* ---- careers, so the old "Work Opportunities" link has a home ---- */}
      <section className="bg-cream py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-[720px] px-5 text-center">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.2rem)] font-semibold leading-tight text-ink text-balance">
              Interested in working here?
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
              We are always glad to hear from qualified early childhood
              teachers. There is more about the team on the staff page.
            </p>
            <Link
              href="/staff"
              className="mt-7 inline-flex items-center justify-center rounded-full border-2 border-slate/40 px-8 py-3.5 font-display text-[16px] font-medium text-slate-deep transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-deep"
            >
              Meet our teachers &amp; staff
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ---------- icons ---------- */

const s = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function PinIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...s} aria-hidden {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function PhoneIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...s} aria-hidden {...p}>
      <path d="M6.3 3.6h3l1.5 3.8-1.9 1.2a11 11 0 0 0 5.5 5.5l1.2-1.9 3.8 1.5v3a1.7 1.7 0 0 1-1.9 1.7A16.6 16.6 0 0 1 4.6 5.5a1.7 1.7 0 0 1 1.7-1.9Z" />
    </svg>
  );
}

function MailIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...s} aria-hidden {...p}>
      <rect x="3" y="5.2" width="18" height="13.6" rx="2.4" />
      <path d="m3.8 7 7.1 5.2a2 2 0 0 0 2.2 0L20.2 7" />
    </svg>
  );
}

function ClockIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...s} aria-hidden {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3 1.9" />
    </svg>
  );
}
