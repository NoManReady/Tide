<template>
    <div class="business-goods-detail gc-container has-header">
        <!--头部-->
        <x-header :left-options="{backText: ''}" class="gc-header">商品详情
            <div slot="right" class="cart-box" @click="toShopsCart">
                <badge :text="shopCartNum" v-if="shopCartNum > 0"></badge>
                <i class="iconfont icon-cart"></i>
            </div>
        </x-header>
        <div class="detail">
            <!--banner-->
            <div class="goods-banner">
                <swiper loop auto dots-class="custom-bottom" dots-position="center" @on-index-change="bannerIndexChange" :aspect-ratio="aspectRatio">
                    <swiper-item class="swiper-img" v-for="(item, index) in bannerList" :key="index">
                        <div class="banner-inner">
                            <img class="banner-img" :src="item.url" width="100%">
                        </div>
                    </swiper-item>
                </swiper>
            </div>
            <!--信息-->
            <div class="goods-info">
                <div class="goods-name">
                    {{goodsDetail.title}}
                </div>
                <div class="goods-code fc-9 vux-flexbox">
                    <div class="flex-one">编号：{{goodsDetail.code}}</div>
                    <div class="flex-one tr">库存：{{goodsStock.available_sum}}</div>
                </div>
                <div class="goods-price vux-flexbox">
                    <div class="buy-price f-theme">
                        ￥
                        <span class="">
                            {{goodsDetail.sales_price}}
                        </span>
                    </div>
                    <!--<div class="f-theme">
                                                                                <span class="sales-price">
                                                                                  {{goodsDetail.sales_price}}
                                                                                </span>
                                                                              </div>-->
                    <del class="market-price fc-9">
                        <span>
                            市场价：￥{{goodsDetail.market_price}}
                        </span>
                    </del>
                    <div class="btn-share flex-one tr pr10">
                        <i class="iconfont icon-forward plr10" @click.prevent.stop="menuShow=true"></i>
                    </div>
                </div>
            </div>
            <!--规格-->
            <div class="goods-spec mt10 vux-flexbox">
                <div class="flex-one fc-9 left">
                    <p>
                        共
                        <span class="plr5 f-theme">{{goodsDetail.specn}}</span>种规格
                    </p>
                    <p>
                        已选
                        <span class="plr5 f-theme">{{goodsDetail.specn}}</span>种
                    </p>
                </div>
                <div class="flex-one right" @click.prevent.stop="openNature('open')">
                    <x-button type="warn" class="custom-primary-red" style="border-radius: 99px">
                        <i class="iconfont icon-cart"></i>
                        <span>
                            选规格
                        </span>
                    </x-button>
                </div>
            </div>
            <!--详情-->
            <div class="goods-desc">
                <group>
                    <cell title="商品详情"></cell>
                    <cell-box>
                        商品详情商品详情商品详情商品详情
                    </cell-box>
                </group>
            </div>

        </div>
        <div v-transfer-dom>
            <popup v-model="natureVisible" width="100%" height="80%" position="bottom" v-if="natureVisible">
                <nature-popup :sid="sid" :client-id="clientId" :factory-id="factoryId" :goods-detail="itemObj" :goods-stock="goodsStock.group" @closepop="closeNature"></nature-popup>
            </popup>
        </div>
        <div v-transfer-dom>
            <actionsheet v-model="menuShow" :menus="menus" @on-click-menu="menuClick" show-cancel></actionsheet>
        </div>
    </div>
