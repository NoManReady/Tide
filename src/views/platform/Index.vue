<template>
    <div class="platform-home gc-container" v-cloak>
        <!--头部-->
        <x-header :left-options="{showBack: false}" slot="header" class="x-header gc-header">
            <div class="header-left" @click="changeCity">
                <span class="address-name">{{city.name}}</span>
                <i class="iconfont icon-unfold"></i>
            </div>
            <div class="header-center">
                <div class="search-input ellipsis">
                    <label class="iconfont icon-search" for="search"></label>
                    <input type="search" class="ellipsis" id="search" placeholder='商户名称/地址/联系人/手机' @click="showSearchBar=true" />
                </div>
            </div>
            <div class="header-right" @click="toQrScan">
                <i class="iconfont icon-scan"></i>
                <span>
                    扫码
                </span>
            </div>
        </x-header>
        <gc-search history-key="goodsList" :word.sync="query.keyword" v-model="showSearchBar" :search-fn="onSearch" placeholder="商户/联系人/电话号码"></gc-search>
        <!--广告-->
        <swiper loop auto dots-class="custom-bottom" dots-position="center" @on-index-change="bannerIndexChange" class="home-banner" style="height:150px">
            <swiper-item class="swiper-img" v-for="(item, index) in bannerList" :key="index">
                <a :href="item.link">
                    <img :src="item.img">
                </a>
            </swiper-item>
        </swiper>
        <!--分类-->
        <div class="home-catalog bgc-f">
            <flexbox>
                <flexbox-item>
                    <div class="catalog-item" @click="toListByTag">
                        <i class="iconfont icon-favorfill"></i>
                        <div class="icon-des">新品</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="catalog-item" @click="toPlatBusiness">
                        <i class="iconfont icon-shopfill"></i>
                        <div class="icon-des">商圈</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="catalog-item" @click="toPlatOrder">
                        <i class="iconfont icon-sponsorfill"></i>
                        <div class="icon-des">订单</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="catalog-item" @click="toPlatFllow">
                        <i class="iconfont icon-likefill"></i>
                        <div class="icon-des">关注</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <!--商圈-->
        <group class="home-business home-item" v-if="area.length > 0">
            <cell title="商圈" is-link :link="{ name: 'platformBusiness' }"></cell>
            <cell-box>
                <div class="box vux-flexbox">
                    <div class="box-item" v-for="(item,index) in area" @click.prevent.stop="toShopList(item,index)" :key="index">
                        <div class="box-img-wrapper">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="box-item-name ellipsis">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </cell-box>
        </group>
        <!--推荐商品-->
        <group class="home-recommend home-item" v-if="goods.length > 0">
            <cell title="推荐商品"></cell>
            <cell-box>
                <div class="box vux-flexbox">
                    <div class="box-item" v-for="(item,index) in goods" @click.prevent.stop="toGoodsDetail(item)" :key="index">
                        <div class="box-img-wrapper">
                            <img :src="item.thumb" alt="" width="100%">
                        </div>
                        <div class="box-item-name ellipsis">
                            {{item.title}}
                        </div>
                        <div class="box-item-price f-theme">
                            <span>￥</span>{{item.sales_price}}
                        </div>
                    </div>
                </div>
            </cell-box>
        </group>
        <!--商户列表-->
        <shop-list :shops="shop" class="home-shop home-item mb10" v-if="shop.length > 0"></shop-list>

    </div>
</template>

