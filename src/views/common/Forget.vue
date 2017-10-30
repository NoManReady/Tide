<template>
  <div class="forget gc-container">
    <x-header :left-options="{backText: ''}">重置密码</x-header>
    <div class="plr30 pt10">
      <div class="pd10">
        <div class="input-box mt30">
          <input class="input" type="text" v-model="user.mobile" :class="{'has-content':user.mobile}">
          <label>手机号</label>
          <span class="focus-border"></span>
        </div>
        <div class="input-box mt30">
          <input class="input" type="password" v-model="user.password" :class="{'has-content':user.password}">
          <label>新密码</label>
          <span class="focus-border"></span>
        </div>
        <div class="input-box mt30 vcode">
          <input class="input" type="text" v-model="user.vcode" :class="{'has-content':user.vcode}">
          <label>验证码</label>
          <span class="focus-border"></span>
          <!-- <button class="vcode-btn" @click="onVcode" :disabled="!user.mobile">获取验证码</button> -->
          <verity :disabled="!user.mobile" key-code="FORGET" :on-click="onVcode"></verity>
          <!-- <a href="javascript:;" class="vcode-btn">获取验证码</a> -->
        </div>
      </div>
      <group class="login-btn">
        <x-button type="primary" @click.native="onResetPwd" :disabled="!user.mobile||!user.password||!user.vcode">重置密码</x-button>
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
  name: 'forget',
  title: '忘记密码',
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
    onResetPwd() {
      let vm = this
      apis.userForget(this.user).then(d => {
        this.$vux.toast.show({
            text: '重置密码成功',
            type: 'success'
        })
        this.$router.push({
          path: '/login'
        })
      })
    },
    onVcode() {
      return apis.userSendVcode(this.user.mobile,'forget')
    }
  },
  created() { }
}
</script>

<style lang="scss" scoped>
@import '../../style/scss/_available';
// @import '../../style/scss/login';
.vcode {
  position: relative;
  &-btn {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #fff;
    font-size: 10px;
    border-radius: 15px;
    background: $theme;
    position: absolute;
    right: 0;
    bottom: 5px;
    z-index: 10;
    &[disabled] {
      background: #ccc;
    }
  }
}
</style>