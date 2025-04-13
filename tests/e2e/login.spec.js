const { test, expect } = require('../support');

test('Deve logar como administrador', async ({ page }) => {
   await page.login.visitLogin()
   await page.login.submitLogin('admin@zombieplus.com', 'pwd123')
   await page.movies.isLoggedIn()
})

test('Não deve logar como senha incorreta', async ({ page }) => {
   await page.login.visitLogin()
   await page.login.submitLogin('admin@zombieplus.com', 'abc123')

   const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

   await page.toast.containText(message)
})

test('Não deve logar sem informar email', async ({ page }) => {
   await page.login.visitLogin()
   await page.login.submitLogin('', 'abc123')

   await page.login.alertHaveText("Campo obrigatório")
})

test('Não deve logar com email inválido', async ({ page }) => {
   await page.login.visitLogin()
   await page.login.submitLogin('adimin.com.br', 'abc123')

   await page.login.alertHaveText("Email incorreto")
})

test('Não deve logar sem informar senha', async ({ page }) => {
   await page.login.visitLogin()
   await page.login.submitLogin('admin@zombieplus.com', '')

   await page.login.alertHaveText("Campo obrigatório")
})

test('Não deve logar sem informar email e senha', async ({ page }) => {
   await page.login.visitLogin()
   await page.login.submitLogin('', '')

   await page.login.alertHaveText(["Campo obrigatório", "Campo obrigatório"])
})