import BasePage from "./BasePage";

export default class AddToCart extends BasePage{


private readonly addCartBtn = this.page.locator('[id="add-to-cart-sauce-labs-backpack"]');


private readonly cartBtn = this.page.locator('[id="shopping_cart_container"]');


async AddToCartBtn(){
 
    await this.clickOnElement(this.addCartBtn);

}


async ClickOnCartBtn(){
 
    await this.clickOnElement(this.cartBtn);

}
}