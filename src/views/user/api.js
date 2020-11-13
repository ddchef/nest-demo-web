import fetch from '@/utils/axios'
export function getUsers (data) {
  return fetch({
    url: '/api/v1/user',
    method: 'get',
    data
  })
}

export function getUser (pathParams) {
  return fetch({
    url: '/api/v1/user/{id}',
    method: 'get',
    pathParams
  })
}

export function putUser (data, pathParams) {
  return fetch({
    url: '/api/v1/user/{id}',
    method: 'put',
    pathParams,
    data
  })
}

export function deleteUser (pathParams) {
  return fetch({
    url: '/api/v1/user/{id}',
    method: 'delete',
    pathParams
  })
}

export function getRoles () {
  return fetch({
    url: '/api/v1/role',
    method: 'get'
  })
}

export function postUser (data) {
  return fetch({
    url: '/api/v1/user',
    method: 'post',
    data
  })
}
