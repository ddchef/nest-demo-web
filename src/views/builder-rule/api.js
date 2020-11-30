import fetch from '@/utils/axios'
export function postBuilderRule (data) {
  return fetch({
    url: '/api/v1/build/rule',
    method: 'post',
    data
  })
}

export function getBuilderRules (data) {
  return fetch({
    url: '/api/v1/build/rules',
    method: 'get',
    data
  })
}
