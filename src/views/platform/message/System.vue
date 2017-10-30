<template>
  <div class="platform-message-system">
    <system-msg-list></system-msg-list>
  </div>
</template>
<script>
import SystemMsgList from '@/components/message/system/MsgList'
export default {
  name: 'platform-message-system',
  title: '系统公告',
  data() {
    return {
    }
  },
  components: {
    SystemMsgList
  }
}
</script>
<style lang="scss" scoped>

</style>