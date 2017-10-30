import * as types from './constant'
import apis from '@/api'

/**
 * 全局布局状态相关
 */
export default {
  state: {
    // 路由title
    title: '',
    // 动画效果
    direction: 'forward',
    // 全局loading
    loading: false,
    // 定位loading
    locationLoading: false,
    // 平台tabbar
    platformTabbar: false,
    // 商户tabbar
    businessTabbar: false,
    // 商铺tabbar
    shopsTabbar: false,
    // 配送tabbar
    deliveryTabbar: false,
    // 整合tabbar
    commonTabbar: false,
    // 未读信息数
    unreadCount: 0
  },
  actions: {
    title({ commit }, title) {
      commit(types.APP_TITLE, title)
    },
    direction({ commit }, direction) {
      commit(types.APP_DIRECTION, direction)
    },
    loading({ commit }, loading = true) {
      commit(types.APP_LOADING, loading)
    },
    locationing({ commit }, loading = true) {
      commit(types.APP_LOCATION_LOADING, loading)
    },
    setPlatformTabbar({ commit }, tabbar) {
      commit(types.PLATFORM_TABBAR, tabbar)
    },
    setBusinessTabbar({ commit }, tabbar) {
      commit(types.BUSINESS_TABBAR, tabbar)
    },
    setShopsTabbar({ commit }, tabbar) {
      commit(types.SHOPS_TABBAR, tabbar)
    },
    setDeliveryTabbar({ commit }, tabbar) {
      commit(types.DELIVERY_TABBAR, tabbar)
    },
    setCommonTabbar({ commit }, tabbar) {
      commit(types.COMMON_TABBAR, tabbar)
    },
    async getUnreadCount({ commit }, sid) {
      let _result = await apis.noticeNews(sid)
      commit(types.UNREAD_COUNT, _result.count)
    }
  },
  mutations: {
    [types.APP_TITLE](state, payload) {
      document.title = payload
      state.title = payload
    },
    [types.APP_DIRECTION](state, payload) {
      state.direction = payload
    },
    [types.APP_LOADING](state, payload) {
      state.loading = payload
    },
    [types.APP_LOCATION_LOADING](state, payload) {
      state.locationLoading = payload
    },
    [types.PLATFORM_TABBAR](state, payload) {
      state.platformTabbar = payload
    },
    [types.BUSINESS_TABBAR](state, payload) {
      state.businessTabbar = payload
    },
    [types.SHOPS_TABBAR](state, payload) {
      state.shopsTabbar = payload
    },
    [types.DELIVERY_TABBAR](state, payload) {
      state.deliveryTabbar = payload
    },
    [types.COMMON_TABBAR](state, payload) {
      state.commonTabbar = payload
    },
    [types.UNREAD_COUNT](state, payload) {
      state.unreadCount = payload
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    locationLoading(state) {
      return state.locationLoading
    },
    direction(state) {
      return state.direction
    },
    platformTabbar(state) {
      return state.platformTabbar
    },
    businessTabbar(state) {
      return state.businessTabbar
    },
    shopsTabbar(state) {
      return state.shopsTabbar
    },
    deliveryTabbar(state) {
      return state.deliveryTabbar
    },
    commonTabbar(state) {
      return state.commonTabbar
    },
    unreadCount(state) {
      return state.unreadCount ? '' + state.unreadCount : ''
    }
  }
}