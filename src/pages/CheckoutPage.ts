import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async enterCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('input#first-name', firstName);
    await this.page.fill('input#last-name', lastName);
    await this.page.fill('input#postal-code', postalCode);
    await this.page.click('[data-test="continue"]');
  }

  async overviewIsVisible() {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
  }

  async finishOrder() {
    await this.page.click('[data-test="finish"]');
  }

  async confirmationIsVisible() {
    // Accept the confirmation header text case-insensitively to match the app text
    await expect(this.page.locator('.complete-header')).toHaveText(/thank you for your order/i);
  }
}
