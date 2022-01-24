export const getLocalStorage = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
}

export const getLocalStorageString = (key) => {
  return localStorage.getItem(key) ? localStorage.getItem(key) : null
}

export const setLocalStorage = (key, object) => {
  return localStorage.setItem(key, JSON.stringify(object))
}

export const setLocalStorageString = (key, object) => {
  return localStorage.setItem(key, object)
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}
