// Erzeugt public/beispiel-doku-check.pdf: ein Beispiel-Ergebnis des Automatisierungs-Checks aus erfundenen
// Demo-Antworten, gerechnet mit derselben Logik wie der echte Check (lib/automationCheck.ts).
// Aufruf: node scripts/beispiel-pdf.mjs   (Chromium: npx playwright install chromium; Node 24 liest die .ts-Datei direkt)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { QUESTIONS, evaluate, AUTOMATABLE_SHARE, WORKDAYS_PER_MONTH } from '../lib/automationCheck.ts';

// Demo-Antworten (Index der Option je Frage): erfunden, ohne Namen oder Firmen.
const ANSWERS = { mails: 2, antworten: 2, belege: 2, angebote: 1, team: 1, stundensatz: 1 };

const r = evaluate(ANSWERS);
const opt = (q) => q.options[ANSWERS[q.id]];
const minutesPerDay = QUESTIONS.reduce((n, q) => n + (opt(q).minutes ?? 0), 0);
const factor = opt(QUESTIONS.find((q) => q.id === 'team')).factor;
const rate = opt(QUESTIONS.find((q) => q.id === 'stundensatz')).rate;
const eur = (n) => n.toLocaleString('de-DE');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const potential = { hoch: 'Hoch', mittel: 'Mittel', niedrig: 'Gering' }[r.potential];

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Beispiel-Ergebnis Automatisierungs-Check (Demo-Daten)</title>
<style>
@font-face { font-family: 'Geist'; font-weight: 100 900; src: url('${pathToFileURL(path.resolve('public/fonts/geist-latin.woff2'))}') format('woff2'); }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Geist', Arial, sans-serif; font-size: 11pt; line-height: 1.55; color: #26221b; }
.page { position: relative; width: 210mm; height: 296mm; padding: 14mm 18mm; overflow: hidden; break-after: page; }
.page:last-child { break-after: auto; }
.banner { background: #dd7348; color: #1a1816; font-weight: 700; text-align: center; padding: 2.5mm; border-radius: 2mm; font-size: 10.5pt; margin-bottom: 10mm; }
.foot { position: absolute; bottom: 10mm; left: 18mm; right: 18mm; font-size: 8.5pt; color: #5f584c; }
h1 { font-size: 22pt; line-height: 1.15; margin: 0 0 4mm; letter-spacing: -0.02em; }
h2 { font-size: 13pt; margin: 8mm 0 3mm; }
.lead { color: #5f584c; margin: 0 0 6mm; }
table { width: 100%; border-collapse: collapse; font-size: 10pt; }
td, th { text-align: left; padding: 2mm 2.5mm; border-bottom: 0.3mm solid #d9d2c6; vertical-align: top; }
th { color: #5f584c; font-weight: 600; }
.stats { display: flex; gap: 6mm; margin: 4mm 0 6mm; }
.stats div { flex: 1; border: 0.3mm solid #d9d2c6; border-radius: 2mm; padding: 3mm 4mm; }
.stats strong { display: block; font-size: 18pt; }
.stats small { color: #5f584c; font-size: 9pt; }
.box { background: #f4efe7; border-radius: 2mm; padding: 3.5mm 4.5mm; margin: 4mm 0; }
.note { font-size: 9.5pt; color: #5f584c; }
</style></head><body>
<section class="page">
<div class="banner">Beispiel mit Demo-Daten</div>
<p class="note" style="margin:0 0 2mm">Automatisierungs-Check · Beispiel-Ergebnis</p>
<h1>Rund ${r.hoursPerMonth} Stunden Handarbeit im Monat.</h1>
<p class="lead">So sieht das Ergebnis des Automatisierungs-Checks aus. Die Antworten unten sind erfunden (Beispielbetrieb, kein Kunde).</p>
<div class="stats">
  <div><strong>${r.hoursSaved} h</strong><small>pro Monat automatisierbar</small></div>
  <div><strong>≈ ${eur(r.euroSaved)} €</strong><small>Zeitwert pro Monat</small></div>
  <div><strong>${potential}</strong><small>Automatisierungs-Potenzial</small></div>
</div>
<p>${esc(r.summary)}</p>
<div class="box"><strong>Empfehlung: ${esc(r.topic)}</strong><br>${esc(r.topicReason)}</div>
<h2>Die Demo-Antworten</h2>
<table>
${QUESTIONS.map((q) => `<tr><td>${esc(q.q)}</td><th>${esc(opt(q).label)}</th></tr>`).join('\n')}
</table>
<div class="foot">Beispiel mit Demo-Daten · alle Angaben erfunden · sjcode.de/automatisierungs-check</div>
</section>

<section class="page">
<div class="banner">Beispiel mit Demo-Daten</div>
<h1>So entsteht die Zahl</h1>
<p class="lead">Dieselbe Rechnung läuft im Check im Browser. Sie ist bewusst konservativ.</p>
<table>
<tr><td>Handarbeit pro Tag (Summe der Zeitangaben aus E-Mails, Antworten, Belegen, Angeboten)</td><th>${minutesPerDay} Minuten</th></tr>
<tr><td>× ${WORKDAYS_PER_MONTH} Arbeitstage × ${factor} (Personen) ÷ 60</td><th>≈ ${r.hoursPerMonth} Stunden pro Monat</th></tr>
<tr><td>× ${Math.round(AUTOMATABLE_SHARE * 100)} % Anteil, der sich erfahrungsgemäß automatisieren lässt</td><th>≈ ${r.hoursSaved} Stunden pro Monat</th></tr>
<tr><td>× ${rate} € Stundenwert, auf 10 € gerundet</td><th>≈ ${eur(r.euroSaved)} € pro Monat</th></tr>
</table>
<h2>Was dieses Beispiel nicht ist</h2>
<p>Es ist kein Kundenfall und kein Versprechen. Die Antworten sind erfunden, das Ergebnis zeigt nur, wie ein Ergebnis aufgebaut ist. Wie viel Zeit in Ihrem Betrieb steckt, zeigt der Check mit Ihren eigenen Antworten, die genaue Zahl ergibt die kostenlose Prozess-Analyse (30 Minuten).</p>
<p class="note">Der Check läuft unter sjcode.de/automatisierungs-check, ohne Anmeldung. Das Ergebnis erscheint direkt auf dem Bildschirm und lässt sich optional per E-Mail zusenden.</p>
<div class="foot">Beispiel mit Demo-Daten · alle Angaben erfunden · sjcode.de/automatisierungs-check</div>
</section>
</body></html>`;

const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'bsp-')), 'beispiel.html');
fs.writeFileSync(tmp, html);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(tmp).href);
await page.evaluate(() => document.fonts.ready);
const out = path.resolve('public/beispiel-doku-check.pdf');
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`${out}: ${Math.round(fs.statSync(out).size / 1024)} KB`);
