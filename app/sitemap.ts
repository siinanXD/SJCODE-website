import type { MetadataRoute } from 'next';

/**
 * Sitemap zur Build-Zeit erzeugen.
 *
 * Vorher lag eine statische `public/sitemap.xml` mit fest eingetragenem
 * `lastmod` (2026-07-09) – das veraltet bei jeder Änderung und meldete Google
 * falsche Daten.
 *
 * `lastModified` ist jetzt das Build-Datum: Jeder Deploy bedeutet, dass
 * geänderter Inhalt ausgeliefert wird, damit bleibt die Angabe plausibel und
 * läuft nicht mehr weg.
 *
 * Impressum und Datenschutz stehen bewusst NICHT hier: beide sind auf
 * `robots: { index: false }` gesetzt. Noindex-Seiten in der Sitemap meldet die
 * Search Console als Fehler („Übermittelte URL als noindex markiert“).
 *
 * URLs mit `.html` – konsistent zum restlichen Seitenschema (`output: 'export'`).
 */
// Bei `output: 'export'` muss die Route ausdrücklich statisch sein.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = 'https://sjcode.de';

  const pages: { path: string; priority: number; changeFrequency: 'monthly' }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/leistungen.html', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/referenz.html', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/kontakt.html', priority: 0.8, changeFrequency: 'monthly' },
  ];

  return pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
