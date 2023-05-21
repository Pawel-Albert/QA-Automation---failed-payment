# QA Automation - Failed Payment

This project is an assessment project for QA Automation. It demonstrates an end-to-end test scenario for a failed payment using Cypress.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager) or Yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pawel-Albert/QA-Automation---failed-payment.git
   ```

2. Install dependencies:

   ```
   cd QA-Automation---failed-payment
   npm install
   ```

3. Configure test environment:
   <br>
   Create a cypress.env.json file in the project root directory with the following content:
   ```json
   {
     "user_email": "your_email@example.com",
     "user_password": "your_password"
   }
   ```
   Replace "your_email@example.com" and "your_password" with your actual email and password for authentication

## Running the Tests

To run the tests, use the following command:

```bash
  Copy code
  npm run cypress
```

This command will launch the Cypress Test Runner and prompt you with configuration options:

Note: This script runs only e2e tests.<br>
Do you want to run the default config (headless Chrome)? [y/n] n<br>
Do you want to run Cypress in headless mode [h] or with GUI [g]? g<br>
Choose the browser to use (chrome [c], firefox [f], edge [e]): c<br>

## Disclaimer

This project is for assessment purposes only and is not intended for production use.
