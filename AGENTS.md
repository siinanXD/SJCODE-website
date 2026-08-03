# AGENTS.md — SJCODE-website

**Diese Datei ist die einzige Quelle der Projektbeschreibung.** `CLAUDE.md`
verweist hierher.

Workspaceweite Regeln: `C:\Dev\AI-Workspace\shared-rules\AI_TOOL_RULES.md`

## Was das Projekt ist

Die oeffentliche Website von SJCODE. Eine Next.js-Seite mit Leistungen,
Referenzen, Kontaktformular und den rechtlich vorgeschriebenen Seiten.

Das ist das einzige Projekt im Workspace, das oeffentlich sichtbar ist. Jeder
Fehler ist ein Fehler vor Publikum.

## Stack

Next.js (App Router), TypeScript. Deployment ueber Netlify (`netlify.toml`).

## Aufbau

| Pfad | Inhalt |
|---|---|
| `app/page.tsx` | Startseite |
| `app/leistungen/`, `app/referenz/`, `app/kontakt/` | Inhaltsseiten |
| `app/impressum/`, `app/datenschutz/` | Pflichtseiten |
| `app/sitemap.ts` | Sitemap |
| `app/not-found.tsx` | 404 |
| `components/` | Header, Footer, Faq, KontaktForm, Reviews, CookieBanner, ThemeToggle |
| `lib/og.ts` | Open-Graph-Bilder |

## Befehle

```bash
npm install
npm run dev
npm run build
npm start
```

**`package.json` kennt nur `dev`, `build` und `start`.** Es gibt kein
Test-, Lint- oder Typecheck-Script. Wer eines will, legt es bewusst an — es
wird nicht stillschweigend vorausgesetzt.

## Grenzen fuer Agenten

- **`app/impressum/` und `app/datenschutz/` sind rechtliche Texte.** Nicht
  umformulieren, nicht "verbessern", nicht kuerzen. Aenderungen daran sind
  eine rechtliche Entscheidung.
- Die Seite ist oeffentlich. Kein Platzhaltertext, kein Lorem ipsum, keine
  englischen Reste — das sieht jeder.
- `components/KontaktForm.tsx` verarbeitet Eingaben von Fremden. Siehe
  `SECURITY.md`.
- Der `CookieBanner` haengt an einer Einwilligung. Wer ihn aendert, aendert
  eine Rechtspflicht.

## Zustand am 2026-08-03

Branch `main`, HEAD `dcbdea4`. Am 2026-08-03 nach
`C:\Dev\Repositories\SJCODE-website` geklont. Enthaelt bereits `.claude/`.

TODO: Auf welche Domain deployt Netlify, und ist `main` der Produktionszweig?
