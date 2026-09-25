# AGENTS.md – sjcode.de

Öffentliche Firmenwebsite von SJCODE. Next.js 15 (App Router, TypeScript),
statischer Export, gehostet auf Netlify. Details: `README.md`.

Workspace-Regeln gelten zusätzlich: `C:\Dev\CLAUDE.md` → `AI-Workspace\shared-rules\`.

## Harte Fakten

- **Push auf `main` = Produktiv-Deployment.** Netlify baut bei jedem Push auf `main`
  (`netlify.toml`: `npm run build`, Ausgabe `out/`). Änderungen nur über Branch + PR.
- `impressum` und `datenschutz` sind rechtliche Texte. Nicht umformulieren ohne Freigabe.
- Keine Anfragen an Google Fonts: Geist ist selbst gehostet.
- Kontaktformular sendet über Formspree.
- Design-Tokens als CSS Custom Properties in `app/globals.css`.

## Build & Test

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # statischer Export nach ./out
```

`TODO:` Kein Lint-Skript in `package.json` – ESLint/Prettier laut `CODING_STANDARDS.md` ergänzen?
