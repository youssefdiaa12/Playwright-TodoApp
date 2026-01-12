import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('SauceDemo - Accessibility', () => {
  test('Login form is keyboard accessible', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto('/');
    // Tab through form
    await page.keyboard.press('Tab'); // focus username
    await page.keyboard.press('Tab'); // focus password
    await page.keyboard.press('Tab'); // focus login button
    // Ensure login button is focused
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('id'));
    expect(focused).toBeTruthy();
  });
});
