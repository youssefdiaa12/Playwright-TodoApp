import {test, expect} from '@playwright/test';



test.describe("E2E Scenario for completed todos",async()=>{

    test("Login Function",async({page})=>{
        await page.goto("https://qacart-todo.herokuapp.com/login");
        await page.locator("#email").fill("youssefdiaa22@icloud.com");
        await page.locator('[data-testid="password"]').fill("Serion2005@");
        // alternate way const submit= page.locator(".login-button");
        // await submit.click();
        await page.locator("#submit").click();
        await expect(page).toHaveURL("https://qacart-todo.herokuapp.com/todo");
        // click add button to add new todo
        await page.getByTestId('add').click();
        // fill the new todo with value test
        await page.locator('[data-testid="new-todo"]').fill("test");
        // click add button to add new todo
        await page.locator("span:has-text('Create Todo')").click();
        // check that the todo is added and visible
        await expect(page.getByTestId('todo-text').first()).toHaveText('test');
        // check the first todo
        await page.getByTestId('complete-task').first().click();
        // check that the first todo is completed
        const FirstItem= page.getByTestId('todo-item').first();
        await expect(FirstItem).toHaveCSS("background-color","rgb(33, 76, 97)");
      

    }
    );
}

    );