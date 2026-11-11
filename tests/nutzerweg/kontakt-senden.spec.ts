import { expect, test, type Page, type Request } from '@playwright/test';

/**
 * Kontaktformular-Nachweis (SIN-1580): Absenden bis zur Danke-Seite.
 * Die Anfrage an Formspree wird abgefangen und hier beantwortet. Es geht nie
 * eine echte Anfrage raus, auch nicht gegen die Live-Seite – sie würde eine Mail auslösen.
 */
const FORMSPREE = /^https:\/\/formspree\.io\//;
const ENDPUNKT = 'https://formspree.io/f/mojorgeb';

const EINGABE = {
  nachricht: 'Nutzerweg-Test, bitte ignorieren.',
  name: 'Nutzerweg Test',
  email: 'nutzerweg@example.invalid',
};

/** Fängt jede Anfrage an Formspree ab und antwortet mit `status`. */
async function formspreeAbfangen(page: Page, status: number) {
  const anfragen: Request[] = [];
  await page.route(FORMSPREE, async (route) => {
    anfragen.push(route.request());
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(status < 400 ? { ok: true } : { error: 'Testfehler' }),
    });
  });
  // Umami sperren: Der Test soll kein Ereignis „anfrage-gesendet“ in die echte Statistik schreiben.
  await page.route(/umami/, (route) => route.abort());
  return anfragen;
}

/** Klickt die Schritte 1–3 durch und füllt Schritt 4 aus (wie Weg 4 in nutzerweg.spec.ts). */
async function ausfuellen(page: Page) {
  await page.goto('/kontakt.html');
  await page.getByRole('button', { name: 'KI / Automatisierung' }).click();
  await page.getByRole('button', { name: /Weiter/ }).click();
  await page.getByRole('button', { name: 'Neu starten' }).click();
  await page.getByRole('button', { name: 'Flexibel' }).click();
  await page.getByRole('button', { name: /Weiter/ }).click();
  await page.getByRole('button', { name: 'Noch unklar' }).click();
  await page.getByRole('button', { name: /Weiter/ }).click();
  await page.getByLabel('Kurze Projektbeschreibung').fill(EINGABE.nachricht);
  await page.getByLabel('Name', { exact: true }).fill(EINGABE.name);
  await page.getByLabel('E-Mail').fill(EINGABE.email);
}

test.describe('Kontaktformular senden (Formspree abgefangen)', () => {
  test('Absenden schickt Name, E-Mail und Nachricht und führt auf /danke', async ({ page }) => {
    const anfragen = await formspreeAbfangen(page, 200);
    await ausfuellen(page);
    await expect(page.locator('#company-website'), 'Honeypot bleibt leer').toHaveValue('');

    await page.getByRole('button', { name: 'Anfrage senden' }).click();
    await expect(page).toHaveURL(/\/danke/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    expect(anfragen, 'genau eine Anfrage an Formspree').toHaveLength(1);
    expect(anfragen[0].url()).toBe(ENDPUNKT);
    expect(anfragen[0].method()).toBe('POST');
    expect(anfragen[0].postDataJSON()).toMatchObject(EINGABE);
  });

  test('Fehler von Formspree zeigt eine Meldung und leitet nicht weiter', async ({ page }) => {
    const anfragen = await formspreeAbfangen(page, 500);
    await ausfuellen(page);

    await page.getByRole('button', { name: 'Anfrage senden' }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'Senden fehlgeschlagen' })).toBeVisible();
    await expect(page).toHaveURL(/\/kontakt/);
    await expect(page.getByRole('button', { name: 'Anfrage senden' })).toBeEnabled();
    expect(anfragen).toHaveLength(1);
  });
});
