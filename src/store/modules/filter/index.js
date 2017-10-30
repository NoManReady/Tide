import * as types from './constant'
import apis from '@/api'

/**
 * 搜索combox相关
 */
export default {
    state: {
        // 订单
        orderFilter: {
            status: [],
            paystatus: [],
            refundstatus: [],
            isLoad: false
        },
        // 员工
        employeeFilter: {
            role: [],
            isLoad: false
        },
        // 货物
        goodsFilter: {
            brand: [],
            cate: [],
            sid: -1
        }
    },
    actions: {
        // 订单过滤器
        async getOrderFilter({
            commit,
            state
        }) {
            if (state.orderFilter.isLoad) {
                return
            }
            let _result = await apis.orderFilter()
            _result.isLoad = true
            commit(types.ORDER_FILTER, _result)
            return _result
        },
        // 员工过滤器
        async getEmployeeFilter({
            commit,
            state
        }) {
            if (state.employeeFilter.isLoad) {
                return
            }
            let _result = await apis.manageFilterEmployee()
            _result.isLoad = true
            commit(types.EMPLOYEE_FILTER, _result)
            return _result
        },
        // 货物（产品）过滤器
        async getGoodsFilter({
            commit,
            state
        }, sid = '') {
            if (sid === state.goodsFilter.sid) {
                return
            }
            let _result = await apis.goodsFilter(sid)
            _result.sid = sid
            commit(types.GOODS_FILTER, _result)
            return _result
        }
    },
    mutations: {
        [types.ORDER_FILTER](state, payload) {
            state.orderFilter = Object.freeze(payload)
        },
        [types.EMPLOYEE_FILTER](state, payload) {
            state.employeeFilter = Object.freeze(payload)
        },
        [types.GOODS_FILTER](state, payload) {
            state.goodsFilter = Object.freeze(payload)
        }
    },
    getters: {
        // 订单状态list
        orderStatusFilter(state) {
            return state.orderFilter.status.map(s => {
                return {
                    key: s.value,
                    value: s.name
                }
            })
        },
        // 订单付款状态list
        orderPayStatusFilter(state) {
            return state.orderFilter.paystatus.map(s => {
                return {
                    key: s.value,
                    value: s.name
                }
            })
        },
        // 员工角色list
        employeeRoleFilter(state) {
            return state.employeeFilter.role
        },
        // 货物品牌list
        goodsBrand(state) {
            return state.goodsFilter.brand
        },
        // 货物分类list
        goodsCate(state) {
            return state.goodsFilter.cate
        }
    }
}