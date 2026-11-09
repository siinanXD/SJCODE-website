import { expect, test, type Locator } from '@playwright/test';

/**
 * Startseite mit `prefers-reduced-motion: reduce` (SIN-1505, Fertig-Kriterium aus SIN-737):
 * Der Text bleibt ohne Animation lesbar, und es läuft keine Animation.
 */

/** Sichtbar und voll deckend, ohne dass vorher gescrollt wurde (kein Einblenden per Scroll). */
async function lesbar(ziel: Locator, name: string) {
  await expect(ziel, `${name} sichtbar`).toBeVisible();
  const deckkraft = await ziel.evaluate((el) => {
    let wert = 1;
    for (let e: Element | null = el; e; e = e.parentElement) wert *= Number(getComputedStyle(e).opacity);
    return wert;
  });
  expect(deckkraft, `${name} voll deckend`).toBe(1);
}

test.describe('Startseite mit reduzierter Bewegung', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('Headline, Problem-Zahlen, Leistungen und Termin-Button sind ohne Scrollen lesbar', async ({ page }) => {
    await lesbar(page.locator('#hero h1'), 'Hero-Headline');
    await lesbar(page.locator('#hero').getByRole('link', { name: /Doku-Check buchen/ }), 'Termin-Button');

    const zahlen = page.locator('#problem .hm-facts li');
    await expect(zahlen).toHaveCount(3);
    for (let i = 0; i < 3; i++) await lesbar(zahlen.nth(i), `Problem-Zahl ${i + 1}`);

    for (const k of ['-K1', '-K2', '-K3', '-K4']) {
      await lesbar(page.locator('#leistungen .hm-circuit').filter({ hasText: k }), `Leistung ${k}`);
    }
    expect(await page.evaluate(() => window.scrollY), 'Test hat nicht gescrollt').toBe(0);
  });

  test('keine Animation und kein Übergang länger als 0,01 s', async ({ page }) => {
    // Szenen-Elemente: Scroll-Szenen 1–2 (#schrank) und 3–4 (#stromlauf) samt Inhalt.
    const funde = await page.evaluate(() => {
      const laengste = (wert: string) =>
        Math.max(...wert.split(',').map((t) => (t.trim().endsWith('ms') ? parseFloat(t) / 1000 : parseFloat(t))));
      const liste: string[] = [];
      const szenen = document.querySelectorAll('#schrank, #schrank *, #stromlauf, #stromlauf *');
      for (const el of szenen) {
        const s = getComputedStyle(el);
        const wer = `${el.tagName.toLowerCase()}.${el.getAttribute('class') ?? ''}`;
        if (s.animationName !== 'none' && laengste(s.animationDuration) > 0.01) liste.push(`${wer}: animation ${s.animationDuration}`);
        if (laengste(s.transitionDuration) > 0.01) liste.push(`${wer}: transition ${s.transitionDuration}`);
      }
      return { anzahl: szenen.length, liste: [...new Set(liste)] };
    });
    expect(funde.anzahl, 'Szenen-Elemente gefunden').toBeGreaterThan(0);
    expect(funde.liste, 'Animationen/Übergänge in den Szenen').toEqual([]);

    // Auf der ganzen Seite läuft nichts (CSS-Animationen, Übergänge, Web Animations).
    const laufend = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
    expect(laufend, 'laufende Animationen auf der Seite').toBe(0);
  });
});
