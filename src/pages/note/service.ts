import { del, get, postJson } from '@/utils/request'

export type BaseNote = {
  title: string
  content: string
}

export type Note = BaseNote & API.BaseAsset

export async function getNote(id: string) {
  return get<Note>(`/note/${id}`)
}

export async function listNote() {
  return get<(Omit<Note, 'content'>)[]>('/note')
}

export async function saveNote(note: BaseNote & { id?: string }) {
  return postJson<void>('/note', note)
}

export async function deleteNote(id: string) {
  return del<void>(`/note/${id}`)
}
