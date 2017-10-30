<template>
  <div class="business-uc-modify">
    <x-header :left-options="{backText: ''}">我的账户</x-header>
    <avatar></avatar>
    <group>
      <cell title="更多资料" is-link :link="{name:'businessUcInfoEdit'}"></cell>
    </group>
  </div>
</template>

<script>
import Avatar from '@/components/shop/Avatar'
export default {
  name: 'business-uc-modify',
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