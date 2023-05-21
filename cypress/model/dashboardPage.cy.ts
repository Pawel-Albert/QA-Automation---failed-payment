/// <reference types="@cypress/xpath" />
require('@cypress/xpath')

const CV_TEST_ELEMENT = '//div[@data-test="user-admin-grid-content"]//span[contains(text(), "CV - TEST")]'
const CV_DOWNLOAD_ELEMENT = '//div[@data-test="user-admin-grid-content"]//span[contains(text(), "Pobierz CV")]'

interface DashboardPage {
  runDashboardTest: () => void
}

// Additional setup actions to be refactored for better reliability and maintainability
// ...

// Note: The following steps need refactoring as they might be flaky and only work under default conditions
// ...

export const createDashboardPage = (): DashboardPage => {
  const runDashboardTest = () => {
    cy.xpath(CV_TEST_ELEMENT).then($cvTestElement => {
      // Wait for 2 seconds before proceeding
      cy.wait(2000)

      cy.wrap($cvTestElement)
        .should($el => expect($el.is(':visible')).to.be.true)
        .then(() => {
          cy.xpath(CV_DOWNLOAD_ELEMENT)
            .should($el => expect($el.is(':visible')).to.be.true)
            .then($pobierzCvElement => {
              if ($pobierzCvElement.length === 0) {
                cy.wrap($cvTestElement).click()
              }
              cy.xpath(CV_DOWNLOAD_ELEMENT).click()
            })
        })
    })
  }

  return {
    runDashboardTest
  }
}
