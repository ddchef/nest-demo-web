import axios from '@/utils/axios'
export function postLogin (data) {
  return axios.post('/api/v1/auth/login', data)
}
