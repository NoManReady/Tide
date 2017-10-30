<template>
  <div class="platform-order-status">
    <x-header :left-options="{backText: '',preventGoBack:true}" class="gc-header" @click.native="goBack">订单状态</x-header>
    <group>
      <cell title="订单号" :value="orderInfo.order_sn"></cell>
      <cell title="下单时间" :value="orderInfo.create_date"></cell>
    </group>
    <group>
      <div class="gc-cell">
        <ul class="query-detail">
          <li class="item" v-for="(log,index) in logs" :key="log.create_date" :class="{active:index===0}">
            <div class="dt">
              <span>{{log.operation}}</span>
            </div>
            <div class="dd">{{log.create_date}}</div>
          </li>
        </ul>
      </div>
    </group>
  </div>
</template>
<script>
export default {
  name: 'platform-order-status',
  title: '订单状态',
  props: {
    orderId: {
      type: [String, Number],
      require: true
    },
    orderInfo: {
      type: Object
    },
    sid: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      logs: []
    }
  },
  activated() {
    this._loadList()
  },
  methods: {
    // 加载记录列表
    async _loadList() {
      let _result = await this.$api.orderLogs({ order_id: this.orderId, sid: this.sid, by_deliver: this.sid === 0 ? 1 : '' })
      this.logs = Object.freeze(_result.logs.reverse())
    },
    // 返回
    goBack() {
      if (this.$parent && this.$parent.$listeners.input) {
        this.$parent.$emit('input', false)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/scss/_available';
.query-detail {
  border-left: 1px solid #666;
  .item {
    margin-bottom: 20px;
    color: #333;
    &.active {
      .dt {
        margin-left: -0.16*50px;
        padding-left: .6*50px;
        &:before {
          background: $theme;
          background-size: .2*50px;
          width: .32*50px;
          height: .32*50px;
        }
      }
    }
    .dt {
      padding-left: .5*50px;
      margin-left: -0.09*90px;
      position: relative;
      &:before {
        content: '';
        height: .16*100px;
        width: .16*100px;
        background: #ccc;
        border-radius: 50%;
        display: inline-block;
        vertical-align: top;
        margin-top: .11*50px;
        margin-right: .1*50px;
        position: absolute; // top:.16*50px;
        left: 0;
      }
    }
    .dd {
      padding-left: .4*50px;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>