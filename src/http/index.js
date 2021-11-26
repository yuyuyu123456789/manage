import axios from 'axios'
export default function (config) {
  const myaxios = axios.create({
    baseURL: 'http://192.168.1.61:8888/api/private/v1/',
    timeout: 5000,
  })

  myaxios.interceptors.request.use(
    function (config) {
      if (
        config.url != '/login' &&
        sessionStorage.getItem('token')
      ) {
        //为请求头对象，添加Token 验证的Authorization 字段
        config.headers.Authorization = window.sessionStorage.getItem('token')
      }

      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  myaxios.interceptors.response.use(
    function (response) {
      return response.data
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  return myaxios(config)
}