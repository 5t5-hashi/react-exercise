import { setupWorker } from 'msw/browser'
import { login } from './login.js'
import { dashboard } from './dashboard.js'  

export const worker = setupWorker(...login, ...dashboard)

