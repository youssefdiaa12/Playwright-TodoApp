import { expect, test } from "../Fixtures/fixture";

test.describe("The Internet - Form Authentication", () => {
  test(
    "should login using the credentials shown on the page",
    async ({ page, herokuHomePage, herokuLoginPage }) => {
      await page.goto("https://the-internet.herokuapp.com/");
      await herokuHomePage.goToFormAuthentication();

      const { username, password } = await herokuLoginPage.getCredentialsFromPage();
      await herokuLoginPage.login(username, password);

      const flashText = await herokuLoginPage.getFlashMessageText();
      expect(flashText).toMatch(/(secure area|invalid|locked|invalid username)/i);

      // Keep the browser open for a little while so the test runner can observe
      await page.waitForTimeout(10_000);
    }
  );
});
