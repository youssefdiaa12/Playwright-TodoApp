import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('SauceDemo - Product details', () => {
  test('Open product detail and add to cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);

    await login.goto('/');
    await login.login('standard_user', 'secret_sauce');
    await inventory.isVisible();

    const name = 'Sauce Labs Backpack';
    await inventory.openProductDetailByName(name);
    await product.isVisible(name);
    await product.addToCart();
    await product.backToProducts();
    await inventory.openCart();
  });
});
