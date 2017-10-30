<template>
  <div class="business-uc-index gc-container has-header">
    <x-header :left-options="{backText: ''}" class="gc-header">商户中心</x-header>
    <div class="gc-box tc bc-f" v-if="shopInfo">
      <div class="avatar" @click="toBusinessInfo">
        <div class="avatar-inner">
          <img v-lazy="shopInfo.logo">
        </div>
        <div class="user-name fc-6">{{shopInfo.name||'店铺名称'}}</div>
      </div>
    </div>
    <group>
      <cell title="更多资料" is-link :link="{name:'businessUcInfoEdit'}"></cell>
      <cell title="云打印设置" is-link :link="{name:'businessUcYprint'}"></cell>
      <cell title="员工管理" is-link :link="{name:'businessUcEmployeeList'}"></cell>
      <cell title="搬运管理" is-link :link="{name:'businessUcDeliverList'}"></cell>
      <cell title="意见反馈" is-link :link="{name:'businessUcSuggest'}"></cell>
    </group>
    <div class="plr15 ptb20">
      <x-button type="primary" @click.native="onlogout">退出</x-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'business-uc-index',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['shopInfo']),
  },
  methods: {
    // 用户详情
    toBusinessInfo() {
      // this.$router.push({
      //   name: 'businessUcModify'
      // })
    },
    // 登出
    onlogout() {
      this.$bus.$emit('$$userLogout', { from: 'businessUc' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/scss/available.scss';
.avatar {
  &-inner {
    display: inline-block;  
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    display: inline-block;
    width: 100%;
  }
}

.user-tool-box {
  background: #fff;
  .item {
    text-align: center;
    .text {
      font-size: 14px;
      display: block;
    }
  }
}
</style>