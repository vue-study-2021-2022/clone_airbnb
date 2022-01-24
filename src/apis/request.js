import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000,
})

request.interceptors.request.use(
  (config) => {
    config.headers['Cache-Control'] = 'no-cache'
    config.headers['Pragma'] = 'no-cache'
    config.headers['Expires'] = '0'
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

// response interceptor
request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  (error) => {
    console.error(error.response)
    if (error && error.response) {
      return Promise.reject(error.response.data)
    } else {
      error.log('서버와 통신이 원할하지 않습니다.')
      return Promise.reject(null)
    }
  },
)

export default request
