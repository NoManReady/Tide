<template>
    <div class="business-order-detail gc-container has-header has-footer two-btn">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="toOrderList" class="gc-header">订单详情</x-header>
        <!-- 订单状态，清单 -->
        <group>
            <cell title="订单状态" :value="orderInfo.status_name" is-link @click.native="toOrderStatus">
                <i class="iconfont icon-text fs18 mr5 fc-6" slot="icon"></i>
            </cell>
            <div class="gc-cell fc-6 pl40">
                <div class="ellipsis">
                    订单号：{{orderInfo.order_sn}}
                </div>
                <div class="ellipsis fs14">
                    下单时间：{{orderInfo.create_date}}
                </div>
                <div class="tr mt10" v-if="orderInfo.status>1 && orderInfo.order_type=='SC'">
                    <el-button type="primary" size="small" @click.native="printReceipt" v-show="showPrintReceipt">打印小票
                        <i class="iconfont icon-edit"></i>
                    </el-button>
                    <el-button type="primary" size="small" @click.native="printExpress" v-show="showPrintExpress" v-if="orderInfo.deliver_uid > 0">打印面单
                        <i class="iconfont icon-edit"></i>
                    </el-button>
                </div>
            </div>
            <cell title="商品清单" :value="`${orderInfo.goods_count}件`" is-link @click.native="toGoodsList">
                <i class="iconfont icon-apps fs18 mr5 fc-6" slot="icon"></i>
            </cell>
        </group>
        <!-- 客户 -->
        <group>
            <cell title="客户" @click.native="toCustom">
                <i class="iconfont icon-people fs18 mr5 fc-6" slot="icon"></i>
                <span slot="value">{{orderInfo.target_name}}</span>
            </cell>
            <div class="gc-cell fc-6 pl40" v-if="false">
                <div class="ellipsis">
                    {{orderInfo.target_name}}
                </div>
                <div class="box-flex">
                    <div class="ellipsis fs14 flex-one">
                        <span class="vm mrr20">银牌客户</span>
                        <span class="vm">1234564324656</span>
                    </div>
                    <a :href="'tel:1234564324656'" class="f-red fs24">
                        <i class="iconfont icon-phone"></i>
                    </a>
                </div>
            </div>
        </group>
        <!-- 订单总额 -->
        <group>
            <div class="gc-cell">
                <div class="box-flex">
                    <div class="flex-one">
                        <i class="iconfont icon-recharge vm fs18 fc-6"></i>
                        <span class="vm">订单总额</span>
                    </div>
                    <span class="f-red">¥{{orderPrice|toFixed}}</span>
                </div>
                <div slot="inline-desc">
                    <div class="box-flex fc-9 pl25">
                        <div class="flex-one">商品合计</div>
                        <span>¥{{(orderInfo.fee_goods)|toFixed}}</span>
                    </div>
                    <div class="box-flex fc-9 pl25" v-show="+orderInfo.fee_post">
                        <div class="flex-one">运费</div>
                        <span>¥{{(orderInfo.fee_post)|toFixed}}</span>
                    </div>
                    <div class="box-flex fc-9 pl25" v-show="+orderInfo.fee_derate">
                        <div class="flex-one">优惠</div>
                        <span>¥{{(orderInfo.fee_derate)|toFixed}}</span>
                    </div>
                </div>
                <div class="tr mt10" v-if="orderInfo.is_pay===0&&orderInfo.status!==-1">
                    <!--
                    <el-button type="primary" size="small" @click.native="showOrderFreight =true">修改运费
                        <i class="iconfont icon-edit"></i>
                    </el-button>
                    -->
                    <el-button type="primary" size="small" @click.native="showOrderCoupon=true">修改优惠
                        <i class="iconfont icon-sponsor"></i>
                    </el-button>
                </div>
            </div>
        </group>
        <!-- 备注 -->
        <group>
            <cell title="订单备注">
                <i class="iconfont icon-tag fs18 mr5 fc-6" slot="icon"></i>
                <div slot="inline-desc">{{orderInfo.remark}}</div>
            </cell>
            <cell title="内部沟通" v-show="orderInfo.order_type==='SC'">
                <i class="iconfont icon-tag fs18 mr5 fc-6" slot="icon"></i>
                <div slot="inline-desc">{{orderInfo.remark_shop}}</div>
            </cell>
        </group>
        <!-- 配送方式 -->
        <group>
            <div class="gc-cell">
                <div>
                    <i class="iconfont icon-people fs18 fc-6" slot="icon"></i>
                    <span class="vm">{{orderInfo.order_type==='SC'?'收货人':'发货人'}}信息</span>
                </div>
                <div class="fc-9 fs-14 pl25">
                    <div>
                        <span class="vm mr30">{{orderInfo.reciver_name}}</span>
                        <span class="vm">{{orderInfo.reciver_mobile}}</span>
                    </div>
                    <div>
                        {{orderInfo.reciver_addr}}
                    </div>
                </div>
            </div>
            <cell title="配送方式" :value="orderInfo.post_type_name" v-show="orderInfo.order_type==='SC'">
                <i class="iconfont icon-deliver vm fs18 fc-6 mr5" slot="icon"></i>
            </cell>
            <cell title="对接搬运" :value="orderInfo.deliver_name" v-if="orderInfo.status>1 && orderInfo.deliver_uid>0">
                <i class="iconfont icon-people vm fs18 fc-6 mr5" slot="icon"></i>
            </cell>
            <cell title="搬运费用" :value="orderInfo.deliver_fee" v-if="orderInfo.status>1 && orderInfo.deliver_uid>0">
                <i class="iconfont icon-recharge vm fs18 fc-6 mr5" slot="icon"></i>
            </cell>
            <div class="gc-cell pl40" v-if="orderInfo.status<2 && orderInfo.post_type>0">
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
            <x-input title="搬运费用" class="pl40" v-if="orderInfo.status<2 && orderInfo.post_type>0" v-model="gcForm.deliver_fee" text-align="right" placeholder="请输入"></x-input>
            <datetime title="班车时间" class="pl40" v-if="orderInfo.status<2 && orderInfo.post_type>0" v-model="gcForm.post_expect" text-align="right" format="YYYY-MM-DD HH:mm" :hour-list="['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']" :minute-list="['00', '15', '30', '45']"></datetime>
        </group>
        <!-- 订单结算 -->
        <group>
            <cell title="订单结算" :value="orderInfo.is_pay===0?'未结算':'已结算'">
                <i class="iconfont icon-pay fs18 mr5 fc-6" slot="icon"></i>
            </cell>
            <div class="gc-cell fc-6 pl40">
                <div class="ellipsis" v-show="orderInfo.is_pay===0">
                    <span class="vm">待结算：</span>
                    <i class="vm f-red">¥{{orderPrice|toFixed}}</i>
                </div>
                <div class="ellipsis" v-show="orderInfo.is_pay===0">
                    <span class="vm">支付现金(待确认)：</span>
                    <i class="vm f-red">¥{{orderInfo.pay_money|toFixed}}</i>
                </div>
                <div class="ellipsis" v-show="orderInfo.is_pay===1">
                    <span class="vm">已结算：</span>
                    <i class="vm f-red">¥{{orderInfo.pay_money|toFixed}}</i>
                </div>
                <div class="ellipsis" v-show="orderInfo.is_pay===1 && orderPrice>orderInfo.pay_money">
                    <span class="vm">欠款：</span>
                    <i class="vm f-red">¥{{orderPrice-orderInfo.pay_money|toFixed}}</i>
                </div>
            </div>
        </group>
        <div class="gc-footer" v-if="orderInfo.status>=0">
            <flexbox class="plr20 ptb10">
                <flexbox-item v-if="orderInfo.is_pay===0">
                    <x-button type="default" @click.native="showCancelOrder=true">取消订单</x-button>
                </flexbox-item>
                <flexbox-item v-if="orderInfo.is_pay===0">
                    <x-button type="primary" @click.native="orderConfirm">结算</x-button>
                </flexbox-item>
                <!--
                <flexbox-item v-if="orderInfo.status===2">
                    <x-button type="primary" @click.native="showOrderDeliver=true">出库</x-button>
                </flexbox-item>
                -->
            </flexbox>
        </div>
        <!-- 订单清单 -->
        <div v-transfer-dom>
            <popup v-model="showOrderBills" position="right" height="100%" width="100%">
                <keep-alive>
                    <order-bills :order-id="orderId" :sid="userSid" :order-info="orderInfo" v-if="showOrderBills"></order-bills>
                </keep-alive>
            </popup>
        </div>
        <!-- 订单状态 -->
        <div v-transfer-dom>
            <popup v-model="showOrderStatus" position="right" height="100%" width="100%">
                <keep-alive>
                    <order-status :order-id="orderId" :sid="userSid" :order-info="orderInfo" v-if="showOrderStatus"></order-status>
                </keep-alive>
            </popup>
        </div>
        <!-- 取消订单 -->
        <confirm v-model="showCancelOrder" title="取消订单" @on-confirm="onConfirmCancel" :close-on-confirm="false">
            <x-textarea type="textarea" v-model="gcForm.reason" :rows="6" :max="50" class="cancel-order"></x-textarea>
        </confirm>
        <!-- 选择对接搬运 -->
        <div v-transfer-dom>
            <popup v-model="deliverVisible" width="100%" height="50%" position="bottom">
                <div class="deliver-box">
                    <div class="hd">
                        对接搬运
                    </div>
                    <div class="bd">
                        <radio :options="delivers" v-model="gcForm.deliver_uid" @on-change="changeDeliver"></radio>
                    </div>
                    <div class="ft" @click.prevent="deliverVisible=false">
                        <x-button type="warn">关闭</x-button>
                    </div>
                </div>
            </popup>
        </div>
        <!-- 订单结算 -->
        <div v-transfer-dom>
            <confirm v-model="showOrderCurrency" title="订单结算" @on-confirm="onConfirmCurrency" :close-on-confirm="false">
                <div class="tl fc-3">
                    <div class="gc-cell box-flex pl0 pr0">
                        <div class="flex-one">
                            订单金额
                        </div>
                        <span>¥{{orderPrice|toFixed}}</span>
                    </div>
                    <x-input text-align="right" class="pl0 pr0" title="支付现金" placeholder="请输入" v-model="gcForm.currency" fillable></x-input>
                    <!--
                    <x-input text-align="right" class="pl0 pr0" title="搬运费用" placeholder="请输入" v-model="gcForm.deliver_fee" v-if="orderInfo.deliver_uid > 0" fillable></x-input>
                    -->
                </div>
            </confirm>
        </div>
        <!-- 修改运费 -->
        <div v-transfer-dom>
            <confirm v-model="showOrderFreight" title="修改运费" @on-confirm="onConfirmFreight" :close-on-confirm="false" @on-show="onShowFreight">
                <div class="tl fc-3">
                    <div class="gc-cell box-flex pl0 pr0">
                        <div class="flex-one">
                            运费：
                        </div>
                        <span>¥{{orderInfo.fee_post|toFixed}}</span>
                    </div>
                    <x-input text-align="right" class="pl0 pr0" title="修改运费" v-model="gcForm.freight" fillable></x-input>
                    <div class="mt10 f-red">
                        请填写，修改后的运费
                    </div>
                </div>
            </confirm>
        </div>
        <!-- 修改优惠 -->
        <div v-transfer-dom>
            <confirm v-model="showOrderCoupon" title="修改优惠" @on-confirm="onConfirmCoupon" :close-on-confirm="false" @on-show="onShowCoupon">
                <div class="tl fc-3">
                    <div class="gc-cell box-flex pl0 pr0">
                        <div class="flex-one">
                            优惠：
                        </div>
                        <span>¥{{orderInfo.fee_derate|toFixed}}</span>
                    </div>
                    <x-input text-align="right" class="pl0 pr0" title="修改优惠" placeholder="请输入" v-model="gcForm.coupon" fillable></x-input>
                    <div class="mt10 f-red">
                        请填写优惠后的价格
                    </div>
                </div>
            </confirm>
        </div>
        <!--选择搬运-->
        <div v-transfer-dom>
            <popup v-model="showOrderDeliver" position="right" height="100%" width="100%">
                <div class="business-uc-deliver-list gc-container has-header">
                    <x-header :left-options="{backText:'',preventGoBack:false}" class="gc-header" @on-click-back="showOrderDeliver=false">
                        <span>搬运列表</span>
                        <a href="javascript:;" slot="right" @click="toDeliveryConfirm">确认</a>
                    </x-header>
                    <checker v-model="gcForm.deliver_uid" default-item-class="check-item" selected-item-class="check-item-selected">
                        <checker-item v-for="item in delivertListCheck" :key="item.uid" :value="item.uid" class="mt10">
                            {{item.dname||item.uname||'未知搬运'}}({{item.umobile}})
                        </checker-item>
                    </checker>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
