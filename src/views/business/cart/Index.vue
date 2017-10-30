<template>
    <div class="business-cart gc-container has-header has-footer">
        <!--header-->
        <x-header :left-options="{backText:''}" class="gc-header">购物车
            <!--<a slot="right" @click.prevent.stop="edit">{{isEdit|editText}}</a>-->
        </x-header>
        <!--cart list-->
        <div class="cart-list">
            <group class="cart-item" v-for="(item,index) in cartInfo.goods" :key="index">
                <div class="cart-item-list">
                    <div class="vux-flexbox">
                        <div class="goods-content">
                            <div class="goods-img">
                                <img :src="item.thumb" alt="">
                            </div>
                            <div class="goods-info">
                                <div class="goods-name ell-2">
                                    {{item.title}}
                                </div>
                                <div class="goods-type">
                                    货号：{{item.code}}
                                </div>
                                <div class="goods-price vux-flexbox">
                                    <div class="price f-theme">
                                        ￥
                                        <span class="current-price" v-if="clientId">{{item.sales_price}}</span>
                                        <span class="current-price" v-if="factoryId">{{item.buy_price}}</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="cart-item-spec" v-for="(spec,index) in item.list" :key="index">
                    <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu">
                            <swipeout-button @click.native="onButtonClick(spec,'delete',item.list,index)" type="warn" :width="60">删除</swipeout-button>
                        </div>
                        <div slot="content" class="vux-flexbox goods-spec">
                            <div class="left flex-one">
                                <div class="top">
                                    {{spec.sname}}
                                </div>
                                <div class="bottom vux-flexbox">
                                    <input v-model="spec.sales_price" pattern="[0-9]*" v-if="clientId">
                                    <input v-model="spec.buy_price" pattern="[0-9]*" v-if="factoryId">
                                    <div class="price f-theme">
                                        <span class="current-price" v-if="clientId">￥{{item.sales_price}}</span>
                                        <span class="current-price" v-if="factoryId">￥{{item.buy_price}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="right flex-one">
                                <div class="top">
                                    库存：{{spec.available}}
                                </div>
                                <div class="bottom">
                                    <cart-control min="0" :good="spec" :sid="userSid" :client-id="clientId" :factory-id="factoryId"></cart-control>
                                </div>
                            </div>
                        </div>
                    </swipeout-item>
                </div>

            </group>

        </div>

        <footer-fixed>
            <div slot="total" class="total-inner">
                <p>
                    总计：
                    <span class="f-theme">￥{{totalPrice}}</span>
                </p>
                <p class="fc-9 total-des">
                    共{{cartInfo.goods_count}}种商品
                </p>
            </div>
            <div slot="btn" class="btn-settle" @click.prevent="toSettle">
                结算
            </div>
        </footer-fixed>
        <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="cartInfo.goods_count == 0"></empty>
    </div>
</template>
<script>
import {
    Tabbar,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
} from 'vux'
import cartControl from '@/common/cart-control'
import Empty from '@/common/empty'
import FooterFixed from '@/common/footer-fixed'
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    saveToLocal
} from '@/utils/localStorage'
export default {
    name: 'business-cart',
    components: {
        Tabbar,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        Empty,
        cartControl,
        FooterFixed
    },
    data() {
        return {
            itemChecked: false,
            itemAllChecked: false,
            allChecked: false,
            isEdit: false,
            // cartInfo: {
            //     goods: [],
            //     goods_count: 0
            // },
            query: {},
            cartGoods: [],
            // totalPrice: 0
        }
    },
    created() {

        //获取购物车列表
        this.goodsGetCart();
    },

    computed: {
        ...mapGetters(['userSid', 'cartInfo']),
        emptyText() {
            return '购物车为空哦'
        },
        iconEmpty() {
            return 'icon-empty'
        },
        clientId() {
            let clientId = this.$route.query.clientId || '';
            return clientId;
        },
        factoryId() {
            let factoryId = this.$route.query.factoryId || '';
            return factoryId;
        },
        totalPrice() {
            let total = 0;
            this.cartGoods = [];
            this.cartInfo.goods.forEach((item) => {
                item.list.forEach((spec) => {
                    this.$set(spec, 'goods_id', item.goods_id)
                    if (this.clientId) {
                        total += parseFloat(spec.sales_price) * parseFloat(spec.num);
                    }
                    if (this.factoryId) {
                        total += parseFloat(spec.buy_price) * parseFloat(spec.num);
                    }
                    let good = {
                        goods_id: item.goods_id,
                        stock_id: spec.stock_id,
                        price: this.clientId ? spec.sales_price : spec.buy_price,
                        num: spec.num
                    }
                    this.cartGoods.push(good)
                })
            });
            saveToLocal('cartGoods', this.cartGoods);
            // }

            return total || 0;
        }
    },
    filters: {
        editText(isEidt) {
            return !isEidt ? '编辑' : '完成'
        }
    },
    methods: {
        ...mapActions(['loading', 'getCartInfo']),
        //获取购物车列表
        // async goodsGetCart() {
        //     this.query = Object.assign({}, this.query, {
        //         sid: this.userSid,
        //         client_id: this.clientId,
        //         factory_id: this.factoryId
        //     });
        //     let _result = await this.$api.goodsGetCart(this.query);
        //     if (_result) {
        //         this.cartInfo = _result;
        //     }
        // },
        goodsGetCart() {
            let ids = {
                sid: this.userSid,
                client_id: this.clientId,
                factory_id: this.factoryId,
            };
            this.getCartInfo(ids)
        },
        async goodsToCart(spec, type, itemList, index) {
            this.query = Object.assign({}, this.query, {
                sid: this.userSid,
                client_id: this.clientId,
                factory_id: this.factoryId,
                goods_id: spec.goods_id,
                stock_id: spec.stock_id,
                price: spec.sales_price,
                num: type == 'delete' ? 0 : spec.num
            });
            //添加购物车
            let _result = await this.$api.goodsToCart(this.query);
            if (_result) {
                this.$vux.toast.text('更新购物车成功');
                if (type == 'delete') {
                    itemList.splice(index, 1);
                    this.goodsGetCart();
                }
                // saveToLocal('cartNum', cartNum)
            }
        },
        onButtonClick(spec, type, itemList, index) {
            if (type == 'delete') {
                this.goodsToCart(spec, type, itemList, index);
            }
        },


        handleEvents(type) {

        },

        edit() {
            this.isEdit = !this.isEdit;
        },

        del() {

        },
        toSettle() {
            this.$router.push({
                name: 'businessPurchase',
                query: {
                    clientId: this.clientId,
                    factoryId: this.factoryId,
                    total: this.totalPrice
                }
            })
        }

    }
}
</script>
<style lang="less">
.weui-cells {
    margin-top: 10px;
}

