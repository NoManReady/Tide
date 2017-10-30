<template>
    <div class="uc-pay">
        <x-header :left-options="{backText: ''}" class="pos-header">支付</x-header>
        <div class="title tc pt20 fs18">金额:{{totalPay}}元</div>
        <group>
            <radio title="可多付款方式" :options="payType" v-model="payValue">
                </radio>
        </group>
        <div class="plr15 ptb20">
            <x-button type="primary" v-tap @tap.native="submit">去付款</x-button>
        </div>
    </div>
</template>

<script>
    import {
        Radio
    } from 'vux'
    export default {
        components: {
            Radio
        },
        data() {
            return {
                payType: [{
                    key: '1',
                    value: '微信支付'
                }, {
                    key: '2',
                    value: '支付宝支付'
                }, {
                    key: '3',
                    value: '建行龙支付'
                }],
                payValue: '1',
                totalPay: 365
            }
        },
        methods:{
            submit(){

            }
        }
    }
</script>