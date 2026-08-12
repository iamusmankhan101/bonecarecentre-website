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

## Before going live

- **Launch date** — `LAUNCH_DATE` in `src/ComingSoon.jsx` (currently 1 Oct 2026).
- **Email signup** — `NotifyForm` has no backend; it only shows a confirmation message. Wire `handleSubmit` to a real endpoint (Mailchimp, Formspree, or your own API).
- **Contact details** — phone, email and location are placeholders in the footer.
- **Logo** — the bone icon is a generic inline SVG; swap in the real brand mark.
