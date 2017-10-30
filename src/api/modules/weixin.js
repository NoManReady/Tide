import fetch from "@/utils/fetch";
/**
 * weixin接口
 */
const PREFIX = "/Weixin";

/**
 * 微信接口 - JS-SDK配置
 * @param {开启调试模式} debug 
 * @param {调用网页地址} url 
 * @param {需要使用的JS接口列表} jsApiList 
 */
export const weixinJssdk = ({ debug, url, jsApiList }) => {
  return fetch(`${PREFIX}/jssdk`, { debug, url, jsApiList });
};
/**
 * 微信接口 - 进入授权页面
 * @param {回传网页URL(回传openid,token[未绑定用户传空字符串],uid[未绑定用户传0])} url 
 */
export const weixinOauth = url => {
  return fetch(`${PREFIX}/oauth`, { url });
};
