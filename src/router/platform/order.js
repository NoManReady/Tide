const List = r => require(['@/components/order/Layout'], r)
const Detail = r => require(['@/views/platform/order/Detail'], r)
const ShopsGoodsDetail = r => require(["@/views/shops/goods/Detail"], r);

const routes = [{
  path: 'orderList',
  name: 'platformOrderList',
  component: List,
  meta: {
    title: '订单列表',
    routeName: 'platformOrderDetail',
    auth: true
  }
}, {
  path: 'orderDetail/:orderId',
  name: 'platformOrderDetail',
  component: Detail,
  meta: {
    title: '订单详情',
    auth: true
  }
},{
  path: "orderGoodsDetail",
  name: "orderGoodsDetail",
  component: ShopsGoodsDetail,
  meta: {
      title: "商品详情",
      auth: true
  }
}]
export default routes