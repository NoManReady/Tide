import fetch from '@/utils/fetch'
/**
 * 消息接口
 */
const PREFIX = '/Notice'

/**
 * 新消息数量
 * @param {商铺id} sid 
 */
export const noticeNews = (sid) => {
  return fetch(`${PREFIX}/news`, { sid })
}

/**
 * 系统公告内容（详情）
 * @param {公告id} notice_id 
 */
export const noticeGetSystemContent = (notice_id) => {
  return fetch(`${PREFIX}/getSystemContent`, { notice_id })
}

/**
 * 系统公告列表
 * @param {当前页数} page 
 */
export const noticeGetSystemList = (page) => {
  return fetch(`${PREFIX}/getSystemList`, { page })
}

/**
 * 订单通知列表
 * @param {当前页数，商铺id} param0 
 */
export const noticeGetOrderList = ({ page, sid }) => {
  return fetch(`${PREFIX}/getOrderList`, { page, sid })
}

/**
 * 阅读订单信息
 * @param {通知id，商铺id} param0 
 */
export const noticeReadOrder = ({ log_id, sid }) => {
  return fetch(`${PREFIX}/readOrder`, { log_id, sid })
}