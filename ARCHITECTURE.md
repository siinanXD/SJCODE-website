# ARCHITECTURE.md — SJCODE-website

Eine statisch erzeugte Next.js-Seite. Keine Datenbank, kein Backend, keine
Anmeldung.

```
app/layout.tsx          Rahmen: Header, Footer, Theme
   │
   ├─ app/page.tsx              Startseite
   ├─ app/leistungen/page.tsx
   ├─ app/referenz/page.tsx
   ├─ app/kontakt/page.tsx      -> components/KontaktForm.tsx
   ├─ app/impressum/page.tsx    rechtlicher Pflichttext
   ├─ app/datenschutz/page.tsx  rechtlicher Pflichttext
   └─ app/not-found.tsx

components/    Header · Footer · Faq · Reviews · ReviewsCarousel
               KontaktForm · CookieBanner · ThemeToggle
lib/og.ts      Open-Graph-Bilder fuer geteilte Links
app/sitemap.ts Sitemap fuer Suchmaschinen
```

Deployment: Netlify, konfiguriert in `netlify.toml`.

## Wo die einzige Dynamik sitzt

`components/KontaktForm.tsx`. Alles andere ist Anzeige.

TODO: Wohin schickt das Kontaktformular seine Daten — an eine Netlify-Funktion,
an einen Dienst wie Formspree, oder an eine eigene Route? Das entscheidet, wo
Validierung und Spamschutz hingehoeren.
