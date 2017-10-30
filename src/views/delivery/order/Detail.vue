<template>
  <div class="delivery-order-detail gc-container has-header has-footer two-btn">
    <x-header :left-options="{backText: ''}" class="gc-header">订单详情</x-header>
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
    </group>
    <!-- 配送方式，客户 -->
    <group>
      <cell title="配送方式" :value="orderInfo.post_type_name">
        <i class="iconfont icon-deliver vm fs18 fc-6 mr5" slot="icon"></i>
      </cell>
      <div class="gc-cell">
        <div>
          <i class="iconfont icon-people fs18 fc-6" slot="icon"></i>
          <span class="vm">客户</span>
        </div>
        <div class="fc-9 fs-14 pl25">
          <p>
            {{orderInfo.reciver_addr}}
          </p>
          <div class="box-flex">
            <div class="flex-one">
              <span class="mr20">{{orderInfo.reciver_name}}</span>
              <span>{{orderInfo.reciver_mobile}}</span>
            </div>
            <a :href="`tel:${orderInfo.reciver_mobile}`">
              <i class="iconfont icon-phone fs18"></i>
            </a>
          </div>
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
      </div>
      <cell title="商品清单" :value="`${orderInfo.goods_count}件`" is-link @click.native="toGoodsList">
        <i class="iconfont icon-apps fs18 mr5 fc-6" slot="icon"></i>
      </cell>
    </group>
    <!-- 备注 -->
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
    <!-- 已出库的具有发货功能 -->
    <div class="gc-footer plr20 ptb10" v-if="orderInfo.status===3">
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="onSend">确认发货</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- 确认发货 -->
    <confirm v-model="showSendOrder" title="确认发货" @on-confirm="onConfirmSend" :close-on-confirm="false">
      <x-textarea type="textarea" v-model="gcForm.remark" :rows="6" :max="50" class="send-order"></x-textarea>
    </confirm>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import model from '@/model'
import OrderBills from '@/components/order/Bills'
import OrderStatus from '@/components/order/Status'
const orderInfo = model.orderFn()
export default {
  name: 'delivery-order-detail',
  title: '订单详情',
  data() {
    return {
      showSendOrder: false,
      showOrderBills: false,
      showOrderStatus: false,
      orderInfo: orderInfo,
      orderId: '',
      gcForm: {
        remark: ''
      }
    }
  },
  components: {
    OrderBills,
    OrderStatus
  },
  created() {
    this.orderId = this.$route.params.orderId
    this._loadOrderDetail()
  },
  computed: {
    ...mapGetters(['userSid']),
    // 订单最终总额
    orderPrice() {
      return Number.parseFloat(this.orderInfo.fee_goods) + Number.parseFloat(this.orderInfo.fee_post) - Number.parseFloat(this.orderInfo.fee_derate)
    }
  },
  methods: {
    // 加载订单详情
    async  _loadOrderDetail() {
      let _result = await this.$api.orderGetDetail({ order_id: this.orderId, sid: this.userSid, by_deliver: 1 })
      this.orderInfo = _result
    },
    // 订单状态
    toOrderStatus() {
      this.showOrderStatus = true
    },
    // 订单清单
    toGoodsList() {
      this.showOrderBills = true
    },
    // 订单发货
    onSend() {
      this.showSendOrder = true
      this.gcForm.remark = ''
    },
    // 订单发货确认
    onConfirmSend() {
      this.$api.orderPost({ order_id: this.orderId, remark: this.gcForm.remark })
        .then(d => {
          this.showSendOrder = false
          this.$vux.toast.show({
            content: '发货成功',
            type: 'success'
          })
          this._loadOrderDetail()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/scss/_available.scss';
.icon-phone {
  color: $theme;
}

.send-order {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}
</style>