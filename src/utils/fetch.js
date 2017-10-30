import Vue from 'vue'
import axios from 'axios'
import config from '@/config'
import store from '@/store'
import router from '@/router'
import { log } from '@/utils'

// 加载最小时间
const MINI_TIME = 300
// 超时时间
let TIME_OUT_MAX = 5000
// 环境value
let _env = process.env.NODE_ENV
// 请求接口host
let _apiHost = config.api
// 请求组（判断当前请求数）
let _requests = []

/**
 * 添加请求，显示loading
 * @param {请求配置} config 
 */
function pushRequest(config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  Vue.$vux.loading.show({
    text: 'Loading'
  })
  store.dispatch('loading')
}

/**
 * 移除请求，无请求时关闭loading
 * @param {请求配置} config 
 */
function popRequest(config) {
  log(`${config.url}--end`)
  let _index = _requests.findIndex(r => {
    return r === config
  })
  if (_index > -1) {
    _requests.splice(_index, 1)
  }
  if (!_requests.length) {
    Vue.$vux.loading.hide(0)
    store.dispatch('loading', false)
  }
}

// 无Token请求
const noToken = []
// 全局设置axios
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = _apiHost
// axios.defaults.withCredentials=true
/**
 * 请求地址，请求数据，是否静默，请求方法
 */
export default (url, data = {}, isSilence = false, method = 'POST') => {
  let _opts = { method, url }
  let _data = Object.assign({}, data, { token: store.getters.token })
  const _query = {}
  for (let _key in _data) {
    if (_data.hasOwnProperty(_key) && _data[_key] !== '') {
      _query[_key] = _data[_key]
    }
  }
  let _timer = null
  if (method.toLocaleUpperCase() === 'POST') {
    _opts.data = _query
  } else {
    _opts.params = _query
  }
  return new Promise((resolve, reject) => {
    const _instance = axios.create({
      timeout: TIME_OUT_MAX
    })
    let _random = { stamp: Date.now(), url: `${_apiHost + url}` }
    if (!isSilence) {
      _timer = setTimeout(() => {
        pushRequest(_random)
      }, MINI_TIME)
    }
    _instance(_opts)
      .then(res => {
        let responseData = res.data
        clearTimeout(_timer)
        popRequest(_random)
        resolve(res.data)
      })
      .catch(res => {
        let _response = res.response
        let _message = null
        clearTimeout(_timer)
        popRequest(_random)
        switch (_response.status) {
          case 404:
            _message = '404,错误请求'
            break
          case 401:
            router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
            _message = '未授权'
            break
          case 403:
            _message = '禁止访问'
            break
          case 408:
            _message = '请求超时'
            break
          case 500:
            _message = '服务器内部错误'
            break
          case 501:
            _message = '功能未实现'
            break
          case 503:
            _message = '服务不可用'
            break
          case 504:
            _message = '网关错误'
            break
          default:
            _message = '未知错误'
        }
        if (!isSilence) {
          Vue.$vux.toast.show({
            text: _response.data && _response.data.error ? _response.data.error : _message,
            type: 'warn',
            width: '10em'
          })
        }
        reject(res)
      })
  })
}
