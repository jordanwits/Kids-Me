# Kids & Me Preschool — reddingpreschools.com redesign

Design build for the reddingpreschools.com redesign. Seven routes, matching the page
count in section 3.3 of the scope of work (the six existing pages, plus the new Staff
page) — but redistributed, so every nav item leads somewhere real.

## Run it

```bash
npm install
npm run dev
```

Deploys to Vercel with no configuration — Next.js App Router, fully static. All seven
routes prerender.

## Design direction

Warm, editorial, hand-made. The logo is soft and dusty rather than primary-colour
cartoon, so the pages follow it: cream paper grounds, organic photo masks, torn-paper
section edges, crayon underlines, and the logo's own five-finger handprint used as a
recurring motif. The intent is a boutique school that reads credible to parents while
still feeling like somewhere a four-year-old would want to be.

### Colour

Straight from the LogoTournament brand sheet, with derived tints and two neutrals
added so body copy clears WCAG AA on cream. Tokens live in `app/globals.css`.

| Token | Hex | Pantone | Role |
| --- | --- | --- | --- |
| `coral` | `#EE9B7E` | 486 C | Primary CTA, accents |
| `sand` | `#C6B09C` | 480 C | Borders, quiet marks |
| `slate` | `#738092` | 7544 C | Deepened to `slate-deep` for the rates band |
| `teal` | `#7BABAB` | 5493 C | Secondary accent, marquee |
| `mauve` | `#AA99AA` | 5215 C | Tertiary accent |
| `gold` | `#EBB75F` | 141 C | Highlights, crayon underline |
| `cream` / `cream-deep` | `#FDF7F0` / `#F7EDE2` | — | Page grounds |
| `ink` / `ink-muted` | `#333A45` / `#5E6979` | — | Text |

Coral buttons use dark ink text (5.3:1), not white (2.2:1) — it passes contrast and
looks better against the warm palette. The same rule governs the calendar's season
strips: ink on every brand fill, never white.

### Type

The brand sheet specifies **Rockford Sans Bold**, which has no web licence, so the
type system stands in with the closest free relatives:

- **Fredoka** — display/headings. Rounded geometric, closest to the logo lettering.
- **Outfit** — body and UI. Matches the "PRESCHOOL" wordmark.
- **Caveat** — hand annotations only, used sparingly.

If the client licences Rockford Sans for web, swap it into `app/layout.tsx` and point
`--font-display` at it.

## Sitemap

| Route | Holds | Replaces on the current site |
| --- | --- | --- |
| `/` | Teasers only, each linking on | Home |
| `/about` | Our Story, Why Choose Us, activities, policies, Applause | About Us + Why Choose Us + Applause |
| `/staff` | Teachers & staff, plus a careers block | *new, per scope 3.3* |
| `/programs` | Three classrooms, full curriculum, monthly themes, a typical day, special events | Curriculum + Monthly Themes |
| `/enrollment` | Published rates, the registration form, tours | *new — rates were never published* |
| `/gallery` | Four categories with filters and a lightbox | Gallery |
| `/contact` | Map, both numbers, hours, directions | Contact Us |

Three merges keep the count at seven while absorbing all eight existing pages: Why
Choose Us and Applause fold into `/about`, Monthly Themes into `/programs`. All are
**deviations from the page list in section 3.3 and want client sign-off**, even though
the total is unchanged. Permanent redirects for all six legacy URLs are in
`next.config.mjs`.

### Navigation

The rule that keeps the menu honest: **a dropdown child is never its parent's page
top.** That is why there is no "Our Story" under About Us — it *is* About Us. Every
child is a separate route or a real section further down the parent's page.

The comp's nav was 18 links pointing at 6 destinations, three of which promised
content that existed nowhere (Our Staff, Lunch & Snack Menu, Work Opportunities).
Staff is now a real page; Work Opportunities became blocks on `/staff` and `/contact`;
Lunch & Snack Menu is **deliberately absent** — the scope defers it to a page the
director adds later through the admin portal, so putting it in the nav now would be a
promise with nothing behind it.

## What the client asked for, and where it is

