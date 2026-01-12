import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseUrl = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(`${this.baseUrl}${path}`);
  }
}
