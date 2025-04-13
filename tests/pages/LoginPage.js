const {expect} = require('@playwright/test')

export class LoginPage{
    constructor(page){
        this.page = page
    }

    async visitLogin(){
        await this.page.goto('http://localhost:3000/admin/login')
        
        const loginform = this.page.locator('.login-form')
        await expect(loginform).toBeVisible()
    }

    async submitLogin(email, senha){

        if(email != ''){
            await this.page.getByPlaceholder("E-mail").fill(email)
        }
        if(senha != ''){
            await this.page.getByPlaceholder('senha').fill(senha)
        }

        await this.page.getByText('Entrar').click()

        // const logout = this.page.locator('a[href="/logout"]')
        // await expect(logout).toBeVisible()

    }

    async alertHaveText(text){
        await expect(this.page.locator('span[class$="alert"]')).toHaveText(text)
    }

}