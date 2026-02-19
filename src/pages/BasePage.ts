import { Page,Locator } from "playwright";

export default class BasePage {

protected readonly page:Page;

constructor(page:Page){
    this.page = page;
}

protected async clickOnElement(element: Locator){

    await element.click();
}

protected async FillField(element: Locator,text:string){
    await element.fill(text);
}

public async ScreenShot(filePath:string){
    await this.page.screenshot({path:filePath})
}

}