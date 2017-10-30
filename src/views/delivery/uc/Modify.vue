<template>
  <div class="delivery-uc-modify">
    <x-header :left-options="{backText: ''}">用户中心</x-header>
    <avatar></avatar>
  </div>
</template>

<script>
import Avatar from '@/components/uc/Avatar'
export default {
  name: 'delivery-uc-modify',
  title: '修改信息',
  data() {
    return {}
  },
  components: {
    Avatar
  }
}
</script>

<style lang="scss" scoped>

</style>