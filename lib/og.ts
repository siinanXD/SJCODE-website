import type { Metadata } from 'next';

/**
 * Open-Graph-Felder für eine Seite zusammenbauen.
 *
 * Achtung, Next.js-Falle: Definiert eine Seite ein eigenes `openGraph`-Objekt,
 * ERSETZT das die Angaben aus `app/layout.tsx` komplett – die Felder werden
 * nicht zusammengeführt. Ohne diesen Helfer verlieren alle Seiten mit eigenem
 * `openGraph` die gemeinsamen Felder (`images`, `type`, `locale`, `siteName`)
 * und damit das Vorschaubild beim Teilen.
 *
 * Deshalb: gemeinsame Felder hier zentral setzen und in jeder Seite über
 * `openGraph({ ... })` verwenden.
 */
export function openGraph(page: {
  title: string;
  description: string;
  url: string;
}): Metadata['openGraph'] {
  return {
    type: 'website',
    locale: 'de_DE',
    siteName: 'SJCODE',
    images: ['/og-image.png'],
    ...page,
  };
}
