# Design-System — SJCODE-website

## Woher die Werte kommen

Die Wahrheit steht im Code, nicht in Figma und nicht in dieser Datei:

- CSS-Custom-Properties: `app/globals.css`
- Tailwind: keine Tailwind-Konfiguration

Stand 2026-08-03: 24 Custom-Properties in `app/globals.css`.

`design-tokens.json` daneben ist eine **Extraktion**, kein Original. Bei
Abweichung gewinnt das CSS. Wer die Datei von Hand pflegt, erzeugt genau die
zweite Wahrheit, die dieses Verzeichnis vermeiden soll.

## Regeln

- **Keine hartkodierten Farbwerte in Bauteilen.** Ein `#3b82f6` neben einem
  vorhandenen Token ist ein Befund, kein Geschmacksthema.
- Abstaende, Radien und Schriftgroessen kommen aus der Skala, nicht aus dem
  Gefuehl.
- Ein neuer Token wird angelegt, wenn ein Wert zum zweiten Mal gebraucht wird
  — nicht beim ersten Mal und nicht beim fuenften.

## Besonderheit

Die einzige oeffentlich sichtbare Seite im Workspace. Gestaltung ist hier keine interne Angelegenheit.

Die Seite hat ein helles und ein dunkles Erscheinungsbild (`components/ThemeToggle.tsx`). Jede Gestaltungsaenderung muss in beiden gepruaeft werden — ein Kontrast, der hell reicht, kann dunkel durchfallen.

## Barrierefreiheit

Kontrast mindestens 4.5:1 fuer Fliesstext, 3:1 fuer grosse Schrift und
Bedienelemente. Das ist keine Empfehlung, sondern die Schwelle, ab der Text
fuer einen Teil der Nutzer lesbar wird.

Fokus muss sichtbar sein. Wer `outline: none` setzt, ersetzt es durch etwas
Gleichwertiges — oder laesst es.
