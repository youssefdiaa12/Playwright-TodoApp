import {test} from "playwright/test";

test("Visualizing testing", async ({page}) => {
   page.goto("https://the-internet.herokuapp.com/");
   const title = page.locator('.login_logo');
   const loginBtn = page.locator('[id="login-button"]')

      await page.screenshot({path:"screenshot.png"});
      await title.screenshot({path:"title.png"});
        await loginBtn.screenshot({path:"loginBtn.png"});
        expect(title).toMatchSnapshot("title.png");
        expect(loginBtn).toMatchSnapshot("loginBtn.png");
        expect(page.screenshot()).toMatchSnapshot("screenshot.png");
});

