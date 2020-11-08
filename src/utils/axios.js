import Axios from 'axios'
import { getToken } from '@/utils/auth'

const axios = Axios.create({
  timeout: 1000
})

axios.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = getToken()
  }
  return config
})

axios.interceptors.response.use(response => {
  return response.data
}, function (error) {
  console.error(error)
})

export default axios
