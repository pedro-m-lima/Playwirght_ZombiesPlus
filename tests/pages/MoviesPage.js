import { expect } from "@playwright/test"

export class MoviesPage {
    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle') //!Garante com que todas as requisições foram feitas e esta em modo ocioso aguardando nova requisição.
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company, release_year, featured, cover) {

        //Acessando pagina e validando cadastro
        await this.page.locator('a[href$="register"]').click()
        await expect(this.page.locator('header>h1')).toHaveText('Cadastrar novo Filme')

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
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()

    }
}