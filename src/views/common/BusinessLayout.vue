<template>
  <common-layout class="business-layout" :tabs="tabs">
  </common-layout>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CommonLayout from '@/common/layout'
export default {
  name: 'businessLayout',
  title: '商户布局页面',
  data() {
    return {
      tabs: []
    }
  },
  components: {
    CommonLayout
  },
  async created() {
    if (!this.shopSid) {
      this.$router.push({ name: 'platform' })
    } else {
      let _shopInfo = await this.getShopInfo()
      this.tabs = Object.freeze([
        {
          id: 1,
          title: '首页',
          link: { name: 'businessHome' },
          icon: 'icon-home'
        },
        {
          id: 2,
          title: '订单',
          link: { name: 'businessOrderList', query: { sid: this.shopSid } },
          icon: 'icon-text'
        },
        {
          id: 3,
          title: '客户',
          link: { name: 'businessCustomer' },
          icon: 'icon-friend'
        },
        {
          id: 4,
          title: '上游',
          link: { name: 'businessFactory' },
          icon: 'icon-shop'
        },
        {
          id: 5,
          title: '商品',
          link: { name: 'businessGoods' },
          icon: 'icon-goods'
        }
      ])
    }
  },
  computed: {
    ...mapGetters(['shopSid'])
  },
  methods: {
    ...mapActions(['getShopInfo']),
  }
}

</script>
<style lang="scss" scoped>

</style>
