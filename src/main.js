import Vue from 'vue'
import VueCordova from 'vue-cordova'
import FastClick from 'fastclick'
import router from '@/router'
import store from '@/store'
import filter from '@/filter'
import tap from '@/directives/tap'
import clickoutside from '@/directives/clickoutside'
import App from './App'
import 'animate.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import cookie from 'cookies-js'
import apis from '@/api'
import { saveToLocal, loadFromLocal } from '@/utils/localStorage'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, TransferDom } from 'vux'
Vue.use(VueCordova)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

// 检查微信浏览器
if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1) {
    store.dispatch('setDevice', 'weixin')
}
// 当app访问时添加cordova.js
if (window.location.protocol === 'file:') {
    let cordovaScript = document.createElement('script')
    cordovaScript.setAttribute('type', 'text/javascript')
    cordovaScript.setAttribute('src', 'cordova.js')
    document.body.appendChild(cordovaScript)
}
// 监听Cordova事件
Vue.cordova.on('deviceready', () => {
    store.dispatch('setDevice', Vue.cordova.device.platform.toLowerCase())
    store.dispatch('setDeviceSN', Vue.cordova.device.uuid)
    console.log(store.getters.device)
    console.log(store.getters.deviceSN)
})

import validator from "@/plugins/validator"
import geolocation from "@/plugins/geolocation"
import rules from '@/utils/validate'
Vue.use(validator, {
    blur: true,
    rules
})
Vue.use(geolocation)

import VueLazyLoad from 'vue-lazyload'
//默认图片 
import lazy_img from './assets/avatar.png'
Vue.use(VueLazyLoad, {
    loading: lazy_img,
    error: lazy_img
})


import bus from '@/utils/bus'
Vue.directive('TransferDom', TransferDom)
Object.defineProperties(Vue.prototype, {
    $api: {
        value: apis
    },
    $bus: {
        value: bus
    },
    $config: {
        value: {
            webURL: 'http://gc.xiahe.me/',
            qiniuView: 'http://res.gc.xiahe.me/',
            qiniuHost: 'http://up-z2.qiniu.com'
        }
    }
})

window.Cookies = cookie

FastClick.attach(document.body)

NProgress.configure({ showSpinner: false })

Vue.config.productionTip = process.env['NODE_ENV'] === 'production'
Vue.config.devtools = true

import '@/utils/vuxComp'
Vue.directive('tap', tap)
Vue.directive('clickoutside', clickoutside)

// 在免TOKEN白名单，直接进入
const whiteList = ['/login', '/register', '/forget']

// 加载用户信息
const setRouterAndUserInfo = () => {
    return new Promise((resolve, reject) => {
        let _userInfo = store.getters.userInfo
        if (_userInfo) {
            resolve(_userInfo)
        } else {
            resolve(store.dispatch('getUserInfo'))
        }
    })
}

// 记录页面路由权级及不同路径次数（count），并设置root路径权级为0
const HISTORY_CACHE = Object.create(null)
let HISTORY_CACHE_KEY_COUNT = 0
HISTORY_CACHE['/'] = 0

router.beforeEach((to, from, next) => {
    // 设置title，开启加载条
    NProgress.start()

    console.log(HISTORY_CACHE);
    console.log(window.location.href);
    console.log(to);
    console.log(from);
    let redirect = decodeURIComponent(window.location.search.replace('?redirect=', ''));
    if (redirect != '' && to.name == 'platformHome') {
        console.log(redirect);
        next(redirect);
    }

    console.log('-------------------');
    store.dispatch('title', to.meta.title || '敢潮云订货')
    /*页面级animated--begin*/
    let toName = to.name || to.path
    let fromName = from.name || from.path
    const toIndex = HISTORY_CACHE[toName]
    const fromIndex = HISTORY_CACHE[fromName]
    // 判断当前页面是否进入过
    // 是：如果当前权级>前一个权级，进入（forward），否则退出（reverse）
    // 否：记录当前路径-权级+1，并进入（forward）
    if (toIndex) {
        if (parseInt(toIndex, 10) > parseInt(fromIndex, 10)) {
            store.dispatch('direction', 'forward')
        } else {
            store.dispatch('direction', 'reverse')
        }
    } else {
        ++HISTORY_CACHE_KEY_COUNT
        toName !== '/' && (HISTORY_CACHE[toName] = HISTORY_CACHE_KEY_COUNT)
        store.dispatch('direction', 'forward')
    }
    /*页面级animated--end*/
    // 白名单过滤
    let _hasAuth = to.matched.some(m => {
        return !!m.meta.auth
    })
    if (whiteList.indexOf(to.path) > -1) {
        next()
    } else {
        if (!store.getters.token || !store.getters.uid) {
            if (!_hasAuth) {
                next()
            } else {
                next('/login')
                NProgress.done()
            }
        } else {
            setRouterAndUserInfo().then(d => {
                next()
            })
        }
    }
})

router.afterEach((to, from) => {
    // 关闭加载条
    NProgress.done()
})
window.onbeforeunload = () => {
    saveToLocal('LAST_URI_KEY', router.currentRoute.fullPath)
}
/* eslint-disable no-new */
new Vue({
    router,
    store,
    filter,
    render: h => h(App)
}).$mount('#app')