.cart-list {
    .weui-cell {
        padding: 0
    }
    .vux-swipeout-item {
        width: 100%;
    }
    .vux-swipeout-content {
        width: 100%;
        padding: 0 10px;
        border-top: 1px solid #fff;
    }
}
</style>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.check-label {
    position: relative;
    padding: 0 10px 0 0;
    .iconfont {
        font-size: 20px;
        color: #999;
    }
    .icon-round {}
    .icon-roundcheckfill {}
}

.check-input {
    position: absolute;
    left: -9999em;
}

.check-input:checked+.icon-roundcheckfill:before {
    content: "\e656";
    color: $theme;
}

.cart-list {
    .cart-item {
        .goods-spec {
            @include justify-content(space-between);
            background-color: #f2f2f2;
            padding: 10px 15px;
            .check-label {
                padding: 15px 15px 15px 0;
            }
            .top {
                padding-bottom: 5px;
            }
            .left {
                .bottom {
                    input {
                        border: 1px solid #bfbfbf;
                        width: 70px;
                        padding: 5px 10px;
                        margin-right: 5px;
                    }
                }
            }
            .right {
                .bottom {
                    width: 120px;
                    float: right;
                }
            }
        }
    }
    .cart-item-list {
        padding: 10px;
        .check-label {
            width: 45px;
            height: 90px;
        }
    }
    .cart-item-spec {
        padding-bottom: 10px;
        .left {
            text-align: left;
        }
        .right {
            text-align: right;
        }
    }
    .goods-content {
        .goods-img {
            width: 90px;
            height: 90px;
            position: relative;
            float: left;
            background-color: #e5e5e5;
            overflow: hidden;
            img {
                width: 100%;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0)
            }
        }
        .goods-info {
            margin-left: 100px;
            .goods-name {
                font-size: 13px;
                color: #666;
                padding-right: 30px;
            }
            .goods-type {
                color: #999;
                font-size: 12px;
                padding-top: 4px;
            }
            .goods-price {
                padding-top: 6px;
                @include justify-content(space-between);
                .price {}
                .current-price {
                    font-size: 20px;
                }
                .orign-price {
                    font-size: 12px;
                    color: #999;
                    text-decoration: line-through;
                }
            }
        }
    }
}

.footer-check {
    .total-inner {
        line-height: 20px;
    }
    .total-des {
        font-size: 14px;
    }
}
</style>