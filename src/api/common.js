import fetch from '@/utils/axios'

export function getProfile () {
  return fetch({
    url: '/api/v1/user/profile',
    method: 'get'
  })
}
