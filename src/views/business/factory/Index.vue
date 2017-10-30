<template>
    <div class="business-factory-index gc-container has-header has-footer">
        <gc-search :word.sync="query.keyword" v-model="showSearchBar" :search-fn="onSearch" placeholder="上游名称" history-key="factory"></gc-search>
        <x-header :left-options="{showBack:false}" class="gc-header search-long">
            <!-- <span slot="left">上游列表</span> -->
            <div class="search-bar vm">
                <input class="search-bar-input" type="text" :placeholder="query.keyword||'上游名称'" @click="showSearchBar=true">
                <i class="search-bar-icon iconfont icon-close" v-show="query.keyword" @click.stop="onClear"></i>
            </div>
            <a href="javascript:;" slot="right" @click="toAdd">
                <i class="iconfont icon-roundadd fs22"></i>
            </a>
        </x-header>
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch">
            <group v-for="(item,index) in scrollerParams.items" :class="{'no-margin-group':index===0}" :key="item.factory_id" @click.native.stop="toDetail(item.factory_id)">
                <cell>
                    <div slot="title">{{item.name}}</div>
                    <div slot="value" class="value f-red">{{item.cname}}</div>
                </cell>
                <cell>
                    <div slot="title">
                        <span class="vm mr10">{{item.contact}}</span>
                        <i class="vm fc-6">{{item.mobile}}</i>
                    </div>
                    <template slot="inline-desc">{{item.addr}}</template>
                    <div slot="value">
                        <el-button type="primary" size="small">账单</el-button>
                        <el-button type="default" size="small" @click.native.prevent.stop="toGoodsList(item)">采购</el-button>
                    </div>
                </cell>
            </group>
        </b-scroll>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import ElButton from '@/components/common/button'
import GcSearch from '@/common/search'
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
export default {
    name: 'business-factory-index',
    data() {
        return {
            showSearchBar: false,
            query: {
                 keyword: this.$route.query.keyword || '',
                sid: ''
            }
        }
    },
    created() {
        this.query.sid = this.userSid
    },
    mixins: [bscrollMixins],
    components: {
        ElButton,
        GcSearch,
        BScroll
    },
    computed: {
        ...mapGetters(['userSid'])
    },
    methods: {
        ...mapActions(['setCustomerOrFactoryInfo']),
        // 加载订单列表
        async _loadList() {
            let _result = await this.$api.manageGetFactoryList(this.assignQuery(this.query))
            return _result
        },
        // 添加
        toAdd() {
            this.$router.push({
                name: 'businessFactoryAdd'
            })
        },
        // 清楚keyword
        onClear() {
            this.query.keyword = ''
            this.onSearch()
        },
        // 跳转详情
        toDetail(factoryId) {
            this.$router.push({
                name: 'businessFactoryDetail',
                params: {
                    factoryId
                }
            })
        },
        //采购
        toGoodsList(item) {
            this.setCustomerOrFactoryInfo(item);
            this.$router.push({
                name: 'businessGoods',
                query: {
                    isBuy: 1,
                    factoryId: item.factory_id
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>