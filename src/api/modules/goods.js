import fetch from "@/utils/fetch";
/**
 * 产品接口（对应某一个商铺）
 */
const PREFIX = "/Goods";

/**
 * 删除分类
 * @param {店铺id,分类id} sid 
 */
export const goodsDelCate = (sid, cate_id) => {
  return fetch(`${PREFIX}/delCate`, { sid, cate_id });
};

/**
 * 删除上游
 * @param {店铺id,上游id} sid 
 */
export const goodsDelFactorye = (sid, factory_id) => {
  return fetch(`${PREFIX}/delFactory`, { sid, factory_id });
};

/**
 * 删除品牌
 * @param {店铺id,品牌name} sid 
 */
export const goodsDelBrand = (sid, name) => {
  return fetch(`${PREFIX}/delBrand`, { sid, name });
};

/**
 * 删除商品
 * @param {店铺id,goods_id} sid 
 */
export const goodsDelGoods = (sid, goods_id) => {
  return fetch(`${PREFIX}/delGoods`, { sid, goods_id });
};

/**
 * 商品列表
 * @param {店铺id，标签，是否收藏，排序，关键词，分类id，品牌name，开始时间，结束时间，当前页数} param0 
 */
export const goodsGetList = ({
  sid,
  in_watch,
  tags,
  order,
  keyword,
  cate_id,
  brand_name,
  sdate,
  edate,
  lprice,
  hprice,
  page
}) => {
  return fetch(`${PREFIX}/getList`, {
    sid,
    tags,
    order,
    in_watch,
    keyword,
    cate_id,
    brand_name,
    sdate,
    edate,
    lprice,
    hprice,
    page
  });
};

/**
 * 商品库存
 * @param {商铺id，商品id，是否采购} param0 
 */
export const goodsGetStock = ({
  sid,
  client_id,
  factory_id,
  goods_id,
  is_buy
}) => {
  return fetch(`${PREFIX}/getStock`, {
    sid,
    client_id,
    factory_id,
    goods_id,
    is_buy
  });
};

/**
 * 商品详情
 * @param {商铺id，商品id} param0 
 */
export const goodsGetDetail = ({ sid, goods_id }) => {
  return fetch(`${PREFIX}/getDetail`, { sid, goods_id });
};

/**
 * 更新分类
 * @param {商铺id，分类id，分类名称} param0 
 */
export const goodsUpdateCate = ({ sid, cate_id, name }) => {
  return fetch(`${PREFIX}/updateCate`, { sid, cate_id, name });
};

/**
 * 添加分类
 * @param {商铺id，上级分类id，分类名称} param0 
 */
export const goodsAddCate = ({ sid, pid, name }) => {
  return fetch(`${PREFIX}/addCate`, { sid, pid, name });
};

/**
 * 添加品牌
 * @param {商铺id，品牌名称} param0 
 */
export const goodsAddBrand = ({ sid, name }) => {
  return fetch(`${PREFIX}/addBrand`, { sid, name });
};

/**
 * 更新商品
 * @param {商铺id，分类id，商品id，标题，品牌名称，货号，采购价，销售价，市场价，图片ids，是否公开} param0 
 */
export const goodsUpdateGoods = ({
  sid,
  cate_id,
  goods_id,
  title,
  brand_name,
  code,
  buy_price,
  sales_price,
  market_price,
  covers,
  is_public,
  is_clean
}) => {
  return fetch(`${PREFIX}/updateGoods`, {
    sid,
    cate_id,
    goods_id,
    title,
    brand_name,
    code,
    buy_price,
    sales_price,
    market_price,
    covers,
    is_public,
    is_clean
  });
};

/**
 * 添加商品
 * @param {商铺id，分类id，标题，品牌名称，货号，采购价，销售价，市场价，图片ids，颜色规格，尺码规格，是否公开} param0 
 */
export const goodsAddGoods = ({
  sid,
  cate_id,
  title,
  brand_name,
  code,
  buy_price,
  sales_price,
  market_price,
  covers,
  spec_c,
  spec_s,
  is_public
}) => {
  return fetch(`${PREFIX}/addGoods`, {
    sid,
    cate_id,
    title,
    brand_name,
    code,
    buy_price,
    sales_price,
    market_price,
    covers,
    spec_c,
    spec_s,
    is_public
  });
};

/**
 * 过滤
 * @param {商铺id} sid 
 */
export const goodsFilter = (sid) => {
  return fetch(`${PREFIX}/filter`, { sid });
};

/**
 * 加入购物车(含更新删除)
 * @param {商铺id，客户ID(商户管理开单必选)，上游ID(商户管理采购必选)，商品ID}
规格ID[无规格商品可为0]，价格(商户管理开单及采购选填)，数量
 */
export const goodsToCart = ({
  sid,
  client_id,
  factory_id,
  goods_id,
  stock_id,
  price,
  num
}) => {
  return fetch(`${PREFIX}/toCart`, {
    sid,
    client_id,
    factory_id,
    goods_id,
    stock_id,
    price,
    num
  });
};

/**
 * 取购物车商品清单
 * @param {商铺id，客户ID(商户管理开单必选)，上游ID(商户管理采购必选)}
 */
export const goodsGetCart = ({ sid, client_id, factory_id }) => {
  return fetch(`${PREFIX}/getCart`, { sid, client_id, factory_id });
};
/**
 * 获取购物车商品清单2
 */
export const goodsGetCarts = () => {
  return fetch(`${PREFIX}/getCarts`);
};
