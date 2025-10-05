"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const pageFixture_1 = require("./pageFixture");
let page;
let browser;
let context;
// BeforeAll works like global setup for Cucumber tests only once before all tests
//Before works like beforeEach hook for Cucumber tests before each scenario
(0, cucumber_1.BeforeAll)(async function () {
    browser = await test_1.chromium.launch({ headless: false });
});
(0, cucumber_1.Before)(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture_1.pageFixture.page = page;
});
(0, cucumber_1.After)(async function ({ pickle, result }) {
    // Code to clean up after all tests, e.g., close browser  
    if (result?.status == cucumber_1.Status.FAILED) {
        const img = await pageFixture_1.pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
        this.attach(img, "image/png");
    }
    await pageFixture_1.pageFixture.page.close();
    await context.close();
});
(0, cucumber_1.AfterAll)(async function () {
    await browser.close();
});
