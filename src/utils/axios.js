import Axios from 'axios'
import { getToken, delToken } from '@/utils/auth'
import router from '@/router/index'
import { Message } from 'element-ui'

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
  if (error.response.status === 403) {
    Message.error(error.response.data.message)
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
