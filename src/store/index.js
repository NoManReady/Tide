import Vuex from 'vuex'
import Vue from 'vue'

import user from './modules/user'
import shop from './modules/shop'
import com from './modules/com'
import filter from './modules/filter'
import permission from './modules/permission'
import business from './modules/business'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    user,
    com,
    filter,
    permission,
    business,
    shop
  }
})