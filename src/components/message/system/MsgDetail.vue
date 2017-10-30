<template>
  <div class="component_system_msg_detail">
    <x-header :left-options="{backText: ''}">详情</x-header>
    <group class="no-margin-group" v-if="info">
      <cell-box>
        <div class="sys-info">
          <h3 class="sys-info-tit">{{info.title}}</h3>
          <small class="sys-info-time">{{info.create_date}}</small>
          <div class="sys-info-content" v-html="info.content"></div>
        </div>
      </cell-box>
    </group>
  </div>
</template>
<script>
import apis from '@/api'
export default {
  name: 'component_system_msg_detail',
  data() {
    return {
      info: null
    }
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  created() {
    this.loadInfo()
  },
  methods: {
    async loadInfo() {
      const _result = await apis.noticeGetSystemContent(this.id)
      this.info = _result
    }
  }
}
</script>
<style lang="scss" scoped>
.sys-info {
  color: #666;
  &-tit {
    font-size: 16px;
    font-weight: normal;
  }
  &-time {
    color: lighten(#666, 15%);
    font-size: 14px;
    margin-top: 8px;
  }
  &-content {
    line-height: 1.5;
    margin-top: 15px;
  }
}
</style>