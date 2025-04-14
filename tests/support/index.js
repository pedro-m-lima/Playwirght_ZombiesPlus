const { test: base, expect } = require('@playwright/test')

import { Toast } from '../actions/Components.js'; //todo jeito moderno de importar
import { Movies } from '../actions/Movies.js';
const { Login } = require('../actions/Login.js');
const { Leads } = require('../actions/leads.js');//todo jeito antigo de importar

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page //adiciona udo que tem em page dentro da variavel context

        //atribuindo page objects dentro de context
        context['leads'] = new Leads(page),
            context['login'] = new Login(page),
            context['movies'] = new Movies(page),
            context['toast'] = new Toast(page)

        await use(context)
    }
})

export { test, expect }