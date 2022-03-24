import { get, patchForm, postForm } from '@/utils/request'

export enum SmsType {
  LOGIN = 1,
  UPDATE_PWD = 2,
  BIND_PHONE = 3,
  UNBIND_PHONE = 4,
}

export type OssData = {
  accessId: string
  host: string
  dir: string
  policy: string
  signature: string
  expire: number
}

export const getOssData = async () => get<OssData>('/oss')

export const sendCode = async (type: SmsType, phone?: string) => get<void>('/sms/send', { type, phone })

export const checkCode = async (type: SmsType, code: string, phone?: string) =>
  get<boolean>('/sms/check', { type, code, phone })

export const login = async (type: 'PWD' | 'SMS', phone: string, code: string) =>
  postForm<string>('/user/login', { type, phone, code })

export const getCurrentUser = async () => get<API.CurrentUser>('/user/current')

export const updatePhone = async (phone: string, unbindCode: string, bindCode: string) =>
  patchForm<void>('/user/phone', { phone, unbindCode, bindCode })

export const updatePwd = async (password: string, code: string) =>
  patchForm<void>('/user/pwd', { password, code })

export type UserUpdateParams = {
  username: string
  avatar: string
}

export const updateUser = async (data: UserUpdateParams) => patchForm<void>('/user', data)
