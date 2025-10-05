"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const pageFixture_1 = require("../hooks/pageFixture");
(0, cucumber_1.Given)('User navigates to the application', async () => {
    await pageFixture_1.pageFixture.page.goto("https://bookcart.azurewebsites.net/");
});
(0, cucumber_1.Given)('User click on the login link', async () => {
    //span[normalize-space()='Login']
    await pageFixture_1.pageFixture.page.locator("span:has-text('Login')").click();
});
(0, cucumber_1.Given)('User enter the username as {string}', async function (username) {
    // Implement step: User enters the username
    await pageFixture_1.pageFixture.page.locator("input[formcontrolname='username']").fill(username);
});
(0, cucumber_1.Given)('User enter the password as {string}', async function (password) {
    await pageFixture_1.pageFixture.page.locator("input[formcontrolname='password']").fill(password);
    // Implement step: User enters the password
});
(0, cucumber_1.When)('User click on the login button', async () => {
    // Implement step: User clicks on the login button
    await pageFixture_1.pageFixture.page.locator("mat-card-actions").getByRole('button', { name: 'Login' }).click();
});
(0, cucumber_1.Then)('Login should be success', async () => {
    // Implement step: Login should be successful
    await (0, test_1.expect)(pageFixture_1.pageFixture.page.locator("//span[contains(text(),'ortoni11')]")).toBeVisible();
});
(0, cucumber_1.Then)('Login should fail', async () => {
    // Implement step: Login should fail
    let element = pageFixture_1.pageFixture.page.locator("span:has-text('New user?')");
    await (0, test_1.expect)(element).toBeVisible();
});
