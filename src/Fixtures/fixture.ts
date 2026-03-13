import {test as baseTest} from '@playwright/test'
import LoginPage from '../Pages/LoginPage'
import AddToCart from '../Pages/AddToCart'
import HerokuHomePage from '../Pages/HerokuHomePage'
import HerokuLoginPage from '../Pages/HerokuLoginPage'

type pages = {
  loginPage: LoginPage
  addToCartPage: AddToCart
  herokuHomePage: HerokuHomePage
  herokuLoginPage: HerokuLoginPage
}

const testPages = baseTest.extend<pages>({
  loginPage: async ({page},use)=>{
    await use(new LoginPage(page));
  },

  addToCartPage: async ({page},use)=>{
    await use(new AddToCart(page));
  },

  herokuHomePage: async ({page},use)=>{
    await use(new HerokuHomePage(page));
  },

  herokuLoginPage: async ({page},use)=>{
    await use(new HerokuLoginPage(page));
  },
})

export const test = testPages;
export const expect = testPages.expect;