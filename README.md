# Bone Care Centre — Website

Coming-soon landing page for Bone Care Centre, built with React 18 + Vite 5.

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
| `src/main.jsx` | React entry point |
| `src/ComingSoon.jsx` | Landing page: countdown, email capture, service pillars |
| `src/index.css` | Theme tokens and all page styles |
| `src/assets/logo.jpg` | Brand lockup (emblem + wordmark + tagline) |
| `public/favicon.png` | Favicon, cropped from the logo emblem |

## Brand colours

Sampled from the logo artwork and exposed as CSS custom properties in `src/index.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--navy` | `#062f5b` | Headings, countdown cards |
| `--teal` | `#02849a` | Accents, buttons, links |
| `--teal-bright` | `#1492a1` | Gradient partner to `--teal` |

## Before going live

- **Launch date** — `LAUNCH_DATE` in `src/ComingSoon.jsx` (currently 1 Oct 2026).
- **Email signup** — `NotifyForm` has no backend; it only shows a confirmation message. Wire `handleSubmit` to a real endpoint (Mailchimp, Formspree, or your own API).
- **Logo source** — `src/assets/logo.jpg` is the supplied JPEG on a white background, blended into the page with `mix-blend-mode: multiply`. A transparent PNG or SVG would be more robust; drop it in and remove that blend rule in `src/index.css`.
