import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
test.describe('SauceDemo - Authentication', () => {
  test('Login — Happy path', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    // Navigate to login page
    await login.goto('/');
    await login.ensureVisible();

    // Perform login
    await login.login('standard_user', 'secret_sauce');

    // Verify inventory
    await inventory.isVisible();
  });
});
