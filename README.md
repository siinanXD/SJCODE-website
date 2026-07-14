# sjcode.de — SJCODE

Website of SJCODE — software development & AI engineering for small and mid-sized businesses.
Built with **Next.js 15** (App Router, TypeScript), exported as a static site and hosted on Netlify.

## Stack

- **Next.js 15 / React 19** with `output: 'export'` — every route becomes its own
  HTML file (`leistungen.html`, `referenz.html`, …), which keeps the public URLs stable
- **TypeScript**, a single central stylesheet (`app/globals.css`) with
  design tokens as CSS custom properties
- **Geist** (variable font), self-hosted — no requests to Google Fonts
- Contact form as a client component, submission via Formspree
- Mobile menu built with `<details>`/`<summary>` — works without JavaScript
- Scroll animations via CSS `animation-timeline` (progressive enhancement)

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deployment

Netlify builds automatically on every push to `main` (see `netlify.toml`:
build command `npm run build`, publish directory `out`).

## Structure

```
app/          Routes (page.tsx per page) + globals.css + layout.tsx
components/   Header, Footer, CookieBanner, KontaktForm
public/       Fonts, images, robots.txt, sitemap.xml, favicon, OG image
```

## SEO

Meta/OG tags and canonical URLs per page via the Next.js Metadata API,
Schema.org markup (JSON-LD) on the home page, `robots.txt` + `sitemap.xml`
in `public/`. Legal pages (Impressum, Datenschutz) are set to `noindex`.