import model from '@/model'
import {
    mapGetters,
    mapActions
} from 'vuex'
import ElButton from '@/components/common/button'
import ElButtonGroup from '@/components/common/buttonGroup'
import OrderBills from '@/components/order/Bills'
import OrderStatus from '@/components/order/Status'
const orderInfo = model.orderFn()
export default {
    name: 'business-order-detail',
    title: '订单详情',
    components: {
        ElButton,
        ElButtonGroup,
        OrderBills,
        OrderStatus
    },
    data() {
        return {
            showPrintReceipt: true,
            showPrintExpress: true,
            //搬运
            showOrderDeliver: false,
            // 取消订单
            showCancelOrder: false,
            // 清单列表
            showOrderBills: false,
            // 订单状态
            showOrderStatus: false,
            // 订单优惠
            showOrderCoupon: false,
            // 订单运费
            showOrderFreight: false,
            // 订单结算
            showOrderCurrency: false,
            // 订单详情
            orderInfo: orderInfo,
            // 订单id
            orderId: '',
            // 各种输入表单
            gcForm: {
                reason: '',
                freight: '',
                coupon: '',
                currency: '',
                currencyMark: '',
                deliver_uid: 0,
                deliver_fee: '',
                post_expect: ''
            },
            delivers: [],
            deliverVisible: false,
            deliverValue: '',
            delivertList: []
        }
    },
    created() {
        this.orderId = this.$route.params.orderId
        this._loadOrderDetail()
        this._loadDeliverList()
    },
    computed: {
        ...mapGetters(['userSid']),
        // 订单最终总额
        orderPrice() {
            return Number.parseFloat(this.orderInfo.fee_goods) + Number.parseFloat(this.orderInfo.fee_post) - Number.parseFloat(this.orderInfo.fee_derate)
        },
        delivertListCheck() {
            return this.delivertList.map(d => {
                return {
                    ...d,
                    check: d.deliver_id == this.gcForm.deliver_uid
                }
            })
        },
    },
    methods: {
        ...mapActions(['getDelivers']),
        // 加载订单详情
        async _loadOrderDetail() {
            let _result = await this.$api.orderGetDetail({
                sid: this.userSid,
                order_id: this.orderId
            })
            this.orderInfo = _result
            this.deliverValue = _result.deliver_name
            this.gcForm.deliver_uid = _result.deliver_uid
            this.gcForm.currency = parseInt(_result.pay_money) || ''
        },
        // 加载搬运列表
        async _loadDeliverList() {
            this.delivers = await this.getDelivers()
            console.log(this.delivers)
            //let _result = await this.$api.manageGetDeliverList(this.userSid)
            //this.delivertList = Object.freeze(_result.list)
        },
        // 订单状态
        toOrderStatus() {
            this.showOrderStatus = true
        },
        // 订单清单
        toGoodsList() {
            this.showOrderBills = true
        },
        // 选择搬运
        changeDeliver(value, label) {
            this.deliverValue = label;
            this.deliverVisible = false;
        },
        // 确认订单
        confirmOrder() {
            let vm = this
            this.$vux.confirm.show({
                title: '确认订单',
                content: '是否确认收货',
                onCancel() { },
                onConfirm() {
                    vm.$api.orderReceipt(vm.orderId)
                        .then(d => {
                            this.$vux.toast.show({
                                content: '确认成功',
                                type: 'success'
                            })
                            this._loadOrderDetail()
                        })
                }
            })
        },
        // 退货
        backOrder() {
            this.$vux.confirm.show({
                title: '确认退货',
                content: '是否确认退货',
                onCancel() { },
                onConfirm() {
                    vm.$api.orderReceipt(vm.orderId)
                        .then(d => {
                            this.$vux.toast.show({
                                content: '退货成功',
                                type: 'success'
                            })
                            this._loadOrderDetail()
                        })
                }
            })
        },
        //选择一个搬运
        _onSelectDeliver(deliverId) {
            this.gcForm.deliver_uid = deliverId
        },
        // 出库确认（选择搬运）
        toDeliveryConfirm() {
            if (this.gcForm.deliver_uid) {
                this.$api.orderDeliver({
                    sid: this.userSid,
                    deliver_uid: this.gcForm.deliver_uid,
                    order_id: this.orderId
                }).then(d => {
                    this.$vux.toast.show({
                        text: '出库成功',
                        type: 'success'
                    })
                    this._loadOrderDetail()
                })
            }
            this.showOrderDeliver = false
        },
        // 支付
        payOrder() {
            // 跳转支付页面
        },
        // 取消订单确认
        onConfirmCancel() {
            this.$api.orderCancel(Object.assign({}, this.gcForm, {
                order_id: this.orderId,
                sid: this.userSid
            }))
                .then(d => {
                    if (d) {
                        this._loadOrderDetail()
                        this.$vux.toast.show({
                            text: '操作成功',
                            type: 'success'
                        })
                    }
                    this.showCancelOrder = false
                })
                .catch(() => {
                    this.showCancelOrder = false
                })
        },
        // 优惠显示
        onShowCoupon() {
            this.gcForm.coupon = Number.parseFloat(this.orderInfo.fee_derate)
        },
        // 优惠确认
        async onConfirmCoupon() {
            if (!this.gcForm.coupon) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请输入优惠金额'
                })
                return
            }
            if (!/^\d+$/.test(this.gcForm.coupon)) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请输入整数金额'
                })
                return
            }
            let _account = Math.abs(this.gcForm.coupon || 0)
            let _result = await this.$api.orderUpdate({
                sid: this.userSid,
                order_id: this.orderId,
                fee_derate: _account
            })
            if (_result) {
                this.$set(this.orderInfo, 'fee_derate', _account)
                this.$vux.toast.show({
                    type: 'success',
                    text: '修改成功'
                })
                this.showOrderCoupon = false
            }
        },
        // 运费显示
        onShowFreight() {
            this.gcForm.freight = Number.parseFloat(this.orderInfo.fee_post)
        },
        // 运费确认
        async onConfirmFreight() {
            if (!this.gcForm.freight) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请输入运费金额'
                })
                return
            }
            if (!/^\d+$/.test(this.gcForm.freight)) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请输入整数金额'
                })
                return
            }
            let _account = Math.abs(this.gcForm.freight || 0)
            let _result = await this.$api.orderUpdate({
                sid: this.userSid,
                order_id: this.orderId,
                fee_post: _account
            })
            if (_result) {
                this.$set(this.orderInfo, 'fee_post', _account)
                this.$vux.toast.show({
                    type: 'success',
                    text: '修改成功'
                })
                this.showOrderFreight = false
            }
        },
        // 结算确认
        orderConfirm(){
            if (this.orderInfo.post_type > 0){
                if (this.gcForm.deliver_uid == 0){
                    this.$vux.toast.text('请选择对接搬运');
                    return
                }
                if (!/^\d+(\.\d{1,2})?$/.test(this.gcForm.deliver_fee)) {
                    this.gcForm.deliver_fee = ''
                    this.$vux.toast.text('请输入搬运费用')
                    return
                }
            }
            this.showOrderCurrency = true
        },
        // 结算确认
        onConfirmCurrency() {
            if (!/^\d+(\.\d{1,2})?$/.test(this.gcForm.currency)) {
                this.gcForm.currency = ''
                return
            }
            this.$api.orderConfirm({
                order_id: this.orderId,
                sid: this.userSid,
                money: this.gcForm.currency,
                deliver_uid: this.gcForm.deliver_uid,
                deliver_fee: this.gcForm.deliver_fee,
                post_expect: this.gcForm.post_expect
            })
                .then(d => {
                    this.$vux.toast.show({
                        type: 'success',
                        text: '结算成功'
                    })
                    this._loadOrderDetail()
                    this.showOrderCurrency = false
                    this.gcForm.currency = 0
                })
        },
        // 打印小票
        printReceipt() {
            this.showPrintReceipt = false
            this.$api.printReceipt(Object.assign({}, this.gcForm, {
                order_id: this.orderId,
                sid: this.userSid
            })).then(d => {
                    if (d) {
                        this.$vux.toast.show({
                            text: '操作成功',
                            type: 'success'
                        })
                    }
                })
                .catch(() => {
                    console.log('printReceipt Error')
                })
        },
        //打印面单
        printExpress() {
            this.showPrintExpress = false
            this.$api.printExpress(Object.assign({}, this.gcForm, {
                order_id: this.orderId,
                sid: this.userSid
            })).then(d => {
                    if (d) {
                        this.$vux.toast.show({
                            text: '操作成功',
                            type: 'success'
                        })
                    }
                })
                .catch(() => {
                    console.log('printReceipt Error')
                })
        },


        // 客户详情
        toCustom(clientId) {
            this.$router.push({
                name: '',
                params: {
                    clientId
                }
            })
        },
        toOrderList() {
            this.$router.push({
                name: 'businessOrderList',
                query: {
                    sid: this.userSid
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.cancel-order {
    border: 1px solid #d9d9d9;
    border-radius: 5px;
}

.check-item {
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px 20px;
    width: 100%;
}

.check-item-selected {
    background: #ffffff url('../../../assets/checked.png') no-repeat right bottom;
    border-color: #ff4a00;
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