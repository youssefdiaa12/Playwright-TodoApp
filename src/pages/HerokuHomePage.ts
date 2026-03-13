import BasePage from "./BasePage";
import { Locator, Page } from "playwright";

export default class HerokuHomePage extends BasePage {
  private readonly formAuthLink: Locator;

  constructor(page: Page) {
    super(page);
    this.formAuthLink = this.page.locator('a[href="/login"]');
  }

  async goToFormAuthentication() {
    await this.clickOnElement(this.formAuthLink);
  }
}
