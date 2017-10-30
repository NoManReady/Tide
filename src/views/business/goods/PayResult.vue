<template>
    <tip-page :titles="tipTitle" :description="description" :icon="icon" :buttons="buttons">
    </tip-page>
</template>
<script>
import TipPage from '@/components/common/TipPage'
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    saveToLocal,
    loadFromLocal
} from '@/utils/localStorage'
export default {
    components: {
        TipPage
    },
    data() {
        return {
            buttons: [{
                type: 'primary',
                text: '继续',
                onClick: this.confirm.bind(this)
            }, {
                type: 'default',
                text: '查看订单',
                onClick: this.view.bind(this)
            }],

            icon: 'success'
        }
    },
    created() {
        this.buttons[0].text = this.getCreateOrder.clientId ? '继续下单' : '继续采购';
    },
    computed: {
        ...mapGetters(['getCreateOrder']),
        tipTitle() {
            return this.getCreateOrder.clientId ? '下单成功' : '采购成功';
        },
        description() {
            let des = [{
                key: '订单号',
                value: this.getCreateOrder.order_sn
            }, {
                key: this.getCreateOrder.clientId ? '客户名称' : '上游名称',
                value: this.getCreateOrder.name
            }, {
                key: '订单金额',
                value: this.getCreateOrder.fee_order
            }]
            return des;
        }
    },
    methods: {
        confirm() {
            // this.$router.push({
            //     name: 'businessGoodsList',
            //     query: {
            //         clientId: this.getCreateOrder.clientId,
            //         factoryId: this.getCreateOrder.factoryId,
            //         isBuy: this.getCreateOrder.clientId ? 0 : 1
            //     }
            // })
            this.$router.push({
                name: this.getCreateOrder.clientId ? 'businessCustomer' : 'businessFactory'
            })
        },
        view() {
            this.$router.push({
                name: 'businessOrderDetail',
                params: {
                    orderId: this.getCreateOrder.order_id
                }
            })
        }
    }
}
</script>