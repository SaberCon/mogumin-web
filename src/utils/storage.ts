export const get = (key: string): string | null => sessionStorage.getItem(key) ?? localStorage.getItem(key)

export const setInSession = (key: string, value: string) => sessionStorage.setItem(key, value)

export const setInLocal = (key: string, value: string) => localStorage.setItem(key, value)

export const remove = (key: string) => {
  sessionStorage.removeItem(key)
  localStorage.removeItem(key)
}

export const has = (key: string): boolean => get(key) != null
