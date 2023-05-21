/// <reference types="cypress" />

import {createDashboardPage} from '../model/dashboardPage.cy'
import {createPaymentDetailsPage} from '../model/paymentDetails.cy'
import {createPaymentFailurePage} from '../model/paymentFailurePage.cy'

describe('Payment test', () => {
  const email = Cypress.env('user_email')
  const password = Cypress.env('user_password')
  const cardNumber = '40000000000051'
  const expiryDate = '10/23'
  const cvc = '123'

  beforeEach(() => {
    cy.login(email, password, true)

    const dashboardPage = createDashboardPage()
    dashboardPage.runDashboardTest()
    // Could be a custom command

    cy.getByDataTestSelector('cart-plan-continue').click()
    // Would need to refactor and move to a Page Object Model (POM) or as a custom command
    // ...

    const paymentDetailsPage = createPaymentDetailsPage()
    paymentDetailsPage.fillPaymentDetails(cardNumber, expiryDate, cvc)
    // Could be a custom command
  })

  it('Should perform a failed payment - error msg test', () => {
    const paymentFailurePage = createPaymentFailurePage()
    paymentFailurePage.assertPaymentFailureText()
  })
})
