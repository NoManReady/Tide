<template>
  <div class="component_message">
    <x-header :left-options="{showBack: false}">消息</x-header>
    <group class="no-margin-group">
      <cell is-link link="orderMessage">
        <i class="iconfont icon-notificationfill" slot="icon"></i>
        <span slot="title">订单通知</span>
        <p class="cell-desc" slot="inline-desc">订单消息</p>
        <badge :text="count" v-show="count"></badge>
      </cell>
    </group>
    <group>
      <cell is-link link="systemMessage">
        <i class="iconfont icon-notice" slot="icon"></i>
        <span slot="title">系统公告</span>
        <p class="cell-desc" slot="inline-desc">系统平台的通知，例如：升级</p>
      </cell>
    </group>
  
  </div>
</template>
<script>
export default {
  name: 'component_message',
  data() {
    return {
    }
  },
  props: {
    sid: {
      type: String
    },
    count: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 26px;
  margin-right: 8px;
}

.cell-desc {
  margin-top: 5px;
}

.icon-notificationfill {
  color: #4bc37e;
}

.icon-notice {
  color: #f9ae25;
}
</style>