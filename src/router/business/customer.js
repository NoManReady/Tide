const OrderList = r => require(['@/components/order/Layout'], r)

const CustomInfo = r => require(['@/views/business/customer/CustomInfo'], r)
const CustomEdit = r => require(['@/views/business/customer/CustomEdit'], r)
const AccountList = r => require(['@/views/business/customer/AccountList'], r)
const routes = [{
    path: 'customEdit/:clientId',
    name: 'businessCustomEdit',
    component: CustomEdit,
    meta: {
        title: '客户编辑'
    }
}, {
    path: 'customInfo/:clientId',
    name: 'businessCustomInfo',
    component: CustomInfo,
    meta: {
        title: '客户详情'
    }
}, {
    path: 'customAccount/:targetId',
    name: 'businessCustomAccountList',
    component: AccountList,
    meta: {
        title: '账户记录'
    }
},
{
    path: 'customOrderList',
    name: 'customOrderList',
    component: OrderList,
    meta: {
        title: '订单列表（客户）',
        routeName: 'businessOrderDetail'
    }
}]
export default routes

