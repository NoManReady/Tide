<template>
  <div class="component_order_list">
    <group v-for="(order,index) in orders" :key="order.order_id" :class="{'no-margin-group':index===0}" @click.native="toOrderDetail(order.order_id,order.status)">
      <cell-box>
        <div class="order-info">
          <h3 class="order-info-tit">{{order.order_sn}}</h3>
          <span class="order-info-sta">{{order.status_name}}</span>
          <i class="order-info-type" v-show="showType">{{order.order_type=="CG"?'采':'销'}}</i>
        </div>
      </cell-box>
      <cell-form-preview :list="getPreviewData(order)"></cell-form-preview>
    </group>
  </div>
</template>
<script>
import { toFixed } from '@/utils'
export default {
  name: 'component_order_list',
  title: '订单列表',
  props: {
    orders: {
      type: Array,
      require: true
    },
    showType: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 跳转订单详情
    toOrderDetail(orderId, status) {
      this.$emit('order-click', { orderId, status })
    },
    // 构造cell-form-preview数据
    getPreviewData(order) {
      return [{
        label: '订单金额',
        value: toFixed(order.fee_order)
      }, {
        label: '商品数量',
        value: order.goods_count
      }, {
        label: '订单客户',
        value: order.target_name || order.shop_name
      }, {
        label: '下单时间',
        value: order.create_date
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/scss/_available.scss';
.order-info {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  &-tit {
    color: $theme;
    flex: 1;
  }
  &-type {
    position: absolute;
    right: -15px;
    top: -15px;
    background: rgba(4, 251, 8, 0.5);
    transform: rotate(-30deg);
    border-radius: 2px;
    color: $theme;
    font-size: 12px;
    padding: 10px 3px;
  }
}
</style>