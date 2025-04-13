import { expect } from '@playwright/test'

export class Toast {

    constructor(page) {
        this.page = page;
    }

    async containText(message) {
        //Todo dica para conseguir pegar um elemento que é flutuante aparece e some
        // await page.getByText("Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!")
        //   const content = await page.content()
        // console.log(content)

        const toast = this.page.locator('.toast')
        await expect(toast).toContainText(message)
        //await expect(toast).toBeHidden({timeout: 5000}) //! colocar o timeout de acordo com o tempo que o toast fica visble e invisible 
        await expect(toast).not.toBeVisible({ timeout: 6000 }) //! também é possivel utilizar o not to be visible que faz quase a mesma coisa que o tobehidden a diferença é que o hidden valida se existe no html inteiro mesmo que nao esteja visivel.

    }
}