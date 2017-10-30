<template>
  <li class="weui-uploader__file" :style="style">
    <a href="javacript:;" class="upload-item-close" @click.stop="onRemove" v-if="!$parent.readonly">
      <i class="iconfont icon-roundclosefill"></i>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      }
    }
  },
  methods: {
    onRemove() {
      this.$emit('on-remove', this.index)
    }
  }
}
</script>
<style scope lang="scss">
.weui-uploader__file {
  position: relative;
  margin-right: 10px !important;
  margin-bottom: 10px !important;
  border: 1px solid #d9d9d9;
  .upload-item-close {
    font-size: 30px;
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    right: -10px;
    top: -12px;
    color: rgba(0, 0, 0, .4);
    position: absolute;
  }
}
</style>
