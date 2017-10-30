const OrderList = r => require(['@/components/order/Layout'], r)

const BusinessList = r => require(['@/views/delivery/business/Index'], r)
const Home = r => require(['@/views/delivery/Index'], r)
export default [{
  path: 'home',
  name: 'deliveryHome',
  component: Home,
  meta: {
    title: '订单统计',
    showTabbar: 0
  }
}, {
  path: 'orderList',
  name: 'deliveryOrderList',
  component: OrderList,
  meta: {
    title: '订单列表',
    showTabbar: 1,
    routeName: 'deliveryOrderDetail'
  }
}, {
  path: 'orderListBussness',
  name: 'deliveryOrderListByBusiness',
  component: OrderList,
  meta: {
    title: '商户订单列表',
    showTabbar: -1,
    routeName: 'deliveryOrderDetailByBusiness'
  }
}, {
  path: 'businessList',
  name: 'deliveryBusinessList',
  component: BusinessList,
  meta: {
    title: '商户列表',
    showTabbar: 2
  }
}]