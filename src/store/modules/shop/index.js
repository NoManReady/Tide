import Vue from "vue";
import * as types from "./constant";
import apis from "@/api";
import wx from "weixin-js-sdk";
import {
  saveToLocal,
  loadFromLocal,
  removeFromLocal
} from "@/utils/localStorage";
const SID_KEY = "SID_KEY";

const state = {
  sid: loadFromLocal(SID_KEY),
  delivers: [],
  shopInfo: null,
  shopSignInfo: null
};

const actions = {
  // 获取商铺信息
  async getShopInfo({ commit, state }) {
    let _shopInfo = await apis.shopGetDetail(state.sid)
    commit(types.SHOP_INFO, _shopInfo)
    return _shopInfo;
  },
  // 获取搬运列表
  async getDelivers({ commit, state }) {
    let _list = []
    let _result = await apis.manageGetDeliverList(state.sid)
    _result.list.forEach((item) => {
      let _item = {
        key: item.uid,
        value: item.uname
      }
      _list.push(_item)
    })
    commit(types.SHOP_DELIVERS, _list)
    return _list;
  },
  // 更新商铺信息
  updateShopInfo({ commit }, shopInfo) {
    commit(types.UPDATE_SHOP_INFO, shopInfo);
  },
  // 用户登录初始化sid验证(判断当前用户是否具有记录sid的shop)
  initSid({ dispatch, state }, sids) {
    if (!sids.includes(state.sid)) {
      removeFromLocal(SID_KEY);
      dispatch("setSid", "");
    }
  },
  // 设置商铺id
  setSid({ commit, getters, dispatch }, sid) {
    saveToLocal(SID_KEY, sid);
    if (sid || sid === 0) {
      let _shop = getters.userShops.find(s => s.sid === sid);
      dispatch("setShopSignInfo", _shop);
    }
    commit(types.SHOP_SID, sid);
  },
  //当前商铺认证信息
  setShopSignInfo({ commit }, shopSignInfo) {
    commit(types.SHOP_SIGN_INFO, shopSignInfo);
  },
  async setWeixinJssdk({ commit }, param, param1) {
    await apis.weixinJssdk(param).then(obj => {
      wx.config(obj);
      wx.ready(() => {
        wx.onMenuShareTimeline({
          title: param1.title, // 分享标题
          link: param1.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: param1.imgUrl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareAppMessage({
         title: param1.title, // 分享标题
          desc: param1.desc, // 分享描述
          link: param1.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: param1.imgUrl, // 分享图标
          type: "", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareQQ({
          title: param1.title, // 分享标题
          desc: param1.desc, // 分享描述
          link: param1.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: param1.imgUrl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareQZone({
          title: param1.title, // 分享标题
          desc: param1.desc, // 分享描述
          link: param1.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: param1.imgUrl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
      wx.error(err => {
        this.$vux.toast.text(err);
      });
    });
  }
};

const mutations = {
  [types.SHOP_INFO](state, payload) {
    state.shopInfo = payload;
  },
  [types.SHOP_DELIVERS](state, payload) {
    state.delivers = payload;
  },
  [types.UPDATE_SHOP_INFO](state, payload) {
    for (let key in payload) {
      if (state.shopInfo[key]) {
        Vue.set(state.shopInfo, key, payload[key]);
      }
    }
  },
  [types.SHOP_SID](state, payload) {
    state.sid = payload;
  },
  [types.SHOP_SIGN_INFO](state, payload) {
    state.shopSignInfo = payload;
  }
};

const getters = {
  shopInfo(state) {
    return state.shopInfo;
  },
  delivers(state) {
    return state.delivers;
  },
  shopSid(state, getters) {
    return state.sid;
  },
  userSid(state, getters) {
    return state.sid;
  },
  shopSignInfo(state) {
    return state.shopSignInfo;
  }
};
export default {
  state,
  actions,
  mutations,
  getters
};
