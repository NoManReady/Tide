import * as types from "./constant";
import apis from "@/api";
import { loadFromLocal, saveToLocal } from "@/utils/localStorage";

/**
 *
 */
export default {
  state: {
    city: loadFromLocal("city") || {}, // city相关
    businessArea: {}, // 商圈相关
    currentCategory: "", //分类相关
    currentBrand: "", //品牌相关
    customerOrFactoryInfo: {}, //代客或上游信息
    //订单提交,生成订单
    createOrder: {},

    //购物车
    cartInfo: {
      goods: [],
      goods_count: ""
    }
  },
  actions: {
    // city相关
    setCity({ commit }, city) {
      saveToLocal("city", city);
      commit(types.CITY, city);
    },
    setBusinessArea({ commit }, businessArea) {
      commit(types.BUSINESSA_AREA, businessArea);
    },
    //【商户管理】分类相关
    setCurrentCategory({ commit }, currentCategory) {
      commit(types.CURRENT_CATEGORY, currentCategory);
    },
    //【商户管理】分类相关
    setCurrentBrand({ commit }, currentBrand) {
      commit(types.CURRENT_BRAND, currentBrand);
    },
    //【商户管理】消费者、上游相关
    setCustomerOrFactoryInfo({ commit }, customerOrFactoryInfo) {
      commit(types.CUSTOMER_OR_FACTORY_INFO, customerOrFactoryInfo);
    },

    createOrder({ commit }, createOrder) {
      commit(types.CREATE_ORDER, createOrder);
    },

    async getCartInfo({ commit, state }, ids) {
      let _cartInfo = await apis.goodsGetCart(ids);
      commit(types.CART_INFO, _cartInfo);

      return _cartInfo;
    }
  },
  mutations: {
    [types.CITY](state, payload) {
      state.city = Object.freeze(payload);
    },
    [types.BUSINESSA_AREA](state, payload) {
      state.businessArea = Object.freeze(payload);
    },
    [types.CURRENT_CATEGORY](state, payload) {
      state.currentCategory = Object.freeze(payload);
    },
    [types.CURRENT_BRAND](state, payload) {
      state.currentBrand = Object.freeze(payload);
    },
    [types.CUSTOMER_OR_FACTORY_INFO](state, payload) {
      state.customerOrFactoryInfo = Object.freeze(payload);
    },
    [types.CART_INFO](state, payload) {
      state.cartInfo = payload;
    },

    //提交订单，生成订单
    [types.CREATE_ORDER](state, payload) {
      state.createOrder = Object.freeze(payload);
    }
  },
  getters: {
    city(state) {
      return state.city;
    },
    businessArea(state) {
      return state.businessArea;
    },
    currentCategory(state) {
      return state.currentCategory;
    },
    currentBrand(state) {
      return state.currentBrand;
    },
    customerOrFactoryInfo(state) {
      return state.customerOrFactoryInfo;
    },

    //提交订单，生成订单
    getCreateOrder(state) {
      return state.createOrder;
    },

    cartInfo(state) {
      return state.cartInfo;
    }
  }
};
