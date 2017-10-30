<template>
  <div class="layout">
    <div class="login gc-container has-footer">
      <div class="login-bg"></div>
      <div class="gc-login">
        <div class="logo">
          <img src="../../assets/logo.png">
        </div>
        <div class="inner">
          <div class="tc mt10">
            <span class="logo-text"></span>
          </div>
          <div class="input-box mt20">
            <input class="input" type="text" v-model="user.mobile" :class="{'has-content':user.mobile}">
            <label>账号</label>
            <span class="focus-border"></span>
          </div>
          <div class="input-box mt40">
            <input class="input" type="password" v-model="user.password" :class="{'has-content':user.password}">
            <label>密码</label>
            <span class="focus-border"></span>
          </div>
        </div>
        <group class="login-btn">
          <x-button type="primary" @click.native="onLogin" :disabled="!user.mobile||!user.password">登录</x-button>
        </group>
      </div>
      <!-- <group>
                      <x-input title="账号" type="text" v-model="user.mobile" is-type="china-mobile" required></x-input>
                      <x-input title="密码" type="password" v-model="user.password" required></x-input>
                    </group> -->
      <!-- <group>
                      <x-button type="primary" @click.native="onLogin" :disabled="!user.mobile||!user.password">登录</x-button>
                    </group> -->
      <!-- <group>
                      <router-link to="/register">还没有账号，去注册</router-link>
                    </group> -->

      <div class="gc-footer">
        <div class="login-foot tc box-flex">
          <router-link to="/forget" class="flex-one">忘记密码？</router-link>
          <router-link to="/register" class="flex-one">快速注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton } from 'vux'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  title: '登录',
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      user: {
        mobile: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login', 'loading']),
    onLogin() {
      this.loading(true)
      this.login(this.user).then(d => {
        this.$vux.toast.show({
            text: '登录成功',
            type: 'success'
        })
        this.$router.push({ path: '/layout' })
      })
    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/scss/_available';
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top:30%;
  .login-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height:30%;
    z-index: 0;
    background: url('../../assets/gc-login-bg.png') no-repeat left top $theme;
    background-size: 100%;
  }
}

.gc-login {
  margin: 0 20px 0;
  flex: 1;
  position: relative;
  z-index: 2;
  .logo {
    text-align: center;
    position: absolute;
    width:100%;
    top:-70px;
    img {
      display: inline-block;
      height: 160px;
    }
  }
  .inner {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    background: #fff;
    padding-top:70px;
    width:100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .logo-text{
      display: inline-block;
      width:75px;
      height:45px;
      background: url('../../assets/gc-logo-text.png') no-repeat center;
      background-size: contain;
    }
  }
   :focus {
    outline: none;
  }
  
}
.login-foot {
  padding: 10px 0;
  border-top: 1px solid #dedede;
  background: #8b8b8b;
  a {
    height: 32px;
    line-height: 32px;
    color: #fff;
    &+a {
      border-left: 1px solid #dedede
    }
  }
}
</style>
<style lang="scss">
@import '../../style/scss/_available';
@import '../../style/scss/login';
</style>