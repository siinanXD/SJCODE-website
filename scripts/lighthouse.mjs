// Lighthouse (mobil) gegen den lokalen Build `out/`; Chromium aus `npx playwright install chromium`.
// Aufruf: npm run build && node scripts/lighthouse.mjs [/pfad ...]   (lighthouse kommt per npx, nicht im Projekt)
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { startServer } from './serve-out.mjs';

const exec = promisify(execFile);
const args = process.argv.slice(2).filter((a) => a.startsWith('/'));
const SEITEN = args.length ? args : ['/', '/ueber-mich', '/kontakt', '/referenz', '/automatisierungs-check', '/leistungen/doku-assistent', '/leistungen/wartungs-assistent', '/leistungen/stromlaufplan-ki', '/leistungen/qualitaetspruefung'];
const server = await startServer();
const base = `http://localhost:${server.address().port}`;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lh-'));
let unter90 = 0;
console.log('| Seite | Performance | Barrierefreiheit | SEO |\n| --- | --- | --- | --- |');
for (const p of SEITEN) {
  const out = path.join(tmp, 'r.json');
  // async, sonst blockiert der Aufruf den Server in diesem Prozess
  await exec('npx', ['--yes', 'lighthouse@13', base + p, '--only-categories=performance,accessibility,seo', '--output=json', `--output-path=${out}`, '--chrome-flags="--headless=new --no-sandbox"', '--quiet'], { env: { ...process.env, CHROME_PATH: chromium.executablePath() }, shell: true });
  const r = JSON.parse(fs.readFileSync(out, 'utf8'));
  const s = ['performance', 'accessibility', 'seo'].map((k) => Math.round(r.categories[k].score * 100));
  if (s.some((v) => v < 90)) unter90++;
  console.log(`| \`${p}\` | ${s.join(' | ')} |`);
  if (process.env.DETAIL) for (const a of Object.values(r.audits)) if (a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable') console.log(`    ${a.id}: ${a.score} ${a.displayValue ?? ''}`);
}
server.close();
process.exitCode = unter90 ? 1 : 0;
