"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ConfettiDots } from "./Decor";

const dotColors = ["bg-coral", "bg-teal", "bg-gold", "bg-mauve", "bg-sand"];

/** "/about#why" -> "/about", so a hash link still lights up its parent. */
const routeOf = (href: string) => href.split("#")[0] || "/";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Any route change closes whatever is open.
  useEffect(() => {
    setDrawer(false);
    setOpenMenu(null);
  }, [pathname]);

  /* An item is current when you are on its own route or on one of its
     children's routes — so "About Us" stays lit while you are on /staff. */
  const isCurrent = (href: string, children?: readonly { href: string }[]) => {
    const routes = [routeOf(href), ...(children ?? []).map((c) => routeOf(c.href))];
    /* "/" has to match exactly — every path starts with it, so a prefix test
       would light up Home on every page. Everything else matches by prefix so
       a child route (e.g. /staff under About Us) still lights its parent. */
    return routes.some((r) =>
      r === "/" ? pathname === "/" : pathname.startsWith(r),
    );
  };

  return (
    <>
      {/* ---------- Utility strip: phone + email on every page ---------- */}
      {/* id="top" so the footer's "Back to top" link resolves on every route. */}
      <div id="top" className="bg-slate-deep text-cream/85">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-2 text-[12.5px] tracking-wide sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a
              href={site.phone.href}
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <PhoneIcon className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="font-medium">{site.phone.label}</span>
            </a>
            <a
              href={site.email.href}
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <MailIcon className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="font-medium">{site.email.label}</span>
            </a>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <span className="opacity-75">{site.hours}</span>
            <span aria-hidden className="h-3 w-px bg-cream/25" />
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="opacity-75 transition-opacity hover:opacity-100"
            >
              {site.address.street}, {site.address.city}
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Main navigation ---------- */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-shell/92 shadow-[0_10px_30px_-24px_rgba(51,58,69,.7)] backdrop-blur-md"
            : "bg-cream"
        }`}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 transition-all duration-300 ${
            scrolled ? "py-2" : "py-3.5"
          }`}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <Link href="/" className="relative flex shrink-0 items-center">
            <Image
              src="/kids-me-logo.png"
              alt="Kids &amp; Me Preschool"
              width={900}
              height={854}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-12 sm:h-14" : "h-16 sm:h-[72px]"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => {
              const isOpen = openMenu === item.label;
              const current = isCurrent(item.href, item.children);
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    aria-haspopup={item.children ? "true" : undefined}
                    aria-expanded={item.children ? isOpen : undefined}
                    aria-current={current ? "page" : undefined}
                    className={`group relative flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[14.5px] font-medium transition-colors ${
                      isOpen || current
                        ? "text-coral-deep"
                        : "text-ink hover:text-coral-deep"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronIcon
                        className={`h-3 w-3 opacity-60 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-[3px] origin-left rounded-full bg-gold transition-transform duration-300 ${
                        isOpen || current
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>

                  {item.children && (
                    <div
                      className={`absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-[22px] border border-sand/35 bg-shell p-2 shadow-[0_28px_60px_-30px_rgba(51,58,69,.55)]">
                        {item.children.map((child, i) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className="group/item flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-cream-deep/70"
                          >
                            <span
                              aria-hidden
                              className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${
                                dotColors[i % dotColors.length]
                              } transition-transform duration-200 group-hover/item:scale-150`}
                            />
                            <span className="min-w-0">
                              <span className="block font-display text-[15px] font-medium leading-tight text-ink">
                                {child.label}
                              </span>
                              {child.blurb && (
                                <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">
                                  {child.blurb}
                                </span>
                              )}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <Link
              href="/enrollment#form"
              className="group relative hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 font-display text-[15px] font-medium text-ink shadow-[0_10px_22px_-12px_rgba(217,123,87,.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white sm:inline-flex"
            >
              Enroll Now
              <ConfettiDots className="pointer-events-none absolute -right-2 -top-3 h-5 w-9 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand/50 bg-shell text-ink transition-colors hover:bg-cream-deep xl:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      <div
        className={`fixed inset-0 z-[70] xl:hidden ${drawer ? "" : "pointer-events-none"}`}
        aria-hidden={!drawer}
      >
        <div
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-300 ${
            drawer ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute right-0 top-0 flex h-full w-[min(88vw,400px)] flex-col bg-cream shadow-2xl transition-transform duration-350 ease-[cubic-bezier(.22,1,.36,1)] ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand/35 px-5 py-4">
            <Image
              src="/kids-me-logo.png"
              alt=""
              width={900}
              height={854}
              className="h-14 w-auto"
            />
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand/50 text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {nav.map((item) => {
                const expanded = openAccordion === item.label;
                return (
                  <li key={item.label} className="border-b border-sand/25 last:border-0">
                    {item.children ? (
                      <>
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            onClick={() => setDrawer(false)}
                            className="flex-1 px-2 py-3.5 font-display text-lg font-medium text-ink"
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenAccordion(expanded ? null : item.label)
                            }
                            aria-expanded={expanded}
                            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted"
                          >
                            <ChevronIcon
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                expanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                        <div
                          className={`grid transition-all duration-300 ${
                            expanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="space-y-0.5 pb-3 pl-3">
                              {item.children.map((child, i) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setDrawer(false)}
                                    className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-[15px] text-ink-muted"
                                  >
                                    <span
                                      aria-hidden
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        dotColors[i % dotColors.length]
                                      }`}
                                    />
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setDrawer(false)}
                        className="block px-2 py-3.5 font-display text-lg font-medium text-ink"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-2.5">
              <Link
                href="/enrollment#form"
                onClick={() => setDrawer(false)}
                className="block rounded-full bg-coral px-5 py-3.5 text-center font-display text-base font-medium text-ink"
              >
                Register Online
              </Link>
              <Link
                href="/enrollment#tour"
                onClick={() => setDrawer(false)}
                className="block rounded-full border-2 border-slate/45 px-5 py-3.5 text-center font-display text-base font-medium text-slate-deep"
              >
                Request a Tour
              </Link>
            </div>

            <div className="mt-6 rounded-3xl bg-cream-deep p-5 text-sm">
              <p className="font-display text-base font-medium text-ink">
                Questions? Just call.
              </p>
              <a
                href={site.phone.href}
                className="mt-2 block font-display text-xl text-coral-deep"
              >
                {site.phone.label}
              </a>
              <a href={site.email.href} className="mt-1 block break-all text-ink-muted">
                {site.email.label}
              </a>
              <p className="mt-3 text-ink-muted">{site.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- inline icons ---------- */

function ChevronIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path
        d="M6.3 3.6h3l1.5 3.8-1.9 1.2a11 11 0 0 0 5.5 5.5l1.2-1.9 3.8 1.5v3a1.7 1.7 0 0 1-1.9 1.7A16.6 16.6 0 0 1 4.6 5.5a1.7 1.7 0 0 1 1.7-1.9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <rect
        x="3"
        y="5.2"
        width="18"
        height="13.6"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m3.8 7 7.1 5.2a2 2 0 0 0 2.2 0L20.2 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
