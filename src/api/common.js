import fetch from '@/utils/axios'

export function getProfile () {
  return fetch({
    url: '/api/v1/user/profile',
    method: 'get'
  })
}

export function getPermission () {
  return fetch({
    url: '/api/v1/role/permissions',
    method: 'get'
  })
}