| Ask | Where |
| --- | --- |
| New logo, colour scheme, updated photos | Throughout; logo cropped to `public/kids-me-logo.png` |
| Registration form **on** the site, not just linked | `/enrollment#form` — the live Procare form, embedded and working |
| That CTA prominent on the home page | Hero buttons, sticky nav button, rate cards, closing band |
| Rates published | `/enrollment#rates` |
| Phone + email on every page | Utility strip above the nav, and again in the footer |
| Menu dedicated to Request a Tour and Registration | "Tuition & Enrollment" dropdown |
| A menu that drops down to multiple pages | About Us and Programs both do |
| New Staff page with photos and bios | `/staff` — built, awaiting content |

## Needs confirmation before launch

Marked `TODO(client)` in `lib/site.ts` and `lib/content.ts`:

1. **Daily rates are placeholders.** `$52` full day and `$38` half day are invented.
   The current About Us page has an "Our Prices & Rates" heading with *nothing under
   it* — no daily rate has ever been published, so there is nothing to inherit. Only
   the `$100` per-family registration fee is real. Placeholder rates render with a
   visible "Rate to be confirmed" chip on `/enrollment`; remove it with the real
   figures.
2. **Email address.** The live Contact page publishes
   `office.kidsandmeredding@gmail.com`; the scope stands up
   `director@reddingpreschools.com`. Both are in `lib/site.ts`. Confirm which is
   primary.
3. **Staff photos and bios.** `/staff` is designed and renders a deliberate
   awaiting-content state. "Teacher Pam" is the only name documented publicly (she is
   named in Tricia's testimonial).
4. **Photography** is pulled from the current site (2018 era) as a placeholder. The
   scope has the client supplying new images; drop them into `public/images/`.
5. **"Native Americans"** is the current site's own wording for a November theme.
   Worth asking whether the school wants to keep or update the phrasing.

Two claims from the original comp were **removed** rather than flagged, because no
source supports them: "licensed capacity of 72", and the hero's "47 years" (1978 to
2026 is 48, and a hardcoded count is how the current site ended up stuck on "over 33
years"). The hero now reads "Since 1978".

## Structure

```
app/
  layout.tsx        fonts, metadata, JSON-LD, header + footer
  page.tsx          home — teaser sections only
  globals.css       brand tokens, motifs, motion
  about/  staff/  programs/  enrollment/  gallery/  contact/
lib/
  site.ts           contact details, nav tree, rates, testimonials
  content.ts        curriculum, monthly themes, staff, daily rhythm, gallery
components/
  SiteHeader.tsx    utility strip, sticky nav w/ dropdowns + active state, drawer
  SiteFooter.tsx    contact block, sitemap, enrol card
  PageHero.tsx      masthead for every inner route
  ThemeCalendar.tsx monthly-themes wall calendar
  GalleryGrid.tsx   filterable gallery + lightbox
  Hero.tsx  Marquee.tsx  Welcome.tsx  Programs.tsx  WhyUs.tsx
  Tuition.tsx  EnrollCta.tsx  Testimonials.tsx  Gallery.tsx  CtaBand.tsx
  Decor.tsx         handprint, confetti, paper edges, waves, feature icons
  Reveal.tsx        scroll-in animation wrapper
```

The monthly-themes calendar is carried over from the Option 2 comp (`Kids-Me2`) at the
client's request, re-skinned into this design's paper language: a hung board with
punched holes, four season columns, twelve month pages, day initials and askew paper
pips. It collapses 4 → 2 → 1 columns.

Copy is an edit pass over the existing site's text, per the scope of work.

Reviews appear twice, at two lengths. The home page carries three short pull quotes;
`/about#applause` carries all four in full, **one at a time** — the parents are a
selectable list and only the chosen review is on screen, because two of the four run
past 800 characters and four simultaneous blocks was a wall of text. Both lengths come
from the same `testimonials` array in `lib/site.ts` (`short` and `quote`), verbatim
from the current Applause page.

The `specialEvents` list in `lib/content.ts` is **not currently rendered**. Its band
was removed from `/programs` because five of the six occasions already appear in the
monthly-themes calendar on that same page. Only "Summer Water Play" has no theme
equivalent, so the data is kept rather than deleted.
