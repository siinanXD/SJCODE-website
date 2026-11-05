# Fertig-Liste sjcode.de v1 (Sinan, 16.10.2026)

- [x] Positionierung „Freelance AI Engineer“ auf Startseite und Über-mich (SIN-119)
- [ ] Redesign „Stromlaufplan“ live (SIN-737)
- [ ] Referenzen zeigen die fertigen Produkte: Lern-App und Leitstand mit Live-Link
- [ ] Kontaktformular sendet nachweislich (Formspree, Test-Anfrage angekommen)
- [x] Lighthouse mobil mindestens 90 in Performance, Barrierefreiheit und SEO (SIN-1506, Tabelle unten)

## Lighthouse mobil (SIN-1506)

Stand 2026-11-05 (neue Seiten und Startseite nach SIN-1569 erneut gemessen), Lighthouse 13.6.0 (Standard-Profil mobil, simuliertes 4G), Chromium aus Playwright, gegen den
lokalen Build `out/`. Wiederholen: `npm run build && node scripts/lighthouse.mjs` (Server und gzip wie Netlify:
`scripts/serve-out.mjs`; `lighthouse` kommt per `npx`, nicht aus `package.json`).

| Seite | Performance | Barrierefreiheit | SEO |
| --- | --- | --- | --- |
| `/` | 100 | 100 | 100 |
| `/ueber-mich` | 100 | 100 | 100 |
| `/kontakt` | 100 | 100 | 100 |
| `/referenz` | 99 | 98 | 100 |
| `/automatisierungs-check` | 100 | 100 | 100 |
| `/leistungen/doku-assistent` | 100 | 100 | 100 |
| `/leistungen/wartungs-assistent` | 100 | 100 | 100 |
| `/leistungen/stromlaufplan-ki` | 100 | 100 | 100 |
| `/leistungen/qualitaetspruefung` | 100 | 100 | 100 |
| `/referenz/stromlauf-ai` | 100 | 100 | 100 |
| `/wissen` | 100 | 100 | 100 |
| `/wissen/stromlaufplaene-mit-ki-auswerten` | 100 | 100 | 100 |
| `/wissen/ki-fuer-handbuecher-instandhaltung` | 100 | 100 | 100 |
| `/wissen/ki-assistenten-testen-testset-trefferquote` | 100 | 100 | 100 |
| `/ki-fuer-industrie-euskirchen` | 100 | 100 | 100 |

Grenzen der Messung: lokaler Server statt Netlify (kein CDN, keine echte Latenz), Messung auf einem ausgelasteten
Entwicklerrechner. Ein erster Lauf ohne gzip im lokalen Server ergab 84 für `/ueber-mich` (Render-Blockade durch
das unkomprimierte Stylesheet); Netlify liefert komprimiert aus, der Server bildet das jetzt nach. Auf
`/referenz` meldet Lighthouse `heading-order` (98): Der Hinweis liegt über 90 und bleibt offen.
