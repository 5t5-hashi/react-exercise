import { request } from './request.js'

export function todayOverview() {
  return request('/api/todayOverview', {
    method: 'GET',
  })
}

