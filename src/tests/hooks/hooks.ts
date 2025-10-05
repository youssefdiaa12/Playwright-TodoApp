
import { BeforeAll,Before, After, Given, AfterAll, Status} from '@cucumber/cucumber';
import {  type Browser, BrowserContext, chromium, type Page } from '@playwright/test';
import { pageFixture } from "./pageFixture";
let page: Page;
let browser: Browser;
let context: BrowserContext;
// BeforeAll works like global setup for Cucumber tests only once before all tests
//Before works like beforeEach hook for Cucumber tests before each scenario

BeforeAll(async function() {
    browser = await chromium.launch({ headless: false });
  
});


Before(async function() {
  context=await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;
    
});

After(async function({pickle,result})  {
  // Code to clean up after all tests, e.g., close browser  
if(result?.status==Status.FAILED){
 const img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`,type:"png"}); 
        this.attach(img,"image/png")
}
        await  pageFixture.page.close();
        await context.close();
});
AfterAll(async function () {
  await browser.close();
});