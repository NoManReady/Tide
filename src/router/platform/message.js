const Order = r => require(['@/views/platform/message/Order'], r)
const OrderDetail = r => require(['@/views/platform/message/OrderDetail'], r)
const System = r => require(['@/views/platform/message/System'], r)
const SystemDetail = r => require(['@/views/platform/message/SystemDetail'], r)

const routes = [{
  path: 'orderMessage',
  name: 'platformOrderMessage',
  component: Order,
  meta: {
    title: '订单消息',
    auth: true
  }
}, {
  path: 'systemMessage',
  name: 'platformSystemMessage',
  component: System,
  meta: {
    title: '系统通知',
    auth: false
  }
}, {
  path: 'orderMessageDetail/:msgId',
  name: 'platformOrderMessageDetail',
  component: OrderDetail,
  meta: {
    title: '订单详情',
    auth: true
  }
}, {
  path: 'systemMessageDetail/:sysId',
  name: 'platformSystemMessageDetail',
  component: SystemDetail,
  meta: {
    title: '系统公告详情',
    auth: false
  }
}]
export default routes