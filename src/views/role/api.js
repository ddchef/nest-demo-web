import fetch from '@/utils/axios'
export function getRoles (data) {
  return fetch({
    url: '/api/v1/role',
    method: 'get',
    data
  })
}

export function getPermission (data) {
  return fetch({
    url: '/api/v1/permission',
    method: 'get',
    data
  })
}

export function getRole (pathParams) {
  return fetch({
    url: '/api/v1/role/{id}',
    method: 'get',
    pathParams
  })
}

export function putRole (data, pathParams) {
  return fetch({
    url: '/api/v1/role/{id}',
    method: 'put',
    pathParams,
    data
  })
}

export function deleteRole (pathParams) {
  return fetch({
    url: '/api/v1/role/{id}',
    method: 'delete',
    pathParams
  })
}

export function postRole (data) {
  return fetch({
    url: '/api/v1/role',
    method: 'post',
    data
  })
}
