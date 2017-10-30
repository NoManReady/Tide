import { flatten } from 'lodash'
import { saveToLocal, loadFromLocal } from '@/utils/localStorage'
const LAST_URI_KEY = 'LAST_URI_KEY'
const deCentralization = (files) => {
  const routes = flatten((r => {
    return r.keys().map(k => {
      return r(k).default
    })
  })(files))
  return routes
}

//const Login = r => require(['@/views/common/Login'], r)
import Login from '@/views/common/Login'
const Register = r => require(['@/views/common/Register'], r)
const Forget = r => require(['@/views/common/Forget'], r)
const Err404 = r => require(['@/views/common/404'], r)
const PlatformLayout = r => require(['@/views/common/PlatformLayout'], r)
const BusinessLayout = r => require(['@/views/common/BusinessLayout'], r)
const ShopsLayout = r => require(['@/views/common/ShopsLayout'], r)
const DeliveryLayout = r => require(['@/views/common/DeliveryLayout'], r)

// 平台布局页
const platformChilds = deCentralization(require.context('./', true, /\.\/platform\/\w+\.js/))
// 商户布局页
const businessChilds = deCentralization(require.context('./', true, /\.\/business\/\w+\.js/))
// 商铺布局页
const shopsChilds = deCentralization(require.context('./', true, /\.\/shops\/\w+\.js/))
// 送货管理布局页
const deliveryChilds = deCentralization(require.context('./', true, /\.\/delivery\/\w+\.js/))


const routes = [{
  path: '/login',
  name: 'login',
  component: Login,
  meta: { auth: false, name: 'login' }
}, {
  path: '/register',
  name: 'register',
  component: Register,
  meta: { auth: false, name: 'register' }
}, {
  path: '/forget',
  name: 'forget',
  component: Forget,
  meta: { auth: false, name: 'forget' }
}, {
  path: '/404',
  name: '404',
  component: Err404,
  meta: { auth: false, name: '404' }
}, {
  path: '/platform',
  name: 'platform',
  component: PlatformLayout,
  redirect: '/platform/home',
  children: platformChilds,
  meta: { auth: false, name: 'platformLayout' }
}, {
  path: '/business',
  name: 'business',
  component: BusinessLayout,
  redirect: '/business/home',
  children: businessChilds,
  meta: { auth: true, name: 'businessLayout' }
}, {
  path: '/shops',
  name: 'shops',
  component: ShopsLayout,
  redirect: '/shops/home',
  children: shopsChilds,
  meta: { auth: false, name: 'shopsLayout' }
}, {
  path: '/delivery',
  name: 'delivery',
  component: DeliveryLayout,
  redirect: '/delivery/home',
  children: deliveryChilds,
  meta: { auth: true, name: 'deliveryLayout' }
}, {
  path: '*',
  name: 'redirect',
  redirect: to => {
    let _last = loadFromLocal(LAST_URI_KEY)
    let _uri = '/platform'
    if (_last && _last !== '/') {
      _uri = _last
    }
    return _uri
  }
}]

export default routes