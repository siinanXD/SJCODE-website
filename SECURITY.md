# SECURITY.md — SJCODE-website

Grundlage: `C:\Dev\AI-Workspace\shared-rules\SECURITY_RULES.md`. Hier steht
nur, was fuer dieses Projekt zusaetzlich gilt.

## Was niemals ins Repository gehoert

`.env` und `.env.*` (ausser `.env.example`), `*.pem`, `*.key`, `*.p12`,
`*.pfx`, `credentials*`, `secrets*`, Token-Caches, Datenbankabzuege.

Das gilt auch fuer Tests, Fixtures, Kommentare und Beispieldateien. Ein
Schluessel in einer Testdatei ist ein veroeffentlichter Schluessel.

## Was besonders zu beachten ist

**Das Kontaktformular nimmt Eingaben von Fremden entgegen.** Es braucht
Validierung auf der Serverseite — eine Pruefung nur im Browser ist keine
Pruefung — und einen Schutz gegen automatisierte Einsendungen.

**Personenbezogene Daten aus dem Formular** (Name, Mailadresse, Nachricht)
gehoeren nicht in Logs und nicht in Fehlermeldungen.

**Der Cookie-Banner** haengt an einer rechtlichen Einwilligungspflicht. Wer ihn
aendert, aendert nicht nur ein Bauteil.

**Impressum und Datenschutzerklaerung** sind rechtliche Pflichttexte. Sie
werden nicht sprachlich "verbessert" — Aenderungen daran sind eine rechtliche
Entscheidung.

**Keine Schluessel im Client-Code.** Alles unter `app/` und `components/`
landet im Browser. Was dort steht, ist oeffentlich.

## Fuer KI-Werkzeuge

Claude, Codex und Cursor duerfen die oben genannten Dateien **nicht lesen und
nicht ausgeben**. In Dokumentation wird hoechstens vermerkt, dass es sie gibt
und welche Variablennamen der Code erwartet — die Namen stammen aus dem Code,
nicht aus der Datei.

## Wenn doch etwas durchgerutscht ist

1. Den Schluessel beim Anbieter sofort widerrufen. Das ist der einzige Schritt,
   der wirklich wirkt.
2. Erst danach die Historie bereinigen (`git filter-repo`).
3. Einen bereits gepushten Schluessel als kompromittiert behandeln, auch wenn
   das Repository privat ist.

Reihenfolge nicht vertauschen: Ein aus der Historie entfernter, aber noch
gueltiger Schluessel ist weiterhin ein gueltiger Schluessel.
