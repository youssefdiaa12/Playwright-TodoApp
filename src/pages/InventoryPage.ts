import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isVisible() {
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  productCardLocatorByName(name: string) {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  async addProductToCartByName(name: string) {
    const card = this.productCardLocatorByName(name);
    await expect(card).toBeVisible();
    await card.locator('button').filter({ hasText: 'Add to cart' }).click();
  }

  async removeProductFromCartByName(name: string) {
    const card = this.productCardLocatorByName(name);
    await card.locator('button').filter({ hasText: 'Remove' }).click();
  }

  async openCart() {
    await this.page.click('a.shopping_cart_link');
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.count() === 0) return 0;
    return Number((await badge.textContent()) || '0');
  }

  async openProductDetailByName(name: string) {
    const card = this.productCardLocatorByName(name);
    await card.locator('.inventory_item_name').click();
  }
}
