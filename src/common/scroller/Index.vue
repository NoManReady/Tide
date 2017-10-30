<template>
  <scroller ref="scroller" v-model="scrollerModel" :bounce="bounce" :height="scrollerTop" :use-pulldown="usePullDown" :use-pullup="usePullUp" :pulldown-config="pdConfig" :pullup-config="puConfig" :lock-x="true" :scroll-bottom-offst="0" @on-scroll-bottom="onScrollBottom" @on-pullup-loading="onPullupLoading" @on-pulldown-loading="onPullDownLoading" @on-scroll="onScroll" :scrollbar-y="scrollbarY">
    <div v-show="hasItem">
      <slot></slot>
      <divider v-show="onComplete">我是有底线的</divider>
    </div>
    <empty v-show="!hasItem" empty-text="暂无数据"></empty>
  </scroller>
</template>
<script>
import Empty from '@/common/empty'
export default {
  name: 'component_scroller',
  props: {
    fetch: {
      type: Function
    },
    fresh: {
      type: Function
    },
    scrollerTop: {
      type: String,
      default: '-100'
    }
  },
  data() {
    return {
      usePullUp: true,
      usePullDown: true,
      scrollbarY: false,
      bounce: true,
      scrollerModel: {
        pulldownStatus: 'default',
        pullupStatus: 'default'
      },
      pdConfig: {
        content: '下拉刷新',
        height: 40,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '松开刷新',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
      puConfig: {
        content: '上拉加载',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '松开刷新',
        upContent: '上拉加载',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      onFetching: false,
      onFreshing: false,
      onComplete: false
    }
  },
  components: {
    Empty
  },
  computed: {
    hasItem() {
      return this.$parent.scrollerParams && this.$parent.scrollerParams.items && this.$parent.scrollerParams.items.length ?
        true : false
    },
    itemsLen() {
      return this.$parent.scrollerParams.items.length
    }
  },
  watch: {
    itemsLen(v) {
      if (v >= this.$parent.scrollerParams.total) {
        this.$refs.scroller.disablePullup()
      } else {
        this.$refs.scroller.enablePullup()
      }
    }
  },
  created() {
    if (this.$parent.scrollerParams.items.length > this.$parent.scrollerParams.total) {
      this.$refs.scroller.disablePullup()
    }
  },
  methods: {
    // 上拉fetch数据
    onPullupLoading() {
      if (!this.onFetching) {
        this.onFetching = true
        if (this.fetch && typeof (this.fetch) === 'function') {
          this.fetch().then(d => {
            this.$refs.scroller.donePullup()
            this.onFetching = false
          })
        }
      }
    },
    // 下拉fresh数据
    onPullDownLoading() {
      if (!this.onFreshing) {
        this.onFreshing = true
        if (this.fresh && typeof (this.fresh) === 'function') {
          this.fresh().then(d => {
            this.onFreshing = false
            this.$refs.scroller.donePulldown()
          })
        }
      }
    },
    // 用于加载数据
    onScrollBottom() {
      return
      if (!this.onFetching && !this.onComplete) {
        this.onFetching = true
        if (this.fetch && typeof (this.fetch) === 'function') {
          this.fetch().then(d => {
            this.onFetching = false
            if (!d) {
              this.onComplete = true
            }
          })
        }
      }
    },
    // 滚动监测
    onScroll(opt) {

    },
    togglePullDown() {
      this.usePullDown = !this.usePullDown
    },
    togglePullUp() {
      this.usePullUp = !this.usePullUp
    }
  }
}

</script>
<style lang="scss" scoped>
.top-bar {
  position: absolute;
  right: 10px;
  bottom: 30px;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border-color: #ddd;
}
</style>
