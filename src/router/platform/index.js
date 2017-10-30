const Home = r => require(['@/views/platform/Index'], r)
const MessageIndex = r => require(['@/views/platform/message/Index'], r)
const Business = r => require(['@/views/platform/business/Index'], r)
const Cart = r => require(['@/views/platform/cart/Index'], r)
const UserCenter = r => require(['@/views/platform/uc/Index'], r)
const routes = [{
    path: 'home',
    name: 'platformHome',
    component: Home,
    meta: {
        title: '首页',
        showTabbar: 0,
        auth: false
    }
},
{
    path: 'business',
    name: 'platformBusiness',
    component: Business,
    meta: {
        title: '商圈',
        showTabbar: -1,
        auth: false
    }
},
{
    path: 'cart',
    name: 'platformCart',
    component: Cart,
    meta: {
        title: '购物车',
        showTabbar: 1,
        auth: true
    }
},
{
    path: 'message',
    name: 'platformMessage',
    component: MessageIndex,
    meta: {
        title: '消息',
        showTabbar: 3,
        auth: false
    }
},
{
    path: 'uc',
    name: 'platformUcenter',
    component: UserCenter,
    meta: {
        title: '用户中心',
        showTabbar: 4,
        auth: true
    }
}
]

export default routes