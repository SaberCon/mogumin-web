import { request } from 'umi'

const API_PATH = '/api'

export async function get<T>(url: string, params?: any) {
  return request<T>(`${API_PATH}/${url}`, { method: 'GET', params })
}

export async function del<T>(url: string, params?: any) {
  return request<T>(`${API_PATH}/${url}`, { method: 'DELETE', params })
}

export async function postJson<T>(url: string, data?: any) {
  return request<T>(`${API_PATH}/${url}`, { method: 'POST', data })
}

export async function postForm<T>(url: string, data?: any) {
  return request<T>(`${API_PATH}/${url}`, { method: 'POST', requestType: 'form', data })
}

export async function putJson<T>(url: string, data?: any) {
  return request<T>(`${API_PATH}/${url}`, { method: 'PUT', data })
}

export async function putForm<T>(url: string, data?: any) {
  return request<T>(`${API_PATH}/${url}`, { method: 'PUT', requestType: 'form', data })
}
