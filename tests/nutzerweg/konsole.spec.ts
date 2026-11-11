import { expect, test } from '@playwright/test';

/**
 * Konsole ohne Fehler (SIN-1500): Ein CSP-Rückfall wie in SIN-1489 (Umami-Gateway
 * gesperrt) fällt sonst erst in der Klickprobe auf. Jeder `console.error` und
 * jeder `pageerror` lässt den Test scheitern.
 */
const SEITEN = ['/', '/ueber-mich.html', '/kontakt.html', '/impressum.html', '/datenschutz.html'];

/** Bekannte, nicht behebbare Fremdmeldungen: [Muster, Begründung]. Leer, solange keine nötig ist. */
const AUSNAHMEN: [RegExp, string][] = [];

test.describe('Konsole ohne Fehler', () => {
  for (const pfad of SEITEN) {
    test(`keine Konsolenfehler auf ${pfad}`, async ({ page }) => {
      const funde: string[] = [];
      page.on('console', (m) => {
        if (m.type() === 'error') funde.push(m.text());
      });
      page.on('pageerror', (e) => funde.push(`pageerror: ${e.message}`));

      // networkidle: Umami meldet den Seitenaufruf erst nach dem Laden – dort schlug die CSP zu.
      await page.goto(pfad, { waitUntil: 'networkidle' });
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

      const offen = funde.filter((f) => !AUSNAHMEN.some(([muster]) => muster.test(f)));
      expect(offen, `Konsolenfehler auf ${pfad}`).toEqual([]);
    });
  }
});
