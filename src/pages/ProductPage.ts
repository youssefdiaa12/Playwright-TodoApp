import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isVisible(productName: string) {
    await expect(this.page.locator('.inventory_details_name')).toHaveText(productName);
    await expect(this.page.locator('.inventory_details_price')).toBeVisible();
    await expect(this.page.locator('.inventory_details_desc')).toBeVisible();
  }

  async addToCart() {
    await this.page.click('button:has-text("Add to cart")');
  }

  async backToProducts() {
    await this.page.click('button.inventory_details_back_button');
  }
}
