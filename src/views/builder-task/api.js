import fetch from '@/utils/axios'
export function postPermission (data) {
  return fetch({
    url: '/api/v1/permission',
    method: 'post',
    data
  })
}

export function getAllPermission (data) {
  return fetch({
    url: '/api/v1/permission',
    method: 'get',
    data
  })
}

export function deletePermission (pathParams) {
  return fetch({
    url: '/api/v1/permission/{code}',
    method: 'delete',
    pathParams
  })
}

export function getPermission (pathParams) {
  return fetch({
    url: '/api/v1/permission/{code}',
    method: 'get',
    pathParams
  })
}

export function putPermission (data, pathParams) {
  return fetch({
    url: '/api/v1/permission/{code}',
    method: 'put',
    pathParams,
    data
  })
}

export function getAllModules () {
  return fetch({
    url: '/api/v1/module',
    method: 'get'
  })
}
