export const shopFn = () => {
  return {
    name: '', //商铺名称
    logo: '',//logo
    type: '', //商铺类型(1上游,2批发商,3零售商)
    city: [], //城市ID
    area: '', //商圈ID(仅上游和批发商有)
    contact: '', //联系人
    mobile: '', //联系电话
    addr: '', //地址
    qq: '', //qq
    wx: '', //wx
    introduce: '' //简介
  }
}

export const shopDetailFn = () => {
  return {
    name: '', //商铺名称
    logo: '',//logo
    stype: '', //商铺类型(1上游,2批发商,3零售商)
    contact: '', //联系人
    mobile: '', //联系电话
    addr: '', //地址
    owner: '',//店主id
    watch: 0,//关注状态
    fellow: 0,//友商状态
    qq: '', //qq
    wx: '', //wx
    introduce: '', //简介
    sales: 0,//出货量
    views: 0,//客流量
    goods_all: 0,//全部商品数
    goods_new: 0,//新品商品数
    goods_hot: 0,//热卖商品数
  }
}