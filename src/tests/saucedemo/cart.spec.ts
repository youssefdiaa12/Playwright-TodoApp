import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('SauceDemo - Cart flows', () => {
  test('Add and remove a product from cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    // Login
    await login.goto('/');
    await login.login('standard_user', 'secret_sauce');
    await inventory.isVisible();

    const productName = 'Sauce Labs Backpack';

    // Add product
    await inventory.addProductToCartByName(productName);

    // Cart badge increments
    const badge = await inventory.getCartBadgeCount();
    expect(badge).toBeGreaterThanOrEqual(1);

    // Open cart and verify product
    await inventory.openCart();
    await cart.isVisible();
    await cart.hasProduct(productName);

    // Remove product and verify badge / absence
    await cart.removeProduct(productName);
    // After removal, either badge disappears or shows 0
    // We check product not present
    await expect(page.locator('.cart_item').filter({ hasText: productName })).toHaveCount(0);
  });
});
