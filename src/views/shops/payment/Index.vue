<template>
    <div class="shops-payment  gc-container has-header has-footer">
        <!-- header -->
        <x-header :left-options="{backText: ''}" class="gc-header">填写订单</x-header>
        <!-- 收货地址 -->
        <div class="payment-address" @click="toPlatAddressList">
            <payment-address :address-info="addressInfo" v-if="addressList.length > 0 && showAddress"></payment-address>
            <p v-if="addressList.length == 0 || !showAddress" class="no-addr-tip pd10 tc">
                请选择地址
            </p>
        </div>
        <!-- 商品清单、配送 -->
        <group>
            <div class="gc-cell" v-if="cartInfo.goods_count > 0">
                <div class="goods vux-flexbox" @click="toShopGoodList">
                    <ul class="vux-flexbox flex-one">
                        <li v-for="(item,index) in cartInfo.goods" :key="index">
                            <img :src="item.thumb" alt="">
                        </li>
                        <li class="more vux-flexbox">
                            <i class="iconfont icon-more"></i>
                        </li>
                    </ul>
                    <div class="goods-count flex-one tr">
                        共{{cartInfo.goods_count}}件
                    </div>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>
            <div class="gc-cell">
                <div class="box vux-flexbox" @click="openDelivery">
                    <div class="title">
                        配送方式
                    </div>
                    <div class="value flex-one tr fc-6">
                        {{deliveryValue}}
                    </div>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>
            <!--<x-input title="运费" v-model="query.fee_post" text-align="right" placeholder="请输入"></x-input>-->
        </group>
        <group>
            <x-textarea type="textarea" :rows="3" :show-counter="true" placeholder="选填：给供应商留言（30字以内）" v-model="query.remark"></x-textarea>
        </group>
        <group>
            <div class="gc-cell">
                <div class="cf w100p fs14 fc-6 mt10">
                    <div class="fl">商品金额</div>
                    <div class="fr f-red">¥{{goodsPrice}}</div>
                </div>
                <!--<div class="cf w100p fs14 fc-6 mt10" v-if="query.fee_post">
                                                    <div class="fl">运费</div>
                                                    <div class="fr f-red">+{{feePost}}</div>
                                                </div>-->
            </div>
        </group>
        <footer-fixed>
            <div slot="total">合计：
                <span class="f-theme">￥{{orderPrice}}</span>
            </div>
            <div slot="btn" @click.prevent="orderSubmit">
                提交订单
            </div>
        </footer-fixed>
        <!-- 选择配送方式 -->
        <div v-transfer-dom>
            <popup v-model="deliveryVisible" width="100%" height="50%" position="bottom">
                <div class="deliver-box">
                    <div class="hd">
                        配送方式
                    </div>
                    <div class="bd">
                        <radio :options="deliveryType" @on-change="changeDelivery"></radio>
                    </div>
                    <div class="ft" @click.prevent="deliveryVisible=false">
                        <x-button type="warn">关闭</x-button>
                    </div>
                </div>
            </popup>
        </div>

        <div v-transfer-dom>
            <popup v-model="addressVisible" width="100%" height="100%" position="right" class="address-popup">
                <address-list :payment="true" @close-address-visable="selectAddressBack"></address-list>
            </popup>
        </div>

    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import PaymentAddress from '@/common/payment-address'
