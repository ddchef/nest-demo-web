import Axios from 'axios'
import { getToken, delToken } from '@/utils/auth'
import router from '@/router/index'

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
  if (error.response.status === 401) {
    delToken()
    router.replace({ name: 'login' })
  }
  return Promise.reject(error.response.data)
})

function fetch (config) {
  if (config.pathParams) {
    config.url = config.url.replace(/\{(\w+)\}/, (_, key) => {
      return config.pathParams[key]
    })
  }
  return axios(config)
}

export default fetch
