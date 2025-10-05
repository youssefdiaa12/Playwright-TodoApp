    import {test, expect} from '@playwright/test';
import { time, timeLog } from 'console';
    // Important note please make sure fully parallel is false.

    // Incase of group testcases related to same suite we can use test.describe.
    test.describe("Login Function",async ()=>{

    // before all will run before all the test cases just one time
    test.beforeAll("will run before all the test cases for one time",async()=>{
    console.log("I'm before all");
    });

    test ("Checking Title Page 1",async({page})=>{
        var title = await page.title();
        //QAcart Todo App - Login page
        console.log("Hello "+title);
        expect(title).toEqual("QAcart Todo App - Login page");
        // or expect(page).toHaveTitle("QAcart Todo App - Login page")
    }
    );



   test ("Checking URL Page 1",async({page})=>{
        await expect(page).toHaveURL("https://qacart-todo.herokuapp.com/login");
    }
    );

 test ("Header should be visible by text",async({page})=>{
        const header = page.locator("text=Login to Application")
        // i want it to be case senstive? easy one just make 
        // const header = page.locator('text="Login to Application"')
       await expect(header).toBeVisible();
    }
    );
    
    test("Reach the Element using class name",async({page})=>{
    const header= page.locator(".header");
    await expect(header).toBeVisible();
    });
    

    test("Reach the Element using ID",async({page})=>{
    const login= page.locator("#login");
    await login.fill("myUser@gmail.com");
    //login.click();
    await expect(login).toHaveValue("myUser@gmail.com");

    });
    
    test("Reach the Element using attribute",async({page})=>{
    const password= page.locator('[data-testid="password"]');
    await password.fill("12345");
    await page.pause();
    await expect(password).toHaveValue("12345");
    });
    test("Reach the Element using XPath",async({page})=>{
    
        // tagname [@attribute="value"]
    const password= page.locator("//input[@id='password']");
    await expect(password).toBeVisible();
    });

       test("Reach the Element using Combined text and TagName",async({page})=>{
    const Submit= page.locator('button:has-text("Login")');
    await expect(Submit).toBeVisible();
    });
    
    // skip & only: skip will skip this test case while only will run this test case only
    // test.only("just run it only",async()=>{
    // console.log("hello there");
    // });

    //before each & after each works befor each test case & after each test case
    test.beforeEach("Will run before each test case",async ({page})=>{
          await page.goto("https://qacart-todo.herokuapp.com/login");
    console.log("I'm before each test case");
});

    test("Test Case for learning waits",async ({page})=>{

        //hard coded wait in playwright
        await page.waitForTimeout(5000);
        //conditional wait
        const login= page.locator("#login");
        login.waitFor({state:'attached', timeout:5000});
    
        await expect(login).toBeVisible({timeout:5000});

        //wait for navigation
        await page.waitForURL("https://qacart-todo.herokuapp.com/login");
        console.log("I'm inside test case");
});


    

});


