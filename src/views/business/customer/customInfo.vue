<template>
    <div class="business-custom-info gc-container has-header" :class="{'has-footer':isCustomer,'ft-btn':isCustomer}">
        <x-header :left-options="{backText: ''}" class="gc-header">客户详情
        </x-header>
        <group>
            <cell title="客户名称" :value="info.name"></cell>
            <cell title="账号状态" :value="statusName"></cell>
            <cell title="客户编号" value="22"></cell>
            <cell title="地区" :value="info.city_name"></cell>
        </group>
        <group>
            <cell title="联系人" :value="info.contact"></cell>
            <cell title="联系电话" :value="info.mobile"></cell>
            <div class="gc-cell box-flex">
                <div class="mr15">联系地址</div>
                <div class="flex-one">{{info.addr}}</div>
            </div>
        </group>
        <group>
            <cell title="帐户">
                {{info.account>0?'结余':'欠款'}}¥{{info.account|toFixed}}
            </cell>
        </group>
        <div class="gc-footer" v-if="isCustomer">
            <flexbox class="plr20 ptb10 bc-f" v-if="info.status===1">
                <flexbox-item>
                    <el-button type="primary" @click.native="onPlaceOrder(info)">开单</el-button>
                </flexbox-item>
                <flexbox-item>
                    <el-button type="info" @click.native="toOrder">查看订单</el-button>
                </flexbox-item>
                <flexbox-item>
                    <el-button type="warning" @click.native="toAccount(info.user_sid,info.account)">账目明细</el-button>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ElButton from '@/components/common/button'
import model from '@/model'
const customer = model.customerFn()
export default {
    name: 'business-customer-info',
    components: {
        ElButton
    },
    data() {
        return {
            isCustomer: true,
            clientId: '',
            info: customer
        }
    },
    created() {
        this.clientId = this.$route.params.clientId
        this._loadInfo()
    },
    computed: {
        ...mapGetters(['userSid']),
        statusName() {
            return this.info.status === 0 ? '已禁用' : this.info.status === 1 ? '已申请' : '待确认'
        }
    },
    methods: {
        ...mapActions(['setCustomerOrFactoryInfo']),
        // 加载详情
        async _loadInfo() {
            let _result = await this.$api.manageGetClientDetail({ sid: this.userSid, client_id: this.clientId })
            this.info = _result
        },
        // 开单
        onPlaceOrder(item) {
            this.setCustomerOrFactoryInfo(Object.assign({}, item, { client_id: this.clientId }));
            this.$router.push({
                name: 'businessGoods',
                query: {
                    isBuy: 0,
                    clientId: this.clientId
                }
            })
        },
        // 查看订单
        toOrder() {
            this.$router.push({ name: 'customOrderList', query: { client_id: this.clientId, sid: this.userSid } })
        },
        // 查看账目明细
        toAccount(targetId, account) {
            this.$router.push({ name: 'businessCustomAccountList', params: { targetId }, query: { account, clientId: this.clientId } })
        }
    }
}
</script>

