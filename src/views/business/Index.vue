<template>
  <div class="business-home" v-cloak>
    <div class="search-sort-bar vux-flexbox">
        <selector :options="['订单', '客户','上游','商品']" v-model="selectTabs"></selector>
            <div class="search flex-one ml10" @click="showSearchBar=true">
               
                <div class="search-input ellipsis">
                    <i class="iconfont icon-search"></i>
                    <span class="fc-9">
                        {{searchPlaceholder}}
                    </span>
                </div>
            </div>
            <div class="filter pl10 pr5" @click="toQrScan">
                <i class="iconfont icon-scan"></i>
            </div>
        </div>
        <gc-search history-key="goodsList" :word.sync="keyword" v-model="showSearchBar" :search-fn="onSearch" :placeholder="searchPlaceholder"></gc-search>
    <grid class="tc bc-f business-gird" :rows="4">
      <grid-item @click.native="goCustomerOrder">
        <i class="iconfont icon-edit fs20"></i>
        <p>散客开单</p>
      </grid-item>
      <grid-item @click.native="goAddGood">
        <i class="iconfont icon-cascades fs20"></i>
        <p>商品录入</p>
      </grid-item>
      <grid-item @click.native="goUc">
        <i class="iconfont icon-people fs20"></i>
        <p>商户中心</p>
      </grid-item>
      <grid-item @click.native="goPlatform">
        <i class="iconfont icon-home fs20"></i>
        <p>返回平台</p>
      </grid-item>
    </grid>
    <group class="gc-cells">
      <div class="gc-cell">
        <div class="box-flex align-item">
          <i class="iconfont f-theme icon-shopfill fs40 mr10"></i>
          <ul class="flex-one cf">
            <li class="fl w50p">商品总数：{{shopHomeData.goods_count}}种</li>
            <li class="fl w50p">库存总数：{{shopHomeData.stock_count}}件</li>
            <li class="fl w50p">总采购数：{{shopHomeData.cg_count}}件</li>
            <li class="fl w50p">总销售：{{shopHomeData.sc_count}}件</li>
          </ul>
        </div>
      </div>
    </group>
    <group class="gc-cells">
      <div class="gc-cell">
        <div class="box-flex align-item">
          <div class="flex-one box-flex align-item">
            <i class="iconfont f-theme icon-people fs32 mr10"></i>
            <div class="flex-one">
              <div>老客户：{{shopHomeData.client_count}}家</div>
              <div>平台客户：{{shopHomeData.user_count}}家</div>
            </div>
          </div>
          <div class="flex-one box-flex align-item">
            <i class="iconfont f-theme icon-peoplefill fs32 mr10"></i>
            <div class="flex-one">
              <div>线上上游：{{shopHomeData.online_fcount}}家</div>
              <div>线下上游：{{shopHomeData.offline_fcount}}家</div>
            </div>
          </div>
        </div>
      </div>
    </group>
    <group class="gc-cells">
      <div class="gc-cell">
        <div class="box-flex align-item">
          <i class="iconfont f-theme icon-sponsorfill fs40 mr10"></i>
          <div class="flex-one">
            <div>今日销售</div>
            <div>{{shopHomeData.day_sc}}单（已结算{{shopHomeData.day_sc_pay}}，未结算{{shopHomeData.day_sc - shopHomeData.day_sc_pay}}）</div>
          </div>
          <span>{{shopHomeData.day_sc_rate}}%</span>
        </div>
      </div>
    </group>
    <group class="gc-cells">
      <div class="box-flex gc-cell">
        <div class="flex-one tc">
          本周销售<br/> {{shopHomeData.week_sc}}单
        </div>
        <div class="flex-one tc">
          本月销售<br/>{{shopHomeData.month_sc}}单
        </div>
      </div>
    </group>
    <group class="gc-cells">
      <div class="sort-tab">
        <tab :line-width="1" custom-bar-width="60px">
          <tab-item :selected="days==0" @click.native="tabClick(0)">当天</tab-item>
          <tab-item :selected="days==1" @click.native="tabClick(1)">昨天</tab-item>
          <tab-item :selected="days==7" @click.native="tabClick(7)">本周</tab-item>
          <tab-item :selected="days==30" @click.native="tabClick(30)">本月</tab-item>
        </tab>
      </div>
      <div class="record-box">
        <div class="record-box-item">
          <p>
            销售结算单：{{shopHomeStatData.sc_count}}
          </p>
          <p>
            销售总金额：{{shopHomeStatData.sc_sum}}元
          </p>
          <p>
            现金结算金额：{{shopHomeStatData.sc_sum_pay}}元
          </p>
          <p>
            欠款结算金额：{{shopHomeStatData.sc_sum_account}}元
          </p>
        </div>
        <div class="record-box-item">
          <p>
            采购单：{{shopHomeStatData.cg_count}}
          </p>
          <p>
            采购总金额：{{shopHomeStatData.cg_sum}}元
          </p>
          <!-- <p>
                    退货单：{{shopHomeStatData.sc_sum_pay}}
                  </p>
                  <p>
                    退货总金额：{{shopHomeStatData.sc_sum_account}}元
                  </p> -->
          <p>
            友商还款：{{shopHomeStatData.repay_sum }}元
          </p>
        </div>
      </div>
    </group>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import GcSearch from '@/common/search'
