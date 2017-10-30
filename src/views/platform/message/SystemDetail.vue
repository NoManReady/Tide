<template>
  <div class="platform-message-system-detail">
    <system-msg-detail :id="$route.params.sysId"></system-msg-detail>
  </div>
</template>
<script>
import SystemMsgDetail from '@/components/message/system/MsgDetail'
export default {
  name: 'platform-message-system-detail',
  title: '系统公告详情',
  data() {
    return {
    }
  },
  components: {
    SystemMsgDetail
  },
  created() {

  }
}
</script>
<style lang="scss" scoped>

</style>