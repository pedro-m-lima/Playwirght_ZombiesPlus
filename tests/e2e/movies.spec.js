import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage.js');
import { Toast } from '../pages/Components.js';
import { MoviesPage } from '../pages/MoviesPage.js';
import data from '../support/fixture/movies.json'
const { executeSQL } = require('../support/database.js');


let loginPage
let toast
let moviesPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})

test('Deve poder cadastrar um filme', async ({ page }) => {
    const movie = data.create

    //teste
    await executeSQL(`DELETE from movies`)

    //é importante esta logado
    await loginPage.visitLogin()
    await loginPage.submitLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

    //Informe dados Filme
    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year, movie.featured, movie.cover)

    await toast.containText('Cadastro realizado com sucesso!')

})
