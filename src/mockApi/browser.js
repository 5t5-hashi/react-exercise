import { setupWorker } from 'msw/browser'
import { handlers } from './login.jsx'

export const worker = setupWorker(...handlers)

