import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'


// SW的注册和准备
async function prepareMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mockApi/browser.js')
    await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' }, quiet: true })
    await navigator.serviceWorker.ready
  }
}

prepareMocks().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
