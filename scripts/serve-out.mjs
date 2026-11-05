// Statischer Server für den Export `out/` (wie Netlify: /seite → seite.html). Für Messungen und
// `LIVE_URL=http://localhost:4173 npm run test:nutzerweg`. Aufruf: node scripts/serve-out.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.resolve('out');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.png': 'image/png', '.ico': 'image/x-icon' };

export function startServer(port = 0) {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const kandidaten = [p, `${p}.html`, path.join(p, 'index.html')].map((c) => path.join(OUT, c));
    const datei = kandidaten.find((c) => c.startsWith(OUT) && fs.existsSync(c) && fs.statSync(c).isFile());
    if (!datei) { res.writeHead(404, { 'content-type': 'text/html' }); return res.end(fs.existsSync(path.join(OUT, '404.html')) ? fs.readFileSync(path.join(OUT, '404.html')) : '404'); }
    res.writeHead(200, { 'content-type': MIME[path.extname(datei)] || 'application/octet-stream' });
    fs.createReadStream(datei).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await startServer(Number(process.argv[2]) || 4173);
  console.log(`http://localhost:${server.address().port}`);
}
