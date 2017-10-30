const Detail = r => require(['@/views/business/order/Detail'], r)

const routes = [{
  path: 'orderDetail/:orderId',
  name: 'businessOrderDetail',
  component: Detail,
  meta: {
    title: '订单详情'
  }
}]
export default routes