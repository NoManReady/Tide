<template>
  <div class="platform-uc-index gc-container has-header">
    <x-header :left-options="{showBack: false}" class="gc-header">用户中心</x-header>
    <div class="gc-box tc" v-if="userInfo">
      <div class="avatar" @click="toUserInfo">
        <div class="avatar-inner">
          <img v-lazy="userInfo.avatar">
        </div>
        <div class="user-name fc-6">{{userInfo.nickname}}</div>
      </div>
      <div class="user-money f-red" @click="toAccout">¥{{userInfo.money}}</div>
    </div>
    <group>
      <cell title="我的订单" value="查看全部" is-link @click.native="toMyOrder({})"></cell>
      <grid class="tc fs14" :rows="4">
        <grid-item @click.native="toMyOrder({paystatus:0})">
          <i class="iconfont icon-pay fs24"></i>
          <p>待付款</p>
        </grid-item>
        <grid-item @click.native="toMyOrder({status:4})">
          <i class="iconfont icon-deliver fs24"></i>
          <p>待收货</p>
        </grid-item>
        <grid-item @click.native="toMyOrder({status:6})">
          <i class="iconfont icon-squarecheck fs24"></i>
          <p>已完成</p>
        </grid-item>
        <grid-item @click.native="toMyOrder({refundstatus:1})">
          <i class="iconfont icon-forward fs24"></i>
          <p>退换货</p>
        </grid-item>
      </grid>
    </group>
    <group>
      <grid class="user-tool-box" :rows="4">
        <grid-item class="item" @click.native="toManage">
          <i class="iconfont fs24" :class="{'icon-shop':isSettle,'icon-roundadd':!isSettle}"></i>
          <span class="text">{{tabName}}</span>
        </grid-item>
        <grid-item class="item" @click.native="toFollow">
          <i class="iconfont icon-attention fs24"></i>
          <span class="text">关注</span>
        </grid-item>
        <grid-item class="item" @click.native="toParter">
          <i class="iconfont icon-people fs24"></i>
          <span class="text">商友</span>
        </grid-item>
        <grid-item class="item" @click.native="toCollection">
          <i class="iconfont icon-favor fs24"></i>
          <span class="text">收藏</span>
        </grid-item>
        <grid-item class="item" @click.native="toAccout">
          <i class="iconfont icon-text fs24"></i>
          <span class="text">账目</span>
        </grid-item>
        <grid-item class="item" @click.native="toUcAddress">
          <i class="iconfont icon-location fs24"></i>
          <span class="text">收货地址</span>
        </grid-item>
        <grid-item class="item" @click.native="toAuth">
          <i class="iconfont icon-tag fs24"></i>
          <span class="text">认证</span>
        </grid-item>
        <grid-item class="item" @click.native="toQa">
          <i class="iconfont icon-community fs24"></i>
          <span class="text">意见反馈</span>
        </grid-item>
      </grid>
    </group>
    <div class="plr15 ptb20">
      <x-button type="primary" @click.native="onlogout">退出</x-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'platform-uc-index',
  title: '用户首页',
  data() {
    return {
      showCheckShops: false,
      sid: ''
    }
  },
  created() {
    this.sid = this.userSid
  },
  computed: {
    ...mapGetters(['userInfo', 'isSettle', 'userSid', 'userSignSops']),
    tabName() {
      return this.isSettle ? '商铺' : '入驻'
    }
  },
  methods: {
    // 退出
    onlogout() {
      this.$bus.$emit('$$userLogout', { from: 'platformUc' })
    },
    // 跳转店铺或入驻
    toManage() {
      this.$bus.$emit('$$goManageSysCheck', { from: 'platformUcenter' })
    },
    // 用户中心
    toUserInfo() {
      this.$router.push({
        name: 'platformUcModify'
      })
    },
    // 我的订单
    toMyOrder(filter = {}) {
      this.$router.push({ name: 'platformOrderList', query: filter })
    },
    // 地址
    toUcAddress() {
      this.$router.push({
        name: 'platformUcAddressList'
      })
    },
    // 认证
    toAuth() {
      this.$router.push({
        name: 'platformUcAuth'
      })
    },
    // 关注
    toFollow() {
      this.$router.push({
        name: 'platformUcFollow'
      })
    },
    // 商友
    toParter() {
      this.$router.push({
        name: 'platformUcParter'
      })
    },
    //收藏
    toCollection() {
      this.$router.push({
        name: 'platformUcCollection'
      })
    },
    // 账户列表
    toAccout() {
      this.$router.push({
        name: 'platformUcAccountList'
      })
    },
    //建议反馈
    toQa() {
      this.$router.push({
        name: 'platformUcQA'
      })
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