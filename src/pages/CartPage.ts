import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isVisible() {
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
  }

  async hasProduct(name: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: name });
    await expect(item).toBeVisible();
  }

  async removeProduct(name: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: name });
    await item.locator('button').filter({ hasText: 'Remove' }).click();
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }
}
