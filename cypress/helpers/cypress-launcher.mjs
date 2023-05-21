import readline from 'node:readline'
import {spawn} from 'child_process'
import {promisify} from 'util'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const questionAsync = promisify(rl.question).bind(rl)

const color = (text, color) => {
  switch (color) {
    case 'red':
      return `\u001b[1;38;2;204;0;0m ${text} \u001b[0m`
    case 'cyan':
      return `\u001b[1;38;2;0;178;178m ${text} \u001b[0m`
    case 'green':
      return `\u001b[1;38;2;0;153;51m ${text} \u001b[0m`
    case 'blue':
      return `\u001b[1;38;2;0;102;204m ${text} \u001b[0m`
    case 'yellow':
      return `\u001b[1;38;2;255;204;0m ${text} \u001b[0m`
    default:
      return text
  }
}

const createCmdSpawn = (mode, browser) => {
  return new Promise((resolve, reject) => {
    const command = ['cypress', mode, '--browser', browser, '--e2e']
    console.log('Running command: npx', command.join(' '))

    const cypressProcess = spawn('npx', command, {
      shell: true
    })

    cypressProcess.stdout.on('data', data => {
      console.log(`${data}`)
    })

    cypressProcess.stderr.on('data', data => {
      console.log(`${data}`)
    })

    cypressProcess.on('close', code => {
      console.log(`Cypress process exited with code: ${code}`)
      process.exit(code)
      resolve()
    })

    cypressProcess.on('error', error => {
      reject(error)
    })
  })
}

const askCypressMode = async () => {
  const answer = await questionAsync(color('Do you want to run Cypress in headless mode [h] or with GUI [g]? ', 'cyan'))
  const cypressMode = answer.toLowerCase()
  if (cypressMode === 'h') {
    return 'run'
  } else if (cypressMode === 'g') {
    return 'open'
  } else {
    throw new Error('Wrong command!')
  }
}

const askBrowser = async () => {
  const answer = await questionAsync(color('Choose the browser to use (chrome [c], firefox [f], edge [e]): ', 'green'))
  const browser = answer.toLowerCase()

  const browserMap = {
    c: 'chrome',
    f: 'firefox',
    e: 'edge'
  }

  const selectedBrowser = browserMap[browser] || browser

  if (['chrome', 'firefox', 'edge'].includes(selectedBrowser)) {
    return selectedBrowser
  } else {
    throw new Error('Invalid browser choice!')
  }
}

const runCypressWithUserInput = async () => {
  try {
    console.log(color('Note: This script runs only e2e tests.', 'yellow'))

    const defaultConfig = await questionAsync(
      color('Do you want to run the default config (headless Chrome)? [y/n] ', 'blue')
    )

    if (defaultConfig.toLowerCase() === 'y') {
      await createCmdSpawn('run', 'chrome')
    } else {
      const cypressMode = await askCypressMode()
      const browser = await askBrowser()
      await createCmdSpawn(cypressMode, browser)
    }
  } catch (error) {
    console.error(color('An error occurred:', 'red'), error)
  } finally {
    rl.close()
  }
}

runCypressWithUserInput()
