<template>
    <div class="business-customer-list gc-container has-header has-footer">
        <gc-search :word.sync="query.keyword" v-model="showSearchBar" :search-fn="onSearch" placeholder="客户名称" history-key="customer"></gc-search>
        <x-header :left-options="{showBack:false}" class="gc-header search-long">
            <div class="search-bar vm">
                <input class="search-bar-input" type="text" :placeholder="query.keyword||'客户名称'" @click="showSearchBar=true">
                <i class="search-bar-icon iconfont icon-close" v-show="query.keyword" @click.stop="onClear"></i>
            </div>
        </x-header>
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch">
            <group v-for="(item,index) in scrollerParams.items" :class="{'no-margin-group':index===0}" :key="item.client_id" @click.native="toDetail(item.client_id)">
                <cell>
                    <div slot="title">{{item.name}}</div>
                    <div slot="value" class="value f-red">¥{{item.account|toFixed}}</div>
                </cell>
                <cell>
                    <div slot="title">
                        <span class="vm mr10">{{item.contact}}</span>
                        <i class="vm fc-6">{{item.mobile}}</i>
                    </div>
                    <div slot="value">
                        <el-button type="primary" size="small" v-if="item.status==1" @click.stop.native="onPlaceOrder(item)">开单</el-button>
                        <el-button type="primary" size="small" v-if="item.status==3" @click.stop.native="onFellowConfirm(item)">友商确认</el-button>
                    </div>
                </cell>
            </group>
        </b-scroll>
        <actionsheet v-model="showFellowAction" :menus="fellowMenus" @on-click-menu="onMenuClick">
            <p class="fellow-action-tit" slot="header">是否确认通过友商？</p>
        </actionsheet>
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
    name: 'business-customer-list',
    title: '客户列表',
    data() {
        return {
            showSearchBar: false,
            showFellowAction: false,
            currentItem: null,
            query: {
                 keyword: this.$route.query.keyword || '',
                sid: ''
            },
            fellowMenus: [{
                label: '通过',
                value: 'pass',
                type: 'primary'
            }, {
                label: '不通过',
                value: 'nopass',
                type: 'warn'
            }]
        }
    },
    created() {
        this.query.sid = this.userSid
    },
    computed: {
        ...mapGetters(['userSid'])
    },
    mixins: [bscrollMixins],
    components: {
        ElButton,
        GcSearch,
        BScroll
    },
    methods: {
        ...mapActions(['setCustomerOrFactoryInfo']),
        // 加载订单列表
        async _loadList() {
            let _result = await this.$api.manageGetClientList(this.assignQuery(this.query))
            return _result
        },
        // 友商确认popup
        onFellowConfirm(item) {
            this.showFellowAction = true
            this.currentItem = item
        },
        // 开单
        onPlaceOrder(item) {
            this.setCustomerOrFactoryInfo(item);
            this.$router.push({
                name: 'businessGoods',
                query: {
                    isBuy: 0,
                    clientId: item.client_id
                }
            })
        },
        // 友商确认
        onMenuClick(type) {
            if (type === 'pass') {
                this.$api.shopFellowYes({
                    sid: this.userSid,
                    user_sid: this.currentItem.user_sid
                })
            } else {
                this.$api.shopFellowNo({
                    sid: this.userSid,
                    user_sid: this.currentItem.user_sid
                })
            }
        },
        // 跳转详情
        toDetail(clientId) {
            // 散客不跳转
            if (clientId == 1){
                return
            }
            this.$router.push({
                name: 'businessCustomInfo',
                params: {
                    clientId
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.fellow-action-tit {
    color: #666;
    padding: 6px;
}
</style>