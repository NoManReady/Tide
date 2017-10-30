<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="list" class="list-content">
        <slot v-show="hasItem"></slot>
        <empty v-show="!hasItem" :empty-text="emptyText"></empty>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad&&enablePullUp">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else-if="isPullUpLoad">
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :pulling="pulling" :bubbleY="bubbleY">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="pulling" class="loading">
            <loading></loading>
          </div>
          <div v-else>
            <!-- <span>{{refreshTxt}}</span> -->
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Loading from '@/common/loading/loading.vue'
import Bubble from '@/common/bubble/bubble.vue'
import Empty from '@/common/empty'
import { getRect } from '@/utils/dom'

const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
const DEFAULT_LOAD_TXT_MORE = '加载更多'
const DEFAULT_LOAD_TXT_NO_MORE = '没有更多数据了'
const DEFAULT_REFRESH_TXT = '刷新成功'

export default {
  name: COMPONENT_NAME,
  props: {
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: () => {
        return { threshold: 30 }
      }
    },
    pullUpLoad: {
      type: null,
      default: true
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    scrollTop: {
      type: Number,
      default: 46
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      pulling: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0,
      enablePullUp: true
    }
  },
  computed: {
    pullUpTxt() {
      const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || DEFAULT_LOAD_TXT_MORE

      const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || DEFAULT_LOAD_TXT_NO_MORE

      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt() {
      return this.pullDownRefresh && this.pullDownRefresh.txt || DEFAULT_REFRESH_TXT
    },
    hasItem() {
      return this.$parent.scrollerParams && this.$parent.scrollerParams.items && this.$parent.scrollerParams.items.length ?
        true : false
    }
  },
  created() {
    this.pullDownInitTop = -50
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.$refs.wrapper.style.height = (window.document.documentElement.offsetHeight - this.scrollTop) + 'px'
      if (this.$refs.list && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.list.style.minHeight = getRect(this.$refs.wrapper).height + 'px'
      }

      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disabledUpLoad() {
      this.enablePullUp = false
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem(e, item) {
      this.$emit('click', item)
    },
    destroy() {
      this.scroll.destroy()
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.pulling = false
        this.$vux.toast.show({
          text: '刷新成功',
          type: 'success',
        })
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.pulling = true
        this.$emit('pullingDown')
      })

      this.scroll.on('scroll', (pos) => {
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        if (!this.enablePullUp) {
          return
        }
        this.isPullUpLoad = true
        this.$emit('pullingUp')
      })
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          this.isPullingDown = false
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true)
      }, this.refreshDelay)
    }
  },
  components: {
    Loading,
    Bubble,
    Empty
  }
}

</script>

<style lang="scss">
.list-wrapper {
  position: relative;
  overflow: hidden;
  background: #fff;
  width: 100%;
  .list-content {
    position: relative;
    z-index: 10;
    background: #fff;
    .list-item {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}

.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  .after-trigger {
    margin-top: 10px;
  }
}

.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}
</style>
