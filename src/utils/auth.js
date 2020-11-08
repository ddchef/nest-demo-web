import Cookie from 'js-cookie'
export function hasToken () {
  return !!getToken()
}
export function getToken () {
  return Cookie.get('dd_token')
}

export function setToken (token) {
  Cookie.set('dd_token', 'Bearer ' + token)
}
