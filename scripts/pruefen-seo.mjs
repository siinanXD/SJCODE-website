// Prüft gebaute Seiten (out/*.html) auf: Titel <= 60, Beschreibung <= 155 Zeichen, Canonical, genau eine h1,
// gültiges JSON-LD. Aufruf nach dem Build: node scripts/pruefen-seo.mjs /referenz/stromlauf-ai /wissen ...
import fs from 'node:fs';

let fehler = 0;
for (const p of process.argv.slice(2).filter((a) => a.startsWith('/'))) {
  const datei = ['out' + p + '.html', 'out' + p + '/index.html'].find((f) => fs.existsSync(f));
  if (!datei) { console.error(`FEHLT ${p}`); fehler++; continue; }
  const html = fs.readFileSync(datei, 'utf8');
  const titel = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
  const beschr = html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/)?.[1];
  const h1 = (html.match(/<h1[ >]/g) ?? []).length;
  const probleme = [];
  if (!titel || titel.length > 60) probleme.push(`Titel ${titel.length} Zeichen`);
  if (!beschr || beschr.length > 155) probleme.push(`Beschreibung ${beschr.length} Zeichen`);
  if (!canonical) probleme.push('Canonical fehlt');
  if (h1 !== 1) probleme.push(`${h1} h1`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { probleme.push('JSON-LD ungültig'); }
  }
  console.log(`${probleme.length ? 'ROT' : 'OK '} ${p}  titel=${titel.length} beschreibung=${beschr.length} canonical=${canonical}`);
  if (probleme.length) { console.error('   ' + probleme.join(', ')); fehler++; }
}
process.exitCode = fehler ? 1 : 0;
