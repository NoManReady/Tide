<template>
    <div class="nature-popup">
        <div class="goods-wrapper vux-flexbox">
            <div class="goods-img">
                <img :src="goodsDetail.thumb" alt="">
            </div>
            <div class="goods-info-box">
                <div class="goods-name ell-2">
                    <span>
                        {{goodsDetail.title}}
                    </span>
                </div>
                <div class="goods-code">
                    <span>货号：{{goodsDetail.code}}</span>
                </div>
                <div class="goods-price">
                    <div class="f-theme">￥
                        <span class="big-price">{{goodsDetail.sales_price}}</span>
                        <span class="small-price">
                        </span>
                    </div>
                </div>
            </div>
            <!--
            <div class="goods-close" @click="close">
                <i class="iconfont icon-roundclose fs22"></i>
            </div>
            -->
        </div>
        <div class="nature-container">
            <!-- sku说明 -->
            <div class="sku-label vux-flexbox">
                <div class="item" v-if="hasColor">
                    颜色
                </div>
                <div class="item">
                    尺码
                </div>
                <div class="item">
                    数量
                </div>
            </div>
            <!-- sku内容 -->
            <div class="sku-selector box-flex">
                <ul class="sku-selector-left" v-if="hasColor">
                    <li v-for="(item,index) in goodsStock" :key="index" @click.prevent="getSizeList(index)" :class="{active:idx==index}">
                        <a href="javascript:void(0)">
                            {{item.name}}
                        </a>
                    </li>
                </ul>
                <ul class="sku-selector-content" :class="{'no-color':!hasColor}">
                    <li class="sku-selector-operator vux-flexbox" v-for="(item,index) in sizeList" :key="index">
                        <div class="spec-operator-item">
                            <div class="item-content spec-size">
                                {{item.name}}
                            </div>
                        </div>
                        <div class="spec-operator-item amount-operator-item">
                            <div class="item-content">
                                <cart-control min="0" :good="item" :sid="sid" :client-id="clientId" :factory-id="factoryId"></cart-control>
                                <div class="book-stock">
                                    库存：
                                    <span class="num">{{item.available}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="nature-addcart vux-flexbox">
                    <div class="total">
                    <!--
                        <p>总计：
                            <em class="f-theme">￥
                                <span class="big-price">{{totalPrice}}</span>
                            </em>
                        </p>
                        <p class="count fc-9">
                            共{{goodsDetail.specn}}种商品
                        </p>
                    -->
                    </div>
                    <div class="btn-addcart" @click="close">
                        确定
                    </div>
                </div>
    </div>
</template>
<script>
import {
    isEmpty,
    toFixed
} from '@/utils'
import {
    saveToLocal,
    loadFromLocal
} from '@/utils/localStorage'
import {
    mapGetters,
    mapActions
} from 'vuex'
import cartControl from '@/common/cart-control'
export default {
    name: 'nature-popup',
    components: {
        cartControl
    },
    props: ['goodsDetail', 'goodsStock', 'sid', 'clientId', 'factoryId'],
    data() {
        return {
            sizeList: [],
            hasColor: true,
            idx: 0,
            cartGoods: [],
            query: {}
        }
    },
    created() {
        this.getSizeList(this.idx);
        console.log(this.goodsStock)

    },
    computed: {
        totalPrice() {
            let total = 0;
            this.sizeList.forEach((item) => {
                total += item.sales_price * item.num;
            });
            return toFixed(total);
        }

    },
    watch: {
        // totalPrice: "goodsToCart"
    },
    methods: {
        close() {
            this.$emit('closepop')
        },
        getSizeList(idx) {
            this.idx = idx;
            this.$nextTick(() => {
                if (Array.isArray(this.goodsStock)) {
                    this.sizeList = this.goodsStock[idx].list;
                } else {
                    this.hasColor = this.goodsStock.name == "" ? false : true;
                    console.log(this.hasColor)
                    this.sizeList = this.goodsStock.list;
                }
                this.sizeList.forEach((item) => {
                    this.$set(item, 'goods_id', this.goodsDetail.goods_id);
                })
            })
        },
        async goodsToCart(good, type) {
            this.query = {
                sid: this.sid,
                client_id: this.clientId,
                factory_id: this.factoryId,
                goods_id: this.goodsDetail.goods_id,
                stock_id: good.stock_id,
                price: good.sales_price,
                num: good.num
            };
            //添加购物车
            let _result = await this.$api.goodsToCart(this.query);
            if (_result) {
                this.$vux.toast.text('更新购物车成功');
                this.$nextTick(() => {
                    let cartNum = loadFromLocal('cartNum');
                    if (type == 'add') {
                        cartNum++;
                    }
                    if (type == 'reduce') {
                        if (cartNum <= 0) {
                            cartNum = 0;
                            return;
                        }
                        cartNum--;
                    }
                    if (type == 'delete') {
                        cartNum -= good.num
                    }
                })

            }
        }


    }

}
</script>
<style lang="scss">
@import "../../../style/scss/_mixin.scss";
@import '../../../style/scss/_available.scss';
.nature-popup {
    background-color: #fff;
    border-top: 2px solid $theme;
    height: 100%;
    .goods-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        padding: 10px;
        height: 122px;
        .goods-img {
            position: relative;
            height: 100px;
            width: 100px;
            margin-left: 10px;
            overflow: hidden;
            text-align: center;
            img {
                display: inline-block;
                width: auto;
                max-width: 100px;
                height: 100px;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translate3d(-50%, 0, 0)
            }
        }
        .goods-info-box {
            flex: 1;
            margin-left: 10px;
            position: relative;
            height: 100%;
            margin-top: -2px;
            padding-right: 10px;
            .goods-name {
                color: #232326;
                font-size: 14px;
                line-height: 20px;
                height: 40px;
                span {
                    display: inline;
                    word-break: break-all;
                }
            }
            .goods-code {
                line-height: 16px;
                padding-top: 15px;
                color: #999;
                font-size: 13px;
            }
            .goods-price {
                padding-top: 5px;
                .big-price {
                    font-size: 18px;
                }
            }
        }
        .goods-close {
            margin-top: -80px;
        }
    }
    .nature-container {
        .sku-label {
            position: absolute;
            top: 122px;
            width: 100%;
            left: 0;
            height: 40px;
            line-height: 40px;
            text-align: center;
            @include border-1px(#d7d7d7, before, top);
            @include border-1px(#d7d7d7, after, bottom);
            .item {
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .sku-selector {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: auto;
            /*padding: 162px 0 60px 0;*/
            padding: 162px 0 0 0;
            overflow: hidden;
            >ul {
                height: 100%;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
            }
        }
        .sku-selector-left {
            width: 33.3333%;
            height: 100%;
            background: #fff;
            text-align: center;
            display: block;
            li {
                width: 90px;
                max-width: 80%;
                height: 38px;
                line-height: 37px;
                margin: 15px auto;
                border: 1px #e5e5e5 solid;
                border-radius: 3px;
                color: #666666;
                font-size: 15px;
                display: block;
                text-align: center;
                background: #fff;
                word-break: break-word;
                &.active {
                    background-color: $theme;
                    border-color: $theme;
                    a {
                        color: #fff;
                    }
                }
            }
        }
        .sku-selector-content {
            display: block;
            width: 66.6666%;
            height: 100%;
            background: #f2f2f2;
            &.no-color {
                width: 100%;
            }
            .sku-selector-operator {
                padding: 10px;
                position: relative;
                @include border-1px(#e5e5e5, before, top);
                @include justify-content(space-between);
                &:first-child {
                    @include border-none()
                }
                .spec-operator-item {
                    flex: 1;
                    text-align: center;
                }
                .amount-operator-item {
                    .item-content {
                        float: right;
                    }
                }
                .book-stock {
                    text-align: right;
                }
                .spec-size {
                    font-size: 18px;
                }
            }
        }
        .choose-num {
            // width: 85px;
            height: 32px;
            text-align: center;
            border: 1px solid #bfbfbf;
            border-radius: 3px;
            .btn-reduce,
            .btn-increase {
                width: 32px;
                height: 32px;
                line-height: 32px;
                .iconfont {
                    font-size: 16px;
                    color: #000;
                    &.no-tap {
                        color: #bfbfbf;
                    }
                }
                .icon-add {}
            }
            .num-input {
                // width: 35px;
                flex: 1;
                height: 32px;
                position: relative;
                @include border-1px(#bfbfbf, after, right);
                @include border-1px(#bfbfbf, before, left);
                input {
                    width: 100%;
                    height: 32px;
                    line-height: 32px;
                    font-size: 15px;
                    vertical-align: top;
                    text-align: center;
                    color: $theme;
                }
            }
        }
    }
    .nature-addcart {
        width: 100%;
        padding: 0 0 0 10px;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 40px;
        @include border-1px(#e5e5e5, before, top);
        .total {
            padding-left: 10px;
            color: #000;
            font-size: 16px;
            flex: 1;
            p {}
        }
        .btn-addcart {
            line-height: 40px;
            width: 40%;
            background-color: $theme;
            text-align: center;
            color: #fff;
            font-size: 18px;
        }
    }
}
</style>