/**
 * Umami-Ereignis aus Client-Komponenten melden. Statische Links nutzen
 * stattdessen das Attribut `data-umami-event`. Schlägt still fehl, wenn das
 * Skript blockiert ist – Tracking darf nie eine Funktion kaputt machen.
 */
export function track(name: string, data?: Record<string, string | number>) {
  try {
    (window as unknown as { umami?: { track: (n: string, d?: object) => void } }).umami?.track(name, data);
  } catch {
    /* blockiert oder nicht geladen – ignorieren */
  }
}
