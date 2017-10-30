<template>
  <div class="index-list" ref="indexlist" :style="{ 'height': currentHeight + 'px', 'padding-right': navWidth + 'px'}">
    <!--<div class="index-list">-->
    <slot class="index-list-top" name="indexListTop"></slot>
    <div class="index-list-content" ref="content">
      <slot name="indexListContent"></slot>
    </div>

    <div class="index-list-nav" @touchstart="handleTouchStart" ref="nav">
      <ul class="index-list-navlist">
        <li class="index-list-navitem" v-for="section in sections">{{ section.index }}</li>
      </ul>
    </div>

    <div class="index-list-indicator" v-if="showIndicator" v-show="moving">{{ currentIndicator }}</div>
  </div>
</template>
<script>
export default {
  name: 'index-list',
  props: {
    height: Number,
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sections: [],
      navWidth: 0,
      indicatorTime: null,
      moving: false,
      firstSection: null,
      currentIndicator: '',
      currentHeight: this.height,
      navOffsetX: 0
    }
  },
  watch: {
    sections() {
      this.init();
    }
  },
  mounted() {

  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.navWidth = this.$refs.nav.clientWidth;
      });
      let listItems = this.$refs.indexlist.getElementsByClassName('index-list-item');
      if (listItems.length > 0) {
        this.firstSection = listItems[0];
      }
    },

    handleTouchStart(e) {
      if (e.target.className !== 'index-list-navitem') {
        return;
      }
      this.navOffsetX = e.changedTouches[0].clientX;
      this.scrollList(e.changedTouches[0].clientY);
      if (this.indicatorTime) {
        clearTimeout(this.indicatorTime);
      }
      this.moving = true;
      window.addEventListener('touchmove', this.handleTouchMove);
      window.addEventListener('touchend', this.handleTouchEnd);
    },

    handleTouchMove(e) {
      e.preventDefault();
      this.scrollList(e.changedTouches[0].clientY);
    },

    handleTouchEnd() {
      this.indicatorTime = setTimeout(() => {
        this.moving = false;
        this.currentIndicator = '';
      }, 500);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
    },

    scrollList(y) {
      let currentItem = document.elementFromPoint(this.navOffsetX, y);
      if (!currentItem || !currentItem.classList.contains('index-list-navitem')) {
        return;
      }
      this.currentIndicator = currentItem.innerText;
      let targets = this.sections.filter(section => section.index === currentItem.innerText);
      let targetDOM;
      if (targets.length > 0) {
        targetDOM = targets[0].$el;
        this.$refs.indexlist.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top;
      }
    }
  },

  mounted() {
    if (!this.currentHeight) {
      this.currentHeight = document.documentElement.clientHeight - this.$refs.indexlist.getBoundingClientRect().top;
    }
    this.init();
  }
}

</script>
<style lang="scss">
@import "../../style/scss/_mixin.scss";
.index-list {
  width: 100%;
  position: relative;
  overflow: auto;
  .index-list-content {
    margin: 0;
    padding: 0;
  }
  .index-list-nav {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    background-color: #fff;
    border-left: solid 1px #ddd;
    text-align: center;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .index-list-navlist {
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  }
  .index-list-navitem {
    padding: 2px 6px;
    font-size: 12px;
    user-select: none;
    -webkit-touch-callout: none;
  }
  .index-list-indicator {
    position: fixed;
    width: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 50px;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 5px;
    color: #fff;
    font-size: 22px;
  }
}
</style>
