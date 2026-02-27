import { Page } from "playwright";
import {expect, test } from "../Fixtures/fixture";
import AddToCart from "../pages/AddToCart";
import LoginPage from "../pages/LoginPage";
import * as data from '../testData/Data.json'


//let page:Page
//loginPage:LoginPage,addToCartPage:AddToCart;

test.beforeEach(async({page})=>{
   
    await page.goto('https://www.saucedemo.com/');

//page = await browser.newPage();
//loginPage = new LoginPage(page);
//addToCartPage =  new AddToCart(page);
})

test.afterEach(async({page})=>{
   await page.close();
})

test.describe("E2E Sauce Code",()=>{

test('Login & Cart',async ({loginPage,addToCartPage,page})=>{
  
   await loginPage.fillLoginData(data.userName,data.password)

   await loginPage.ScreenShot('./src/screenShots/loginPage.png')

   await loginPage.ClickOnLoginButton()


   await addToCartPage.AddToCartBtn()

   await addToCartPage.ScreenShot('./src/screenShots/addToCart.png')

   await addToCartPage.ClickOnCartBtn()

   await addToCartPage.ScreenShot('./src/screenShots/CartPage.png')

   await page.waitForTimeout(3000);

});
test('tag test case 1 @smoke',async({})=>{
   console.log('This is smoke TC');
})

test('tag test case 2 @smoke',async({})=>{
   console.log('This is the second smoke TC');
})
test('tag test case @sanity',async({})=>{
   console.log('This is sanity TC');
})

// running specific TC using tags: npx playwright test classname --grep "@smoke|@sanity" 
// running specific TC using tags for excluding test : npx playwright test classname --grep-invert "@smoke|@sanity"
// Another way, we can use grep in playwright.config grep:[RegExp('@smoke')],
// ctrl + space
// "reporter" : [['html'],['dot']]
})