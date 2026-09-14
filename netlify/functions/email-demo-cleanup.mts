/**
 * Geplante Bereinigung der Demo-Zähler (Netlify Scheduled Function).
 *
 * Läuft täglich um 03:00 UTC und löscht alle Zähler im Store „email-demo“,
 * die nicht von heute oder gestern stammen – unabhängig davon, ob die Demo
 * zwischenzeitlich genutzt wurde. Damit gilt die in der Datenschutzerklärung
 * zugesagte Löschfrist auch ohne weitere Aufrufe.
 *
 * Die Schlüssel enden auf das Datum (YYYY-MM-DD), siehe email-check.mts.
 */

import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

export default async () => {
  const store = getStore({ name: 'email-demo', consistency: 'strong' });
  const today = dayKey(new Date());
  const yesterday = dayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const keep = new Set([today, yesterday]);

  const { blobs } = await store.list();
  const stale = blobs.map((b) => b.key).filter((k) => !keep.has(k.slice(-10)));
  await Promise.all(stale.map((k) => store.delete(k)));

  console.log(`Demo-Bereinigung: ${stale.length} von ${blobs.length} Einträgen gelöscht`);
  return new Response(JSON.stringify({ deleted: stale.length, kept: blobs.length - stale.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config: Config = {
  schedule: '0 3 * * *',
};
