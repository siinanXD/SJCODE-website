---
name: Structured Data / JSON-LD (SJCODE)
description: Erstellt und prüft strukturierte Daten (JSON-LD, schema.org) für die SJCODE-Website. Nutze dieses Skill bei Themen wie Rich Results, Schema-Markup, JSON-LD, strukturierte Daten, ProfessionalService, FAQPage, Service-Schema, Bewertungs-Sterne (AggregateRating), Breadcrumbs oder "in Google mit Sternen/Extras erscheinen".
---

# Structured Data (JSON-LD) für SJCODE

Ziel: gültiges, ehrliches schema.org-Markup, das Rich Results ermöglicht. Immer als
`<script type="application/ld+json">` einbetten (wie in `app/page.tsx` bereits gelöst über
`dangerouslySetInnerHTML`). Nach jeder Änderung mit dem
[Rich Results Test](https://search.google.com/test/rich-results) und dem
[Schema Validator](https://validator.schema.org/) prüfen.

**Grundregel:** Markup muss den **sichtbaren Inhalt** der Seite widerspiegeln. Keine
erfundenen Bewertungen, Preise oder Fakten – das kann zu manuellen Maßnahmen führen.

## Bestehendes Markup
- `app/page.tsx`: `ProfessionalService` (Name, Adresse, founder, makesOffer, areaServed).
- `components/Faq.tsx`: `FAQPage`.

## Empfohlene Ergänzungen / Muster

### 1. ProfessionalService vervollständigen (Homepage)
Ergänze das bestehende Objekt um lokale Felder (siehe auch `seo-local`):
```jsonc
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "SJCODE",
  "url": "https://sjcode.de",
  "image": "https://sjcode.de/og-image.png",
  "logo": "https://sjcode.de/favicon.svg",
  "telephone": "+49-...",              // nur mit echter, öffentlicher Nummer
  "address": { "@type": "PostalAddress", "streetAddress": "Mühlenstraße 44",
    "addressLocality": "Euskirchen", "postalCode": "53879", "addressCountry": "DE" },
  "geo": { "@type": "GeoCoordinates", "latitude": 50.66, "longitude": 6.79 }, // exakt eintragen
  "areaServed": ["Euskirchen", "Köln", "DE"],
  "sameAs": [
    "https://github.com/siinanxd",
    "https://www.linkedin.com/in/kahraman-sinan/",
    "https://g.page/r/CZdmOonQJkltEBM"   // Google-Business-Profil
  ]
}
```

### 2. Service-Schema für die Leistungen (`app/leistungen/page.tsx`)
Je Leistung ein `Service` mit `provider` (Verweis auf SJCODE) und `serviceType`.
Nur ergänzen, wenn es zum sichtbaren Angebot passt.

### 3. BreadcrumbList auf Unterseiten
Für `/leistungen.html`, `/referenz.html`, `/kontakt.html` eine `BreadcrumbList`
(Start → Seite). Hilft Google beim Verständnis der Struktur und kann Breadcrumbs in den
Ergebnissen zeigen. URLs mit `.html` (konsistent zum Rest der Seite).

### 4. Review / AggregateRating (nur mit echten Bewertungen)
Sobald in `components/Reviews.tsx` echte Bewertungen eingetragen sind, `AggregateRating`
(Durchschnitt + Anzahl) und einzelne `Review`-Objekte ergänzen – Werte müssen den
sichtbaren Testimonials entsprechen.

### 5. Person-Schema (optional)
`Person` für Sinan Kahraman (jobTitle, sameAs, worksFor SJCODE) – stärkt E-E-A-T.

## Umsetzungshinweise
- JSON-LD-Objekte als Konstante über der Komponente definieren und via
  `JSON.stringify` einbetten (Muster aus `app/page.tsx` übernehmen).
- Ein `@type` pro `<script>` oder ein `@graph`-Array bei mehreren Entitäten pro Seite.
- Nach dem Build (`npm run build`) im `out/`-HTML prüfen, dass das JSON-LD wirklich
  gerendert wird.
