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
      {/* Punched holes: the cheapest mark that says "this is hung up".
          Kept as a row ABOVE the board so each one pokes up past the top edge
          — inside the board they would be clipped by its overflow-hidden.
          Mirroring the board's own grid (and its 1px gap) is what centres each
          hole on its season column instead of spacing them arbitrarily; the
          extras drop out as the grid collapses 4 -> 2 -> 1, so there is always
          exactly one hole per column in the top row. The mx-px offsets the
          board's 1px border, without which the outer holes sit a pixel off. */}
      <div
        aria-hidden
        className="relative z-10 -mb-2.5 mx-px grid gap-px sm:grid-cols-2 xl:grid-cols-4"
      >
        {monthlyThemes.map((season, i) => (
          <span
            key={season.season}
            className={`justify-center ${
              i === 0 ? "flex" : i === 1 ? "hidden sm:flex" : "hidden xl:flex"
            }`}
          >
            <span className="h-[15px] w-[15px] rounded-full bg-cream shadow-[inset_0_1.5px_2.5px_rgba(51,58,69,.35),0_0_0_1px_rgba(198,176,156,.5)]" />
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-[28px] border border-sand/45 bg-shell shadow-[0_22px_44px_-30px_rgba(51,58,69,.55)]">
        <div className="grid gap-px bg-sand/40 sm:grid-cols-2 xl:grid-cols-4">
          {monthlyThemes.map((season) => (
            <div key={season.season} className="flex flex-col bg-shell">
              {/* Season strip — ink on every brand fill, never white. */}
              <div
                className={`flex items-center gap-2.5 px-4 py-3.5 sm:px-[clamp(.9rem,1.3vw,1.15rem)] ${
                  seasonFill[season.accent]
                }`}
              >
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
