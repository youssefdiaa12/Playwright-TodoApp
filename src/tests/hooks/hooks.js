"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const pageFixture_1 = require("./pageFixture");
let page;
let browser;
// BeforeAll works like global setup for Cucumber tests only once before all tests
//Before works like beforeEach hook for Cucumber tests before each scenario
(0, cucumber_1.Before)(async function () {
    browser = await test_1.chromium.launch({ headless: false });
    page = await browser.newPage();
    pageFixture_1.pageFixture.page = page;
});
(0, cucumber_1.After)(async function () {
    // Code to clean up after all tests, e.g., close browser  
    await pageFixture_1.pageFixture.page.close();
    await browser.close();
});