import { scanQr } from '@/utils'
export default {
  name: 'business-home',
  title: '商铺首页',
   components: {
     GcSearch
   },
  data() {
    return {
      shopHomeData: {},
      shopHomeStatData: {},
      days: 0,
      showSearchBar:false,
      keyword:'',
      selectTabs:'订单'
    }
  },
  computed: {
    ...mapGetters(['userSid']),
    searchPlaceholder(){
      let text = ''
      switch (this.selectTabs){
        case '订单':
        text = '订单号/收货人';
        break;
        case '客户':
        text = '客户名称';
        break;
        case '上游':
        text = '上游名称';
        break;
        case '商品':
        text = '商品名称/品牌/货号';
        break;
      }
      return text;
    }
  },
  created() {
    this.getShopHomeData();
    this.getShopStatData(this.days)
  },
  methods: {
    goCustomerOrder() {
      this.$router.push({ name: 'businessCustomer' })
    },
    goPlatform() {
      this.$router.push({ name: 'platform' })
    },
    goUc() {
      this.$router.push({ name: 'businessUc' })
    },
    goAddGood() {
      this.$router.push({ name: 'businessAddGoods',query:{prev:'home'} })
    },
    goSwitch() {
      this.$bus.$emit('$$goManageSysCheck', { from: 'business', iSswitch: true })
    },
    goGeolocation() {
      this.$geolocation()
    },
    async getShopHomeData() {
      let _result = await this.$api.shopHome(this.userSid)
      if (_result) {
        this.shopHomeData = _result;
      }
    },
    async getShopStatData(days) {
      let param = {
        sid: this.userSid,
        days: days
      };
      let _result = await this.$api.shopStat(param)
      if (_result) {
        this.$nextTick(() => {
          this.shopHomeStatData = _result;

        })
      }
    },
    // tab切事件
    tabClick(days) {
      this.days = days
      this.getShopStatData(days)
    },
     //筛选确定
      onSearch() {
        switch (this.selectTabs){
          case '订单':
          this.$router.push({
            name:'businessOrderList',
            query:{
              keyword:this.keyword
            }
          })
          break;
          case '客户':
           this.$router.push({
            name:'businessCustomer',
            query:{
              keyword:this.keyword
            }
          })
          break;
          case '上游':
          this.$router.push({
            name:'businessFactory',
            query:{
              keyword:this.keyword
            }
          })
          break;
          case '商品':
           this.$router.push({
            name:'businessGoods',
            query:{
              keyword:this.keyword
            }
          })
          break;
        }
      },
      toQrScan() {
        scanQr()
      },
  }
}
</script>
<style lang="less">
.business-home{
  .weui-select{
      color:#fff;
    }
}
</style>
<style lang="scss" scoped>
@import '../../style/scss/_mixin.scss';
@import '../../style/scss/_common.scss';
.business-home {}
.business-gird{
  margin-top:60px;
}
.align-item {
  align-items: center
}

.fs40 {
  font-size: 40px;
}

.fs32 {
  font-size: 32px;
}

.gc-cell {
  line-height: 2.5;
}

.record-box {
  padding: 15px;
  p {
    line-height: 25px;
  }
  &-item {
    border-top: 1px dashed #e5e5e5;
    padding: 10px 0;
    &:first-child {
      border-top: 0;
      padding-top: 0;
    }
  }
}
/*search-filter*/
  
.search-sort-bar {
    height: 44px;
    position: fixed;
    top:0;
    z-index:10;
    width: 100%;
    background-color: $theme;
    .iconfont {
        font-size: 22px;
        color:#fff;
    }
  
    .category {}
    .search {
        border: 1px solid #fff;
        border-radius: 20px;
        background-color: #fff;
        padding: 4px 10px;
        .search-input {
            padding-right: 15px;
            .iconfont {
                font-size: 15px;
                color:#666
            }
            span {}
        }
    }
}

</style>