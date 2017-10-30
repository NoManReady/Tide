<template>
  <div class="component_order_msg">
    <x-header :left-options="{backText: ''}">订单消息</x-header>
    <gc-scroller :fresh="onFresh" :fetch="onFetch" ref="scroller">
      <group class="no-margin-group">
        <cell-box v-for="item in scrollerParams.items" :key="item.order_id">
          <div class="order-info">
            <div class="order-info-header">
              <span class="order-info-tit">{{item.title}}</span>
              <span class="order-info-time">{{item.create_date}}</span>
            </div>
            <div class="order-info-content" v-html="item.content"></div>
          </div>
        </cell-box>
      </group>
    </gc-scroller>
  </div>
</template>
<script>
import GcScroller from '@/common/scroller'
import scrollerMixins from '@/mixins/scrollerMixins'
export default {
  name: 'component_order_msg',
  data() {
    return {
    }
  },
  props: {
    sid: {
      type: String
    }
  },
  mixins: [scrollerMixins],
  components: {
    GcScroller
  },
  methods: {
    async _loadList() {
      const _result = await this.$api.noticeGetOrderList(this.assignQuery({ sid: this.sid }))
      return _result
    }
  }
}
</script>
<style lang="scss" scoped>
.order-info {
  color: #666;
  font-size: 14px;
  width: 100%;
  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &-tit {
    order: 0;
    flex: 1;
  }
  &-time {
    order: 1;
    text-align: right;
    color: lighten(#666, 15%);
    font-size: 13px;
  }
  &-content {
    font-size: 13px;
    margin-top: 8px;
  }
}
</style>