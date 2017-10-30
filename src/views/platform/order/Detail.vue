<template>
  <div class="platform-order-detail gc-container has-header has-footer two-btn">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="backOrderList" class="gc-header">订单详情</x-header>
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
      </div>
      <cell title="商品清单" :value="`${orderInfo.goods_count}件`" is-link @click.native="toGoodsList">
        <i class="iconfont icon-apps fs18 mr5 fc-6" slot="icon"></i>
      </cell>
    </group>
    <group>
      <div class="gc-cell">
        <div class="box-flex">
          <div class="flex-one">
            <i class="iconfont icon-recharge vm fs18 fc-6"></i>
            <span class="vm">订单金额</span>
          </div>
          <span class="f-red">¥{{orderInfo.fee_goods|toFixed}}</span>
        </div>
        <div class="box-flex fc-9 pl25" slot="inline-desc">
          <div class="flex-one">商品合计</div>
          <span>¥{{(orderInfo.fee_goods*orderInfo.goods_count)|toFixed}}</span>
        </div>
      </div>
    </group>
    <group>
      <cell title="配送方式" :value="orderInfo.post_type_name">
        <i class="iconfont icon-deliver vm fs18 fc-6 mr5" slot="icon"></i>
      </cell>
      <div class="gc-cell">
        <div>
          <i class="iconfont icon-people fs18 fc-6" slot="icon"></i>
          <span class="vm">收货人信息</span>
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
    </group>
    <group>
      <div class="gc-cell">
        <div class="title">
          <i class="iconfont icon-post vm fs18 fc-6" slot="icon"></i>
          <span class="vm">备注</span>
        </div>
        <div class="fc-9 pl25">
          {{orderInfo.remark}}
        </div>
      </div>
    </group>
    <div class="gc-footer plr20 ptb10" v-if="[0,3,4].indexOf(orderInfo.status)>-1">
      <flexbox v-if="orderInfo.status===0">
        <flexbox-item>
          <x-button type="default" @click.native="cancelOrder">取消订单</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="payOrder">支付</x-button>
        </flexbox-item>
      </flexbox>
      <!-- <flexbox v-if="orderInfo.status===5">
                      <flexbox-item>
                        <x-button type="primary" @click.native="backOrder">退货</x-button>
                      </flexbox-item>
                    </flexbox> -->
      <flexbox v-if="orderInfo.status===6">
        <flexbox-item>
          <x-button type="default" @click.native="toStorage">入库</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- 取消订单 -->
    <confirm v-model="showCancelOrder" title="取消订单" @on-confirm="onSubmit" :close-on-confirm="false">
      <x-textarea type="textarea" v-model="gcForm.reason" :rows="6" :max="50" class="cancel-order" v-verify="gcForm.reason"></x-textarea>
    </confirm>
    <!-- 订单清单 -->
    <div v-transfer-dom>
      <popup v-model="showOrderBills" position="right" height="100%" width="100%">
        <keep-alive>
          <order-bills :order-id="orderId" :order-info="orderInfo" v-if="showOrderBills"></order-bills>
        </keep-alive>
      </popup>
    </div>
     <!--确认订单 -->
    <div v-transfer-dom>
      <popup v-model="showOrderConfirm" position="right" height="100%" width="100%">
        <keep-alive>
          <order-confirm :order-id="orderId" :order-info="orderInfo" @on-confirm-bill="confirmOrder" v-if="showOrderConfirm"></order-confirm>
        </keep-alive>
      </popup>
    </div>
    <!-- 订单状态 -->
    <div v-transfer-dom>
      <popup v-model="showOrderStatus" position="right" height="100%" width="100%">
        <keep-alive>
          <order-status :order-id="orderId" :order-info="orderInfo" v-if="showOrderStatus"></order-status>
        </keep-alive>
      </popup>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import model from "@/model";
import validateMixins from "@/mixins/validateMixins";
import { required } from "@/utils/validateGroup";
import OrderBills from "@/components/order/Bills";
import OrderConfirm from "@/components/order/OrderConfirm";
import OrderStatus from "@/components/order/Status";
const orderInfo = model.orderFn();
export default {
  name: "platform-order-detail",
  title: "订单详情",
  data() {
    return {
      actionType: 0,
      showOrderConfirm: false,
      showCancelOrder: false,
      showOrderBills: false,
      showOrderStatus: false,
      orderInfo: orderInfo,
      orderId: "",
      gcForm: {
        reason: ""
      }
    };
  },
  components: {
    OrderBills,
    OrderStatus,
    OrderConfirm
  },
  created() {
    this.orderId = this.$route.params.orderId;
    let _status = this.$route.query.status;
    // 待确认打开商品清单
    if (_status && +_status === 4) {
      this.showOrderConfirm = true;
    }
    this._loadOrderDetail();
  },
  mixins: [validateMixins],
  verify: {
    gcForm: {
      reason: [
        {
          test: required,
          message: "请输入取消原因"
        }
      ]
    }
  },
  methods: {
    ...mapActions(["createOrder"]),
    // 加载订单详情
    async _loadOrderDetail() {
      let _result = await this.$api.orderGetDetail({ order_id: this.orderId });
      this.orderInfo = Object.assign({}, orderInfo, _result);
    },
    // 订单状态
    toOrderStatus() {
      this.showOrderStatus = true;
    },
    // 订单清单
    toGoodsList() {
      this.showOrderBills = true;
    },
    confirmOrder() {
      this.actionType = 0;
      this._loadOrderDetail();
    },
    // 取消订单
    cancelOrder() {
      this.showCancelOrder = true;
      this.gcForm.reason = "";
      this.$nextTick(() => {
        this.$verify.reset();
      });
    },
    // 入库
    toStorage() {
      this.$api.orderTocg(this.orderId).then(d => {
        this.$vux.toast.show({
          text: "入库成功",
          type: "success"
        });
        this._loadOrderDetail();
      });
    },
    // 退货
    backOrder() {
      let vm = this;
      this.$vux.confirm.show({
        title: "确认退货",
        content: "是否确认退货",
        onCancel() {},
        onConfirm() {
          vm.$api.orderReceipt(vm.orderId).then(d => {
            vm.$vux.toast.show({
              content: "退货成功",
              type: "success"
            });
            vm._loadOrderDetail();
          });
        }
      });
    },
    // 支付
    payOrder() {
      let orderResult = {
        order_id: this.orderInfo.create_id,
        order_sn: this.orderInfo.order_sn,
        fee_order: this.orderInfo.fee_order
      };
      this.createOrder(orderResult);
      this.$router.push({
        name: "shopsPay",
        query: {
          sid: this.orderInfo.shop_id
        }
      });
    },
    // 取消订单确认
    onSubmitConfirm() {
      this.$api
        .orderCancel(Object.assign({}, this.gcForm, { order_id: this.orderId }))
        .then(d => {
          if (d) {
            this._loadOrderDetail();
            this.$vux.toast.show({
              text: "操作成功",
              type: "success"
            });
          }
          this.showCancelOrder = false;
        })
        .catch(() => {
          this.showCancelOrder = false;
        });
    },
    backOrderList() {
      this.$router.push({
        name: "platformOrderList"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cancel-order {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}
</style>