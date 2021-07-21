import {request} from "umi"
import type {RequestOptionsInit} from 'umi-request'

export async function sendRequest<T>(url: string, options?: RequestOptionsInit & { skipErrorHandler?: boolean }) {
  return (await request<API.Result<T>>(`/api/${url}`, options)).data
}

export async function get<T>(url: string, params?: any) {
  return sendRequest<T>(url, {params})
}

export async function del<T>(url: string, params?: any) {
  return sendRequest<T>(url, {method: 'DELETE', params})
}

export async function postJson<T>(url: string, data?: any) {
  return sendRequest<T>(url, {method: 'POST', data})
}

export async function postForm<T>(url: string, data?: any) {
  return sendRequest<T>(url, {method: 'POST', requestType: 'form', data})
}

export async function putJson<T>(url: string, data?: any) {
  return sendRequest<T>(url, {method: 'PUT', data})
}

export async function putForm<T>(url: string, data?: any) {
  return sendRequest<T>(url, {method: 'PUT', requestType: 'form', data})
}
