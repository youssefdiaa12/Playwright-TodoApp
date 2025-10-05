"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
// Important note please make sure fully parallel is false.
// Incase of group testcases related to same suite we can use test.describe.
test_1.test.describe("Login Function", async () => {
    // before all will run before all the test cases just one time
    test_1.test.beforeAll("will run before all the test cases for one time", async () => {
        console.log("I'm before all");
    });
    (0, test_1.test)("Checking Title Page 1", async ({ page }) => {
        var title = await page.title();
        //QAcart Todo App - Login page
        console.log("Hello " + title);
        (0, test_1.expect)(title).toEqual("QAcart Todo App - Login page");
        // or expect(page).toHaveTitle("QAcart Todo App - Login page")
    });
    (0, test_1.test)("Checking URL Page 1", async ({ page }) => {
        await (0, test_1.expect)(page).toHaveURL("https://qacart-todo.herokuapp.com/login");
    });
    (0, test_1.test)("Header should be visible by text", async ({ page }) => {
        const header = page.locator("text=Login to Application");
        // i want it to be case senstive? easy one just make 
        // const header = page.locator('text="Login to Application"')
        await (0, test_1.expect)(header).toBeVisible();
    });
    (0, test_1.test)("Reach the Element using class name", async ({ page }) => {
        const header = page.locator(".header");
        await (0, test_1.expect)(header).toBeVisible();
    });
    (0, test_1.test)("Reach the Element using ID", async ({ page }) => {
        const login = page.locator("#login");
        await login.fill("myUser@gmail.com");
        //login.click();
        await (0, test_1.expect)(login).toHaveValue("myUser@gmail.com");
    });
    (0, test_1.test)("Reach the Element using attribute", async ({ page }) => {
        const password = page.locator('[data-testid="password"]');
        await password.fill("12345");
        await page.pause();
        await (0, test_1.expect)(password).toHaveValue("12345");
    });
    (0, test_1.test)("Reach the Element using XPath", async ({ page }) => {
        // tagname [@attribute="value"]
        const password = page.locator("//input[@id='password']");
        await (0, test_1.expect)(password).toBeVisible();
    });
    (0, test_1.test)("Reach the Element using Combined text and TagName", async ({ page }) => {
        const Submit = page.locator('button:has-text("Login")');
        await (0, test_1.expect)(Submit).toBeVisible();
    });
    // skip & only: skip will skip this test case while only will run this test case only
    // test.only("just run it only",async()=>{
    // console.log("hello there");
    // });
    //before each & after each works befor each test case & after each test case
    test_1.test.beforeEach("Will run before each test case", async ({ page }) => {
        await page.goto("https://qacart-todo.herokuapp.com/login");
        console.log("I'm before each test case");
    });
    (0, test_1.test)("Test Case for learning waits", async ({ page }) => {
        //hard coded wait in playwright
        await page.waitForTimeout(5000);
        //conditional wait
        const login = page.locator("#login");
        login.waitFor({ state: 'attached', timeout: 5000 });
        await (0, test_1.expect)(login).toBeVisible({ timeout: 5000 });
        //wait for navigation
        await page.waitForURL("https://qacart-todo.herokuapp.com/login");
        console.log("I'm inside test case");
    });
});
