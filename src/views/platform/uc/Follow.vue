<template>
    <div class="platform-uc-follow gc-container has-header">
        <x-header :left-options="{backText: ''}" class="gc-header">我的关注</x-header>
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch">
            <group class="no-margin-group">
                <cell-box class="pro-item" v-for="(item,index) in scrollerParams.items" :key="item.sid">
                    <img v-lazy="item.logo" class="pro-item-img" alt="">
                    <div class="pro-item-right">
                        <div class="pro-item-name ellipsis">{{item.name}}</div>
                        <div class="pro-item-intro">{{item.addr}}</div>
                    </div>
                </cell-box>
            </group>
        </b-scroll>
    </div>
</template>
<script>
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
export default {
    name: 'platform-uc-follow',
    title: '我的关注',
    data() {
        return {
            query: {
                in_watch: 1
            }
        }
    },
    mixins: [bscrollMixins],
    components: {
        BScroll
    },
    methods: {
        async _loadList() {
            let _result = await this.$api.shopGetList(this.assignQuery(this.query))
            return _result
        }
    }
}
</script>
<style lang="scss" scoped>

</style>