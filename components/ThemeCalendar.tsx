import { monthlyThemes } from "@/lib/content";

/**
 * The monthly-themes wall calendar, carried over from the Option 2 comp
 * (Kids-Me2) and re-skinned into this design's paper/crayon language.
 *
 * Structure kept from Option 2 because it was the right idea: one board rather
 * than twelve cards, four season columns, and punched holes so it reads as
 * something actually hanging on a preschool wall. The hairlines between cells
 * are the 1px grid gap showing the sand background through, which means the
 * same rule holds at four, two or one column with no per-column border juggling.
 */

const seasonFill: Record<string, string> = {
  gold: "bg-gold",
  mauve: "bg-mauve",
  teal: "bg-teal",
  coral: "bg-coral",
};

/* Square, slightly askew — a paper sticker rather than a bullet. Cycled
   deterministically so the board has colour variety without 36 hand-set values. */
const pipFill = [
  "bg-coral",
  "bg-teal",
  "bg-gold",
  "bg-mauve",
  "bg-sand",
  "bg-slate",
];
const pipTilt = ["-rotate-[9deg]", "rotate-[7deg]", "-rotate-[4deg]"];

const dayInitials = ["S", "M", "T", "W", "T", "F", "S"];

export default function ThemeCalendar() {
  let pip = 0;

  return (
    <div>
      <div className="overflow-hidden rounded-[28px] border border-sand/45 bg-shell shadow-[0_22px_44px_-30px_rgba(51,58,69,.55)]">
        <div className="grid gap-px bg-sand/40 sm:grid-cols-2 xl:grid-cols-4">
          {monthlyThemes.map((season) => (
            <div key={season.season} className="flex flex-col bg-shell">
              {/* Season strip — ink on every brand fill, never white. */}
              <div
                className={`relative flex items-center gap-2.5 px-4 py-3.5 sm:px-[clamp(.9rem,1.3vw,1.15rem)] ${
                  seasonFill[season.accent]
                }`}
              >
                {/* Punched hole, one per season and centred in its own strip:
                    the cheapest mark that says "this is hung on a wall".
                    Positioned inside the strip rather than as a separate row
                    above the board, so it stays centred on its column at every
                    breakpoint as the grid collapses 4 -> 2 -> 1. */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-[inset_0_1.5px_2.5px_rgba(51,58,69,.4),0_1px_0_rgba(255,255,255,.3)]"
                />
                <span
                  aria-hidden
                  className="h-2 w-2 rotate-[-9deg] rounded-[2px] bg-ink/45"
                />
                <span className="font-display text-[11.5px] font-bold uppercase tracking-[0.15em] text-ink">
                  {season.season}
                </span>
              </div>

              {season.months.map((month, mi) => (
                <div
                  key={month.name}
                  className={`border-t border-sand/40 p-4 sm:p-[clamp(.95rem,1.4vw,1.3rem)] ${
                    mi === season.months.length - 1 ? "flex-1" : ""
                  }`}
                >
                  <h3 className="font-display text-[clamp(1.02rem,1.25vw,1.2rem)] font-semibold leading-[1.1] tracking-[-0.022em] text-ink">
                    {month.name}
                  </h3>

                  {/* Seven initials: says "calendar", not "list". */}
                  <div
                    aria-hidden
                    className="my-2.5 grid grid-cols-7 gap-0.5 text-center font-display text-[9px] font-bold tracking-[0.05em] text-ink-muted"
                  >
                    {dayInitials.map((d, di) => (
                      <span
                        key={di}
                        className={`rounded-[3px] py-0.5 ${
                          di === 0 || di === 6
                            ? "opacity-45"
                            : "bg-sand/25"
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <ul className="grid gap-1.5">
                    {month.themes.map((theme, ti) => {
                      const fill = pipFill[pip % pipFill.length];
                      pip += 1;
                      return (
                        <li
                          key={theme}
                          className="flex items-start gap-2.5 text-[13.5px] leading-[1.45] text-ink-muted"
                        >
                          <span
                            aria-hidden
                            className={`mt-[7px] h-2 w-2 shrink-0 rounded-[2px] ${fill} ${
                              pipTilt[ti % pipTilt.length]
                            }`}
                          />
                          {theme}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
