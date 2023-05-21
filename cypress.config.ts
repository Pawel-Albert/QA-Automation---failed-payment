import {defineConfig} from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
    baseUrl: 'https://app.interviewme.pl'
  },
  chromeWebSecurity: false,
  viewportWidth: 1600,
  viewportHeight: 900,
  defaultCommandTimeout: 10000
})
