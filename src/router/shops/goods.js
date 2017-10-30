const ShopsGoodsDetail = r => require(["@/views/shops/goods/Detail"], r);
const routes = [{
    path: "goodsDetail",
    name: "shopsGoodsDetail",
    component: ShopsGoodsDetail,
    meta: {
        title: "商品详情"
    }
}];
export default routes;