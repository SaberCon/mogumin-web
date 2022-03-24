import { request } from 'umi'

const buildUrl = (path: string): string => `/api${path.startsWith('/') ? path : '/' + path}`

export async function get<T>(url: string, params?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'GET', params })
}

export async function del<T>(url: string, params?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'DELETE', params })
}

export async function delJson<T>(url: string, data?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'DELETE', data })
}

export async function postJson<T>(url: string, data?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'POST', data })
}

export async function postForm<T>(url: string, data?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'POST', requestType: 'form', data })
}

export async function putJson<T>(url: string, data?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'PUT', data })
}

export async function putForm<T>(url: string, data?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'PUT', requestType: 'form', data })
}

export async function patchJson<T>(url: string, data?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'PATCH', data })
}

export async function patchForm<T>(url: string, data?: any): Promise<T> {
  return request<T>(buildUrl(url), { method: 'PATCH', requestType: 'form', data })
}
