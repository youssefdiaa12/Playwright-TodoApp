"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const pageFixture_1 = require("../hooks/pageFixture");
(0, cucumber_1.Given)('User search for a {string}', async function (book) {
    await pageFixture_1.pageFixture.page.locator("input[type='search']").fill(book);
    await pageFixture_1.pageFixture.page.locator("input[type='search']").press('Enter');
});
(0, cucumber_1.When)('User adds the book to the cart', async () => {
    // Implement step: User clicks on the login button
    await pageFixture_1.pageFixture.page.locator("button:has-text('Add to Cart')").click();
});
(0, cucumber_1.Then)('The Cart badge should be updated', async () => {
    // Implement step: Login should be successful
    const cartBadgeContent = await pageFixture_1.pageFixture.page.locator("#mat-badge-content-0").textContent();
    console.log(cartBadgeContent);
});
