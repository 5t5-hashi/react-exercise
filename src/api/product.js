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
export function updateBrand(data) {
  return request(`/api/brands`, {
    method: 'PUT',
    data,
  })
}

//获取分类列表
export function getCategories(data) {
  return request('/api/categories', {
    method: 'GET',
    params: data,
  })
}

//新增分类
export function addCategory(data) {
  return request('/api/categories', {
    method: 'POST',
    data,
  })
}

//删除分类
export function deleteCategory(id) {
  return request(`/api/categories/${id}`, {
    method: 'DELETE',
  })
}

//更新分类
export function updateCategory(data) {
  return request(`/api/categories`, {
    method: 'PUT',
    data,
  })
}