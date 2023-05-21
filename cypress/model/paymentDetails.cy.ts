const CARD_NUMBER_INPUT = '[id="ccNum"]'
const EXPIRY_DATE_INPUT = '[name="expirationDate"]'
const CVC_INPUT = '[id="ccCVV"]'
const SUBMIT_BUTTON = 'cart-pay-securely'

interface PaymentDetailsPage {
  fillPaymentDetails: (cardNumber: string, expiryDate: string, cvc: string) => void
}

export const createPaymentDetailsPage = (): PaymentDetailsPage => {
  const fillPaymentDetails = (cardNumber: string, expiryDate: string, cvc: string) => {
    cy.wait(1000)
    cy.get('#ccframe').its('0.contentDocument').then(cy.wrap).find(CARD_NUMBER_INPUT).type(cardNumber)
    cy.wait(1000)
    cy.get('#ccframe').its('0.contentDocument').then(cy.wrap).find(CVC_INPUT).type(cvc)
    cy.wait(1000)
    cy.get(EXPIRY_DATE_INPUT).type(expiryDate)
    cy.wait(1000)
    // Above iframe handling needs more attention and future refactoring as it behaves unpredictably without explicit waits
    // Consider it flaky until properly addressed
    cy.getByDataTestSelector(SUBMIT_BUTTON).should('be.visible').should('not.be.disabled').click()
  }

  return {
    fillPaymentDetails
  }
}
