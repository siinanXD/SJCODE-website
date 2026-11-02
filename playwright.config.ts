import { defineConfig, devices } from '@playwright/test';

/**
 * Nutzerwege (SIN-1461): Die Website wie ein Mensch durchklicken.
 * `LIVE_URL` bestimmt das Ziel; ohne Angabe läuft der Test gegen die Produktion.
 */
const baseURL = (process.env.LIVE_URL || 'https://sjcode.de').replace(/\/+$/, '');

export default defineConfig({
  testDir: './tests/nutzerweg',
  timeout: 60_000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  outputDir: 'test-results',
  use: {
    baseURL,
    screenshot: 'on',
    trace: 'retain-on-failure',
    locale: 'de-DE',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'handy', use: { ...devices['Pixel 7'] } },
  ],
});
