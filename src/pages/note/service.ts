import { del, get, postJson } from '@/utils/request'

export type BaseNote = {
  title: string
  content: string
}

export async function getNote(id: string) {
  return get<BaseNote & API.BaseAsset>(`/note/${id}`)
}

export async function listNote() {
  return get<(Omit<BaseNote, 'content'> & API.BaseAsset)[]>('/note')
}

export async function saveNote(note: BaseNote & { id?: string }) {
  return postJson<void>('/note', note)
}

export async function deleteNote(id: string) {
  return del<void>(`/note/${id}`)
}
