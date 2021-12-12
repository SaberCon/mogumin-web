import { request } from 'umi';

function buildUrl(path: string) {
  return `/api${path.startsWith('/') ? path : '/' + path}`;
}

export async function get<T>(url: string, params?: any) {
  return request<T>(buildUrl(url), { method: 'GET', params });
}

export async function del<T>(url: string, params?: any) {
  return request<T>(buildUrl(url), { method: 'DELETE', params });
}

export async function delJson<T>(url: string, data?: any) {
  return request<T>(buildUrl(url), { method: 'DELETE', data });
}

export async function postJson<T>(url: string, data?: any) {
  return request<T>(buildUrl(url), { method: 'POST', data });
}

export async function postForm<T>(url: string, data?: any) {
  return request<T>(buildUrl(url), { method: 'POST', requestType: 'form', data });
}

export async function putJson<T>(url: string, data?: any) {
  return request<T>(buildUrl(url), { method: 'PUT', data });
}

export async function putForm<T>(url: string, data?: any) {
  return request<T>(buildUrl(url), { method: 'PUT', requestType: 'form', data });
}
