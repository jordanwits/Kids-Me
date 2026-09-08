import Image from "next/image";
import Link from "next/link";
import { ConfettiDots, PaperEdge } from "./Decor";

/**
 * Masthead for every inner route. Keeps the home page's paper/crayon language
 * (hand annotation, crayon underline, torn edge) at a smaller scale so the
 * inner pages read as the same site without competing with the home hero.
 */

export default function PageHero({
  eyebrow,
  title,
  crayon,
  blurb,
  edge = "#FDF7F0",
  children,
}: {
  eyebrow: string;
  /** Rendered before `crayon`. Keep it short — this is a page name, not a pitch. */
  title: string;
  /** Optional trailing word or phrase that gets the crayon underline. */
  crayon?: string;
  blurb?: string;
  /** Fill colour of the torn edge, matched to the next section's background. */
  edge?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream pt-10 sm:pt-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/HandGraphic.png"
          alt=""
          width={38}
          height={34}
          className="anim-drift absolute -right-12 top-4 h-auto w-52 opacity-[0.11]"
        />
        <ConfettiDots className="absolute left-[8%] top-8 hidden h-12 w-20 opacity-60 lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 pb-14 sm:pb-16 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[13px] text-ink-muted">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-coral-deep"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-sand">
              /
            </li>
            <li className="font-medium text-ink">{eyebrow}</li>
          </ol>
        </nav>

        <p className="font-hand text-[26px] leading-none text-coral-deep">
          {eyebrow}
        </p>
        <h1 className="anim-rise mt-2.5 max-w-[20ch] font-display text-[clamp(2.3rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink text-balance">
          {title}
          {crayon && (
            <>
              {" "}
              <span className="crayon crayon-coral">{crayon}</span>
            </>
          )}
        </h1>

        {blurb && (
          <p
            className="anim-rise mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-ink-muted text-pretty sm:text-[18px]"
            style={{ animationDelay: "140ms" }}
          >
            {blurb}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>

      <PaperEdge fill={edge} className="relative -mb-px" />
    </section>
  );
}
