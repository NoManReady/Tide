const Uc = r => require(['@/views/delivery/uc/Index'], r)
const Modify = r => require(['@/views/delivery/uc/Modify'], r)
const Suggest = r => require(['@/components/uc/Suggest'], r);

const routes = [{
  path: 'uc',
  name: 'deliveryUc',
  component: Uc,
  meta: {
    title: '用户中心',
  }
}, {
  path: 'ucModify',
  name: 'deliveryUcModify',
  component: Modify,
  meta: {
    title: '个人资料',
  }
}, {
  path: 'ucSuggest',
  name: 'deliveryUcSuggest',
  component: Suggest,
  meta: {
    title: '意见反馈',
  }
}]
export default routes
