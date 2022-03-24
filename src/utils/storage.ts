export const get = (key: string): string | null => sessionStorage.getItem(key) ?? localStorage.getItem(key)

export const has = (key: string): boolean => get(key) != null

export const setInSession = (key: string, value: string): void => sessionStorage.setItem(key, value)

export const setInLocal = (key: string, value: string): void => localStorage.setItem(key, value)

export const remove = (key: string): void => {
  sessionStorage.removeItem(key)
  localStorage.removeItem(key)
}
