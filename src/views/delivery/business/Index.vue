<template>
  <div class="delivery-business-index gc-container has-header has-footer">
    <x-header :left-options="{showBack:false}" class="gc-header">
      商户列表
    </x-header>
    <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch">
      <group v-for="(item,index) in scrollerParams.items" :class="{'no-margin-group':index===0}" :key="item.shop_id" @click.native.stop="toDetail(item.shop_id)">
        <cell :title="item.name||'商户'" :value="item.mobile"></cell>
        <cell-box>
          <div class="box-flex w100p">
            <img class="logo" v-lazy="item.logo" alt="logo">
            <div class="flex-one">
              <p class="desc" :class="{'ellipise-mutil':item.addr.length>50}">{{item.addr}}</p>
              <el-button type="primary" size="small" class="fr" @click.native="toOrderList(item.shop_id)">订单</el-button>
            </div>
          </div>
        </cell-box>
      </group>
    </b-scroll>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ElButton from '@/components/common/button'
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
export default {
  name: 'delivery-business-index',
  data() {
    return {
    }
  },
  mixins: [bscrollMixins],
  components: {
    ElButton,
    BScroll
  },
  computed: {
    ...mapGetters(['userSid'])
  },
  methods: {
    // 加载订单列表
    async _loadList() {
      let _result = await this.$api.manageGetShipperList(this.assignQuery({ sid: this.userSid }))
      return _result
    },
    // 跳转详情
    toDetail(sid) {

    },
    // 跳转商户订单列表
    toOrderList(sid) {
      this.$router.push({ name: 'deliveryOrderListByBusiness', query: { sid, by_deliver: 1 } })
    }
  }
}

</script>
<style lang="scss" scoped>
.logo {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}

.desc {
  color: #999;
  overflow: hidden;
  line-height: 1.4em;
  height: 2.8em;
}

.ellipise-mutil {
  position: relative;
}

.ellipise-mutil::after {
  content: "...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: -16px;
  padding: 0 20px 1px 45px;
  background: url('../../../assets/ellipsis_bg.png') repeat-y;
}
</style>
