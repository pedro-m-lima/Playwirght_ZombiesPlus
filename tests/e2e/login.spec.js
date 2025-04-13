const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
import { Toast } from '../pages/Components.js';
import { MoviesPage } from '../pages/MoviesPage.js';

let loginPage
let toast
let moviesPage

test.beforeEach(({ page }) => {
   loginPage = new LoginPage(page)
   toast = new Toast(page)
   moviesPage = new MoviesPage(page)
})

test('Deve logar como administrador', async ({ page }) => {
   await loginPage.visitLogin()
   await loginPage.submitLogin('admin@zombieplus.com', 'pwd123')
   await moviesPage.isLoggedIn()
})

test('Não deve logar como senha incorreta', async ({ page }) => {
   await loginPage.visitLogin()
   await loginPage.submitLogin('admin@zombieplus.com', 'abc123')

   const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

   await toast.containText(message)
})

test('Não deve logar sem informar email', async ({ page }) => {
   await loginPage.visitLogin()
   await loginPage.submitLogin('', 'abc123')

   await loginPage.alertHaveText("Campo obrigatório")
})

test('Não deve logar com email inválido', async ({ page }) => {
   await loginPage.visitLogin()
   await loginPage.submitLogin('adimin.com.br', 'abc123')

   await loginPage.alertHaveText("Email incorreto")
})

test('Não deve logar sem informar senha', async ({ page }) => {
   await loginPage.visitLogin()
   await loginPage.submitLogin('admin@zombieplus.com', '')

   await loginPage.alertHaveText("Campo obrigatório")
})

test('Não deve logar sem informar email e senha', async ({ page }) => {
   await loginPage.visitLogin()
   await loginPage.submitLogin('', '')

   await loginPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"])
})