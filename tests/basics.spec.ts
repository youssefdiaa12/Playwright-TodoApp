    import {test, expect} from '@playwright/test';
    // Important note please make sure fully parallel is false.

    // Incase of group testcases related to same suite we can use test.describe.
    test.describe("Login Function",async ()=>{

    // before all will run before all the test cases just one time
    test.beforeAll("will run before all the test cases for one time",async()=>{
    console.log("I'm before all");
    });

    test ("Checking Title Page 1",async({page})=>{
        await page.goto("https://qacart-todo.herokuapp.com");
        var title = await page.title();
        //QAcart Todo App - Login page
        console.log("Hello "+title);
        expect(title).toEqual("QAcart Todo App - Login page");
        // or expect(page).toHaveTitle("QAcart Todo App - Login page")
    }
    );



   test ("Checking URL Page 1",async({page})=>{
        await page.goto("https://qacart-todo.herokuapp.com/login");
        expect(page).toHaveURL("https://qacart-todo.herokuapp.com/login");
    }
    );

 test ("Header should be visible by text",async({page})=>{
        await page.goto("https://qacart-todo.herokuapp.com/login");
        const header = page.locator("text=Login to Application")
        // i want it to be case senstive? easy one just make page.locator('text="Login to Application"')
        expect(header).toBeVisible();
    }
    );


    test ("Checking Title Page 2",async()=>{
    console.log("Hello");});

    // skip & only: skip will skip this test case while only will run this test case only
    // test.only("just run it only",async()=>{
    // console.log("hello there");
    // });

    //before each & after each works befor each test case & after each test case
    test.beforeEach("Will run before each test case",async ()=>{
    console.log("I'm before each test case");
});

});


