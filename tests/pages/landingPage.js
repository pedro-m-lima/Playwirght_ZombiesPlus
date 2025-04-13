import { expect } from '@playwright/test';

export class LandingPage{
    constructor(page){
        this.page = page
    }

    async visit(){
        await this.page.goto('http://localhost:3000');
    }

    async openLeadModal(){
        //todo "sem utilizar expessão regular" await page.getByRole('button', {name: "Aperte o play... se tiver coragem"}).click()
          await this.page.getByRole('button', {name: /Aperte o play/}).click()
        
          //todo implementado chekpoint
          await expect(
            this.page.getByTestId('modal').getByRole('heading')
          ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email){

      //todo buncando pelo ID
      // await page.locator('#name').fill(Pedro Lima)
      //todo buscando pelo name
      //await page.locator('input[name=name]').fill(Pedro Lima)
      //todo buscando pelo placeholder
      //await page.locator('input[placeholder="Seu nome completo"]').fill('Pedro Lima')
      //todo buscando pelo atalho placeholder

      if(name != ''){
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
      }
      if(email != ''){
        await this.page.getByPlaceholder('Informe seu email').fill(email)
      }
       
      //todo clicar no botão utilizando page.click xpath
      //await page.click('//button[text()="Quero entrar na fila!"]')
    
      //todo clicar no botão utilizando getByRole
      //await page.getByRole('button', {name: 'Quero entrar na fila!'}).click()
      //todo or utilizando getbytext
      //await page.getByText('Quero entrar na fila!').click()
    
      //todo para uma estrategia mais segura devemos passar um caminho mais completo para o play, dessa forma garantimos que nao click em um elemento incorreto. 
      //todo exemplo: aguarde encontrar o modal que possui e botão e passe para validar o botão dentro do modal.
      await this.page.getByTestId('modal').//! encontra o modal
      //getByText('Quero entrar na fila!').click() //! Valida se existe o texto apenas no modal
      getByRole('button', {name: 'Quero entrar na fila!'}).click() //! Valida se existe o botão com texto apenas no modal
    
    }

    async toastHaveText(message){
       }

    async alertHaveText(target){
      await expect(this.page.locator('.alert')).toHaveText(target)
    }
    
}