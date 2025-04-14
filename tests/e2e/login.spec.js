const { test, expect } = require('../support');

test('Deve logar como administrador', async ({ page }) => {
   await page.login.visit()
   await page.login.submit('admin@zombieplus.com', 'pwd123')
   await page.login.isLoggedIn()
})

test('Não deve logar como senha incorreta', async ({ page }) => {
   await page.login.visit()
   await page.login.submit('admin@zombieplus.com', 'abc123')

   const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

   await page.toast.containText(message)
})

test('Não deve logar sem informar email', async ({ page }) => {
   await page.login.visit()
   await page.login.submit('', 'abc123')

   await page.login.alertHaveText("Campo obrigatório")
})

test('Não deve logar com email inválido', async ({ page }) => {
   await page.login.visit()
   await page.login.submit('adimin.com.br', 'abc123')

   await page.login.alertHaveText("Email incorreto")
})

test('Não deve logar sem informar senha', async ({ page }) => {
   await page.login.visit()
   await page.login.submit('admin@zombieplus.com', '')

   await page.login.alertHaveText("Campo obrigatório")
})

test('Não deve logar sem informar email e senha', async ({ page }) => {
   await page.login.visit()
   await page.login.submit('', '')

   await page.login.alertHaveText(["Campo obrigatório", "Campo obrigatório"])
})