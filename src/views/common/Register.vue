<template>
  <div class="register gc-container">
    <x-header :left-options="{backText: ''}">注册</x-header>
    <div class="plr30 pt10">
      <div class="pd10">
        <div class="input-box mt30">
          <input class="input" type="text" v-model="user.mobile" :class="{'has-content':user.mobile}">
          <label>手机号</label>
          <span class="focus-border"></span>
        </div>
        <div class="input-box mt30">
          <input class="input" type="password" v-model="user.password" :class="{'has-content':user.password}">
          <label>密码</label>
          <span class="focus-border"></span>
        </div>
        <div class="input-box mt30 vcode">
          <input class="input" type="text" v-model="user.vcode" :class="{'has-content':user.vcode}">
          <label>验证码</label>
          <span class="focus-border"></span>
          <verity :disabled="!user.mobile" key-code="REGISTER" :on-click="onVcode"></verity>
          <!-- <a href="javascript:;" class="vcode-btn" @click.native="onVcode">获取验证码</a> -->
        </div>
        <!-- <x-input title="手机号" type="text" v-model="user.mobile" is-type="china-mobile" required></x-input>
          <x-input title="密码" type="password" v-model="user.password" required></x-input>
          <x-input title="验证码" type="text" v-model="user.vcode" required></x-input> -->
      </div>
      <group class="login-btn">
        <x-button type="primary" @click.native="onRegister" :disabled="!user.mobile||!user.password||!user.vcode">注册</x-button>
        <!-- <x-button type="primary" @click.native="onVcode" :disabled="!user.mobile">获取验证码</x-button> -->
      </group>

    </div>
  </div>
</template>

<script>
import apis from '@/api'
import Verity from '@/common/verity'
import {
  Group,
  XInput,
  XButton,
  XHeader
} from 'vux'
import {
  mapActions
} from 'vuex'
export default {
  name: 'register',
  title: '登录',
  components: {
    Group,
    XInput,
    XButton,
    XHeader,
    Verity
  },
  data() {
    return {
      user: {
        mobile: '',
        password: '',
        vcode: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister() {
      this.register(this.user).then(d => {
        this.$vux.toast.show({
            text: '注册成功',
            type: 'success'
        })
        this.$router.push({
          path: '/layout'
        })
      })
    },
    onVcode() {
      return apis.userSendVcode(this.user.mobile)
    }
  },
  created() { }
}
</script>

<style lang="scss" scoped>

</style>