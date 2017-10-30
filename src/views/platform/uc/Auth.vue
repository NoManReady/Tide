<template>
  <div class="platform-uc-auth">
    <x-header :left-options="{backText: ''}">我的认证</x-header>
    <group class="no-margin-group auth-cell">
      <cell is-link :value="authName" @click.native="onAuthName">
        <span slot="title">实名认证</span>
      </cell>
      <cell is-link :value="businessName" @click.native="onAuthBusiness">
        <span slot="title">工商认证</span>
      </cell>
    </group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'paltform-uc-auth',
  data() {
    return {
    }
  },
  props: {
    sid: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    authName() {
      let _idv = this.userInfo.idv_status
      return _idv === 0 ? '未认证' : _idv === 1 ? '已认证' : '审核中'
    },
    businessName() {
      let _blv = this.userInfo.blv_status
      return _blv === 0 ? '未认证' : _blv === 1 ? '已认证' : '审核中'
    }
  },
  methods: {
    // 用户认证
    onAuthName() {
      this.$router.push({ name: 'platformUcAuthName' })
    },
    // 工商认证
    onAuthBusiness() {
      this.$router.push({ name: 'platformUcAuthBusiness' })
    }
  }
}
</script>
<style lang="scss" scoped>
.auth-cell {
  .weui-cell {
    padding: 20px 15px;
  }
}
</style>