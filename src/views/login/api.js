import fetch from '@/utils/axios'
export function postLogin (data) {
  return fetch({
    url: '/api/v1/auth/login',
    method: 'post',
    data
  })
}

export function postUser (data) {
  return fetch({
    url: '/api/v1/user/register',
    method: 'post',
    data
  })
}
