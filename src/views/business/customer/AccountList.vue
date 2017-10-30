<template>
    <div class="business-custom-accout-list gc-container has-header has-footer">
        <x-header :left-options="{backText:''}" class="gc-header">账户记录</x-header>
        <group class="no-margin-group">
            <cell title="帐户：">
                <div slot="value" class="f-red">{{account>0?'结余':'欠款'}}¥{{account|toFixed}}</div>
            </cell>
        </group>
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="200">
            <group v-for="(item,index) in scrollerParams.items" :key="item.create_time" :class="{'no-margin-group':index===0}">
                <cell :title="item.title">
                    <div slot="inline-desc" class="box-flex mt5">
                        <div class="flex-one">{{item.create_date}}</div>
                        <span>¥{{item.change}}</span>
                    </div>
                </cell>
            </group>
        </b-scroll>
        <div class="gc-footer">
            <group>
                <x-input title="还款金额（元）" v-model="gcForm.repay" placeholder="请输入还款金额"></x-input>
                <div class="gc-cell">
                    <x-button type="primary" @click.native="payAccount">还款</x-button>
                </div>
            </group>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
import { isNumber } from '@/utils/validateGroup'
export default {
    name: 'business-custom-account-list',
    data() {
        return {
            account: 0,//账户总额
            targetId: '',//目标商铺id
            clientId: '',//客户id
            gcForm: {
                repay: '',//还款金额
            }
        }
    },
    mixins: [bscrollMixins],
    components: {
        BScroll
    },
    created() {
        this.targetId = this.$route.params.targetId
        this.account = this.$route.query.account
        this.clientId = this.$route.query.clientId
    },
    computed: {
        ...mapGetters(['userSid'])
    },
    methods: {
        // 加载明细列表
        async _loadList() {
            let _result = await this.$api.userLogsAccount(this.assignQuery({ sid: this.userSid, user_sid: this.targetId }))
            return _result
        },
        // 还款
        payAccount() {
            let vm = this
            if (!isNumber(this.gcForm.repay)) {
                this.$vux.toast.show({
                    text: '还款金额为数字（[0-9]）',
                    type: 'warn'
                })
                return
            }
            let _data = { sid: this.userSid, user_sid: this.targetId, repay: parseFloat(this.gcForm.repay) }
            this.$vux.confirm.show({
                title: '提示',
                content: '确定还款？',
                onCancel() {

                },
                onConfirm() {
                    vm.$api.userRepayAccount(_data)
                        .then(d => {
                            vm._loadList()
                            vm.$vux.toast.show({
                                text: '还款成功',
                                type: 'success'
                            })
                            // vm.gcForm.repay = ''
                            vm.$router.replace({ name: 'businessCustomInfo', params: { clientId: vm.clientId } })
                        }, d => {
                            vm.gcForm.repay = ''
                        })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

