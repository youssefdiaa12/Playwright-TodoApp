import {test as baseTest} from '@playwright/test'
import LoginPage from '../pages/LoginPage'
import AddToCart from '../pages/AddToCart'
import { Browser } from 'playwright';
import { chromium } from 'playwright';
type pages = {
loginPage: LoginPage
addToCartPage: AddToCart
Browser:Browser
}

const testPages = baseTest.extend<pages>({

loginPage: async ({page,browser},use)=>{
     browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
 await use(new LoginPage(page));
},

addToCartPage: async ({page,browser},use)=>{
        browser = await chromium.launch({ headless: false });
         page = await browser.newPage();
 await use(new AddToCart(page));
}
})

export const test = testPages;
export const expect = testPages.expect;