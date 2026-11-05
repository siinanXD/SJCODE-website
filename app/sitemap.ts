import { execFileSync } from 'node:child_process';
import type { MetadataRoute } from 'next';
import { SERVICES, serviceUrl } from '@/lib/services';
import { SITE } from '@/lib/site';
import { ARTICLES, articleUrl } from '@/lib/wissen';

/**
 * Sitemap zur Build-Zeit erzeugen.
 *
 * `lastModified` ist der letzte Git-Commit der Quelldateien einer Seite. Ist Git im Build
 * nicht verfügbar oder liefert nichts (kein `.git`, flacher Klon ohne Verlauf), entfällt die
 * Angabe; das Build-Datum wäre falsch. `changefreq` und `priority` fehlen absichtlich:
 * Google ignoriert sie.
 *
 * Impressum und Datenschutz stehen bewusst NICHT hier: beide sind auf
 * `robots: { index: false }` gesetzt. Noindex-Seiten in der Sitemap meldet die
 * Search Console als Fehler.
 *
 * URLs mit `.html` – konsistent zum restlichen Seitenschema (`output: 'export'`).
 */
export const dynamic = 'force-static';

/** ISO-Datum des jüngsten Commits, der eine der Dateien berührt; sonst `undefined`. */
function lastCommit(files: string[]): string | undefined {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  // Pfad der URL und die Dateien, aus denen die Seite besteht
  const pages: { path: string; files: string[] }[] = [
    { path: '/', files: ['app/page.tsx'] },
    ...SERVICES.map((s) => ({ path: serviceUrl(s), files: ['app/leistungen/[slug]/page.tsx', 'lib/services.ts'] })),
    { path: '/automatisierungs-check.html', files: ['app/automatisierungs-check/page.tsx', 'lib/automationCheck.ts'] },
    { path: '/referenz.html', files: ['app/referenz/page.tsx'] },
    { path: '/referenz/stromlauf-ai.html', files: ['app/referenz/stromlauf-ai/page.tsx', 'lib/stromlauf.ts'] },
    { path: '/wissen.html', files: ['app/wissen/page.tsx', 'lib/wissen.ts'] },
    ...ARTICLES.map((a) => ({ path: articleUrl(a), files: ['app/wissen/[slug]/page.tsx', 'lib/wissen.ts'] })),
    { path: '/ueber-mich.html', files: ['app/ueber-mich/page.tsx'] },
    { path: '/kontakt.html', files: ['app/kontakt/page.tsx'] },
  ];

  return pages.map((p) => ({ url: `${base}${p.path}`, lastModified: lastCommit(p.files) }));
}
