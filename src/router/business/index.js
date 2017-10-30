const OrderList = r => require(['@/components/order/Layout'], r)

const Home = r => require(['@/views/business/Index'], r)
const Customer = r => require(['@/views/business/customer/Index'], r)
const Cart = r => require(['@/views/business/cart/Index'], r)
const Factory = r => require(['@/views/business/factory/Index'], r)
const Goods = r => require(['@/views/business/goods/Index'], r)
const routes = [{
  path: 'home',
  name: 'businessHome',
  component: Home,
  meta: {
    title: '首页',
    showTabbar: 0
  }
},
{
  path: 'orderList',
  name: 'businessOrderList',
  component: OrderList,
  meta: {
    title: '订单列表',
    showTabbar: 1,
    routeName: 'businessOrderDetail'
  }
},
{
  path: 'customer',
  name: 'businessCustomer',
  component: Customer,
  meta: {
    title: '客户',
    showTabbar: 2
  }
},
{
  path: 'cart',
  name: 'businessCart',
  component: Cart,
  meta: {
    title: '购物车',
    showTabbar: -1
  }
},
{
  path: 'factory',
  name: 'businessFactory',
  component: Factory,
  meta: {
    title: '上游',
    showTabbar: 3
  }
},
{
  path: 'goods',
  name: 'businessGoods',
  component: Goods,
  meta: {
    title: '商品',
    showTabbar: 4
  }
}
]

export default routes
