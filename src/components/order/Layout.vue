<template>
  <div class="components-order-list">
    <gc-search :word.sync="query.keyword" v-model="showSearchBar" :search-fn="onSearch" history-key="order" placeholder="订单号／收货人"></gc-search>
    <x-header :left-options="{backText:'',showBack:isShowBack,preventGoBack:isPlatformOrderList}" @on-click-back="backUc" class="gc-header search-long">
      <div class="search-bar vm">
        <input class="search-bar-input" type="text" :placeholder="query.keyword||'订单号／收货人'" @click="showSearchBar=true">
        <i class="search-bar-icon iconfont icon-close" v-show="query.keyword" @click.stop="onClear"></i>
      </div>
      <i class="iconfont icon-filter fs20" slot="right" @click="visible=true"></i>
    </x-header>
    <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="scrollTop">
      <order-list :orders="scrollerParams.items" @order-click="onOrderClick" :show-type="showType"></order-list>
    </b-scroll>
    <!-- 订单过滤层 -->
    <div v-transfer-dom>
      <popup v-model="visible" width="85%" height="100%" position="right" class="filter-popup">
        <group class="no-margin-group">
          <cell-box>
            <h2 class="tc fs18 w100p">筛选</h2>
          </cell-box>
        </group>
        <group title="状态">
          <selector title="订单状态" :options="orderStatusFilterByType" v-model="query.status" direction="right" placeholder="请选择"></selector>
          <!-- <selector title="结算状态" :options="orderPayStatusFilter" v-model="query.paystatus" direction="right" placeholder="请选择"></selector> -->
        </group>
        <group title="订单时间">
          <datetime v-model="query.sdate" title="开始时间" :end-date="query.edate"></datetime>
          <datetime v-model="query.edate" title="结束时间" :start-date="query.sdate"></datetime>
        </group>
        <div class="filter-footer vux-flexbox">
          <a href="javascript:;" class="flex-one btn" @click="clearFilter">清空选项</a>
          <a href="javascript:;" class="flex-one btn btn-ok" @click="goSearch">确定</a>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import GcSearch from '@/common/search'
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
import OrderList from '@/components/order/List'
export default {
  name: 'components-order-list',
  title: '订单列表',
  data() {
    return {
      orderPopup: false,
      showSearchBar: false,
      scrollTop: 46,
      query: {
        keyword: '',
        status: '',
        paystatus: '',
        sdate: '',
        edate: '',
        refundstatus: '',
        client_id: '',
        factory_id: '',
        sid: ''
      },
      visible: false,
      isFocus: false,
      showType: true
    }
  },
  mixins: [bscrollMixins],
  components: {
    GcSearch,
    OrderList,
    BScroll
  },
  created() {
    this.query = Object.assign({}, this.query, this.$route.query)
    // 
    if (/^\d+$/.test(this.$route.meta.showTabbar)) {
      this.scrollTop = 99
    }
    if (!this.query.sid) {
      this.showType = false
    }
    this.getOrderFilter()
  },
  computed: {
    ...mapGetters(['orderStatusFilter', 'orderPayStatusFilter']),
    isShowBack() {
      let routeName = this.$route.name;
      return routeName == 'businessOrderList' ? false : true;
    },
    isPlatformOrderList() {
      let routeName = this.$route.name;
      return routeName == 'platformOrderList' ? true : false;
    },
    orderStatusFilterByType() {
      let _level = this.$route.query.by_deliver ? 3 : -1
      return this.orderStatusFilter.filter(status => status.key >= _level)
    }
  },
  methods: {
    ...mapActions(['getOrderFilter']),
    // 加载订单列表
    async _loadList() {
      let _result = await this.$api.orderGetList(this.assignQuery(this.query))
      return _result
    },
    //关键词搜索
    onKeywordChange() {
      this.onSearch()
    },
    // 清空过滤条件
    clearFilter() {
      this.query = Object.assign({}, this.query, { sdate: '', edate: '', status: '', paystatus: '' })
    },
    // 弹层搜索
    goSearch() {
      this.onSearch()
      this.visible = false
    },
    // 订单点击事件
    onOrderClick({ orderId, status }) {
      this.$router.push({ name: this.$route.meta.routeName, params: { orderId }, query: { status } })
    },
    backUc() {
      this.$router.push({
        name: 'platformUcenter'
      })
    }
  }
}
</script>
<style lang="scss">
.search-long .vux-header-title {
  margin: 0 64px!important;
}
</style>
<style lang="scss" scoped>
.content {
  position: relative;
  height: 100%;
  .tools {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>