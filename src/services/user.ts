import { get, postForm, putForm, putJson } from '@/utils/request';

export enum SmsType {
  LOGIN = 1,
  UPDATE_PWD = 2,
  BIND_PHONE = 3,
  UNBIND_PHONE = 4,
}

export async function getOssData() {
  return get<{
    accessId: string;
    host: string;
    dir: string;
    policy: string;
    signature: string;
    expire: number;
  }>('/oss');
}

export async function sendCode(type: SmsType, phone?: string) {
  return get<void>('/sms/send', { type, phone });
}

export async function checkCode(type: SmsType, code: string, phone?: string) {
  return get<boolean>('/sms/check', { type, code, phone });
}

export async function login(type: 'PWD' | 'SMS', phone: string, code: string) {
  return postForm<string>('/user/login', { type, phone, code });
}

export async function getCurrentUser() {
  return get<API.CurrentUser>('/user/current');
}

export async function updatePhone(phone: string, unbindCode: string, bindCode: string) {
  return putForm<void>('/user/phone', { phone, unbindCode, bindCode });
}

export async function updatePwd(password: string, code: string) {
  return putForm<void>('/user/pwd', { password, code });
}

export async function updateUser(data: { username: string; avatar: string }) {
  return putJson<void>('/user', data);
}
