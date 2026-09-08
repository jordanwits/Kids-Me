import Image from "next/image";

const items = [
  "Play-based learning",
  "Hot lunches & snacks included",
  "Shady, park-like playground",
  "Two-story indoor playhouse",
  "Flexible scheduling, year round",
  "Teachers who stay for years",
  "Ages 2 through 6",
];

export default function Marquee() {
  return (
    <section
      aria-label="What we offer"
      className="marquee relative overflow-hidden bg-teal py-4"
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex items-center gap-10" aria-hidden={pass === 1}>
            {items.map((item) => (
              <span key={item} className="flex items-center gap-10">
                <span className="font-display text-[16px] font-medium tracking-wide text-cream sm:text-[18px]">
                  {item}
                </span>
                <Image
                  src="/HandGraphic.png"
                  alt=""
                  width={38}
                  height={34}
                  className="h-auto w-9 shrink-0"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
