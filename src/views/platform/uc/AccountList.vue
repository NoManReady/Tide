<template>
    <div class="platform-uc-accout-list gc-container has-header has-footer">
        <x-header :left-options="{backText: ''}" class="gc-header">账目列表</x-header>
        <group class="no-margin-group">
            <cell title="结算金额：">
                <span slot="value" class="f-red">¥{{userInfo.money|toFixed}}</span>
            </cell>
        </group>
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="90">
            <group v-for="(item,index) in scrollerParams.items" :key="index" @click.native="toAccountDetail(item.sid,item.account)">
                <div class="gc-cell box-flex">
                    <div class="flex-one">
                        <span class="fs16 fc-3">{{item.name}}</span>
                    </div>
                    <span class="tel vm f-red">{{item.account}}</span>
                </div>
                <div class="gc-cell">
                    <div class="box-flex fc-6 fs14">
                        <div class="flex-one">{{item.contact}}</div>
                        <span class="tel vm">{{item.mobile}}</span>
                    </div>
                    <div class="fc-9">{{item.city_name}}</div>
                </div>
                <div class="gc-cell">{{item.orders}}</div>
            </group>
        </b-scroll>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
export default {
    name: 'plataform-uc-account-list',
    data() {
        return {}
    },
    mixins: [bscrollMixins],
    components: {
        BScroll
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        // 加载账户列表
        async _loadList() {
            let _result = await this.$api.userListAccount(this.assignQuery())
            return _result
        },
        // 跳转账户明细
        toAccountDetail(sid, account) {
            this.$router.push({ name: 'platformUcAccoutnDetail', params: { sid, account } })
        }
    }
}
</script>
