export const getSessionStorage = (key) => {
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : null
}

export const getSessionStorageString = (key) => {
  return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : null
}

export const setSessionStorage = (key, object) => {
  return sessionStorage.setItem(key, JSON.stringify(object))
}

export const setSessionStorageString = (key, object) => {
  return sessionStorage.setItem(key, object)
}

export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key)
}
