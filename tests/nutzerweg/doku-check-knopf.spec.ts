import { expect, test } from '@playwright/test';

/**
 * Doku-Check-Knopf auf der Startseite (SIN-1596, Fertig-Kriterium aus SIN-737):
 * Der Link steht in Hero, Scroll-Animation, Ablauf und Abschluss, zeigt überall auf
 * dasselbe Ziel wie der Header-Knopf und ist nicht verdeckt. Es wird nicht wirklich geklickt.
 */
const LABEL = 'Doku-Check buchen · 30 Min kostenlos';
const ORTE = ['#hero', '#stromlauf', '#ablauf', '#kontakt'];

test('Doku-Check-Knopf steht an vier Stellen und ist klickbar', async ({ page }) => {
  await page.goto('/');
  const ziel = await page.locator('header .hm-nav-cta').getAttribute('href');
  expect(ziel, 'Ziel des Header-Knopfs (DOKU_CHECK_HREF)').toBeTruthy();

  for (const ort of ORTE) {
    const link = page.locator(ort).getByRole('link', { name: LABEL, exact: true });
    await expect(link, `genau ein Knopf in ${ort}`).toHaveCount(1);
    await expect(link, `Ziel in ${ort}`).toHaveAttribute('href', ziel as string);
    await link.scrollIntoViewIfNeeded();
    await expect(link, `Knopf in ${ort} sichtbar`).toBeVisible();
    // trial: prüft Sichtbarkeit und Verdeckung wie ein echter Klick, klickt aber nicht.
    await link.click({ trial: true });
  }
  expect(new URL(page.url()).pathname, 'Seite nicht verlassen').toBe('/');
});
