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

## Claude als Ersatz-Agent (SIN-205)

- Cursor zuerst. Hat Cursor kein Guthaben, setze das Label `claude` auf das Issue oder kommentiere `@claude`.
- Der Workflow `.github/workflows/claude.yml` startet Claude (`claude-code-action@v1`, nur für Nutzer mit Schreibrechten).
- Draft-PR nur, solange du noch arbeitest. Fertig und lokal geprüft: auf „Ready for review" stellen. Draft-PRs werden nie automatisch gemerged.
- Nie selbst mergen. Das übernimmt der Auto-Merge (siehe Abschnitt Pull Requests und Merge).
- Commit-Nachrichten enthalten `Part of SIN-xxx` (die Issue-Nummer des Auftrags).
- Maximal 3 Reparaturrunden pro Pull Request, dann stoppen und den Blocker melden.

## Pull Requests und Merge (SIN-208)

- 1 Linear-Issue = 1 PR. Klein halten: lieber zwei PRs als einen großen.
- PR-Titel = Commit auf dem Default-Branch (Squash-Merge): Conventional Commit mit Linear-ID, z. B. `feat(api): Export als CSV (SIN-123)`. Der Check `pr-title` prüft das.
- Das Risiko setzt der Workflow `pr-gate` automatisch als Label `risk:low`, `risk:medium` oder `risk:high`. Nie selbst setzen oder entfernen.
  - `risk:low` und `risk:medium`: Auto-Merge (Squash), sobald alle Pflicht-Checks grün sind. Nicht selbst mergen.
  - `risk:high` (`.github/`, Migrationen, Auth, Env/Secrets, Docker- und Deploy-Konfiguration, Zahlungen, sehr große PRs): wartet, bis Sinan das Label `freigegeben` setzt. Neue Commits heben die Freigabe auf.
  - Label `no-automerge` stoppt den Auto-Merge für einen PR.
- Rote CI: Der Workflow `repair` lässt Claude bis zu 3 Runden reparieren (Labels `repair:1` bis `repair:3`), danach Label `needs-human` und Stopp.
