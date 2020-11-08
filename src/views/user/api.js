import axios from '@/utils/axios'
export function getUsers (data) {
  return axios.get('/api/v1/user', data)
}
