const SelectCity = r => require(['@/views/platform/business/SelectCity'], r)
const Search = r => require(['@/views/platform/business/Search'], r)
const ListByTag = r => require(['@/views/platform/business/ListByTag'], r)
const ShopList = r => require(['@/views/platform/business/ShopList'], r)
const PerfectInfo = r => require(['@/views/platform/business/perfectInfo'], r)

const routes = [ {
    path: 'selectCity',
    name: 'platformSelectCity',
    component: SelectCity,
    meta: {
        title: '选择城市',
        auth: false
    }
}, {
    path: 'search',
    name: 'platformSearch',
    component: Search,
    meta: {
        title: '商户搜索',
        auth: false
    }
}, {
    path: 'listByTag',
    name: 'platformListByTag',
    component: ListByTag,
    meta: {
        title: '商品圈',
        auth: false
    }
}, {
    path: 'shopList',
    name: 'platformShopList',
    component: ShopList,
    meta: {
        title: '商户列表',
        auth: false
}},
    {
    path: 'perfectInfo',
    name: 'platformPerfectInfo',
    component: PerfectInfo,
    meta: {
        title: '完善信息',
        auth: true
    }
}]
export default routes