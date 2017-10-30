const FactoryAdd = r => require(['@/views/business/factory/Add'], r)
const FactoryDetail = r => require(['@/views/business/factory/Detail'], r)
const routes = [{
    path: 'factoryAdd',
    name: 'businessFactoryAdd',
    component: FactoryAdd,
    meta: {
        title: '新增上游'
    }
}, {
    path: 'factoryEdit/:factoryId',
    name: 'businessFactoryEdit',
    component: FactoryAdd,
    meta: {
        title: '编辑上游'
    }
}, {
    path: 'factoryDetail/:factoryId',
    name: 'businessFactoryDetail',
    component: FactoryDetail,
    meta: {
        title: '上游详情'
    }
}
]
export default routes