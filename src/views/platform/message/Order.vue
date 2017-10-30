<template>
  <div class="platform-message-order">
    <order-msg-list :sid="sid"></order-msg-list>
  </div>
</template>
<script>
import OrderMsgList from '@/components/message/order/MsgList'
export default {
  name: 'platform-message-order',
  title: '订单通知',
  data() {
    return {
      sid: ''
    }
  },
  components: {
    OrderMsgList
  }
}
</script>
<style lang="scss" scoped>

</style>