import fetch from '@/utils/axios'
export function postLogin (data) {
  return fetch({
    url: '/api/v1/public/login',
    method: 'post',
    data
  })
}

export function postUser (data) {
  return fetch({
    url: '/api/v1/public/register',
    method: 'post',
    data
  })
}
