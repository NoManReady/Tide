// const FillOrder = r => require(['@/views/shops/payment/FillOrder'], r)
const GoodsList = r => require(["@/views/shops/payment/GoodsList"], r);
const SelectAddress = r => require(["@/components/uc/Address"], r);
const Pay = r => require(["@/views/shops/payment/Pay"], r);
const PayResult = r => require(["@/views/shops/payment/PayResult"], r);
const routes = [
  {
    path: "goodsList",
    name: "shopsGoodsList",
    component: GoodsList,
    meta: {
      title: "商品清单"
    }
  },
  {
    path: "selectAddress",
    name: "shopsSelectAddress",
    component: SelectAddress,
    meta: {
      title: "选择地址"
    }
  },
  {
    path: "pay",
    name: "shopsPay",
    component: Pay,
    meta: {
      title: "支付"
    }
  },
  {
    path: "payResult",
    name: "shopsPayResult",
    component: PayResult,
    meta: {
      title: "支付结果"
    }
  }
];
export default routes;
