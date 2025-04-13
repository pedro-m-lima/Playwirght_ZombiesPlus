const { test: base, expect } = require('@playwright/test')

import { Toast } from '../pages/Components.js'; //todo jeito moderno de importar
import { MoviesPage } from '../pages/MoviesPage.js';
const { LoginPage } = require('../pages/LoginPage.js');
const { LandingPage } = require('../pages/landingPage');//todo jeito antigo de importar

const test = base.extend({
    play: async ({ page }, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        })


    }
})

export { test, expect }