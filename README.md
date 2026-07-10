# sjcode.de — SJCODE

Website von SJCODE – Softwareentwicklung & AI Engineering für den Mittelstand.
Gebaut mit **Next.js 15** (App Router, TypeScript), exportiert als statische
Seite und gehostet auf Netlify.

## Stack

- **Next.js 15 / React 19** mit `output: 'export'` – jede Route wird zu einer
  eigenen HTML-Datei (`leistungen.html`, `referenz.html`, …), dadurch bleiben
  die öffentlichen URLs stabil
- **TypeScript**, ein zentrales Stylesheet (`app/globals.css`) mit
  Design-Tokens als CSS Custom Properties
- **Geist** (variabler Font), selbst gehostet – keine Anfragen an Google Fonts
- Kontaktformular als Client-Komponente, Versand über Formspree
- Mobiles Menü als `<details>`/`<summary>` – funktioniert auch ohne JavaScript
- Scroll-Animationen über CSS `animation-timeline` (progressive enhancement)

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statischer Export nach ./out
```

## Deployment

Netlify baut automatisch bei jedem Push auf `main` (siehe `netlify.toml`:
Build-Command `npm run build`, Publish-Verzeichnis `out`).

## Struktur

```
app/          Routen (page.tsx je Seite) + globals.css + layout.tsx
components/   Header, Footer, CookieBanner, StickyCta, KontaktForm
public/       Fonts, Bilder, robots.txt, sitemap.xml, favicon, OG-Image
```

## SEO

Meta-/OG-Tags und Canonical-URLs pro Seite über die Next.js Metadata API,
Schema.org-Markup (JSON-LD) auf der Startseite, `robots.txt` + `sitemap.xml`
in `public/`. Impressum und Datenschutz stehen auf `noindex`.
