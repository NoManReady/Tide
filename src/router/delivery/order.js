const Detail = r => require(['@/views/delivery/order/Detail'], r)

const routes = [{
  path: 'orderDetail/:orderId',
  name: 'deliveryOrderDetail',
  component: Detail,
  meta: {
    title: '订单详情'
  }
}]
export default routes