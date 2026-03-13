import BasePage from "./BasePage";
import { Locator, Page } from "playwright";

export type HerokuCredentials = {
  username: string;
  password: string;
};

export default class HerokuLoginPage extends BasePage {
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly flashMessage: Locator;
  private readonly credentialHint: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameField = this.page.locator('#username');
    this.passwordField = this.page.locator('#password');
    this.loginButton = this.page.locator('button[type="submit"]');
    this.flashMessage = this.page.locator('#flash');
    this.credentialHint = this.page.locator('div.example > h4');
  }

  async login(username: string, password: string) {
    await this.FillField(this.usernameField, username);
    await this.FillField(this.passwordField, password);
    await this.clickOnElement(this.loginButton);
  }

  async getFlashMessageText() {
    await this.flashMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.flashMessage.textContent())?.trim() ?? '';
  }

  async getCredentialsFromPage(): Promise<HerokuCredentials> {
    const hintText = (await this.credentialHint.textContent()) ?? '';

    const usernameMatch = hintText.match(/Enter\s+(\S+)\s+for the username/i);
    const passwordMatch = hintText.match(/and\s+(.+?)\s+for the password/i);

    return {
      username: usernameMatch?.[1] ?? '',
      password: passwordMatch?.[1] ?? '',
    };
  }
}
