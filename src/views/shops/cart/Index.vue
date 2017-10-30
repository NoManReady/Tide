<template>
    <div class="shops-cart gc-container has-header has-footer">
        <!--header-->
        <x-header :left-options="{backText:''}" class="gc-header">购物车
            <!-- <a slot="right" @click.prevent.stop="edit">{{isEdit|editText}}</a> -->
        </x-header>
        <!--cart list-->
        <div class="cart-list" v-if="cartInfo.goods_count > 0">
            <group class="cart-item" v-for="(item,index) in cartInfo.goods" :key="index">
                <div class="cart-item-list">
                    <div class="vux-flexbox">
                        <label class="check-label vux-flexbox" :for="`checkbox-${index}`" @change="checkItemAll(item,index)">
                            <input type="checkbox" class="check-input" v-model="item.checked" :id="`checkbox-${index}`">
                            <i class="iconfont icon-round  icon-roundcheckfill"></i>
                        </label>
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
                                        <span class="current-price">{{item.sales_price}}</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="cart-item-spec" v-for="(spec,index1) in item.list" :key="index1">
                    <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu">
                            <swipeout-button @click.native="onButtonClick(spec,'delete',item.list,index1)" type="warn" :width="60">删除</swipeout-button>
                        </div>
                        <div slot="content" class="vux-flexbox goods-spec">
                            <label class="check-label" :for="`checkbox-spec-${index}-${index1}`" @change="checkItem(spec,index1,item)">
                                <input type="checkbox" class="check-input" v-model="spec.checked" :id="`checkbox-spec-${index}-${index1}`">
                                <i class="iconfont icon-round icon-roundcheckfill"></i>
                            </label>
                            <div class="left flex-one">
                                <div class="top">
                                    {{spec.sname}}
                                </div>
                                <div class="bottom">
                                    <div class="price f-theme">
                                        ￥
                                        <span class="current-price">{{spec.sales_price}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="right flex-one">
                                <div class="top">
                                    库存：{{spec.available}}
                                </div>
                                <div class="bottom">
                                    <cart-control min="0" :good="spec" :sid="sid" :client-id="clientId" :factory-id="factoryId"></cart-control>
                                </div>
                            </div>
                        </div>
                    </swipeout-item>
                </div>

            </group>
        </div>
        <footer-fixed class="" v-if="cartInfo.goods_count > 0">
            <label slot="check" class="check-label" :class="{'flex-one':isEdit}" for="checkbox-all" @click.prevent.stop="checkAll($event)">
                <input type="checkbox" class="check-input" v-model="allChecked" id="checkbox-all">
                <i class="iconfont icon-round icon-roundcheckfill"></i>
                <span class="c9 pd-l-s">全选</span>
            </label>
            <div slot="total" class="total-inner" v-if="!isEdit">
                <p>
                    总计：
                    <span class="f-theme">￥{{totalPrice}}</span>
                </p>
                <p class="fc-9 total-des">
                    共{{cartInfo.goods_count}}种商品
                </p>
            </div>
            <div slot="btn" class="btn-settle" @click.prevent="toSettle" v-if="!isEdit">
                下单
            </div>
            <div slot="btn" class="btn-settle" @click.prevent="del" v-if="isEdit">
                删除
            </div>
        </footer-fixed>
        <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="cartInfo.goods_count == 0"></empty>
    </div>
</template>
<script>
import {
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
    saveToLocal,
    loadFromLocal
} from '@/utils/localStorage'
import {
    toFixed,
    removeByValue
} from '@/utils'
export default {
    name: 'shpops-cart',
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        Empty,
        cartControl,
        FooterFixed
    },
    data() {
        return {
            isEdit: false,
            cartInfo: {
                goods: [],
                goods_count: 0
            },
            cartGoods: [],
            query: {},
            // totalPrice: 0,
            allChecked: true,

        }
    },
    created() {
        //获取购物车列表
        this.goodsGetCart();
        // this.isCheckAll();
    },

    computed: {
        emptyText() {
            return '购物车为空哦'
        },
        iconEmpty() {
            return 'icon-empty'
        },
        sid() {
            let sid = this.$route.query.sid || '';
            return sid;
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
                    this.$set(spec, 'goods_id', item.goods_id);
                    if (spec.checked) {
                        total += parseFloat(spec.sales_price) * parseFloat(spec.num);
                        let good = {
                            goods_id: item.goods_id,
                            stock_id: spec.stock_id,
                            price: spec.sales_price,
                            num: spec.num
                        }
                        this.cartGoods.push(good);
                    }
                })
            });
            saveToLocal('cartGoods', this.cartGoods);
            // }

            return toFixed(total) || 0;
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
        async goodsGetCart() {
            this.query = Object.assign({}, this.query, {
                sid: this.sid,
                client_id: this.clientId,
                factory_id: this.factoryId
            });
            let _result = await this.$api.goodsGetCart(this.query);
            if (_result) {
                _result.goods.map((item) => {
                    this.$set(item, 'checked', true);
                    item.list.forEach((spec) => {
                        this.$set(spec, 'checked', true);
                    })
                })
                this.cartInfo = _result;
            }
        },
        async goodsToCart(spec, type, itemList, index) {
            this.query = Object.assign({}, this.query, {
                sid: this.sid,
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
                if (type == 'delete' || this.query.num == 0) {
                    itemList.splice(index, 1);
                    let ids = {
                        sid: this.sid,
                        client_id: this.clientId,
                        factory_id: this.factoryId,
                    };
                    this.getCartInfo(ids)
                }
            }
        },
        onButtonClick(spec, type, itemList, index) {
            if (type == 'delete') {
                this.goodsToCart(spec, type, itemList, index);
            }
        },
        handleEvents(type) {

        },
        // 单个选择
        checkItem(spec, index, item) {
            let flag = true;
            item.list.forEach((spec1) => {
                if (!spec1.checked) {
                    flag = false;
                }
            })
            flag == true ? item.checked = true : item.checked = false;
            // 判断是否选择所有商品的全选
            this.isCheckAll();

            // this.cal(index);
        },
        // 全部商品全选
        checkAll() {
            let flag = true;
            if (this.allChecked) {
                flag = false;
            }
            this.cartInfo.goods.forEach((item) => {
                item.checked = flag;
                item.list.forEach((spec) => {
                    spec.checked = flag;
                });

            });

            this.allChecked = !this.allChecked;
            console.log(this.allChecked)
        },
        // 判断是否选择所有商品的全选
        isCheckAll() {
            let flag = true;
            this.cartInfo.goods.forEach((item) => {
                if (!item.checked) {
                    flag = false;
                }
            })
            this.allChecked = flag == true ? true : false;
        },
        //每个商品属性全选
        checkItemAll(item, index) {
            item.list.forEach((spec) => {
                spec.checked = item.checked ? true : false
            });
            // 判断是否选择所有商品的全选
            this.isCheckAll();
        },
        edit() {
            this.isEdit = !this.isEdit;
        },

        del() {

        },
        toSettle() {
            if (this.totalPrice) {
                this.$router.push({
                    name: 'shopsPayment',
                    query: {
                        total: this.totalPrice,
                        sid: this.sid
                    }
                })
            } else {
                this.$vux.toast.text('请勾选');

            }

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
            padding: 10px;
            .check-label {
                padding: 15px 15px 15px 0;
            }
            .top {
                padding-bottom: 5px;
            }
            .right {
                .bottom {
                    width: 120px;
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
    /*bottom: 50px !important;*/
    .total-inner {
        line-height: 20px;
    }
    .total-des {
        font-size: 14px;
    }
}

.shops-cart {
    .cart-list {
        padding-bottom: 55px;
    }
}
</style>