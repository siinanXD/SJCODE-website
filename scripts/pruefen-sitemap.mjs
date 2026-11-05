// Prüft out/sitemap.xml nach dem Build: gültige lastmod (oder keine), kein changefreq/priority,
// keine Duplikate. Aufruf: node scripts/pruefen-sitemap.mjs [--ohne-lastmod]  (letzteres für Builds ohne Git)
import fs from 'node:fs';

const xml = fs.readFileSync('out/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
const fehler = [];
if (/<changefreq>|<priority>/.test(xml)) fehler.push('changefreq oder priority vorhanden');
const locs = urls.map((u) => u.match(/<loc>(.*?)<\/loc>/)?.[1]);
if (new Set(locs).size !== locs.length) fehler.push('doppelte URLs');
const mods = urls.map((u) => u.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]);
for (const m of mods) if (m && Number.isNaN(Date.parse(m))) fehler.push(`ungültiges lastmod: ${m}`);
if (process.argv.includes('--ohne-lastmod')) {
  if (mods.some(Boolean)) fehler.push('lastmod vorhanden, obwohl Git fehlt');
} else if (new Set(mods.filter(Boolean)).size < 2) fehler.push('lastmod fehlt oder ist überall gleich');
console.log(`${urls.length} URLs, ${new Set(mods.filter(Boolean)).size} verschiedene lastmod-Werte`);
if (fehler.length) { console.error(fehler.join('\n')); process.exit(1); }
