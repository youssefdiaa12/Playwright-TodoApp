import {test as baseTest} from '@playwright/test'
import LoginPage from '../Pages/LoginPage'
import AddToCart from '../Pages/AddToCart'

type pages = {
loginPage: LoginPage
addToCartPage: AddToCart
}

const testPages = baseTest.extend<pages>({

loginPage: async ({page},use)=>{
 await use(new LoginPage(page));
},

addToCartPage: async ({page},use)=>{
 await use(new AddToCart(page));
}
})

export const test = testPages;
export const expect = testPages.expect;