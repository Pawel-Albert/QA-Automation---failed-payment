const SVG_SELECTOR = 'div.TqU9s svg.cE2me'
const TITLE_SELECTOR = 'div.TqU9s h4.ugJOr'
const FIRST_PARAGRAPH_SELECTOR = 'div.TqU9s p.ugJOr.nxkbf:nth-of-type(1)'
const SECOND_PARAGRAPH_SELECTOR = 'div.TqU9s p.ugJOr.nxkbf:nth-of-type(2)'
const RETURN_LINK_SELECTOR = 'div.TqU9s a.LR7WQ.gOyyD.dKQg7.WcVmN.w64RU span.sC3TA'

interface PaymentFailurePage {
  assertPaymentFailureText: () => void
}

export const createPaymentFailurePage = (): PaymentFailurePage => {
  const assertPaymentFailureText = () => {
    cy.get(SVG_SELECTOR).should('be.visible')
    cy.get(TITLE_SELECTOR).should('contain', 'Coś poszło nie tak z Twoją płatnością')
    cy.get(FIRST_PARAGRAPH_SELECTOR).should('contain', 'Twoja płatność nie mogła zostać zrealizowana.')
    cy.get(SECOND_PARAGRAPH_SELECTOR).should(
      'contain',
      'Sprawdź swoje dane do płatności lub spróbuj jeszcze raz inną metodą płatności.'
    )
    cy.get(RETURN_LINK_SELECTOR).should('contain', 'Wróć do metod płatności')
  }
  // Not a pure POM implementation but for encapsulation purposes and readability was done in that manner
  return {
    assertPaymentFailureText
  }
}
