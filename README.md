# sjcode.de — SJCODE

Website von SJCODE — Softwareentwicklung & AI Engineering für kleine und mittlere Betriebe.
Gebaut mit **Next.js 15** (App Router, TypeScript), als statische Seite exportiert und auf Netlify gehostet.

Das Design liegt in Figma: **„SJCODE Website – Redesign 2026“** (Design-System mit Farb-Variablen
Dark/Light, Button-/Card-Komponenten, Screens für Startseite Desktop + Mobile, Leistungs-Detail,
Preise, Über mich, Kontakt). Die CSS-Tokens in `app/globals.css` entsprechen den Figma-Variablen.

## Stack

- **Next.js 15 / React 19** mit `output: 'export'` — jede Route wird eine eigene HTML-Datei
  (`leistungen.html`, `leistungen/webseiten.html`, …), die URLs bleiben stabil
- **TypeScript**, ein zentrales Stylesheet (`app/globals.css`) mit Design-Tokens als CSS-Variablen,
  heller und dunkler Modus
- **Geist** (variable Schrift), selbst gehostet — keine Anfragen an Google Fonts
- Kontaktformular als Client-Komponente, Versand über Formspree, Vorauswahl per URL
  (`/kontakt.html?thema=Website&paket=business`)
- Mobiles Menü mit `<details>`/`<summary>` — funktioniert ohne JavaScript
- Scroll-Animationen per CSS `animation-timeline` (Progressive Enhancement)

## Inhalte pflegen (ohne Programmierkenntnisse)

| Was | Wo |
|---|---|
| Adresse, E-Mail, Calendly, Social-Links | `lib/site.ts` |
| Leistungen (Texte, Preise, FAQ der 4 Detailseiten) | `lib/services.ts` |
| Pakete & Preise, Preis-FAQ | `lib/pricing.ts` |
| Google-Bewertungen | `components/reviewsData.ts` |
| Werdegang, Arbeitsweise | `app/ueber-mich/page.tsx` |

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statischer Export nach ./out
```

## Deployment

Netlify baut automatisch bei jedem Push auf `main` (siehe `netlify.toml`:
Build-Befehl `npm run build`, Veröffentlichungsordner `out`).

## Struktur

```
app/              Routen (page.tsx je Seite) + globals.css + layout.tsx
  leistungen/     Übersicht + [slug]/ Detailseiten (aus lib/services.ts erzeugt)
  preise/         Pakete, Betreuung, Preis-FAQ
  ueber-mich/     Person, Werdegang, Arbeitsweise
components/       Header, Footer, StickyCta, TrustBar, PricingCards, FaqList, CtaBand,
                  Reviews(+Carousel), InboxMock, KontaktForm, CookieBanner, ThemeToggle
lib/              site.ts (Stammdaten), services.ts, pricing.ts, og.ts
public/           Fonts, Bilder, robots.txt, llms.txt, Favicon, OG-Bild
```

## SEO

Meta/OG-Tags und Canonical-URLs pro Seite über die Next.js Metadata API, Schema.org (JSON-LD):
ProfessionalService + Person + WebSite auf der Startseite, Service + OfferCatalog + Breadcrumbs auf
jeder Leistungsseite, FAQPage je Seite, AggregateRating aus den Bewertungen. Sitemap wird beim Build
erzeugt (`app/sitemap.ts`), `robots.txt` und `llms.txt` liegen in `public/`.
Rechtsseiten (Impressum, Datenschutz) sind auf `noindex` gesetzt.
