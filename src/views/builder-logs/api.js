import fetch from '@/utils/axios'
export function getBuilderLogs (data) {
  return fetch({
    url: '/api/v1/build/logs',
    method: 'get',
    data
  })
}
