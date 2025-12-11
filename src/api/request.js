import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

export const http = axios.create({
  baseURL: '/',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers = config.headers || {}
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

http.interceptors.response.use(
  (resp) => resp.data,
  (error) => Promise.reject(error)
)

export async function request(url, options = {}) {
  return http.request({ url, ...options })
}
