import Vue from 'vue'
import * as types from './constant'
import apis from '@/api'
import { saveToLocal, loadFromLocal, removeFromLocal } from '@/utils/localStorage'
const SID_KEY = 'SID_KEY'
/**
 * 登录用户相关
 */
const state = {
  // 设备平台(browser,weixin,android,ios)
  device: 'browser',
  // 设备ID(android,ios手机uuid)
  deviceSN: '',
  // 微信openid
  openid: loadFromLocal('openid'),
  uid: loadFromLocal('uid') ? loadFromLocal('uid') : 0,
  token: loadFromLocal('token'),
  userInfo: null
}
const actions = {
  setDevice({ commit }, device) {
    commit(types.DEVICE, device)
  },
  setDeviceSN({ commit }, deviceSN) {
    commit(types.DEVICE_SN, deviceSN)
  },
  setOpenid({ commit }, openid) {
    commit(types.OPENID, openid)
    saveToLocal('openid', openid)
  },
  // 登录
  async login({ commit }, user) {
    const _ut = await apis.userLogin(user)
    commit(types.UID, _ut.uid)
    commit(types.TOKEN, _ut.token)
    saveToLocal('uid', _ut.uid)
    saveToLocal('token', _ut.token)
    return _ut
  },
  // 登出
  async logout({ commit }, password) {
    const _succ = await apis.userLogout(password)
    commit(types.UID, 0)
    commit(types.TOKEN, '')
    saveToLocal('uid', 0)
    saveToLocal('token', '')
    commit(types.USER_INFO, null)
    return _succ
  },
  // 注册
  async register({ commit }, user) {
    const _ut = await apis.userRegist(user)
    commit(types.UID, _ut.uid)
    commit(types.TOKEN, _ut.token)
    saveToLocal('uid', _ut.uid)
    saveToLocal('token', _ut.token)
    return _ut
  },
  // 获取用户信息(当前登录用户)
  async getUserInfo({ commit, state, dispatch }) {
    const _userInfo = await apis.userMe()
    if (_userInfo) {
      let _sids = _userInfo.shop.map(s => {
        return s.sid
      })
      dispatch('initSid', _sids || [])
    }
    commit(types.USER_INFO, _userInfo)
    return _userInfo
  },
  updateUserInfo({ commit }, info) {
    commit(types.UPT_USER_INFO, info)
  },
  setToken({ commit }, token) {
    commit(types.TOKEN, token)
  },
  setUid({ commit }, uid) {
    commit(types.UID, uid)
  }
}
const mutations = {
  [types.DEVICE](state, payload) {
    state.device = payload
  },
  [types.DEVICE_SN](state, payload) {
    state.deviceSN = payload
  },
  [types.OPENID](state, payload) {
    state.openid = payload
  },
  [types.USER_INFO](state, payload) {
    state.userInfo = payload
  },
  [types.UPT_USER_INFO](state, payload) {
    for (let key in payload) {
      Vue.set(state.userInfo, key, payload[key])
    }
  },
  [types.TOKEN](state, payload) {
    state.token = payload
  },
  [types.UID](state, payload) {
    state.uid = payload
  }
}
const getters = {
  device(state) {
    return state.device
  },
  deviceSN(state) {
    return state.deviceSN
  },
  openid(state) {
    return state.openid
  },
  uid(state) {
    return state.uid
  },
  userInfo(state) {
    return state.userInfo
  },
  token(state) {
    return state.token
  },
  // 用户所有商铺
  userShops(state) {
    return state.userInfo ? state.userInfo.shop : []
  },
  // 用户可用商铺
  userSignShops(state, getters) {
    let _shops = getters.userShops.filter(shop => {
      return shop.sign && shop.server
    })
    return _shops
  },
  // 是否入驻可管理
  isSettle(state, getters) {
    return !!getters.userSignShops.length
  },
  // 实名认证信息
  authNameObj(state) {
    let userInfo = state.userInfo
    if (!userInfo) {
      return {}
    }
    return {
      name: userInfo.idv_name,
      sn: userInfo.idv_sn,
      defaultList: userInfo.idv_imgs.map(p => {
        return { url: p }
      })
    }
  },
  // 工商认证信息
  authBusinessObj(state) {
    let userInfo = state.userInfo
    if (!userInfo) {
      return {}
    }
    return {
      name: userInfo.blv_name,
      sn: userInfo.blv_sn,
      defaultList: userInfo.blv_imgs.map(p => {
        return { url: p }
      })
    }
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}