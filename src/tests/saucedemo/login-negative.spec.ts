import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('SauceDemo - Authentication (negative)', () => {
  test('Locked out user should see error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto('/');
    await login.login('locked_out_user', 'secret_sauce');
    const err = await login.getErrorText();
    expect(err).toBeTruthy();
    expect(err?.toLowerCase()).toContain('locked');
  });

  test('Missing credentials show validation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto('/');
    await login.login('', '');
    const err = await login.getErrorText();
    expect(err).toBeTruthy();
  });
});
