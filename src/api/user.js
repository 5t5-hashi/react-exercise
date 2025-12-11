import { request } from './request.js'

export function login(data) {
  return request('/api/login', {
    method: 'POST',
    data,
  })
}

