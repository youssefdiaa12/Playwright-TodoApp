import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('SauceDemo - Checkout validation', () => {
  test('Missing customer info should block continue', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto('/');
    await login.login('standard_user', 'secret_sauce');
    await inventory.isVisible();

    await inventory.addProductToCartByName('Sauce Labs Backpack');
    await inventory.openCart();
    await cart.checkout();

    // Leave fields blank
    await checkout.enterCustomerInfo('', '', '');
    // Expect validation error on page
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
  });
});
