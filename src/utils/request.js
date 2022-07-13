import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 100000

})
export default instance

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user && store.state.user.token) {
    config.headers = {
      Authorization: store.state.user.token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
