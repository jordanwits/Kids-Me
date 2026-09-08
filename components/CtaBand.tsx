import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import Image from "next/image";
import { ConfettiDots, Wave } from "./Decor";

export default function CtaBand() {
  return (
    <section className="relative bg-cream">
      <Wave fill="#EE9B7E" className="relative -mb-px" />

      <div className="relative overflow-hidden bg-coral pt-16 sm:pt-20">
        <Image
          src="/HandGraphic.png"
          alt=""
          width={38}
          height={34}
          aria-hidden
          className="anim-drift pointer-events-none absolute -left-8 top-4 h-auto w-48 opacity-20 [filter:brightness(0)_invert(1)]"
        />
        <Image
          src="/HandGraphic.png"
          alt=""
          width={38}
          height={34}
          aria-hidden
          className="anim-float pointer-events-none absolute -right-6 bottom-0 h-auto w-52 opacity-20 [filter:brightness(0)_invert(1)]"
        />
        <ConfettiDots
          aria-hidden
          className="pointer-events-none absolute left-[22%] top-8 h-14 w-24 opacity-60"
        />

        <Reveal className="relative mx-auto max-w-[820px] px-5 text-center">
          <p className="font-hand text-[26px] leading-none text-ink/65">
            One visit is usually all it takes
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-ink text-balance">
            Just one tour, and you&apos;ll want your child enrolled.
          </h2>
          <p className="mx-auto mt-5 max-w-[50ch] text-[17px] leading-[1.7] text-ink/80 text-pretty">
            Visit us any time during normal operating hours. No appointment
            needed, and we look forward to meeting you.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/enrollment#form"
              className="inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-4 font-display text-[17px] font-medium text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-deep sm:w-auto"
            >
              Register your child
            </Link>
            <a
              href={site.phone.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink/35 px-8 py-4 font-display text-[17px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-shell/40 sm:w-auto"
            >
              Call {site.phone.label}
            </a>
          </div>
        </Reveal>

        <Wave fill="#333A45" className="relative -mb-px mt-16 sm:mt-20" />
      </div>
    </section>
  );
}
