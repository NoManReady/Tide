<template>
    <div class="business-goods-purchase gc-container has-header has-footer ft-btn">
        <x-header :left-options="{backText: ''}" class="gc-header">
            订单详情
        </x-header>
        <div class="purchase-client" v-if="clientId">
            <!-- 收货地址 -->
            <!-- <div class="payment-address">
                                        <payment-address :address-info="customerOrFactoryInfo"></payment-address>
                                    </div> -->
            <group class="">
                <cell :title="customerOrFactoryInfo.name"></cell>
                <!--<cell :title="customerOrFactoryInfo.name" :inline-desc="clientLevel">-->
            </group>
            <group v-if="clientId != 1">
                <div class="gc-cell">
                    <div>
                        <i class="iconfont icon-people fs18 fc-6" slot="icon"></i>
                        <span class="vm">收货人信息</span>
                    </div>
                    <div class="fc-9 fs-14 pl25">
                        <div>
                            <span class="vm mr30">{{customerOrFactoryInfo.contact}}</span>
                            <span class="vm">{{customerOrFactoryInfo.mobile}}</span>
                        </div>
                        <div>
                            {{customerOrFactoryInfo.addr}}
                        </div>
                    </div>
                </div>
                <div class="gc-cell">
                    <div class="box vux-flexbox" @click="postTypeVisible=true">
                        <div class="title">
                            配送方式
                        </div>
                        <div class="value flex-one tr fc-6">
                            {{postTypeValue}}
                        </div>
                        <i class="iconfont icon-right"></i>
                    </div>
                </div>
                <div class="gc-cell" v-show="deliverShow">
                    <div class="box vux-flexbox" @click="deliverVisible=true">
                        <div class="title">
                            对接搬运
                        </div>
                        <div class="value flex-one tr fc-6">
                            {{deliverValue}}
                        </div>
                        <i class="iconfont icon-right"></i>
                    </div>
                </div>
                <!--
                <x-input title="运费" v-model="query.fee_post" text-align="right" placeholder="请输入"></x-input>
                -->
            </group>
            <group label-width="80px">
                <x-input title="备注" v-model="query.remark" placeholder="请输入"></x-input>
                <x-input title="内部备注" v-model="query.remark_shop" placeholder="请填写内部备注（选填）"></x-input>
            </group>
        </div>
        <div class="purchase-factory" v-if="factoryId">
            <group>
                <cell :title="customerOrFactoryInfo.name" :inline-desc="customerOrFactoryInfo.addr">
                </cell>
            </group>
            <group label-width="80px">
                <x-input title="备注" v-model="query.remark" placeholder="请输入"></x-input>
            </group>
        </div>
        <group>
            <div class="gc-cell">
                <div class="cf w100p">
                    <div class="fl">订单金额</div>
                    <div class="fr f-red">￥{{orderPrice}}</div>
                </div>
                <div class="cf w100p fs14 fc-6 mt10">
                    <div class="fl">商品金额</div>
                    <div class="fr f-red">¥{{goodsPrice}}</div>
                </div>
                <!--
                <div class="cf w100p fs14 fc-6 mt10" v-if="clientId && query.fee_post">
                    <div class="fl">运费</div>
                    <div class="fr f-red">+{{feePost}}</div>
                </div>
                -->
            </div>
        </group>
        <footer-fixed>
            <div slot="total" class="total-inner">
                <p>
                    总计：
                    <span class="f-theme">￥{{orderPrice}}</span>
                </p>
            </div>
            <div slot="btn" class="btn-inner" @click.prevent="orderSubmit">
                提交订单
            </div>
        </footer-fixed>
        <!-- 选择配送方式 -->
        <div v-transfer-dom>
            <popup v-model="postTypeVisible" width="100%" height="50%" position="bottom">
                <div class="deliver-box">
                    <div class="hd">
                        配送方式
                    </div>
                    <div class="bd">
                        <radio :options="postTypes" v-model="query.post_type" @on-change="changePostType"></radio>
                    </div>
                    <div class="ft" @click.prevent="postTypeVisible=false">
                        <x-button type="warn">关闭</x-button>
                    </div>
                </div>
            </popup>
        </div>
        <!-- 选择对接搬运 -->
        <div v-transfer-dom>
            <popup v-model="deliverVisible" width="100%" height="50%" position="bottom">
                <div class="deliver-box">
                    <div class="hd">
                        对接搬运
                    </div>
                    <div class="bd">
                        <radio :options="delivers" v-model="query.deliver_uid" @on-change="changeDeliver"></radio>
                    </div>
                    <div class="ft" @click.prevent="deliverVisible=false">
                        <x-button type="warn">关闭</x-button>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
