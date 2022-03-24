import { del, get, postJson, putJson } from '@/utils/request'

export type BaseNote = {
  title: string
  content: string
}

export type Note = BaseNote & API.BaseAsset

export const getNote = async (id: string) => get<Note>(`/note/${id}`)

export const listNote = async () => get<(Omit<Note, 'content'>)[]>('/note')

export const insertNote = async (note: BaseNote) => postJson<void>('/note', note)

export const updateNote = async (id: string, note: BaseNote) => putJson<void>(`/note/${id}`, note)

export const deleteNote = async (id: string) => del<void>(`/note/${id}`)
