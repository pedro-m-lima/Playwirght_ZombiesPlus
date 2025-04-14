import { test, expect } from '../support';
import { faker } from '@faker-js/faker';

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  //const landingPage = new LandingPage(page); //!removido pelo uso do beforeEach
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);
  await page.toast.containText(message);

});

test('Não deve cadastrar quando um email ja existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  //const landingPage = new LandingPage(page); //!removido pelo uso do beforeEach
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  //todo Utilizando request para fazer um post na api
  //todo primeiro passamos o cabeçalho da api
  //todo em seguida enviamos oo conteudo da requisição que a api recebe para o post
  //! Atribuir a requisição a uma variavel para realizar validaçõs posteriormente.
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      email: leadEmail,
      name: leadName
    }
  })

  //!realizando validação de sucesso
  //todo adicionado um expect newlead.ok
  //todo o .ok valida que obteve um retorno de sucesso
  //todo depois valida finaliza validando (toBeTruthy()) que é sucesso, 
  //todo qualquer retorno da familia 200(sucesso)

  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  await page.toast.containText(message);

});

test('Não deve cadastrar com email incorreto', async ({ page }) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Pedro Lima', 'pedroteste.com.br');

  await page.leads.alertHaveText('Email incorreto')
});

test('Não deve cadastrar quando o nome não for preenchido', async ({ page }) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', 'pedro@teste.com.br');

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
});

test('Não deve cadastrar quando email não for preenchido', async ({ page }) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Pedro Lima', '');

  await page.leads.alertHaveText('Campo obrigatório')
});

test('Não deve cadastrar quando nenhum campo for preenchido', async ({ page }) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', '');

  await page.leads.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
});