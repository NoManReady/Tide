import fetch from '@/utils/fetch'
/**
 * 订单接口
 */
const PREFIX = '/Order'

/**
 * 取消订单
 * @param {订单id，原因} param0 
 */
export const orderCancel = ({ sid, order_id, reason }) => {
    return fetch(`${PREFIX}/cancel`, { sid, order_id, reason })
}

/**
 * 确认结算
 * @param {订单id，商铺id，金额} param0 
 */
export const orderConfirm = ({ order_id, sid, money, deliver_uid, deliver_fee, post_expect }) => {
    return fetch(`${PREFIX}/confirm`, { order_id, sid, money, deliver_uid, deliver_fee, post_expect })
}

/**
 * 打印小票
 * @param {订单id，商铺id} param0 
 */
export const printReceipt = ({ order_id, sid }) => {
    return fetch(`${PREFIX}/printReceipt`, { order_id, sid })
}

/**
 * 打印面单
 * @param {订单id，商铺id} param0 
 */
export const printExpress = ({ order_id, sid }) => {
    return fetch(`${PREFIX}/printExpress`, { order_id, sid })
}

/**
 * 订单确认(确认收货)
 * @param {订单id} order_id 
 */
export const orderReceipt = (order_id) => {
    return fetch(`${PREFIX}/receipt`, { order_id })
}

/**
 * 订单列表
 * @param {关键词，订单状态，结算状态，开始时间，结束时间，退货状态，当前页数} param0 
 */
export const orderGetList = ({ sid, factory_id, client_id, by_deliver, keyword, status, paystatus, sdate, edate, refundstatus, page }) => {
    return fetch(`${PREFIX}/getList`, { sid, factory_id, client_id, by_deliver, keyword, status, paystatus, sdate, edate, refundstatus, page })
}

/**
 * 订单商品列表（清单）
 * @param {订单id} order_id 
 */
export const orderGoods = ({ sid, order_id, by_deliver }) => {
    return fetch(`${PREFIX}/goods`, { sid, order_id, by_deliver })
}

/**
 * 订单提交
 * @param {商铺id，客户id，上游id，商品[goods_id,stock_id,price,num]，客户地址id，配送方式，订单金额，订单备注，内部备注} param0 
 */
export const orderSubmit = ({ sid, client_id, factory_id, goods, addr_id, post_type, deliver_uid, fee_post, remark, remark_shop }) => {
    return fetch(`${PREFIX}/submit`, { sid, client_id, factory_id, goods, addr_id, post_type, deliver_uid, fee_post, remark, remark_shop })
}

/**
 * 订单更新
 * @param {商铺id，订单id，运费，优惠，订单备注，内部备注} param0 
 */
export const orderUpdate = ({ sid, order_id, fee_post, fee_derate, remark, remark_shop }) => {
    return fetch(`${PREFIX}/update`, { sid, order_id, fee_post, fee_derate, remark, remark_shop })
}

/**
 * 订单详情
 * @param {订单id} order_id 
 */
export const orderGetDetail = ({ sid, order_id, by_deliver }) => {
    return fetch(`${PREFIX}/getDetail`, { sid, order_id, by_deliver })
}

/**
 * 订单记录
 * @param {订单id} order_id 
 */
export const orderLogs = ({ sid, order_id, by_deliver }) => {
    return fetch(`${PREFIX}/logs`, { sid, order_id, by_deliver })
}

/**
 * 请求支付
 * @param {订单id，支付类型，金额} param0 
 */
export const orderPay = ({ order_id, pay_type, money }) => {
    return fetch(`${PREFIX}/pay`, { order_id, pay_type, money })
}

/**
 * 订单过滤器（条件搜索）
 */
export const orderFilter = () => {
    return fetch(`${PREFIX}/filter`)
}

/**
 * 搬运发货
 * @param {订单id，备注} param0 
 */
export const orderPost = ({ order_id, remark }) => {
    return fetch(`${PREFIX}/post`, { order_id, remark })
}

/**
 * 出库
 * @param {商铺id，订单id，搬运id} param0 
 */
export const orderDeliver = ({ order_id, sid, deliver_uid }) => {
    return fetch(`${PREFIX}/deliver`, { order_id, sid, deliver_uid })
}

/**
 * 转采购入库
 * @param {订单id} param0 
 */
export const orderTocg = ({ order_id }) => {
    return fetch(`${PREFIX}/tocg`, { order_id })
}