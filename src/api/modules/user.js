import fetch from "@/utils/fetch";
/**
 * 用户接口
 */
const PREFIX = "/User";

/**
 * 个人信息
 */
export const userMe = () => {
  return fetch(`${PREFIX}/me`);
};

/**
 * 修改用户
 * @param {旧新密码} param0 
 */
export const userUpdate = ({ avatar, nickname }) => {
  return fetch(`${PREFIX}/update`, { avatar, nickname });
};

/**
 * 修改用户密码
 * @param {旧新密码} param0 
 */
export const userUpdatePassword = ({ old_pwd, new_pwd }) => {
  return fetch(`${PREFIX}/updatePassword`, { old_pwd, new_pwd });
};

/**
 * 删除地址
 * @param {地址id} addr_id 
 */
export const userDelAddr = addr_id => {
  return fetch(`${PREFIX}/delAddr`, { addr_id });
};

/**
 * 友商账户列表
 */
export const userListAccount = ({ page }) => {
  return fetch(`${PREFIX}/listAccount`, { page });
};

/**
 * 友商账户明细
 */
export const userLogsAccount = ({ page, sid, user_sid }) => {
  return fetch(`${PREFIX}/logsAccount`, { page, sid, user_sid });
};

/**
 * 友商账户还款
 * @param {友商sid，商铺id，还款金额）} params0
 */
export const userRepayAccount = ({ user_sid, sid, repay }) => {
  return fetch(`${PREFIX}/repayAccount`, { user_sid, sid, repay });
};

/**
 * 手机验证码
 * @param {手机号} mobile 
 * @param {操作类型（forget）} action 
 */
export const userSendVcode = (mobile, action = "regist") => {
  return fetch(`${PREFIX}/sendVcode`, { mobile, action });
};

/**
 * 地址列表
 */
export const userListAddr = () => {
  return fetch(`${PREFIX}/listAddr`);
};

/**
 * 实名认证
 * @param {姓名，省份证号，图片id串} param0 
 */
export const userIdv = ({ name, sn, imgs }) => {
  return fetch(`${PREFIX}/idv`, { name, sn, imgs });
};

/**
 * 工商认证
 * @param {姓名，省份证号，图片id串} param0 
 */
export const userBlv = ({ name, sn, imgs }) => {
  return fetch(`${PREFIX}/blv`, { name, sn, imgs });
};

/**
 * 建议反馈
 * @param {内容,图片id串} param0 
 */
export const userFeedback = ({ content, imgs }) => {
  return fetch(`${PREFIX}/feedback`, { content, imgs });
};

/**
 * 忘记密码
 * @param {手机号，验证码，新密码} param0 
 */
export const userForget = ({ mobile, vcode, password }) => {
  return fetch(`${PREFIX}/forget`, { mobile, vcode, password });
};

/**
 * 更新地址
 * @param {地址id，城市id，联系人，联系电话，详细地址，是否默认} param0 
 */
export const userUpdateAddr = ({
  addr_id,
  city,
  contact,
  mobile,
  addr,
  isDefault
}) => {
  return fetch(`${PREFIX}/updateAddr`, {
    addr_id,
    city,
    contact,
    mobile,
    addr,
    default: isDefault
  });
};

/**
 * 注册
 * @param {手机号，验证码，新密码} param0 
 */
export const userRegist = ({ mobile, vcode, password }) => {
  return fetch(`${PREFIX}/regist`, { mobile, vcode, password });
};

/**
 * 添加地址
 * @param {城市id，联系人，联系电话，详细地址，是否默认} param0 
 */
export const userAddAddr = ({ city, contact, mobile, addr, isDefault }) => {
  return fetch(`${PREFIX}/addAddr`, {
    city,
    contact,
    mobile,
    addr,
    default: isDefault
  });
};

/**
 * 用户信息
 * @param {用户id} uid 
 */
export const userInfo = uid => {
  return fetch(`${PREFIX}/info`, { uid });
};

/**
 * 用户登录
 * @param {手机号，密码} param0 
 */
export const userLogin = ({ mobile, password }) => {
  return fetch(`${PREFIX}/login`, { mobile, password });
};

/**
 * 用户退出
 * @param {密码} password 
 */
export const userLogout = password => {
  return fetch(`${PREFIX}/logout`, { password });
};

/**
 * 设置默认地址
 * @param {地址id} addr_id 
 */
export const userSetAddrDefault = addr_id => {
  return fetch(`${PREFIX}/setAddrDefault`, { addr_id });
};

/**
 * 获取七牛token
 */
export const userUploadToken = () => {
  return fetch(`${PREFIX}/uploadToken`);
};

/**
 * 搬运首页数据
 */
export const userDeliverHome = () => {
  return fetch(`${PREFIX}/deliverHome`);
};
/**
 * 搬运统计数据
 * @param {统计时段(0当天,1昨天,7周,30月)} days 
 */
export const userDeliverStat = days => {
  return fetch(`${PREFIX}/deliverStat`, { days });
};
