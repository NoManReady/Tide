<template>
    <div class="platform-uc-collection gc-container has-header">
        <x-header :left-options="{backText:''}" class="gc-header">我的收藏</x-header>
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch">
            <grid :rows="2" class="grid-pro">
                <grid-item v-for="(item,index) in scrollerParams.items" :key="index" class="item">
                    <div class="pic-box ">
                        <a href="javascript:;" class="inner">
                            <img slot="icon" :src="item.thumb">
                        </a>
                    </div>
                    <div class="name">
                        {{item.title}}
                    </div>
                    <div class="info">
                        <span class="f-red vm">¥{{item.sales_price}}</span>
                    </div>
                </grid-item>
            </grid>
        </b-scroll>
    </div>
</template>
<script>
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
export default {
    name: 'platform-uc-collection',
    title: '我的收藏',
    data() {
        return {
            proList: [],
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
            let _result = await this.$api.goodsGetList(this.assignQuery(this.query))
            return _result
        }
    }
}
</script>