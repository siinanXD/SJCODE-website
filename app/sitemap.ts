import type { MetadataRoute } from 'next';
import { SERVICES, serviceUrl } from '@/lib/services';

/**
 * Sitemap zur Build-Zeit erzeugen.
 *
 * `lastModified` ist das Build-Datum: Jeder Deploy bedeutet, dass geänderter
 * Inhalt ausgeliefert wird, damit bleibt die Angabe plausibel.
 *
 * Impressum und Datenschutz stehen bewusst NICHT hier: beide sind auf
 * `robots: { index: false }` gesetzt. Noindex-Seiten in der Sitemap meldet die
 * Search Console als Fehler.
 *
 * URLs mit `.html` – konsistent zum restlichen Seitenschema (`output: 'export'`).
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = 'https://sjcode.de';

  const pages: { path: string; priority: number; changeFrequency: 'monthly' | 'weekly' }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/leistungen.html', priority: 0.9, changeFrequency: 'monthly' },
    ...SERVICES.map((s) => ({ path: serviceUrl(s), priority: 0.9, changeFrequency: 'monthly' as const })),
    { path: '/preise.html', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/referenz.html', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/ueber-mich.html', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/kontakt.html', priority: 0.8, changeFrequency: 'monthly' },
  ];

  return pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
