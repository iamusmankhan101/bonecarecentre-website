# Bone Care Centre — Website

Website for Bone Care Centre, built with React 18 + Vite 5. `npm run dev` serves the
homepage; the original coming-soon page is still in the repo (see below).

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Requires Node 18+.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | HTML shell, fonts, meta tags |
| `src/main.jsx` | React entry point — swap the rendered component to change the live page |
| `src/Home.jsx` | Homepage: header, hero, about, core values, stats, services, choose-us, CTA, footer |
| `src/home.css` | All homepage styles |
| `src/ComingSoon.jsx` | Legacy coming-soon page: countdown, email capture, service pillars |
| `src/coming-soon.css` | Styles for that page only (its selectors would otherwise clash with the homepage) |
| `src/index.css` | Shared theme tokens, reset, global rules |
| `src/assets/logo.png` | Brand lockup (emblem + wordmark + tagline) |
| `public/hero.jpg` | Hero background photo — placeholder, see below |
| `public/about-1.jpg`, `public/about-2.jpg` | The two tilted photos in the About section — placeholders |
| `public/services/1–6.jpg` | One photo per service card — placeholders |
| `public/choose-us.jpg` | Portrait in the Choose Us section — placeholder |
| `public/favicon.png` | Favicon, cropped from the logo emblem |

To put the coming-soon page back, change the import and the rendered element in
`src/main.jsx` from `Home` to `ComingSoon`.

## Brand colours

Sampled from the logo artwork and exposed as CSS custom properties in `src/index.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--navy` | `#062f5b` | Headings, countdown cards |
| `--teal` | `#02849a` | Accents, buttons, links |
| `--teal-bright` | `#1492a1` | Gradient partner to `--teal` |

## Before going live

Placeholder content on the homepage that must be replaced with real figures — it is
invented and would misrepresent the clinic if published as-is:

- **Rating card** — `4.9` and "Happy Patients" in `Hero` (`src/Home.jsx`).
- **Stats band** — `STATS` in `src/Home.jsx` (years, patients treated, consultants, recommendation rate).
- **Service copy** — `SERVICES` in `src/Home.jsx` describes treatments the centre may or may not
  offer, and each card's photo is stock. The list ends with Fracture & Trauma rather than
  paediatric orthopaedics purely because no honest stock photo of paediatric care was available —
  swap it back once you have your own photography.
- **Phone number** — the `tel:` link in `CallToAction` is `+97100000000`.
- **Navigation** — `NAV` and `MORE` point at on-page anchors; wire them to real pages/routes.
- **About copy** — `ABOUT_TEXT` in `src/Home.jsx`; its "Learn more about us" button points at
  `#story`, which does not exist yet.
- **Core values** — `VALUES` in `src/Home.jsx`; the four principles and their wording are drafted,
  not supplied by the clinic.
- **Choose Us** — `REASONS` in `src/Home.jsx` is drafted copy, and its "Trusted by 25k+ happy
  patients" card repeats the invented patient figure from the stats band. Change both together.
- **Hero photo** — `public/hero.jpg` is an Unsplash stock portrait, set via `HERO_IMAGE` in
  `src/Home.jsx`. Replace it with your own photography (wide, bright, subject right of centre);
  check Unsplash's licence terms if you keep it. The same applies to `public/about-1.jpg`
  and `public/about-2.jpg`.

## Hero animation

Two separate things:

- **On load**, the hero composes itself: the photo fades up, the two headline lines slide out from
  behind their own `overflow: hidden` masks, and the eyebrow, chips, lede, buttons and rating card
  rise on a short stagger. All of it is CSS keyframes with `animation-delay` — no script. The
  headline lines carry a `padding-bottom`/negative-margin pair, or the mask clips their descenders.
- **On scroll**, `useViewportScroll` writes `--scrolled` (0 → 1 over one viewport height) onto the
  hero. The photo drifts down and creeps closer with it, and the copy fades and lifts slightly, so
  the section below arrives against a settled background rather than a hard cut.

Under `prefers-reduced-motion` the hook writes nothing and the keyframes are switched off, leaving
the hero in its final state from the first paint.

## How the About section animates

`useScrollProgress(property, start, sweep)` in `src/Home.jsx` measures an element's position in
the viewport and writes a single custom property (0 → 1) onto it during scroll — React never
re-renders. It is used three times on this page:

- **The sentence.** The About section writes `--reveal`, which every word inherits; each word
  derives its own opacity from `--reveal`, its index `--i` and the word count `--total`
  (`.reveal-word` in `src/home.css`), so the reveal front sweeps across the text.
- **Each photo** writes its own `--p`, measured from the photo rather than the section, and uses
  it to fade in, slide in from its own side, rise, unwind an extra turn of tilt, and scale up
  (`.about-photo`). This has to be measured per photo: the section starts its sweep while the
  photos are still below the fold, so driving them off `--reveal` landed them before they were
  ever on screen.
- **The Core Values cards** inherit that section's `--reveal` and each subtract `--i * 0.18` from
  it, so they rise and fade in one after another rather than together.
- **The Choose Us section** stages its entrance across four separate measurements, because it is
  a tall section and only its heading is near the top. `--reveal` (the section) lifts the pill,
  heading and lede; `--list` (the `<ol>`) staggers the five numbered reasons; `--p` (the figure)
  fades and scales the photo; and `--card` (the trust card) brings the card up and pops the avatar
  faces in on a spring easing. Timing the list and card off the section's progress instead left
  them finishing while still below the fold — they landed before you could see them move.
- **The Services cards** do the same, sliding in from the right. Their stagger is deliberately
  short (`* 3.4 - --i * 0.12`): the track scrolls sideways independently, so a card must never be
  swiped into view while still dimmed.

## The services carousel

On wide screens the section pins: `.services-pin` is one viewport tall **plus** the track's
overflow, and `.services-sticky` sticks to the top of the window for that whole distance. The
effect in `Services()` writes two custom properties onto the wrapper — `--travel` (how far the
track overflows) and `--pin` (how much of the wrapper has passed the top of the window, 0 → 1) —
and the track's transform is simply `translate3d(calc(var(--pin) * var(--travel) * -1), 0, 0)`.
So the page scroll *is* the horizontal position; nothing is hijacked or animated on a timer.

Two details that are easy to get wrong:

- The clipping lives on `.services-sticky`, not the track. A pinned track needs `width: max-content`
  and `overflow: visible` — clipping the track itself moves the clip along with the transform, which
  hides every card past the first screenful.
- Below 1100px, and under `prefers-reduced-motion`, the whole thing reverts to a plain
  `overflow-x: auto` scroller with no pin (see the fallbacks in `src/home.css`). The script does not
  re-test those media queries — it asks the track which mode is live via its computed `overflow-x`.

The arrow buttons step by one card in both modes: sideways via `scrollBy` when it is a scroller,
and while pinned by scrolling the *page* by the slice of the pin that moves the track that far.
They disable themselves at each end.

Coming-soon page (only relevant if you switch back to it):

- **Launch date** — `LAUNCH_DATE` in `src/ComingSoon.jsx` (currently 1 Oct 2026).
- **Email signup** — `NotifyForm` has no backend; it only shows a confirmation message. Wire `handleSubmit` to a real endpoint (Mailchimp, Formspree, or your own API).
- **Logo source** — `src/assets/logo.png` is the supplied artwork on its own navy ground. The
  header and footer crop it to the emblem with a fixed offset (`.brand-mark img` in
  `src/home.css`); a transparent emblem-only SVG would let you delete that crop.
