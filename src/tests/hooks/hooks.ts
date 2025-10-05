import { Before, After} from '@cucumber/cucumber';
import {  type Browser, chromium, type Page } from '@playwright/test';
import { pageFixture } from "./pageFixture";
let page: Page;
let browser: Browser;
// BeforeAll works like global setup for Cucumber tests only once before all tests
//Before works like beforeEach hook for Cucumber tests before each scenario
Before(async function() {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    pageFixture.page = page;
});

After(async function()  {
  // Code to clean up after all tests, e.g., close browser  
  await  pageFixture.page.close();
    await browser.close();
});