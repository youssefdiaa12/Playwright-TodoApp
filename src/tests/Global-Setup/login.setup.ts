
// src/tests/login.setup.ts
import { chromium, type FullConfig } from '@playwright/test';

export default async function globalSetup(_config: FullConfig) {
  console.log('[SETUP] Starting global setup…');

  // Make it visible so you can watch the steps (you can toggle back to headless later)
  const browser = await chromium.launch({
    channel: 'msedge',   // use Edge to match your project
    headless: false,     // show the browser
    slowMo: 300          // slow actions so you can see them
  });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true, // your env uses custom cert/TLS inspection
  });

  // Optional: record a trace just for setup so you get a replay
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });

  const page = await context.newPage();

  // 1) Go to the login page on the *same origin/port* you test against
  const appOrigin = 'https://deploy-server.iskraemeco.com.eg:4400';
  console.log('[SETUP] Navigating to:', appOrigin);
  await page.goto(appOrigin, { waitUntil: 'domcontentloaded' });

  // 2) Perform UI login (update selectors if needed)
  console.log('[SETUP] Filling credentials…');
  // use this x path By.xpath("/html/body/app-root/app-login/div/div/div/div/div[2]/div[2]/span");
  
  await page.locator('xpath=/html/body/app-root/app-login/div/div/div/div/div[2]/div[2]/span').click();
  await page.locator('#email').fill('superadmin@iskra.com');
  await page.locator('#password').fill('P@ss1234');
  console.log('[SETUP] Submitting…');
  await page.getByRole('button', { name: 'Login' }).click();
  // 3) Wait until you’re truly logged in (URL or a dashboard-only element)
  console.log('[SETUP] Waiting for dashboard…');
  await page.waitForURL('**/dashboard**', { timeout: 30_000 });
  // OR (if URL doesn’t change) wait for a dashboard marker:
  // await page.getByRole('link', { name: 'Vending' }).waitFor({ timeout: 30_000 });

  // 4) Diagnostics before saving
  console.log('[SETUP] URL now:', page.url());
  const cookies = await context.cookies();
  console.log('[SETUP] Cookies:', cookies.map(c => `${c.name} (secure=${c.secure}) @ ${c.domain}${c.path}`));
  const lsDump = await page.evaluate(() => {
    const o: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)!;
      o[k] = localStorage.getItem(k)!;
    }
    return o;
  });
  console.log('[SETUP] LocalStorage keys:', Object.keys(lsDump));

  // 5) Save the combined cookies + localStorage for this origin
  console.log('[SETUP] Saving storageState.json …');
  await context.storageState({ path: 'storageState.json' });

  await context.tracing.stop({ path: 'global-setup-trace.zip' });
  await browser.close();
  console.log('[SETUP] Done.');
}
