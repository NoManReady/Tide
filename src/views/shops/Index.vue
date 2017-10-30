<template>
    <div class="shops-home gc-container has-footer">
        <!--头部-->
        <div class="s-header vux-flexbox">
            <div class="back" @click.prevent="goBack">
                <i class="iconfont icon-back"></i>
            </div>
            <div class="more" @click="menuShow=true">
                <i class="iconfont icon-more"></i>
            </div>
        </div>
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="0" :listenScroll="true" @scroll="onScroll">
            <!--商铺信息-->
            <div class="shops-info">
                <blur :blur-amount="20" :url="shopDetail.logo" :height="200">
                    <div class="shop-info-bottom">
                        <p class="shops-info-avatar tc">
                            <img class="avatar" :src="shopDetail.logo" width="100%" height="100%">
                        </p>
                        <p class="shop-info-name">
                            {{shopDetail.name}}
                        </p>
                        <p class="shop-info-addr">
                            {{shopDetail.addr}}
                        </p>
                        <div class="shop-item-icon vux-flexbox">
                            <a class="iconfont icon-phone" :href="'tel:'+shopDetail.mobile"></a>
                            <div class="iconfont icon-people"></div>
                            <div class="iconfont icon-goods"></div>
                        </div>
                    </div>
                </blur>
                <!--商铺运营数据-->
                <grid class="business-count tc">
                    <grid-item>
                        <span class="count-text f-theme">
                            {{shopDetail.sales||0}}
                        </span>
                        <span slot="label" class="fc-6">
                            出货量
                        </span>
                    </grid-item>
                    <grid-item>
                        <span class="count-text f-theme">
                            {{shopDetail.clients||0}}家
                        </span>
                        <span slot="label" class="fc-6">
                            供应商
                        </span>
                    </grid-item>
                    <grid-item>
                        <span class="count-text f-theme">
                            {{shopDetail.views||0}}
                        </span>
                        <span slot="label" class="fc-6">
                            客流量
                        </span>
                    </grid-item>
                </grid>
            </div>
            <!--商铺商品列表-->
            <div class="sort-tab">
                <tab :line-width="1" custom-bar-width="60px">
                    <tab-item :selected="query.tags===''" @click.native="_tabClick('')">全部({{shopDetail.goods_all||0}})</tab-item>
                    <tab-item :selected="query.tags==='new'" @click.native="_tabClick('new')">新品({{shopDetail.goods_new||0}})</tab-item>
                    <tab-item :selected="query.tags==='hot'" @click.native="_tabClick('hot')">爆款({{shopDetail.goods_hot||0}})</tab-item>
                </tab>
            </div>
            <div class="goods-list">

                <grid :rows="2" class="grid-pro">
                    <grid-item v-for="(item,index) in scrollerParams.items" :key="index" class="item">
                        <div class="pic-box" @click="toItemDetail(item.goods_id)">
                            <a href="javascript:;" class="inner">
                                <img slot="icon" :src="item.thumb">
                            </a>
                        </div>
                        <div class="name">
                            {{item.title}}
                        </div>
                        <div class="info">
                            <span class="f-red vm">{{item.sales_price}}</span>/件
                        </div>
                    </grid-item>
                </grid>
            </div>
        </b-scroll>
        <div class="sort-tab" :class="{'isfixed':tabFixed}" v-if="tabFixed">
            <tab :line-width="1" custom-bar-width="60px">
                <tab-item :selected="query.tags===''" @click.native="_tabClick('')">全部({{shopDetail.goods_all||0}})</tab-item>
                <tab-item :selected="query.tags==='new'" @click.native="_tabClick('new')">新品({{shopDetail.goods_new||0}})</tab-item>
                <tab-item :selected="query.tags==='hot'" @click.native="_tabClick('hot')">爆款({{shopDetail.goods_hot||0}})</tab-item>
            </tab>
        </div>
        <!--商铺运营数据-->
        <gc-search :word.sync="keyword" v-model="showSearchBar" :search-fn="onSearch" placeholder="商品名称/品牌/货号"></gc-search>
        <div v-transfer-dom>
            <actionsheet v-model="menuShow" :menus="menus" @on-click-menu="menuClick" show-cancel></actionsheet>
        </div>
    </div>