<script>
import wx from "weixin-js-sdk"
import apis from '@/api'
import {
    ViewBox,
    XHeader,
    Tabbar,
    Swiper,
    Flexbox,
    FlexboxItem,
    Scroller,
    Group,
    CellBox
} from 'vux'
import shopList from '@/components/shop/List'
import GcSearch from '@/common/search'
import {
    mapGetters,
    mapActions
} from 'vuex'
import { loadFromLocal } from '@/utils/localStorage'
import { scanQr } from '@/utils'
export default {
    name: 'platform-home',
    components: {
        ViewBox,
        XHeader,
        Tabbar,
        Swiper,
        Flexbox,
        FlexboxItem,
        Scroller,
        Group,
        CellBox,
        shopList,
        GcSearch
    },
    data() {
        return {
            bannerList: [],
            bannerIndex: 0,
            area: [],
            goods: [],
            shop: [],
            noDataText: '暂无数据',
            shopLogoNone: '',
            showSearchBar: false,
            query: {
                keyword: '',
                sid: ''
            }
        }
    },
    created() {
        this.getSysHomeData(this.city?this.city.id:'')
    },
    computed: {
        ...mapGetters(['city'])
    },
    watch: {
        city(c) {
            this.getSysHomeData(c?c.id:'')
        }
    },
    methods: {
        ...mapActions(['loading']),
        getSysHomeData(cityId='350100') {
            this.loading = true;
            apis.sysHome(cityId).then(response => {
                this.$nextTick(() => {
                    this.bannerList = response.slider;
                    this.area = response.area;
                    this.goods = response.goods;
                    this.shop = response.shop;
                    this.loading = false;
                });
            })
        },
        bannerIndexChange(index) {
            this.bannerIndex = index;
        },

        toShopList(item, index) {
            this.$router.push({
                name: 'platformShopList',
                query: {
                    cid: item.cid,
                    aid: item.aid,
                    index: index
                }
            })
        },
        toSearch() {
            this.$router.push({
                name: 'platformSearch'
            });
        },
        changeCity() {
            this.$router.push({
                name: 'platformSelectCity'
            })
        },
        toPlatBusiness() {
            this.$router.push({
                name: 'platformBusiness'
            })
        },
        toPlatOrder() {
            this.$router.push({
                name: 'platformOrderList'
            })
        },
        toPlatFllow() {
            this.$router.push({
                name: 'platformUcFollow'
            })
        },
        toListByTag() {
            this.$router.push({
                name: 'platformListByTag'
            })
        },
        toQrScan() {
            scanQr()
        },
        toGoodsDetail(item) {
            this.$router.push({
                name: 'shopsGoodsDetail',
                query: {
                    sid: item.sid,
                    goodsId: item.goods_id,
                }
            })
        },
        // 清楚keyword
        onClear() {
            this.query.keyword = ''
            this.onSearch()
        },
        onSearch() {
            this.$router.push({
                name: 'platformShopList',
                query: {
                    keyword: this.query.keyword,
                    cid: loadFromLocal('city').id
                }
            })
        }
    }
}
</script>
<style lang="less">
.home-item {
    .weui-cells {
        margin-top: 10px;
    }
}

.home-shop {
    .weui-cells {}
}
</style>
<style lang="scss">
@import '../../style/scss/_mixin.scss';
@import '../../style/scss/_common.scss';












/*头部*/

.platform-home {
    padding-top: 45px;
    .x-header {
        /*background: transparent;*/
        padding-left: 15px;
        padding-right: 15px;
        .vux-header-title {
            font-size: 14px;
            text-align: left;
            margin: 0;
            @include flexbox();
            @include justify-content(space-between);
            @include align-items(center);
        }
        .header-left {}
        .header-center {
            .search-input {
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                background-color: #fff;
                border-radius: 25px;
                overflow: hidden;
                min-width: 200px;
                .iconfont {
                    color: #666;
                    font-size: 15px;
                    font-weight: 700;
                }
                input {
                    color: #666;
                    font-size: 13px;
                    border: 0;
                    width: 100%;
                    padding-right: 18px;
                    line-height: 30px;
                    vertical-align: top;
                }
            }
        }
        .header-right {
            .icon-scan {
                font-size: 18px;
            }
        }
    }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 359px) and (orientation: portrait) {
    .platform-home {
        .x-header {
            .header-center {
                .search-input {
                    min-width: auto;
                    width: 160px;
                    input {}
                }
            }
        }
    }
}













/*banner*/

.home-banner {
    .swiper-img {
        img {
            width: 100%;
            height: 100%;
        }
    }
    .vux-indicator {
        bottom: 3px;
    }
}













/*分类*/

.home-catalog {
    padding: 15px 20px;
    position: relative;
    @include border-1px(#e8e8e8, after, bottom);
}

.catalog-item {
    text-align: center;
    .iconfont {
        font-size: 25px;
        color: #fff;
        border-radius: 45px;
        padding: 8px;
        display: inline-block;
        &.icon-shopfill {
            background-color: #fd9d21;
        }
        &.icon-sponsorfill {
            background-color: $theme;
        }
        &.icon-likefill {
            background-color: #8a90fa;
        }
        &.icon-favorfill {
            background-color: #4dc6ee;
        }
    }
    .icon-des {
        line-height: 30px;
    }
}













/*商圈、推荐商品*/

.home-item {
    position: relative;
    .box {
        position: relative;
    }
    .box-item {
        width: 30%;
        margin-right: 3%;
        height: auto;
        min-height: 105px;
        text-align: center;
    }
    /*.box-item-one {
            width: 100%;
            height: 200px;
            
        }*/
    .box-img-wrapper {
        position: relative;
        background-color: #ccc;
        width: 100%;
        min-height: 105px;
        overflow: hidden;
        img {
            vertical-align: top;
            position: absolute;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
        }
    }
    .box-item-name {
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: #666;
        font-size: 12px;
    }
    .box-item-price {
        font-size: 12px;
        text-align: left;
    }
}

.home-recommend,
.home-shop {
    .box {
        .box-item {
            width: 23%;
            min-height: 76px;
        }
        .box-img-wrapper {
            min-height: 76px;
        }
    }
}
</style>