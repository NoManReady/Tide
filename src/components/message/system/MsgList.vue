<template>
  <div class="component_system_msg">
    <x-header :left-options="{backText: ''}">系统公告</x-header>
    <gc-scroller :fresh="onFresh" :fetch="onFetch" ref="scroller">
      <group class="no-margin-group">
        <cell is-link :link="`systemMessageDetail/${item.notice_id}`" v-for="item in scrollerParams.items" :key="item.notice_id">
          <span slot="title">{{item.create_date}}</span>
          <p class="mt10" slot="inline-desc">{{item.title}}</p>
        </cell>
      </group>
    </gc-scroller>
  </div>
</template>
<script>
import GcScroller from '@/common/scroller'
import scrollerMixins from '@/mixins/scrollerMixins'
export default {
  name: 'component_system_msg',
  data() {
    return {
    }
  },
  mixins: [scrollerMixins],
  components: {
    GcScroller
  },
  methods: {
    async _loadList() {
      const _result = await this.$api.noticeGetSystemList(this.assignQuery())
      return _result
    }
  }
}
</script>
<style lang="scss" scoped>

</style>