import PaymentAddress from '@/common/payment-address'
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
    toFixed
} from '@/utils'
export default {
    components: {
        PaymentAddress,
        FooterFixed
    },
    data() {
        return {
            postTypeVisible: false,
            postTypes: [{
                key: '0',
                value: '自提'
            }, {
                key: '1',
                value: '物流'
            }],
            delivers: [],
            deliverVisible: false,
            postTypeValue: '物流',
            deliverShow: true,
            deliverValue: '',
            query: {
                post_type: 1,
                deliver_uid: 0,
                fee_post: 0,
                remark: '',
                remark_shop: '',
            }
        }
    },
    async created() {
        this.delivers = await this.getDelivers()
    },
    computed: {
        ...mapGetters(['userSid', 'customerOrFactoryInfo']),
        clientId() {
            let clientId = this.$route.query.clientId || '';
            return clientId;
        },
        factoryId() {
            let factoryId = this.$route.query.factoryId || '';
            return factoryId;
        },
        goodsPrice() {
            let total = parseFloat(this.$route.query.total) || '';
            return toFixed(total);
        },
        feePost() {
            return toFixed(parseFloat(this.query.fee_post)) || 0;
        },
        orderPrice() {
            let fee = parseFloat(this.query.fee_post) || 0;
            let total = parseFloat(this.goodsPrice) + fee
            return toFixed(total);
        },
        clientLevel() {
            let txt = "客户级别：银牌客户";
            return txt;
        }
    },
    watch: {
        '$route'(to, form) {
            this.postTypeValue = '物流'
            this.deliverShow = true
            this.deliverValue = ''
            this.query = {
                post_type: 1,
                deliver_uid: 0,
                fee_post: 0,
                remark: '',
                remark_shop: ''
            }
        }
    },
    methods: {
        // 选择物流
        ...mapActions(['createOrder', 'getCartInfo', 'getDelivers']),
        changePostType(value, label) {
            this.postTypeValue = label;
            this.postTypeVisible = false;
            if (value == '1'){
                this.deliverShow = true;
                this.deliverVisible = true;
            }else{
                this.deliverShow = false;
            }
        },
        // 选择搬运
        changeDeliver(value, label) {
            this.deliverValue = label;
            this.deliverVisible = false;
        },
        async orderSubmit() {
            this.query = Object.assign({}, this.query, {
                sid: this.userSid,
                client_id: this.clientId,
                factory_id: this.factoryId,
                goods: loadFromLocal('cartGoods')
            });
            if (this.clientId != '1' && this.factoryId == ''){
                if (this.query.post_type > 0 && this.query.deliver_uid == 0){
                    this.$vux.toast.text('请选择对接搬运')
                    return
                }
            }
            let _result = await this.$api.orderSubmit(this.query);
            if (_result) {
                let orderSuccess = Object.assign({}, _result, {
                    name: this.customerOrFactoryInfo.name,
                    clientId: this.clientId,
                    factoryId: this.factoryId
                })
                this.createOrder(orderSuccess);
                let ids = {
                    sid: this.userSid,
                    client_id: this.clientId,
                    factory_id: this.factoryId,
                };
                this.getCartInfo(ids);
                this.$router.push({
                    name: 'businessPayResult'
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
<style lang="scss" scope>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
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