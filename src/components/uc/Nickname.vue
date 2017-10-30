<template>
  <div class="component_nickname">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="onClickBack">
      <span>修改名称</span>
      <a href="javascript:;" slot="right" @click="onConfirm">确定</a>
    </x-header>
    <group>
      <x-input v-model="name" title="商铺名称"></x-input>
    </group>
  </div>
</template>

<script>
export default {
  name: 'component_nickname',
  title: '修改昵称',
  props: {
    nick: {
      type: String,
      default: 'nick'
    }
  },
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = this.nick
  },
  methods: {
    onConfirm() {
      this.$api.shopUpdate({ name: this.name })
        .then(d => {
          this.$vux.toast.show({
            text: '更新成功',
            type: 'success',
            time: 1000
          })
          this.$store.dispatch('updateShopInfo', { name: this.name })
          this.onClickBack()
        })
    },
    onClickBack() {
      this.$parent.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>