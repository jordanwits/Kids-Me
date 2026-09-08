import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_.9fr] lg:gap-10">
          {/* ---------- identity + contact ---------- */}
          <div>
            <span className="inline-flex rounded-[24px] bg-cream px-5 py-4">
              <Image
                src="/kids-me-logo.png"
                alt="Kids &amp; Me Preschool"
                width={900}
                height={854}
                className="h-24 w-auto"
              />
            </span>

            <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.7] text-cream/65">
              A licensed preschool and daycare serving Redding, California
              families since 1978.
            </p>

            <dl className="mt-7 space-y-3.5 text-[15px]">
              <div className="flex gap-3">
                <dt className="sr-only">Address</dt>
                <PinIcon className="mt-1 h-4 w-4 shrink-0 text-coral" />
                <dd>
                  <a
                    href={site.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </a>
                </dd>
              </div>

              <div className="flex gap-3">
                <dt className="sr-only">Phone</dt>
                <PhoneIcon className="mt-1 h-4 w-4 shrink-0 text-coral" />
                <dd className="space-y-0.5">
                  <a
                    href={site.phone.href}
                    className="block font-display text-[19px] font-medium text-cream transition-colors hover:text-gold"
                  >
                    {site.phone.label}
                    <span className="ml-2 align-middle text-[12px] font-normal text-cream/50">
                      {site.phone.note}
                    </span>
                  </a>
                  <a
                    href={site.phoneAlt.href}
                    className="block text-[14px] text-cream/70 transition-colors hover:text-gold"
                  >
                    {site.phoneAlt.label}
                    <span className="ml-2 text-[12px] text-cream/45">
                      {site.phoneAlt.note}
                    </span>
                  </a>
                </dd>
              </div>

              <div className="flex gap-3">
                <dt className="sr-only">Email</dt>
                <MailIcon className="mt-1 h-4 w-4 shrink-0 text-coral" />
                <dd>
                  <a
                    href={site.email.href}
                    className="break-all transition-colors hover:text-gold"
                  >
                    {site.email.label}
                  </a>
                </dd>
              </div>

              <div className="flex gap-3">
                <dt className="sr-only">Hours</dt>
                <ClockIcon className="mt-1 h-4 w-4 shrink-0 text-coral" />
                <dd>{site.hours}</dd>
              </div>
            </dl>
          </div>

          {/* ---------- sitemap ---------- */}
          <div className="grid grid-cols-2 gap-8">
            {/* Split after Programs, so Home rides above the two dropdown
                parents in column one and the shorter items stay in column two.
                Slicing at 2 would leave column one nearly empty. */}
            {[nav.slice(0, 3), nav.slice(3)].map((group, gi) => (
              <div key={gi} className="space-y-7">
                {group.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="font-display text-[15px] font-medium uppercase tracking-[0.1em] text-gold transition-colors hover:text-cream"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="mt-3 space-y-2">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              className="text-[14.5px] text-cream/70 transition-colors hover:text-cream"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ---------- enroll card ---------- */}
          <div>
            <div className="rounded-[28px] bg-cream/[0.07] p-6 ring-1 ring-cream/10">
              <p className="font-hand text-[24px] leading-none text-gold">
                Ready when you are
              </p>
              <h3 className="mt-2 font-display text-[21px] font-semibold leading-tight text-cream">
                Enroll or book a tour
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-cream/65">
                Registration is $100 per family, one time, and covers every
                child you enroll.
              </p>
              <Link
                href="/enrollment#form"
                className="mt-5 block rounded-full bg-coral py-3.5 text-center font-display text-[15.5px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold"
              >
                Start registration
              </Link>
              <Link
                href="/enrollment#rates"
                className="mt-2.5 block rounded-full border border-cream/25 py-3.5 text-center font-display text-[15.5px] font-medium text-cream transition-colors hover:border-cream/60"
              >
                See our rates
              </Link>
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-cream/50">
              State License #{site.license}
              <br />
              Licensed capacity 72 · Ages 2–6
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/12 pt-7 text-[13px] text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="#top" className="transition-colors hover:text-cream">
              Back to top
            </a>
            <span aria-hidden className="hidden h-3 w-px bg-cream/20 sm:block" />
            <span>Redding, California</span>
          </p>
        </div>
      </div>
    </footer>
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
