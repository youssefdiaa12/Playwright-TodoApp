
// src/tests/login.setup.ts
import { chromium } from '@playwright/test';

export default async function globalSetup() {
  console.log('[SETUP] Starting global setup...');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: false,         // 👈 show the browser window
    slowMo: 300              // 👈 slow down actions to see them
  });

  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  console.log('[SETUP] Navigating to login page...');
  await page.goto('https://deploy-server.iskraemeco.com.eg:4400/', { waitUntil: 'domcontentloaded' });

  console.log('[SETUP] Filling credentials...');
  await page.locator('#email').fill('superadmin@iskra.com');
  await page.locator('[data-testid="password"]').fill('P@ss1234');

  console.log('[SETUP] Submitting...');
  await page.locator('#submit').click();

  console.log('[SETUP] Waiting for dashboard...');
  await page.waitForURL('**/dashboard**', { timeout: 30_000 });

  console.log('[SETUP] Saving storage state...');
  await context.storageState({ path: 'storageState.json' });

  await browser.close();
  console.log('[SETUP] Done.');
}
