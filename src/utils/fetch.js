import axios from 'axios'
import config from '@/config'

let _requests = []
let _env = process.env['NODE_ENV']

// 开发环境打印信息
function log(msg) {
  if (_env === 'development') {
    console.log(msg)
  }
}

function pushRequest(config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  // store.dispatch('loading')
}

function popRequest(config) {
  log(`${config.url}--end`)
  let _index = _requests.findIndex(req => {
    return req.url === config.url && req.stamp === req.stamp
  })
  _requests.splice(_index, 1)
  if (!_requests.length) {
    // setTimeout(() => {
    //   store.dispatch('loading', false)
    // }, 300)
  }
}


export default ({ url = '/', method = '/GET', data = {}, silent = false }) => {
  return new Promise((resolve, reject) => {
    let _cancel = null
    let _apiHost = config.api
    let _random = { stamp: Date.now(), url: `${_apiHost}${path}` }
    pushRequest(_random)
    const _axiosConfig = {
      baseURL: config.api,
      url,
      timeout: 5000,
      headers: { 'authorization': 'foobar' },
      method,
      cancelToken: new CancelToken(function (cancel) {
        _cancel = cancel
      })
    }
    if (method.toLocaleUpperCase() === 'GET') {
      _axiosConfig.params = data
    } else {
      _axiosConfig.data = data
    }
    const _axios = axios(_axiosConfig)
    _axios.then(res => {
      popRequest(_random)
      const _res = res.data
      resolve(_res)
    }).catch(err => {
      popRequest(_random)
      reject(err)
    })
  })
}