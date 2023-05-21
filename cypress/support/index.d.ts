/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByDataTestSelector(selector: string): Chainable<any>
    waitForPageLoad(): Chainable<void>
    login: (email: string, password: string, acceptCookies?: boolean) => void
    acceptCookies(): Chainable<Element>
  }
}
