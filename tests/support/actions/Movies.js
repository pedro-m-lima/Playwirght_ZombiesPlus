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

    async create(movie) {

        //Acessando pagina e validando cadastro
        await this.goForm()

        //informando title and overview
        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        //seleciona um item "distribuido por: "
        await this.page.locator('#select_company_id .react-select__indicators').click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        //Selecionando ano de lançamento    
        await this.page.locator('#select_year .react-select__dropdown-indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: movie.release_year }).click()

        //select poster and input data
        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixture' + movie.cover)

        //Marca Filme como favorito
        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        //Clicar em cadastrar
        await this.submit()

    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}