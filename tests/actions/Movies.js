import { expect } from "@playwright/test"

export class Movies {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
        await expect(this.page.locator('header>h1')).toHaveText('Cadastrar novo Filme')
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(title, overview, company, release_year, featured, cover) {

        //Acessando pagina e validando cadastro
        await this.goForm()

        //informando title and overview
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        //seleciona um item "distribuido por: "
        await this.page.locator('#select_company_id .react-select__indicators').click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        //Selecionando ano de lançamento    
        await this.page.locator('#select_year .react-select__dropdown-indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()

        //Clicar em cadastrar
        await this.submit()

    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}