</template>
<script>
import {
    Blur,
    Popover
} from 'vux';
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
import GcSearch from '@/common/search'
import {
    shopDetailFn
} from '@/model/modules/shop'
import {
    mapGetters,
    mapActions
} from 'vuex'
import wx from 'weixin-js-sdk'
export default {
    name: 'shops-home',
    title: '商铺首页',
    data() {
        return {
            shopDetail: shopDetailFn(),
            query: {
                order: 'sales',
                tags: ''
            },
            menuShow: false,
            menus: {
                search: '搜索',
                shareSession: '分享给微信好友',
                shareTimeline: '分享到微信朋友圈'
            },
            showSearchBar: false,
            keyword: '',
            shareTitle: '',
            shareLogo: '',
            shareDesc: '',
            shareUrl: '',
            tabFixed: false
        }
    },
    mixins: [bscrollMixins],
    components: {
        Blur,
        Popover,
        BScroll,
        GcSearch
    },
    created() {
        this.sid = this.$route.query.sid;
        this._shopGetDetail();
        this.getCartInfo({
            sid: this.sid
        });
    },
    computed: {
        ...mapGetters(['device', 'cartInfo'])
    },
    methods: {
        ...mapActions(['getCartInfo', 'setWeixinJssdk']),
        // 加载商铺详情
        async _shopGetDetail() {
            let _result = await this.$api.shopGetDetail(this.sid);
            this.shopDetail = _result;

            this.shareTitle = this.shopDetail.name;
            this.shareLogo = this.shopDetail.logo;
            this.shareDesc = this.shopDetail.introduce;
            this.shareUrl = '';

            if (this.device == 'weixin') {
                //设置微信jssdk分享
                this.shareUrl = window.location.href.split('#')[0].split('?')[0] + '?redirect=' + encodeURIComponent(this.$route.fullPath);
                let sobj = {
                    title: this.shareTitle,
                    link: this.shareUrl,
                    imgUrl: this.shareLogo,
                    desc: this.shareDesc
                };
                console.log(sobj);
                wx.onMenuShareTimeline(sobj);
                wx.onMenuShareAppMessage(sobj);
                wx.onMenuShareQQ(sobj);
                wx.onMenuShareQZone(sobj);
            } else {
                this.shareUrl = this.$config.webURL + '?redirect=' + encodeURIComponent(this.$route.fullPath);
            }
        },
        // 加载商铺产品列表
        async _loadList() {
            let _result = await this.$api.goodsGetList(this.assignQuery({
                ...this.query,
                sid: this.sid
            }))
            return _result
        },
        // tab切事件
        _tabClick(tag) {
            this.query.tags = tag
            // this.onSearch()
            this.onFresh();
        },
        goBack() {
            // this.$router.back()
            this.$router.push({
                name: 'platformHome'
            })
        },
        menuClick(key, item) {
            if (key == 'search') {
                this.showSearchBar = true
            }
            if (key == 'shareSession' || key == 'shareTimeline') {
                console.log(this.shareLogo)
                switch (this.device) {
                    case 'browser':
                        this.$vux.toast.text('请使用APP或微信')
                        console.log('share browser')
                        break;
                    case 'weixin':
                        this.$vux.toast.text('请点击右上角分享')
                        console.log('share weixin')
                        break;
                    default:
                        Wechat.share({
                            message: {
                                title: this.shareTitle,
                                description: this.shareDesc,
                                thumb: this.shareLogo,
                                media: {
                                    type: Wechat.Type.WEBPAGE,
                                    webpageUrl: this.shareUrl
                                }
                            },
                            scene: key == 'shareSession' ? Wechat.Scene.SESSION : Wechat.Scene.TIMELINE
                        }, function() {
                            console.log('share ok')
                        }, function(reason) {
                            console.log('share err:' + reason)
                        })
                        break;
                }
            }
        },
        onSearch() {
            this.$router.push({
                name: 'shopsGoods',
                query: {
                    keyword: this.keyword,
                    sid: this.sid
                }
            })
        },
        toItemDetail(id) {
            let vm = this
            this.$router.push({
                name: 'shopsGoodsDetail',
                query: {
                    goodsId: id,
                    sid: this.sid
                }
            })
        },
        async wxJssdk(param) {
            let _result = await this.$api.weixinJssdk(param);
            return _result;
        },
        onScroll(pos) {
            this.tabFixed = pos.y <= '-265' ? true : false;
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../../style/scss/_mixin.scss';
@import '../../style/scss/_available.scss';
.s-header {
    position: fixed;
    left: 0;
    top: 0;
    height: 50px;
    width: 100%;
    z-index: 100;
    background: transparent;
    @include justify-content(space-between);
    .back,
    .more {
        background-color: rgba(0, 0, 0, .5);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        padding: 5px;
        margin: 10px 10px 0 10px;
        .iconfont {
            font-size: 30px;
            color: #fff;
        }
    }
}

.business-count {
    background-color: #fff;
    text-align: center;
    .weui-grid {
        padding: 5px 5px;
        .weui-grid__label {
            padding-bottom: 5px;
        }
    }
    .count-text {
        font-size: 16px;
        font-weight: 700;
    }
    &.isfixed {
        top: 0;
    }
}

.goods-list {
    padding-bottom: 0;
    background: #fff;
}

.isfixed {
    position: fixed;
    width: 100%;
    z-index: 99;
    left: 0;
}

.sort-tab {
    &.isfixed {
        top: 0px;
    }
}

.shops-info {
    position: relative;
    .shops-info-avatar {
        width: 80px;
        height: 80px;
        position: initial;
        top: 28px;
        margin: 0 auto;
    }
    .shop-info-bottom {
        padding-top: 20px;
        text-align: center;
        p {
            line-height: 20px;
            padding-top: 5px;
            font-size: 16px;
        }
        .shop-item-icon {
            padding-top: 10px;
            @include justify-content(center);
            .iconfont {
                font-size: 20px;
                margin: 0 5px;
            }
        }
    }
}

.shops-home-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
}

.popover-content {
    padding: 10px;
    border-radius: 5px;
    .ico-tag {
        padding: 10px;
        .iconfont {
            font-size: 25px;
            color: #fff;
        }
    }
}
</style>