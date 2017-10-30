<template>
    <div class="business-goods-detail gc-container has-header">
        <!--头部-->
        <x-header :left-options="{backText: ''}" class="gc-header">商品详情</x-header>
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
                        <span class="" v-if="factoryId">
                            {{goodsDetail.buy_price}}
                        </span>
                        <span v-if="clientId || (!clientId&&!factoryId)">
                            {{goodsDetail.sales_price}}
                        </span>
                    </div>
                    <del class="market-price fc-9">
                        <span>
                            市场价：￥{{goodsDetail.market_price}}
                        </span>
                    </del>
                </div>
            </div>
            <!--规格-->
            <div class="goods-spec mt10 vux-flexbox" v-if="clientId || factoryId">
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
                <div class="flex-one right" @click.prevent.stop="openNature">
                    <x-button type="warn" class="custom-primary-red" style="border-radius: 99px">
                        <i class="iconfont icon-cart"></i>
                        <span>
                            选规格
                        </span>
                    </x-button>
                </div>
            </div>
            <div class="goods-spec" v-if="!clientId && !factoryId">
                <div class="goods-spec-item vux-flexbox" v-if="hasColor">
                    <div class="label-left">
                        颜色:
                    </div>
                    <div class="label-right">
                        <el-button size="small" @click.native.prevent.stop="getSizeList(index)" v-for="(item,index) in goodsStockGroup" :key="index" v-if="!isObj" :type="`${idx == index ? 'primary' : 'default'}`">
                            {{item.name}}
                        </el-button>
                        <el-button type="default" size="small" @click.native.prevent.stop="getSizeList()" :key="index" v-if="isObj">
                            {{goodsStockGroup.name}}
                        </el-button>
                    </div>
                </div>
                <div class="goods-spec-item vux-flexbox">
                    <div class="label-left">
                        尺码：
                    </div>
                    <div class="label-right">
                        <el-button :type="`${idx1 == index1 ? 'primary' : 'default'}`" size="small" @click.native.prevent.stop="getSizeStock(item,index1)" v-for="(item,index1) in sizeList" :key="index1">
                            {{item.name}}
                        </el-button>
                    </div>
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
                <nature-popup :sid="userSid" :client-id="clientId" :factory-id="factoryId" :goods-detail="itemObj" :goods-stock="goodsStock.group" @closepop="closeNature"></nature-popup>
            </popup>
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
import naturePopup from '@/components/business/nature-popup'
import ElButton from '@/components/common/button'
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
            goodsStockGroup: [] || {},
            sizeList: [],
            hasColor: true,
            isObj: false,
            idx: 0,
            idx1: 0
        }
    },
    components: {
        TransferDom,
        Badge,
        Popup,
        Group,
        naturePopup,
        ElButton
    },
    created() {
        this.getGoodsDetail();
        if (!this.clientId && !this.factoryId) {
            this.goodsGetStock(this.goodsId);
        }
    },
    computed: {
        ...mapGetters(['userSid']),
        aspectRatio() {
            return 1
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
    },
    methods: {
        ...mapActions(['loading']),
        bannerIndexChange() { },
        async getGoodsDetail() {
            let _result = await this.$api.goodsGetDetail({
                sid: this.userSid,
                goods_id: this.goodsId
            });
            if (_result) {
                this.$nextTick(() => {
                    this.goodsDetail = Object.freeze(_result || []);
                    this.bannerList = this.goodsDetail.imgs;
                    this.itemObj = {
                        goods_id: this.goodsId,
                        title: this.goodsDetail.title,
                        thumb: this.goodsDetail.imgs.length > 0 ? this.goodsDetail.imgs[0].url : '',
                        code: this.goodsDetail.code,
                        sales_price: this.clientId ? this.goodsDetail.sales_price : this.goodsDetail.buy_price
                    }
                });

            }
        },
        getSizeList(idx) {
            this.idx = idx || 0;
            this.$nextTick(() => {
                if (Array.isArray(this.goodsStockGroup)) {
                    this.isObj = false;
                    this.sizeList = this.goodsStockGroup[idx].list;
                } else {
                    this.isObj = true;
                    this.hasColor = this.goodsStockGroup.name == "" ? false : true;
                    this.sizeList = this.goodsStockGroup.list;
                }
                this.sizeList.forEach((item, index) => {
                    this.$set(item, 'goods_id', this.goodsDetail.goods_id);
                    if (this.idx1 == index) {
                        this.goodsStock.available_sum = item.available;
                    }
                })
            })
        },
        //获取商品规格库存等
        async goodsGetStock(goodsId) {
            let _result = await this.$api.goodsGetStock({
                sid: this.userSid,
                client_id: this.clientId,
                factory_id: this.factoryId,
                goods_id: goodsId
            });
            if (_result) {
                this.$nextTick(() => {
                    this.goodsStock = _result;
                    this.goodsStockGroup = this.goodsStock.group;
                    this.getSizeList(this.idx)
                    if (this.clientId || this.factoryId) {
                        this.natureVisible = true;
                    }
                })
            }
        },
        getSizeStock(item, idx) {
            this.idx1 = idx || 0;
            this.goodsStock.available_sum = item.available;
        },
        //打开购物车
        openNature() {
            //运行获取商品规格
            this.goodsGetStock(this.goodsId);
        },
        //关闭购物车弹框
        closeNature() {
            this.natureVisible = false;
        },
        toShopsCart() {
            this.$router.push({
                name: 'businessCart',
                query: {
                    clientId: this.clientId,
                    factoryId: this.factoryId
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
        .goods-spec-item {
            padding: 5px 0;
            .label-left {
                width: 55px;
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