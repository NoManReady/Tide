<template>
    <div class="component-shop-list">
        <group>
            <div class="shop-item" v-for="(item,index) in shops" :key="item.sid" @click.prevent.stop="toShopsHome(item)">
                <cell-box class="shop-item-hd" is-link>
                    <div class="shop-item-logo fl">
                        <img :src="item.logo || shopLogoNone" alt="">
                    </div>
                    <div class="shop-item-info ellipsis">
                        <p class="shop-name">
                            {{item.name}}
                        </p>
                        <p class="shop-address ellipsis">
                            <!--{{item.addr}}-->
                            商户标志：{{item.stype | homeShopType}}
                        </p>
                        <div class="shop-operate vux-flexbox" v-if="isOperate">
                            <div class="shop-operate-item mr10" @click.prevent.stop="shopWatch(item)">
                                <x-button mini type="default" :class="{'active':item.isWatch}">
                                    <i class="iconfont" :class="{'icon-favor':!item.Watch,'icon-favorfill':item.watch}"></i> {{item.watch | inWatch}}
                                </x-button>
                            </div>
                            <div class="shop-operate-item" @click.prevent.stop="shopFellow(item)">
                                <x-button mini type="default">
                                    <i class="iconfont" :class="{'icon-add':!item.fellow}"></i> {{item.fellow | inFellow}}
                                </x-button>
                            </div>
                        </div>
                    </div>
                </cell-box>
                <cell-box class="shop-item-bd" v-if="item.goods">
                    <div class="box vux-flexbox">
                        <div class="box-item" v-for="(good,index) in item.goods" :key="index" @click.prevent.stop="toGoodsDetail(good,item)">
                            <div class="box-img-wrapper">
                                <img :src="good.thumb" alt="" width="100%">
                            </div>
                            <div class="box-item-name ellipsis">
                                {{good.title}}
                            </div>
                            <div class="box-item-price f-theme">
                                <span>￥</span>{{good.sales_price}}
                            </div>
                        </div>
                    </div>
                </cell-box>
            </div>
        </group>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'component-shop-list',
    props: {
        shops: {
            type: Array,
            require: true
        },
        isOperate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    created() {

    },
    filters: {
        inWatch(value) {
            return value ? '取消关注' : '关注'
        },
        inFellow(value) {
            return value ? '取消商友' : '加为商友'
        }
    },
    methods: {
        toShopsHome(item) {
            this.$router.push({
                name: 'shopsHome',
                query: {
                    sid: item.sid
                }
            })
        },
        toGoodsDetail(good, item) {
            this.$router.push({
                name: 'shopsGoodsDetail',
                query: {
                    sid: item.sid,
                    goodsId: good.goods_id
                }
            })
        },
        shopWatch(item) {
            let _method = item.watch ? 'shopUnWatch' : 'shopWatch';
            this.$api[_method](item.sid).then(response => {
                this.$nextTick(() => {
                    if (response) {
                        item.watch = item.watch ? 0 : 1;
                        this.$vux.toast.show({
                            text: item.watch ? '关注成功' : '取消关注成功'
                        });

                    } else {
                        this.$vux.toast.hide();
                    }
                });
            })

        },
        shopFellow(item) {
            let _method = item.fellow ? 'shopUnFellow' : 'shopFellow';
            this.$api[_method](item.sid).then(response => {
                this.$nextTick(() => {
                    if (response) {
                        item.fellow = item.fellow ? 0 : 1;
                        this.$vux.toast.show({
                            text: item.fellow ? '添加商友成功' : '取消商友成功'
                        });

                    } else {
                        this.$vux.toast.hide();
                    }
                });
            }).catch(err => {
                let self = this;
                setTimeout(function() {
                    self.$router.push({
                        name: 'platformUcAuth'
                    })
                }, 1500)

            })
        }

    }
}
</script>
<style lang="scss" scoped>
@import '../../style/scss/_mixin.scss';
@import '../../style/scss/_available.scss';











/*商户列表*/

.shop-item {
    position: relative;
    @include border-1px(#e8e8e8, before, top);
}

.shop-item-hd {
    padding: 10px;
    .shop-item-logo {
        width: 60px;
        height: 60px;
        padding: 5px;
        border: 1px solid #e8e8e8;
        border-radius: 45px;
        text-align: center;
        @include align-items(center);
        overflow: hidden;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .shop-item-info {
        margin-left: 10px;
        width: 75%;
        .shop-type {
            padding-left: 5px;
            color: $theme;
        }
    }
    .shop-operate {
        padding-top: 10px;
        .active {
            .icon-favor {}
        }
    }
    .weui-btn+.weui-btn {
        margin-top: 0
    }
}


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


.shop-item-bd {
    padding-bottom: 10px;
}
</style>