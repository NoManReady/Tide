const UcAddressList = r => require(['@/components/uc/Address'], r)
const UcQA = r => require(['@/components/uc/Suggest'], r)

const Modify = r => require(['@/views/platform/uc/Modify'], r)
const UpPassword = r => require(['@/views/platform/uc/Password'], r)
const Seller = r => require(['@/views/platform/uc/Seller'], r)
const Sign = r => require(['@/views/platform/uc/Sign'], r)
const BuyService = r => require(['@/views/platform/uc/BuyService'], r)
const UcPay = r => require(['@/views/platform/uc/Pay'], r)
const UcPaySuccess = r => require(['@/views/platform/uc/PaySuccess'], r)
const UcFollow = r => require(['@/views/platform/uc/Follow'], r)
const UcParter = r => require(['@/views/platform/uc/Parter'], r)
const UcCollection = r => require(['@/views/platform/uc/Collection'], r)
const UcAuth = r => require(['@/views/platform/uc/Auth'], r)
const UcAuthName = r => require(['@/views/platform/uc/AuthName'], r)
const UcAuthBusiness = r => require(['@/views/platform/uc/AuthBusiness'], r)
const UcAccountList = r => require(['@/views/platform/uc/AccountList'], r)
const UcAccoutnDetail = r => require(['@/views/platform/uc/AccountDetail'], r)


const routes = [{
    path: 'ucModify',
    name: 'platformUcModify',
    component: Modify,
    meta: {
        title: '我的账户',
        auth: true
    }
}, {
    path: 'upModify',
    name: 'platformUpPassword',
    component: UpPassword,
    meta: {
        title: '修改密码',
        auth: true
    }
}, {
    path: 'seller',
    name: 'platformSeller',
    component: Seller,
    meta: {
        title: '我要入驻',
        auth: true
    }
}, {
    path: 'signed/:sid',
    name: 'platformUcSign',
    component: Sign,
    meta: {
        title: '签约',
        auth: true
    }
}, {
    path: 'buyService/:sid',
    name: 'platformBuyService',
    component: BuyService,
    meta: {
        title: '购买服务',
        auth: true
    }
}, {
    path: 'pay',
    name: 'platformUcPay',
    component: UcPay,
    meta: {
        title: '付款方式',
        auth: true
    }
}, {
    path: 'paySuccess',
    name: 'platformUcPaySuccess',
    component: UcPaySuccess,
    meta: {
        title: '付款成功',
        auth: true
    }
}, {
    path: 'addressList',
    name: 'platformUcAddressList',
    component: UcAddressList,
    meta: {
        title: '地址列表',
        auth: true
    }
}, {
    path: 'follow',
    name: 'platformUcFollow',
    component: UcFollow,
    meta: {
        title: '我的关注',
        auth: true
    }
}, {
    path: 'ucParter',
    name: 'platformUcParter',
    component: UcParter,
    meta: {
        title: '我的商友',
        auth: true
    }
}, {
    path: 'collection',
    name: 'platformUcCollection',
    component: UcCollection,
    meta: {
        title: '我的收藏',
        auth: true
    }
}, {
    path: 'ucAuth',
    name: 'platformUcAuth',
    component: UcAuth,
    meta: {
        title: '我的认证',
        auth: true
    }
}, {
    path: 'authName',
    name: 'platformUcAuthName',
    component: UcAuthName,
    meta: {
        title: '实名认证',
        auth: true
    }
}, {
    path: 'authBusiness',
    name: 'platformUcAuthBusiness',
    component: UcAuthBusiness,
    meta: {
        title: '工商认证',
        auth: true
    }
}, {
    path: 'ucQA',
    name: 'platformUcQA',
    component: UcQA,
    meta: {
        title: '意见反馈',
        auth: true
    }
}, {
    path: 'accountList',
    name: 'platformUcAccountList',
    component: UcAccountList,
    meta: {
        title: '账目列表',
        auth: true
    }
}, {
    path: 'accountDetail/:sid/:account',
    name: 'platformUcAccoutnDetail',
    component: UcAccoutnDetail,
    meta: {
        title: '账目详情',
        auth: true
    }
}]


export default routes