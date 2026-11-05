import { expect, test, type Page } from '@playwright/test';

/**
 * Nutzerwege: ein Besucher klickt nur, was er sieht – keine direkten URL-Aufrufe
 * (außer dem Einstieg). Läuft auf Desktop und Handy (siehe playwright.config.ts).
 * Neue sichtbare Änderung an der Website? Weg hier im selben PR erweitern (AGENTS.md).
 */

/** Klickt einen sichtbaren Link im Bereich und wartet auf die neue Seite. */
async function klick(page: Page, bereich: string, name: string | RegExp) {
  const link = page.locator(bereich).getByRole('link', { name }).first();
  await link.scrollIntoViewIfNeeded();
  await expect(link, `Link „${name}“ in ${bereich} sichtbar`).toBeVisible();
  await Promise.all([page.waitForLoadState('load'), link.click()]);
}

async function heading(page: Page) {
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
}

test.describe('Nutzerweg', () => {
  test('Weg 1: Startseite → alle Hauptseiten über die Navigation', async ({ page }) => {
    const ziele: [string, RegExp][] = [
      ['Referenz', /referenz/],
      ['Über mich', /ueber-mich/],
      ['Kontakt', /kontakt/],
    ];
    for (const [name, pfad] of ziele) {
      await page.goto('/');
      await heading(page);
      await klick(page, 'header nav[aria-label="Hauptnavigation"]', name);
      await expect(page).toHaveURL(pfad);
      await heading(page);
    }
  });

  test('Weg 2: Footer → Leistungsseiten und Automatisierungs-Check', async ({ page }) => {
    await page.goto('/');
    const anzahl = await page.locator('footer nav[aria-label="Leistungen"] a').count();
    expect(anzahl, 'Leistungen im Footer').toBeGreaterThanOrEqual(4);
    for (let i = 0; i < anzahl; i++) {
      await page.goto('/');
      const link = page.locator('footer nav[aria-label="Leistungen"] a').nth(i);
      await link.scrollIntoViewIfNeeded();
      await Promise.all([page.waitForLoadState('load'), link.click()]);
      await expect(page).toHaveURL(/leistungen\//);
      await heading(page);
    }
    await page.goto('/');
    await klick(page, 'footer', /Automatisierungs-Check/);
    await expect(page).toHaveURL(/automatisierungs-check/);
    await heading(page);
  });

  test('Weg 3: Impressum und Datenschutz erreichbar', async ({ page }) => {
    const ziele: [string, RegExp][] = [
      ['Impressum', /impressum/],
      ['Datenschutz', /datenschutz/],
    ];
    for (const [name, pfad] of ziele) {
      await page.goto('/');
      await klick(page, 'footer nav[aria-label="Rechtliches"]', name);
      await expect(page).toHaveURL(pfad);
      await heading(page);
    }
  });

  test('Weg 4: Kontaktweg bis vor das Absenden', async ({ page }) => {
    await page.goto('/');
    await klick(page, 'header', /Doku-Check buchen/);
    await expect(page).toHaveURL(/kontakt/);

    // Schritt 1: Thema wählen
    await page.getByRole('button', { name: 'KI / Automatisierung' }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();
    // Schritt 2: Situation, Zeitrahmen
    await page.getByRole('button', { name: 'Neu starten' }).click();
    await page.getByRole('button', { name: 'Flexibel' }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();
    // Schritt 3: Budget (optional)
    await page.getByRole('button', { name: 'Noch unklar' }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();
    // Schritt 4: Felder ausfüllen – aber NICHT absenden
    await page.getByLabel('Kurze Projektbeschreibung').fill('Nutzerweg-Test, bitte ignorieren.');
    await page.getByLabel('Name', { exact: true }).fill('Nutzerweg Test');
    await page.getByLabel('E-Mail').fill('nutzerweg@example.invalid');
    const senden = page.getByRole('button', { name: 'Anfrage senden' });
    await senden.scrollIntoViewIfNeeded();
    await expect(senden).toBeVisible();
    await expect(senden).toBeEnabled();
    await expect(page.getByRole('link', { name: 'Datenschutzerklärung' })).toBeVisible();
  });

  test('Weg 6: Referenz → Fallstudie stromlauf-ai, ohne Konsolenfehler', async ({ page }) => {
    const fehler: string[] = [];
    page.on('pageerror', (e) => fehler.push(e.message));
    page.on('console', (m) => m.type() === 'error' && !/favicon|umami/i.test(m.text()) && fehler.push(m.text()));
    await page.goto('/');
    await klick(page, 'header nav[aria-label="Hauptnavigation"]', 'Referenz');
    await klick(page, 'main', /Fallstudie: KI für Stromlaufpläne/);
    await expect(page).toHaveURL(/referenz\/stromlauf-ai/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Stromlaufpläne');
    await expect(page.getByRole('heading', { level: 2, name: /Messwerte/ })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /Grenzen/ })).toBeVisible();
    expect(fehler, 'Konsolenfehler').toEqual([]);
  });

  test('Weg 7: Automatisierungs-Check → Beispiel-Ergebnis als PDF', async ({ page, request }) => {
    await page.goto('/');
    await klick(page, 'footer', /Automatisierungs-Check/);
    const link = page.getByRole('link', { name: /Beispiel-Ergebnis ansehen \(PDF, \d+ KB\)/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
    const antwort = await request.get(new URL((await link.getAttribute('href')) as string, page.url()).href);
    expect(antwort.status()).toBe(200);
    expect(antwort.headers()['content-type']).toContain('pdf');
  });

  test('Weg 8: Footer → Wissen → Artikel, ohne Konsolenfehler', async ({ page }) => {
    const fehler: string[] = [];
    page.on('pageerror', (e) => fehler.push(e.message));
    page.on('console', (m) => m.type() === 'error' && !/favicon|umami/i.test(m.text()) && fehler.push(m.text()));
    await page.goto('/');
    await klick(page, 'footer', 'Wissen');
    await expect(page).toHaveURL(/wissen/);
    await heading(page);
    await klick(page, 'main', /Stromlaufpläne mit KI auswerten/);
    await expect(page).toHaveURL(/wissen\/stromlaufplaene-mit-ki-auswerten/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Stromlaufpläne mit KI auswerten');
    await expect(page.getByRole('heading', { level: 2, name: /Grenzen/ })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Quellen' })).toBeVisible();
    await klick(page, 'main', /Stromlaufplan-KI/);
    await expect(page).toHaveURL(/leistungen\/stromlaufplan-ki/);
    expect(fehler, 'Konsolenfehler').toEqual([]);
  });

  test('Weg 5: keine toten internen Links', async ({ page, request, baseURL }) => {
    const origin = new URL(baseURL as string).origin;
    const seiten: string[] = ['/'];
    const geladen = new Set<string>();
    const tot: string[] = [];

    for (let i = 0; i < seiten.length && i < 60; i++) {
      const url = seiten[i];
      if (geladen.has(url)) continue;
      if (/\.pdf($|\?)/.test(url)) continue; // PDF wird unten per Anfrage geprüft, kein Seitenaufruf
      geladen.add(url);
      const antwort = await page.goto(url);
      if (!antwort || antwort.status() >= 400) {
        tot.push(`${url} → ${antwort?.status()}`);
        continue;
      }
      const hrefs = await page.$$eval('a[href]', (as) =>
        as.map((a) => (a as HTMLAnchorElement).href),
      );
      for (const h of hrefs) {
        const u = new URL(h);
        if (u.protocol !== 'http:' && u.protocol !== 'https:') continue;
        if (u.origin !== origin) continue;
        const pfad = u.pathname + u.search;
        if (!seiten.includes(pfad)) seiten.push(pfad);
      }
    }
    for (const s of seiten) {
      if (geladen.has(s)) continue;
      const r = await request.get(origin + s);
      if (r.status() >= 400) tot.push(`${s} → ${r.status()}`);
    }
    expect(tot, 'tote Links').toEqual([]);
  });
});
