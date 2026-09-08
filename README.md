# Kids & Me Preschool — landing page design

Design concept for the reddingpreschools.com redesign. **This is the home page only** —
no other routes are scaffolded. Nav links point at on-page anchors so the whole concept
can be clicked through in one screen.

## Run it

```bash
npm install
npm run dev
```

Deploys to Vercel with no configuration — Next.js App Router, fully static.

## Design direction

Warm, editorial, hand-made. The logo is soft and dusty rather than primary-colour
cartoon, so the page follows it: cream paper grounds, organic photo masks, torn-paper
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
looks better against the warm palette.

### Type

The brand sheet specifies **Rockford Sans Bold**, which has no web licence, so the
type system stands in with the closest free relatives:

- **Fredoka** — display/headings. Rounded geometric, closest to the logo lettering.
- **Outfit** — body and UI. Matches the "PRESCHOOL" wordmark.
- **Caveat** — hand annotations only, used sparingly.

If the client licences Rockford Sans for web, swap it into `app/layout.tsx` and point
`--font-display` at it.

## What the client asked for, and where it is

| Ask | Where |
| --- | --- |
| New logo, colour scheme, updated photos | Throughout; logo cropped to `public/kids-me-logo.png` |
| Registration form **on** the site, not just linked | `#enroll` — the live Procare form is embedded in an iframe and works |
| That CTA prominent on the home page | Hero buttons, sticky nav button, `#enroll` section, footer card, closing band |
| Rates published | `#tuition` — dedicated rates band |
| Phone + email on every page | Utility strip above the nav, and again in the footer |
| Menu dedicated to Request a Tour and Registration | "Tours & Enrollment" dropdown |
| A menu that drops down to multiple pages | "About Us" → Our Story / Our Staff / Daily Schedule / Lunch & Snack Menu / Work Opportunities. "Programs" also drops down. |

## Needs confirmation before launch

These are marked `TODO(client)` in `lib/site.ts`:

1. **Daily rates are placeholders.** `$52` full day and `$38` half day are invented
   figures so the section can be designed. Only the `$100` per-family registration fee
   is real (it is published on the current About Us page). Brett needs to supply the
   actual daily rates.
2. **Email address.** Set to `director@reddingpreschools.com` per the scope of work.
   Business listings currently show `office.kidsandmeredding@gmail.com` — confirm which
   is primary.
3. **Photography** is pulled from the current site (2018 era) as a placeholder. The
   scope has the client supplying new images; drop them into `public/images/` and update
   the paths.
4. **Address** — `3695 Churn Creek Road, Redding, CA 96002`, sourced from business
   listings because the live Contact page returns a 403. Worth a sanity check.

## Structure

```
app/
  layout.tsx        fonts, metadata, LocalBusiness JSON-LD
  page.tsx          section assembly
  globals.css       brand tokens, motifs, motion
lib/site.ts         contact details, nav tree, rates, testimonials
components/
  SiteHeader.tsx    utility strip, sticky nav w/ dropdowns, mobile drawer
  Hero.tsx          Marquee.tsx  Welcome.tsx  Programs.tsx  WhyUs.tsx
  Tuition.tsx       Enroll.tsx   Testimonials.tsx  Gallery.tsx  CtaBand.tsx
  SiteFooter.tsx
  Decor.tsx         handprint, confetti, paper edges, waves, feature icons
  Reveal.tsx        scroll-in animation wrapper
```

Copy is an edit pass over the existing site's text, per the scope of work — the
testimonials are verbatim from the current Applause page.
