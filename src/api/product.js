import { request } from './request.js'

// 获取品牌列表
export function getBrands(data) {
  return request('/api/brands', {
    method: 'GET',
    params: data,
  })
}

//新增品牌
export function addBrand(data) {
  return request('/api/brands', {
    method: 'POST',
    data,
  })
}

//删除品牌
export function deleteBrand(id) {
  return request(`/api/brands/${id}`, {
    method: 'DELETE',
  })
}

//更新品牌
export function updateBrand(id, data) {
  return request(`/api/brands/${id}`, {
    method: 'PUT',
    data,
  })
}

