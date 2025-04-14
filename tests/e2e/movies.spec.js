import { test, expect } from '../support/index.js';

import data from '../support/fixture/movies.json'
const { executeSQL } = require('../support/database.js');

test('Deve poder cadastrar um filme', async ({ page }) => {
    const movie = data.create

    //teste
    await executeSQL(`DELETE from movies`)

    //é importante esta logado
    await page.login.visitLogin()
    await page.login.submitLogin('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn()

    //Informe dados Filme
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.featured, movie.cover)

    await page.toast.containText('Cadastro realizado com sucesso!')

})

test('Não deve cadastrar quando não informar campos obrigatórios', async ({ page }) => {

    //é importante esta logado
    await page.login.visitLogin()
    await page.login.submitLogin('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn()

    //submt form sem informar dados obrigatórios
    await page.movies.goForm()
    await page.movies.submit()

    //valida message
    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'

    ])
})