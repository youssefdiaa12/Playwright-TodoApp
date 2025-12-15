
// dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Function', () => {
  test('Exploring', async ({ page }) => {
    // This will start with the authenticated storage state
    await page.goto('/dashboard'); // baseURL is used from config

    // Verify you are authenticated
    await expect(page.getByRole('link', { name: 'Vending' })).toBeVisible();

    // Proceed with your actions
    await page.getByRole('link', { name: 'Vending' }).click();
    // page.pause(); // keep only for debugging
  });
});
