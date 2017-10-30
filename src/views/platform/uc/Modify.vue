<template>
  <div class="platform-uc-modify">
    <x-header :left-options="{backText: ''}">我的账户</x-header>
    <avatar></avatar>
    <group>
      <cell title="修改密码" is-link :link="{name:'platformUpPassword'}"></cell>
    </group>
  </div>
</template>

<script>
import Avatar from '@/components/uc/Avatar'
export default {
  name: 'platform-uc-modify',
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