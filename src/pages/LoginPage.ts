import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async ensureVisible() {
    await expect(this.page.locator('input#user-name')).toBeVisible();
    await expect(this.page.locator('input#password')).toBeVisible();
    await expect(this.page.locator('input#login-button')).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.fill('input#user-name', username);
    await this.page.fill('input#password', password);
    await this.page.click('input#login-button');
  }

  async getErrorText() {
    const el = this.page.locator('[data-test="error"]');
    if (await el.count() === 0) return null;
    return (await el.textContent())?.trim() ?? null;
  }
}
