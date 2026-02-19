import BasePage from "./BasePage";

export  default class LoginPage extends BasePage{

    private readonly userNameField = this.page.locator('[id="user-name"]');
        
    private readonly password = this.page.locator('[id="password"]');

    private readonly submitBtn = this.page.locator('[id="login-button"]');


    async fillLoginData(userName:string,Password:string){

       await  this.FillField(this.userNameField,userName);
       await this.FillField(this.password,Password);
    }

    async ClickOnLoginButton(){
        await this.clickOnElement(this.submitBtn);
    }
}