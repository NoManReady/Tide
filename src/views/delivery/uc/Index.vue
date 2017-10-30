<template>
  <div class="delivery-uc-index gc-container has-header">
    <x-header :left-options="{backText: ''}" class="gc-header">用户中心</x-header>
    <div class="gc-box tc bc-f" v-if="userInfo">
      <div class="avatar" @click="toDeliveryInfo">
        <div class="avatar-inner">
          <img v-lazy="userInfo.avatar">
        </div>
        <div class="user-name fc-6">{{userInfo.nickname}}</div>
      </div>
    </div>
    <group>
      <cell title="意见反馈" is-link :link="{name:'deliveryUcSuggest'}"></cell>
    </group>
    <div class="plr15 ptb20">
      <x-button type="primary" @click.native="onlogout">退出</x-button>
    </div>
  </div>
</template>
<script>
import {mapGetters } from 'vuex'
export default {
  name: 'delivery-uc-index',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    // 用户详情
    toDeliveryInfo() {
      this.$router.push({
        name: 'deliveryUcModify'
      })
    },
    // 登出
    onlogout() {
      this.$bus.$emit('$$userLogout', { from: 'deliveryUc' })
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