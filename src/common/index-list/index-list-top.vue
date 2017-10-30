<template>
  <group class="local-city city-list index-list-item" :title="index">
    <slot></slot>
  </group>
</template>
<script>
  import {
    Group
  } from 'vux'
  export default {
    components: {
      Group
    },
    props: {
      index: {
        type: String,
        require: true
      }
    },
    mounted() {
      this.$parent.sections.push(this);
    },
    beforeDestroy() {
      let index = this.$parent.sections.indexOf(this);
      if (index > -1) {
        this.$parent.sections.splice(index, 1);
      }
    }
  }

</script>
<style lang="scss">


</style>
