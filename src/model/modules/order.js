export const orderFn = () => {
  return {
    order_sn: '', //订单号
    fee_order: 0, //订单金额
    fee_goods: 0, //商品金额
    fee_post: 0, //配送金额
    fee_derate: 0, //优惠金额
    goods_count: 0, //商品数
    post_type: '', //配送方式
    post_type_name: '', //配送方式名称
    reciver_com: '', //收货人公司
    reciver_name: '', //收货人姓名
    reciver_mobile: '', //收货人电话
    reciver_addr: '', //收货人地址
    is_pay: '', //是否结算
    create_date: '', //下单时间
    status: '', //状态值
    status_name: '' //状态名称
  }
}