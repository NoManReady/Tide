const Suggest = r => require(['@/components/uc/Suggest'], r)
const InfoEdit = r => require(['@/components/uc/InfoEdit'], r)
const Yprint = r => require(['@/components/uc/Yprint'], r)

const Home = r => require(['@/views/business/uc/Index'], r)
const EmployeeList = r => require(['@/views/business/uc/EmployeeList'], r)
const EmployeeAdd = r => require(['@/views/business/uc/EmployeeAdd'], r)
const EmployeeDetail = r => require(['@/views/business/uc/EmployeeDetail'], r)
const DeliverList = r => require(['@/views/business/uc/DeliverList'], r)
const DeliverDetail = r => require(['@/views/business/uc/DeliverDetail'], r)
const DeliverAdd = r => require(['@/views/business/uc/DeliverAdd'], r)
const Modify = r => require(['@/views/business/uc/Modify'], r)

const routes = [{
    path: 'uc',
    name: 'businessUc',
    component: Home,
    meta: {
        title: '商户中心',
    }
}, {
    path: 'ucModify',
    name: 'businessUcModify',
    component: Modify,
    meta: {
        title: '个人资料',
    }
}, {
    path: 'ucInfoEdit',
    name: 'businessUcInfoEdit',
    component: InfoEdit,
    meta: {
        title: '修改资料',
    }
}, {
    path: 'ucYprint',
    name: 'businessUcYprint',
    component: Yprint,
    meta: {
        title: '云打印设置',
    }
}, {
    path: 'ucSuggest',
    name: 'businessUcSuggest',
    component: Suggest,
    meta: {
        title: '意见反馈',
    }
}, {
    path: 'ucEmployeeList',
    name: 'businessUcEmployeeList',
    component: EmployeeList,
    meta: {
        title: '员工列表',
    }
}, {
    path: 'ucEmployeeAdd',
    name: 'businessUcEmployeeAdd',
    component: EmployeeAdd,
    meta: {
        title: '新增员工',
    }
}, {
    path: 'ucEmployeeEdit/:employeeId',
    name: 'businessUcEmployeeEdit',
    component: EmployeeAdd,
    meta: {
        title: '编辑员工',
    }
}, {
    path: 'ucEmployeeDetail/:employeeId',
    name: 'businessUcEmployeeDetail',
    component: EmployeeDetail,
    meta: {
        title: '员工详情',
    }
}, {
    path: 'ucDeliverList',
    name: 'businessUcDeliverList',
    component: DeliverList,
    meta: {
        title: '搬运列表',
    }
}, {
    path: 'ucDeliverDetail/:deliverId',
    name: 'businessUcDeliverDetail',
    component: DeliverDetail,
    meta: {
        title: '搬运详情',
    }
}, {
    path: 'ucDeliverEdit/:deliverId',
    name: 'businessUcDeliverEdit',
    component: DeliverAdd,
    meta: {
        title: '编辑搬运',
    }
}, {
    path: 'ucDeliverAdd',
    name: 'businessUcDeliverAdd',
    component: DeliverAdd,
    meta: {
        title: '添加搬运',
    }
}]
export default routes
