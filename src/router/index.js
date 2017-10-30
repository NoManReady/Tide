import Vue from 'vue'
import Router from 'vue-router'
import routes from './common'
Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes
})