import Cookies from 'js-cookie'

export const getCookie = (key) => {
  return Cookies.get(key) ? JSON.parse(Cookies.get(key)) : null
}

export const getCookieString = (key) => {
  return Cookies.get(key) ? Cookies.get(key) : null
}

export const setCookie = (key, object) => {
  return Cookies.set(key, JSON.stringify(object))
}

export const setCookieString = (key, string) => {
  return Cookies.set(key, string)
}

export const setCookieOption = (key, object, option) => {
  // option : { expires: 7 } or { expires: 7, path: '' } (expires 는 day)
  return Cookies.set(key, JSON.stringify(object), option)
}

export const setCookieStringOption = (key, string, option) => {
  // option : { expires: 7 } or { expires: 7, path: '' } (expires 는 day)
  return Cookies.set(key, string, option)
}

export const removeCookie = (key) => {
  Cookies.remove(key)
}
