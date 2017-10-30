import fetch from "@/utils/fetch";
/**
 * 商铺接口
 */
const PREFIX = "/Shop";

/**
 * 关注商铺
 * @param {店铺id} sid 
 */
export const shopWatch = sid => {
  return fetch(`${PREFIX}/watch`, {
    sid
  });
};

/**
 * 取消关注商铺
 * @param {店铺id} sid 
 */
export const shopUnWatch = sid => {
  return fetch(`${PREFIX}/unwatch`, {
    sid
  });
};

/**
 * 申请通过
 * @param {店铺id} sid 
 * @param {友商id} user_sid 
 */
export const shopFellowYes = ({ sid, user_sid }) => {
  return fetch(`${PREFIX}/fellowYes`, { sid, user_sid });
};

/**
 * 申请不通过
 * @param {店铺id} sid 
 * @param {友商id} user_sid 
 */
export const shopFellowNo = ({ sid, user_sid }) => {
  return fetch(`${PREFIX}/fellowNo`, { sid, user_sid });
};

/**
 * 商铺入驻
 * @param {商铺类型(1上游,2批发商,3零售商),城市ID,商圈ID(仅上游和批发商有,商铺名称,联系人,联系电话,地址,QQ,微信,简介} param0 
 */
export const shopAdd = ({
  type,
  city,
  area,
  name,
  contact,
  mobile,
  addr,
  qq,
  wx,
  introduce
}) => {
  return fetch(`${PREFIX}/add`, {
    type,
    city,
    area,
    name,
    contact,
    mobile,
    addr,
    qq,
    wx,
    introduce
  });
};

/**
 * 商铺资料更新
 * @param {sid,联系人,联系电话,地址,QQ,微信,简介} param0 
 */
export const shopUpdate = ({
  sid,
  contact,
  mobile,
  addr,
  logo,
  qq,
  wx,
  introduce
}) => {
  return fetch(`${PREFIX}/update`, {
    sid,
    contact,
    mobile,
    addr,
    logo,
    qq,
    wx,
    introduce
  });
};

/**
 * 商铺云打印设置
 * @param {sid,联系人,联系电话,地址,QQ,微信,简介} param0 
 */
export const shopWifi = ({
  sid,
  ssid,
  pwd
}) => {
  return fetch(`/Yprint/wifi`, {
    sid,
    ssid,
    pwd
  });
};

/**
 * 商铺资料详情
 * @param {商铺id} param0 
 */
export const shopGetDetail = sid => {
  return fetch(`${PREFIX}/getDetail`, { sid });
};

/**
 * 商铺列表
 * @param {是否关注，是否友商，类型串，关键词，城市id，商圈id，商品个数（pageSize）,当前页数} param0 
 */
export const shopGetList = ({
  in_watch,
  in_fellow,
  types,
  keyword,
  cid,
  aid,
  with_goods,
  page
}) => {
  return fetch(`${PREFIX}/getList`, {
    in_watch,
    in_fellow,
    types,
    keyword,
    cid,
    aid,
    with_goods,
    page
  });
};

/**
 * 商铺服务列表
 * @param {商铺id} sid 
 */
export const shopServer = sid => {
  return fetch(`${PREFIX}/server`, {
    sid
  });
};

/**
 * 商铺签约
 * @param {商铺id} sid 
 */
export const shopSign = sid => {
  return fetch(`${PREFIX}/sign`, {
    sid
  });
};

/**
 * 申请加为商友
 * @param {商铺id} sid 
 */
export const shopFellow = sid => {
  return fetch(`${PREFIX}/fellow`, {
    sid
  });
};
/**
 * 取消商友
 * @param {商铺id} sid 
 */
export const shopUnFellow = sid => {
  return fetch(`${PREFIX}/unfellow`, {
    sid
  });
};

/**
 * 商铺管理首页数据
 * @param {店铺id} sid 
 */
export const shopHome = sid => {
  return fetch(`${PREFIX}/home`, { sid });
};

/**
 * 商铺管理统计数据
 * @param {店铺id} sid 
 * @param {统计时段(0当天,1昨天,7周,30月)} days 
 */
export const shopStat = ({ sid, days }) => {
  return fetch(`${PREFIX}/stat`, { sid, days });
};
