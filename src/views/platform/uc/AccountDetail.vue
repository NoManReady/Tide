<template>
    <div class="platform-accout-list gc-container has-header has-footer">
        <x-header :left-options="{backText:''}" class="gc-header">账户记录</x-header>
        <group>
            <cell title="帐户：">
                <div slot="value" class="f-red">{{account>0?'结余':'欠款'}}¥{{account|toFixed}}</div>
            </cell>
        </group>
        <gc-scroller :fresh="onFresh" :fetch="onFetch" ref="scroller">
            <group v-for="(item,index) in scrollerParams.items" :key="item.create_time">
                <cell :title="item.title">
                    <div slot="inline-desc" class="box-flex mt5">
                        <div class="flex-one">{{item.create_date}}</div>
                        <span>¥{{item.change}}</span>
                    </div>
                </cell>
            </group>
        </gc-scroller>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import GcScroller from '@/common/scroller'
import scrollerMixins from '@/mixins/scrollerMixins'
import { isNumber } from '@/utils/validateGroup'
export default {
    name: 'platform-account-list',
    data() {
        return {
            account: 0,//账户总额
            sid: '',//商铺id
        }
    },
    mixins: [scrollerMixins],
    components: {
        GcScroller
    },
    created() {
        this.account = this.$route.query.account
        this.sid = this.$route.query.sid
    },
    methods: {
        // 加载明细列表
        async _loadList() {
            let _result = await this.$api.userLogsAccount(this.assignQuery({ sid: this.sid }))
            return _result
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

