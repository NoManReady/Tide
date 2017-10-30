const Home = r => require(['@/views/shops/Index'], r)
const Cart = r => require(['@/views/shops/cart/Index'], r)
const Payment = r => require(['@/views/shops/payment/Index'], r)
const Goods = r => require(['@/views/shops/goods/Index'], r)
const ShopsDetail = r => require(['@/views/shops/ShopsDetail'], r)
const routes = [{
        path: 'home',
        name: 'shopsHome',
        component: Home,
        meta: {
            title: '首页',
            showTabbar: 99
        }
    },
    {
        path: 'shopsDetail',
        name: 'shopsDetail',
        component: ShopsDetail,
        meta: {
            title: '商铺详情',
            showTabbar: -1
        }
    },
    {
        path: 'goods',
        name: 'shopsGoods',
        component: Goods,
        meta: {
            title: '商品列表',
            showTabbar: 1
        }
    },
    {
        path: 'cart',
        name: 'shopsCart',
        component: Cart,
        meta: {
            title: '购物车',
            showTabbar: -1
        }
    },
    {
        path: 'payment',
        name: 'shopsPayment',
        component: Payment,
        meta: {
            title: '结算'
        }
    }
]

export default routes