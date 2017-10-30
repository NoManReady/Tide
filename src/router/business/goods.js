const GoodsList = r => require(["@/views/business/goods/Index"], r);
const GoodsDetail = r => require(["@/views/business/goods/Detail"], r);
const AddGoods = r => require(["@/views/business/goods/Add"], r);
const Category = r => require(["@/views/business/goods/Category"], r);
const AddCategory = r => require(["@/views/business/goods/AddCategory"], r);
const Brand = r => require(["@/views/business/goods/Brand"], r);
const AddBrand = r => require(["@/views/business/goods/AddBrand"], r);
const PayResult = r => require(["@/views/business/goods/PayResult"], r);
const Purchase = r => require(["@/views/business/goods/Purchase"], r);

const routes = [{
        path: "goodsList",
        name: "businessGoodsList",
        component: GoodsList,
        meta: {
            title: "商品列表"
        }
    },
    {
        path: "goodsDetail",
        name: "businessGoodsDetail",
        component: GoodsDetail,
        meta: {
            title: "商品详情"
        }
    },
    {
        path: "addGoods",
        name: "businessAddGoods",
        component: AddGoods,
        meta: {
            title: "新增商品"
        }
    },
    {
        path: "category",
        name: "businessCategory",
        component: Category,
        meta: {
            title: "商品分类"
        }
    },
    {
        path: "addCategory",
        name: "businessAddCategory",
        component: AddCategory,
        meta: {
            title: "新增商品分类"
        }
    },
    {
        path: "brand",
        name: "businessBrand",
        component: Brand,
        meta: {
            title: "商品品牌"
        }
    },
    {
        path: "addBrand",
        name: "businessAddBrand",
        component: AddBrand,
        meta: {
            title: "新增商品品牌"
        }
    },
    {
        path: "payResult",
        name: "businessPayResult",
        component: PayResult,
        meta: {
            title: "付款结果"
        }
    },
    {
        path: "purchase",
        name: "businessPurchase",
        component: Purchase,
        meta: {
            title: "结算"
        }
    }
];
export default routes;