</template>
<script>
// import 
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    TransferDom,
    Badge,
    Popup,
    Group
} from 'vux'
import wx from 'weixin-js-sdk'
import naturePopup from '@/components/business/nature-popup'
import {
    loadFromLocal
} from '@/utils/localStorage'
export default {
    name: 'business-goods-detail',
    title: '商品详情',
    data() {
        return {
            bannerList: [],
            bannerIndex: 0,
            goodsDetail: {},
            natureVisible: false,
            itemObj: {},
            goodsStock: {
                available_sum: 0
            },
            
            menuShow: false,
            menus: {
                shareSession: '分享给微信好友',
                shareTimeline: '分享到微信朋友圈'
            },
            showSearchBar: false,
            keyword: '',
            shareTitle: '',
            shareLogo: '',
            shareDesc: '',
            shareUrl: ''
        }
    },
    components: {
        TransferDom,
        Badge,
        Popup,
        Group,
        naturePopup
    },
    created() {
        this.getGoodsDetail();
    },
    computed: {
        ...mapGetters(['cartInfo']),
        aspectRatio() {
            return 1
        },
        sid() {
            let sid = this.$route.query.sid || '';
            return sid;
        },
        goodsId() {
            let goodsId = this.$route.query.goodsId || '';
            return goodsId;
        },
        clientId() {
            let clientId = this.$route.query.clientId || '';
            return clientId;
        },
        factoryId() {
            let factoryId = this.$route.query.factoryId || '';
            return factoryId;
        },
        shopCartNum() {
            let cartNum = this.cartInfo.goods_count.toString() || '0';
            return cartNum;
        }
    },
    methods: {
        ...mapActions(['loading', 'device', 'getCartInfo']),
        bannerIndexChange() {

        },
        async getGoodsDetail() {
            // 加载商品详情
            let _result = await this.$api.goodsGetDetail({
                sid: this.sid,
                goods_id: this.goodsId
            });
            
            this.shareTitle = _result.title;
            this.shareLogo = _result.imgs.length > 0 ? _result.imgs[0].url : '';
            this.shareUrl = '';

            if (this.device == 'weixin'){
                //设置微信jssdk分享
                this.shareUrl = window.location.href.split('#')[0].split('?')[0]+'?redirect='+encodeURIComponent(this.$route.fullPath);
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
            }else{
                this.shareUrl = this.$config.webURL+'?redirect='+encodeURIComponent(this.$route.fullPath);
            }
            
            this.$nextTick(() => {
                this.goodsDetail = Object.freeze(_result || []);
                this.bannerList = this.goodsDetail.imgs;
                this.itemObj = {
                    goods_id: this.goodsId,
                    title: this.goodsDetail.title,
                    thumb: this.goodsDetail.imgs.length > 0 ? this.goodsDetail.imgs[0].url : '',
                    code: this.goodsDetail.code,
                    sales_price: this.goodsDetail.sales_price
                }
                this.goodsGetStock(this.goodsId)
            });
        },
        //获取商品规格库存等
        async goodsGetStock(goodsId, type) {
            let _result = await this.$api.goodsGetStock({
                sid: this.sid,
                client_id: '',
                factory_id: '',
                goods_id: goodsId
            });
            if (_result) {
                this.$nextTick(() => {
                    this.goodsStock = _result;
                    this.goodsStock.available_sum = _result.available_sum;
                    if (type) {
                        this.natureVisible = true;
                    }
                })
            }
        },
        menuClick(key, item) {
            if (key == 'shareSession' || key == 'shareTimeline'){
                console.log(this.shareLogo)
                switch (this.device){
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
                        }, function () {
                            console.log('share ok')
                        }, function (reason) {
                            console.log('share err:'+reason)
                        })
                        break;
                }
            }
        },
        //打开购物车
        openNature(type) {
            //运行获取商品规格
            this.goodsGetStock(this.goodsId, type);
        },
        //关闭购物车弹框
        closeNature() {
            this.natureVisible = false;
        },
        toShopsCart() {
            this.$router.push({
                name: 'shopsCart',
                query: {
                    sid: this.sid
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.detail {
    /*商品轮播*/
    .goods-banner {
        .banner-img {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate3d(0, -50%, 0)
        }
    }
    /**/
    .goods-info {
        background-color: #fff;
        padding: 10px 0 10px 10px;
        position: relative;
        @include border-1px(#e5e5e5, after, bottom);
        .goods-name {
            font-size: 16px;
            color: #333;
            line-height: 20px;
        }
        .goods-code {
            padding: 10px 10px 10px 0;
            border-bottom: 1px solid #e8e8e8;
        }
        .goods-price {
            .buy-price {
                padding-right: 10px;
                span {
                    font-size: 26px;
                }
            }
        }
        .btn-share {
            font-size: 25px;
        }
    }
    .goods-spec {
        position: relative;
        @include border-1px(#e5e5e5, after, bottom);
        @include border-1px(#e5e5e5, before, top);
        background-color: #fff;
        @include justify-content(space-between);
        padding: 10px;
        .left {
            p {
                line-height: 20px;
            }
        }
        .right {
            .weui-btn {
                &:after {
                    display: none;
                }
            }
        }
    }
    .goods-desc {
        color: #666;
        .vux-cell-box {
            font-size: 14px;
        }
    }
}
</style>