import FooterFixed from '@/common/footer-fixed'
import AddressList from '@/components/uc/Address'
import {
    saveToLocal,
    loadFromLocal
} from '@/utils/localStorage'
import {
    toFixed
} from '@/utils'
export default {
    name: 'shops-payment',
    title: '填写订单',
    data() {
        return {
            deliveryVisible: false,
            deliveryType: [{
                key: '0',
                value: '自提'
            }, {
                key: '1',
                value: '物流'
            }, {
                key: '2',
                value: '其他'
            }],
            deliveryValue: '物流',
            addressInfo: {},
            query: {
                addr_id: '',
                post_type: '1',
                fee_post: '',
                remark: '',
                remark_shop: ''
            },
            addressList: [],
            addressVisible: false,
            showAddress: false
        }
    },
    components: {
        FooterFixed,
        PaymentAddress,
        AddressList
    },
    computed: {
        ...mapGetters(['cartInfo']),
        goodsPrice() {
            let total = parseFloat(this.$route.query.total) || '';
            return toFixed(total);
        },
        sid() {
            let sid = this.$route.query.sid;
            return sid;
        },
        feePost() {
            return toFixed(parseFloat(this.query.fee_post)) || 0;
        },
        orderPrice() {
            let fee = parseFloat(this.query.fee_post) || 0;
            let total = parseFloat(this.goodsPrice) + fee
            return toFixed(total);
        },
    },
    created() {
        this.loadAddrs();
        this.getCartList();
    },
    methods: {
        ...mapActions(['createOrder', 'getCartInfo']),
        async loadAddrs() {
            let _result = await this.$api.userListAddr();
            this.addressList = _result.list;
            this.addressList.forEach((item) => {
                if (item.default == 1) {
                    this.addressInfo = {
                        contact: item.contact,
                        mobile: item.mobile,
                        addr: item.addr
                    }
                    this.query.addr_id = item.addr_id;
                    this.showAddress = true
                }
            })
        },

        toPlatAddressList() {
            this.addressVisible = true;
        },
        closeAddressVisible() {
            this.addressVisible = false;
        },
        selectAddressBack(addressItem) {
            if (addressItem) {
                this.addressInfo = {
                    contact: addressItem.contact,
                    mobile: addressItem.mobile,
                    addr: addressItem.addr
                };
                this.query.addr_id = addressItem.addr_id;
                this.showAddress = true;
            }
            // if (addressItem.default == 1) {
            //     this.loadAddrs();
            // }
            this.closeAddressVisible();
        },
        toShopGoodList() {
            this.$router.push({
                name: 'shopsGoodsList'
            })
        },
        //选择物流
        openDelivery() {
            this.deliveryVisible = true;
        },
        changeDelivery(value, label) {
            this.deliveryValue = label;
            this.query.post_type = value;
            this.deliveryVisible = false;
        },
        getCartList() {
            let ids = {
                sid: this.sid,
                client_id: '',
                factory_id: '',
            };
            this.getCartInfo(ids);
        },
        async orderSubmit() {
            if (!this.query.addr_id) {
                this.$vux.toast.text('请选择地址');
                return;
            }
            this.query = Object.assign({}, this.query, {
                sid: this.sid,
                goods: loadFromLocal('cartGoods')
            });
            let _result = await this.$api.orderSubmit(this.query);
            if (_result) {
                this.createOrder(_result);
                let ids = {
                    sid: this.sid,
                    client_id: '',
                    factory_id: '',
                };
                this.getCartInfo(ids);
                this.$router.push({
                    name: 'shopsPay'
                })
            }
        }

    }

}
</script>
<style lang="less">
.weui-cells {
    font-size: 14px;
    margin-top: 10px;
}
</style>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.shops-payment {
    font-size: 14px;
    .goods {
        li {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 3px;
            position: relative;
            margin-right: 5px;
            img {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
            }
            &.more {
                background-color: #e5e5e5;
                @include justify-content(center);
                .iconfont {
                    font-size: 25px;
                    color: #fff;
                }
            }
        }
    }
}

.payment-address {
    .no-addr-tip {
        background-color: #fff;
        font-size: 18px;
        line-height: 50px;
        border-bottom: 1px solid #e5e5e5;
    }
}

.deliver-box {
    .hd {
        text-align: center;
        padding: 10px 0;
        font-size: 18px;
    }
    .bd {}
    .ft {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .weui-btn {
            border-radius: 0
        }
    }
}
</style>