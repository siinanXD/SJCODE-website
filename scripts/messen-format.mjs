// Misst Schriftgrößen und Seitenhöhe gegen den lokalen Build (`out/`) mit denselben Regeln
// wie die Klickprobe (leitstand-2: src/klickprobe-lauf.ts, SOLL): Titel = h1–h3 und [role=heading],
// Schriftgrößen = alle sichtbaren Textknoten, gerundet. Soll: ≤ 8 Schriftgrößen, ≤ 4 Titelgrößen,
// Höhe ≤ 6752 px (Handy 390) / 9000 px (Desktop 1440).
// Aufruf: npm run build && node scripts/messen-format.mjs [--detail] [--bilder ordner] [/pfad ...]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { startServer } from './serve-out.mjs';

const args = process.argv.slice(2);
const detail = args.includes('--detail');
const bilder = args.includes('--bilder') ? args[args.indexOf('--bilder') + 1] : null; // Ordner für Vollseiten-Bilder
const pfade = args.filter((a) => a.startsWith('/'));
const SEITEN = pfade.length ? pfade : ['/', '/ueber-mich', '/referenz', '/kontakt', '/automatisierungs-check', '/leistungen/doku-assistent'];
const GERAETE = [
  { name: 'handy', width: 390, height: 844, hoeheMax: 8 * 844 },
  { name: 'desktop', width: 1440, height: 900, hoeheMax: 10 * 900 },
];

const server = await startServer();
const base = `http://localhost:${server.address().port}`;

const messen = () => {
  const sichtbar = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0; };
  const titel = {};
  for (const e of document.querySelectorAll('h1,h2,h3,[role=heading]')) {
    if (!sichtbar(e) || !(e.innerText || e.textContent || '').trim()) continue;
    (titel[Math.round(parseFloat(getComputedStyle(e).fontSize))] ??= []).push(e.tagName.toLowerCase() + '.' + (e.className?.baseVal ?? e.className));
  }
  const text = {}, fliess = {};
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const t = w.currentNode, p = t.parentElement;
    if (!p || !t.textContent.trim() || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName) || !sichtbar(p)) continue;
    const px = Math.round(parseFloat(getComputedStyle(p).fontSize)), name = p.tagName.toLowerCase() + '.' + (p.className?.baseVal ?? p.className);
    (text[px] ??= []).push(name);
    if (!p.closest('h1,h2,h3,[role=heading]')) (fliess[px] ??= []).push(name);
  }
  return { titel, text, fliess, hoehe: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) };
};

const zahlen = (o) => Object.keys(o).map(Number).sort((a, b) => a - b);
let rot = 0;
const browser = await chromium.launch();
for (const g of GERAETE) {
  const ctx = await browser.newContext({ viewport: { width: g.width, height: g.height }, deviceScaleFactor: 1 });
  for (const p of SEITEN) {
    const page = await ctx.newPage();
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { for (let y = 0, i = 0; y < document.body.scrollHeight && i < 40; y += 600, i++) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(500);
    const m = await page.evaluate(messen);
    const schrift = zahlen(m.text), titel = zahlen(m.titel), fliess = zahlen(m.fliess);
    const ok = schrift.length <= 8 && titel.length <= 4 && m.hoehe <= g.hoeheMax;
    if (!ok) rot++;
    console.log(`${ok ? 'OK ' : 'ROT'} ${g.name.padEnd(7)} ${p.padEnd(30)} höhe=${m.hoehe}/${g.hoeheMax}  schrift(${schrift.length}/8)=[${schrift}]  ohne-titel(${fliess.length})=[${fliess}]  titel(${titel.length}/4)=[${titel}]`);
    if (detail) for (const k of schrift) console.log(`     ${k}px: ${[...new Set(m.text[k])].slice(0, 8).join(' ')}`);
    if (bilder) { fs.mkdirSync(bilder, { recursive: true }); await page.screenshot({ path: path.join(bilder, `${p === '/' ? 'start' : p.slice(1).replaceAll('/', '-')}-${g.name}.png`), fullPage: true }); }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server.close();
process.exitCode = rot ? 1 : 0;
