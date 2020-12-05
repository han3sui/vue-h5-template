import axios from 'axios'
import * as storage from './storage.js'
import { random } from './util'
import {
  Notify
} from 'vant'

const service = axios.create({ // 创建axios实例，在这里可以设置请求的默认配置
  timeout: process.env.VUE_APP_MODE === 'production' ? 10000 : 60000, // 设置超时时间60s
  baseURL: process.env.VUE_APP_API_URL
})

/**
 * 需要重新登陆的错误code
 * @type {(string|number)[]}
 */
const loginCode = []

/**
 * 不提示Notify错误的code
 * @type {number[]}
 */
const notNotifyCode = []

/** 添加请求拦截器 **/
service.interceptors.request.use(config => {
  const token = storage.get('token')
  if (token && !config.hideToken) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.method === 'get' || config.method === 'GET') {
    config.params = {
      _t: random(),
      ...config.params
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

/** 添加响应拦截器  **/
service.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, error => {
  if (error.response) {
    if (loginCode.includes(error.response.data.code)) {
      // 如果错误code需要重新登陆，则执行登陆
    } else if (notNotifyCode.includes(error.response.data.code) || error.response.config.notify === false) {
      return Promise.reject(error.response.data)
    } else {
      Notify({
        message: error.response.data.message,
        type: 'danger'
      })
      if (error.response.data.message) {
        return Promise.reject(error.response.data)
      } else {
        return Promise.reject(new Error('网络错误，请稍后再试'))
      }
    }
  } else {
    Notify({
      message: '请求超时, 请刷新重试',
      type: 'danger'
    })
    return Promise.reject(new Error('请求超时, 请刷新重试'))
  }
})

export default service
