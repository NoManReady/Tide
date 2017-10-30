<template>
    <div class="shops-payment-pay gc-container has-header has-footer">
        <!-- header -->
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="backOrderList" class="gc-header">
            选择付款方式
        </x-header>
        <group>
            <!-- <cell title="订单金额" :value="orderAmount"></cell> -->
            <div class="gc-cell">
                <div class="cf w100p fs14 fc-6 mt10">
                    <div class="fl">订单金额</div>
                    <div class="fr f-red">¥{{orderAmount}}</div>
                </div>
            </div>
        </group>
        <group>
            <!-- <cell :title="balanceTitle" :value="balanceAmount"></cell> -->
            <div class="gc-cell">
                <div class="cf w100p fs14 fc-6 mt10">
                    <div class="fl">{{balanceTitle}}</div>
                    <div class="fr f-red">¥{{balanceAmount}}</div>
                </div>
            </div>
        </group>
        <group>
            <x-input title="支付金额(￥)" v-model="query.money" text-align="right" placeholder="请输入金额"></x-input>
        </group>
        <group>
            <radio :options="payType" @on-change="payTypeChange"></radio>
        </group>
        <div class="gc-footer" @click.prevent="orderPay">
            <x-button type="warn">确定</x-button>
        </div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    toFixed
} from '@/utils'
import jhpay from '@/assets/icon-jhpay.png'
import wxpay from '@/assets/icon-wxpay.png'
import alipay from '@/assets/icon-alipay.png'
import xxpay from '@/assets/icon-xxpay.png'
export default {
    name: 'shops-payment-pay',
    title: '选择付款方式',
    data() {
        return {
            balanceAmount: '',
            payType: [{
                icon: xxpay,
                key: '0',
                value: '线下支付'
            }, {
                icon: alipay,
                key: '1',
                value: '支付宝'
            }, {
                icon: wxpay,
                key: '2',
                value: '微信支付'
            }, {
                icon: jhpay,
                key: '3',
                value: '建行龙支付'
            }],
            payValue: '',
            query: {
                order_id: '',
                pay_type: '',
                money: ''
            }
        }
    },
    created() {
        this.init();
    },
    computed: {
        ...mapGetters(['getCreateOrder', 'userInfo']),
        balanceTitle() {
            return this.balanceAmount >= 0 ? '账户余额' : '历史欠款';
        },
        orderAmount() {
            let amount = parseFloat(this.getCreateOrder.fee_order);
            return toFixed(amount);
        },
        payAmount() {
            let payamount = this.orderAmount - this.balanceAmount;
            return toFixed(payamount);
        }
    },
    methods: {
        init() {
            this.query.order_id = this.getCreateOrder.order_id;
            this.balanceAmount = parseFloat(this.userInfo.money);
            // this.query.money = this.payAmount;
        },
        payTypeChange(value, label) {
            this.query.pay_type = value;
        },
        async orderPay() {
            if (this.query.money == '') {
                this.$vux.toast.text('请输入支付金额');
                return;
            };
            if (!this.query.pay_type) {
                this.$vux.toast.text('请选择支付方式');
                return;
            };
            let _result = await this.$api.orderPay(this.query)
            if (_result) {
                if (_result.url) {
                    window.location.href = _result.url;
                } else {
                    this.$router.push({
                        name: 'shopsPayResult',
                        query: {
                            orderId: this.query.order_id,
                            payAmount: this.query.money
                        }
                    })
                }
            }
        },
        backOrderList() {
            this.$router.push({
                name: 'platformOrderList'
            })
        }

    }
}
</script>
<style lang="less">
.weui-cells {
    font-size: 14px;
    margin-top: 10px;
}
</style>

<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.shops-payment-pay {
    .gc-footer {
        .weui-btn {
            border-radius: 0
        }
    }
}
</style>