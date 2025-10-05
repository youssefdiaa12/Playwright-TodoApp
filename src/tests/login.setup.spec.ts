import { chromium,expect,request} from "@playwright/test";

async function LoginSetup() {   
//     const browser=await chromium.launch();
//     const page=await browser.newPage();
//     await page.goto("https://qacart-todo.herokuapp.com/login");
//    await page.locator("#email").fill("youssefdiaa22@icloud.com");
//     await page.locator('[data-testid="password"]').fill("Serion2005@");
//     await page.locator("#submit").click();
// await expect(page).toHaveURL("https://qacart-todo.herokuapp.com/todo");
//  // Save the storage state to a file
//  await page.context().storageState({ path: "storageState.json" });
//  await expect(page).toHaveURL("https://qacart-todo.herokuapp.com/todo");
  // Save the storage state to a file
 // await page.context().storageState({ path: "storageState.json" });


const requestLogin= await request.newContext();
await requestLogin.post("https://qacart-todo.herokuapp.com/api/v1/users/login",{
    data:{
        email:"youssefdiaa22@icloud.com",
        password:"Serion2005@"
    }
});

await requestLogin.storageState({ path: "storageState.json" });


  // i can do multi global setup
//   const page1=await browser.newPage();
//     await page1.goto("https://qacart-todo.herokuapp.com/login");
//    await page1.locator("#email").fill("youssefdiaa22@icloud.com");
//     await page1.locator('[data-testid="password"]').fill("Serion2005@");
//     await page1.locator("#submit").click();

//   await expect(page1).toHaveURL("https://qacart-todo.herokuapp.com/todo");
//   // Save the storage state to a file
//   await page.context().storageState({ path: "user.json" });
}

export default LoginSetup;