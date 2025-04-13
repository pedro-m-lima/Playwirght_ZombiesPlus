import { test, expect } from '../support';

import data from '../support/fixture/movies.json'
const { executeSQL } = require('../support/database.js');

test('Deve poder cadastrar um filme', async ({ page }) => {
    const movie = data.create

    //teste
    await executeSQL(`DELETE from movies`)

    //é importante esta logado
    await page.login.visitLogin()
    await page.login.submitLogin('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    //Informe dados Filme
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.featured, movie.cover)

    await page.toast.containText('Cadastro realizado com sucesso!')

})
