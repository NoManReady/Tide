<template>
  <div class="platform-message-index">
    <messages sid="" :count="count"></messages>
  </div>
</template>
<script>
import Messages from '@/components/message/Messages'
export default {
  name: 'platform-message-index',
  title: '消息',
  data() {
    return {
    }
  },
  components: {
    Messages
  },
  computed: {
    count() {
      return this.$store.getters.unreadCount
    }
  }
}
</script>
<style lang="scss" scoped>

</style>