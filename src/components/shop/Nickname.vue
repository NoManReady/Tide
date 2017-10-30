<template>
  <div class="component_nickname">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="onClickBack">
      <span>修改昵称</span>
      <a href="javascript:;" slot="right" @click="onConfirm">确定</a>
    </x-header>
    <group>
      <x-input v-model="nickname" title="用户昵称"></x-input>
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
      nickname: ''
    }
  },
  created() {
    this.nickname = this.nick
  },
  methods: {
    onConfirm() {
      this.$api.userUpdate({ nickname: this.nickname })
        .then(d => {
          this.$vux.toast.show({
            text: '更新成功',
            type: 'success',
            time: 1000
          })
          this.$store.dispatch('updateUserInfo', { nickname: this.nickname })
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