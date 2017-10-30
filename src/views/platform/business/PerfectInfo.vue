<template>
  <div class="platform-business-perfect-info">
      <x-header>完善信息</x-header>
      <group>
      <cell title="身份认证"  @click.native="" is-link>
          <div slot="value">
              <span class="f-theme">
                  {{identityAuth}}
              </span>
          </div>
      </cell>
      <cell title="用户入驻" @click.native="" is-link>
          <div slot="value">
              <span class="f-theme">
                  {{userSettled}}
              </span>
          </div>
      </cell>
      <cell title="工商认证" inline-desc='推荐说明文字' is-link>
           <div slot="value">
              <span class="f-theme">
                  {{busInessCert}}
              </span>
          </div>
      </cell>
    </group>
  </div>
</template>
<script>
// usercenter 中判断然后存入vuex

    import apis from '@/api'
    import {
        XHeader,
        Group,
        Cell
    } from 'vux'
export default {
  name: 'platform-business-perfect-info',
  title: '完善信息',
  components:{
      XHeader,
    Group,
    Cell
      
  },
  data() {
    return {
        identityAuth:'未认证',
        userSettled:'未入驻',
        busInessCert:'未认证'
    }
  },
  methods:{
      identity(){

      }
  }
}
</script>
<style lang="scss" scoped>

</style>