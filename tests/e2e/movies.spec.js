import { test, expect } from '../support';

import data from '../support/fixture/movies.json'
const { executeSQL } = require('../support/database.js');

test('Deve poder cadastrar um filme', async ({ page }) => {
    const movie = data.create

    //deleta dados da tabela movies
    await executeSQL(`DELETE from movies`)

    //é importante esta logado
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    //Informe dados Filme
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.featured, movie.cover)

    await page.toast.containText('Cadastro realizado com sucesso!')

})

test('Não deve cadastrar quando não informar campos obrigatórios', async ({ page }) => {

    //é importante esta logado
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

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