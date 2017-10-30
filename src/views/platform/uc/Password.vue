<template>
  <div class="platform-uc-password gc-form">
    <x-header :left-options="{backText: ''}">修改密码
      <a href="javascript:;" slot="right" @click="onSubmit">确定</a>
    </x-header>
    <group>
      <x-input label-width="90px" v-model="gcForm.old_pwd" title="原密码" :type="inputType" v-verify="gcForm.old_pwd">
        <i class="iconfont icon-attention" :class="{'f-red':isHide}" slot="right" @click="isHide=!isHide"></i>
      </x-input>
    </group>
    <group>
      <x-input v-model="gcForm.new_pwd" label-width="90px" type="password" title="新密码" v-verify="gcForm.new_pwd"></x-input>
      <x-input v-model="gcForm.re_new_pwd" label-width="90px" type="password" title="确认密码" v-verify="gcForm.re_new_pwd"></x-input>
    </group>
  </div>
</template>

<script>
import { required } from '@/utils/validateGroup'
import validateMixins from '@/mixins/validateMixins'
export default {
  name: 'platform-uc-password',
  title: '修改密码',
  data() {
    return {
      isHide: true,
      gcForm: {
        old_pwd: '',
        new_pwd: '',
        re_new_pwd: ''
      }
    }
  },
  computed: {
    inputType() {
      return this.isHide ? 'password' : 'text'
    }
  },
  mixins: [validateMixins],
  verify: {
    gcForm: {
      old_pwd: [{
        test: required,
        message: '请输入原密码'
      }],
      new_pwd: [{
        test: required,
        message: '请输入新密码'
      }, {
        test(val) {
          return val.length >= 6
        },
        message: '密码长度最少六位'
      }, {
        test(val) {
          return val !== this.gcForm.old_pwd
        },
        message: '新密码不能与原密码一致'
      }],
      re_new_pwd: [{
        test(val) {
          if (this.gcForm.new_pwd !== val) {
            return false
          }
          return true
        },
        message: '两次密码输入不一致'
      }]
    }
  },
  methods: {
    //提交
    onSubmitConfirm() {
      let vm = this
      this.$vux.confirm.show({
        content: '确认修改吗？',
        title: '提示',
        onCancel() { },
        onConfirm() {
          vm.$api.userUpdatePassword(vm.gcForm).then(data => {
            vm.$vux.toast.show({
              text: '修改成功！',
              type: 'success'
            })
            vm.$router.replace({ name: 'platformUcModify' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>