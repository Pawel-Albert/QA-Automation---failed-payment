const EMAIL_INPUT = 'auth-login-email'
const PASSWORD_INPUT = 'auth-login-password'
const LOGIN_BUTTON = 'auth-login-submit'

interface LoginPage {
  openLoginPage: () => void
  fillLoginForm: (email: string, password: string) => void
  submitLoginForm: () => void
}

export const createLoginPage = (): LoginPage => {
  const openLoginPage = () => {
    cy.visit('/login')
  }

  const fillLoginForm = (email: string, password: string) => {
    cy.getByDataTestSelector(EMAIL_INPUT).type(email)
    cy.getByDataTestSelector(PASSWORD_INPUT).type(password, {log: false})
  }

  const submitLoginForm = () => {
    cy.getByDataTestSelector(LOGIN_BUTTON).click()
  }

  return {
    openLoginPage,
    fillLoginForm,
    submitLoginForm
  }
}
