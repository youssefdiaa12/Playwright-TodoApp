import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('SauceDemo - Checkout flows', () => {
  test('Checkout — Happy path', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    // Login
    await login.goto('/');
    await login.login('standard_user', 'secret_sauce');
    await inventory.isVisible();

    // Add a product
    const productName = 'Sauce Labs Backpack';
    await inventory.addProductToCartByName(productName);

    // Go to cart and checkout
    await inventory.openCart();
    await cart.isVisible();
    await cart.hasProduct(productName);

    await cart.checkout();

    // Fill information & continue
    await checkout.enterCustomerInfo('Test', 'User', '12345');

    // Verify overview then finish
    await checkout.overviewIsVisible();
    await checkout.finishOrder();

    // Verification
    await checkout.confirmationIsVisible();
  });
});
