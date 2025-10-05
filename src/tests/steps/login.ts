import {Given, Then, When} from '@cucumber/cucumber';
import { expect} from "@playwright/test";
import { pageFixture } from '../hooks/pageFixture';

Given('User navigates to the application', async () => {
    await pageFixture.page.goto("https://bookcart.azurewebsites.net/");
});



  Given('User click on the login link', async () => {
    //span[normalize-space()='Login']
    await pageFixture.page.locator("span:has-text('Login')").click();
  });
  
  Given('User enter the username as {string}', async function (username: string) {
      // Implement step: User enters the username
      await pageFixture.page.locator("input[formcontrolname='username']").fill(username);
  });
  Given('User enter the password as {string}', async function (password: string) {
        await pageFixture.page.locator("input[formcontrolname='password']").fill(password);
      // Implement step: User enters the password
  });
  
  When('User click on the login button', async () => {
      // Implement step: User clicks on the login button
    await pageFixture.page.locator("mat-card-actions").getByRole('button', { name: 'Login' }).click();
  });

  Then('Login should be success', async () => {
      // Implement step: Login should be successful
      await expect(pageFixture.page.locator("//span[contains(text(),'ortoni11')]")).toBeVisible();
  });


Then('Login should fail', async () => {
    // Implement step: Login should fail
             let element=pageFixture.page.locator("span:has-text('New user?')");
             await expect(element).toBeVisible();
            
            });