import { Given, Then } from '@cucumber/cucumber';
import { test, expect, chromium } from '@playwright/test';

let page: any;
let browser: any;
  Given("I navigate to the W3School iframe page", async function(){
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_global_contenteditable");
    });


    Then("I should see the editable paragraph", async function() {
    const title = page
      .frameLocator('iframe[name="iframeResult"]')
      .getByText("This is a paragraph. It is editable. Try to change this text.");

    await expect(title).toBeVisible();
  });

    Then("Visit google chrome and add a value in the search sequentially", async function() {
    await page.goto("https://www.google.com/");
    await page.locator('#APjFqb').pressSequentially('Playwright',{ delay: 100 });
    await page.locator('#APjFqb').press('ArrowDown+ArrowDown+ArrowDown');
    await page.locator('#APjFqb').press('Enter');
  });
