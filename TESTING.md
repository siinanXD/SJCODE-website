# TESTING.md — SJCODE-website

## Tests ausfuehren

```bash
npm install
npm run build     # bisher die einzige automatische Pruefung
```

## Wo die Tests liegen

**Es gibt keine Tests und kein Test-Script.** `package.json` kennt nur
`dev`, `build` und `start`.

Damit ist `npm run build` die einzige Pruefung, die etwas findet — sie faellt
bei Typfehlern und kaputten Importen um, aber nicht bei falschem Inhalt.

Sinnvoller Anfang fuer eine oeffentliche Seite:

- ein Test, der jede Route rendert, ohne zu werfen
- ein Test fuer `components/KontaktForm.tsx`: gueltige und ungueltige Eingabe
- eine Zugaenglichkeitspruefung der Startseite

## Was ein guter Test hier leistet

Ein Test taugt nur, wenn er rot wird, sobald die Implementierung falsch ist.
Die Probe aufs Exempel: Waere dieser Test auch dann gruen, wenn die Funktion
Unsinn zurueckgibt? Dann sichert er nichts.

Abgedeckt gehoeren neben dem Normalfall:

- die Randfaelle — leer, null, eins, sehr gross, negativ
- der Fehlerfall — falscher Typ, fehlende Datei, ungueltige Eingabe
- bei wiederholbaren Ablaeufen: derselbe Aufruf zweimal

## Verbindlich

- **Testdaten sind erfunden.** Keine echten Kundennamen, Mailadressen,
  Buchungen oder Zugangsdaten — auch nicht "nur zum Ausprobieren".
- **Kein Test wird abgeschaltet, um eine Pruefung gruen zu bekommen.** Nicht
  mit `skip`, nicht mit `xit`, nicht mit `# noqa`, nicht mit `@ts-ignore`.
  Ein roter Test ist ein Befund, kein Hindernis.
- Ein Fehler bekommt erst einen Test, der ihn reproduziert, dann die Behebung.

## Besonderheit dieses Projekts

Die Seite ist oeffentlich. Was hier kaputt ist, sieht jeder — deshalb zaehlt
neben dem Bau auch der Blick mit dem Auge:

- auf einem schmalen Bildschirm (375 px)
- mit der Tastatur allein bedienbar, mit sichtbarem Fokus
- in hellem und dunklem Erscheinungsbild (es gibt einen `ThemeToggle`)
