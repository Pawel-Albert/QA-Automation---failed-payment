/// <reference types="cypress" />
import {createLoginPage} from '../model/loginPage.cy'

interface TypeOptions extends Cypress.TypeOptions {
  sensitive: boolean
}

Cypress.Commands.overwrite<'type', 'element'>('type', (originalFn, element, text, options?: Partial<TypeOptions>) => {
  if (options && options.sensitive) {
    options.log = false
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length)
    })
  }
  return originalFn(element, text, options)
})

Cypress.Commands.add('login', (email: string, password: string, acceptCookies: boolean = false) => {
  const loginPage = createLoginPage()

  loginPage.openLoginPage()
  if (acceptCookies) {
    cy.acceptCookies() // Accept cookies if the acceptCookies flag is true
  }
  loginPage.fillLoginForm(email, password)
  loginPage.submitLoginForm()
})

Cypress.Commands.add('waitForPageLoad', () => {
  cy.document().its('readyState').should('eq', 'complete')
})

Cypress.Commands.add('getByDataTestSelector', selector => {
  return cy.get(`[data-test=${selector}]`)
})

Cypress.Commands.add('acceptCookies', () => {
  cy.getByDataTestSelector('accept-cookies-button').click()
})
