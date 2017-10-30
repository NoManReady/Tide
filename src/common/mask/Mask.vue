<template>
  <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
    <div class="component_common_mask animated" v-show="visible">
      <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <div class="component_common_mask-main animated" v-if="visible" v-clickoutside="maskClose">
          <slot name="content">content</slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'component_common_mask',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    maskClose(e) {
      if ([...e.target.classList].includes('component_common_mask')) {
        this.close()
      }
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.component_common_mask {
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
  &.animated {
    animation-duration: .2s;
  }
  &-main {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 80%;
    background-color: #fff;
    &.animated {
      animation-duration: .3s;
    }
  }
}
</style>