# TASKS.md — SJCODE-website

Offene Punkte dieses Projekts. Der Stand ist vom **2026-08-03** und stammt aus
der Migration nach `C:\Dev\Repositories`.

## Offen

- [ ] `npm install`, danach `npm run build` als Funktionstest
- [ ] Test-, Lint- und Typecheck-Script in `package.json` ergaenzen — bisher
      gibt es nur `dev`, `build` und `start`, und damit kein Quality Gate
- [ ] Pruefen, ob Impressum und Datenschutzerklaerung aktuell sind
- [ ] Projektnotiz unter `C:\Dev\Knowledge\01 Projects\` anlegen
- [ ] `docs/design/` befuellen (siehe Abschnitt 5.2 des Auftrags)
- [ ] Klaeren, wohin das Kontaktformular seine Daten sendet

## Erledigt

- [x] 2026-08-03 — nach `C:\Dev\Repositories\SJCODE-website` geklont

---

## Wie hier gearbeitet wird

Erledigtes wird abgehakt und mit Datum versehen, nicht geloescht — sonst
verschwindet die Spur, warum etwas so ist, wie es ist.

Aufgaben, die ein Agent uebernehmen soll, gehoeren ins Agent-System:

```bash
python C:\Dev\AI-Workspace\AGENT-SYSTEM\orchestration\run.py new \
  --id TASK-XXX --project SJCODE-website --title "..."
```
