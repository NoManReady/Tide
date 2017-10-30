<template>
  <div class="shops-goods gc-container has-header two-header">
    <x-header class="gc-header" :left-options="{showBack:false}">
      <a slot="left">
        <i class="iconfont icon-scan"></i>
        <span>
          扫码
        </span>
      </a>
      <div class="search flex-one" @click="showSearchBar=true">
        <div class="search-input ellipsis fs14">
          <i class="iconfont icon-search"></i>
          <span class="">
            {{query.keyword || '商品名称/品牌/货号'}}
          </span>
        </div>
      </div>
      <!-- <a href="javascript:;" slot="right" class="cart-box" @click.prevent.stop="toShopsCart">
              <badge :text="shopCartNum" v-if="shopCartNum > 0"></badge>
              <i class="iconfont icon-cart fs20"></i>
            </a> -->
    </x-header>
    <gc-search :word.sync="query.keyword" v-model="showSearchBar" :search-fn="onSearch" placeholder="商品名称/品牌/货号"></gc-search>
    <div class="filter-container box-flex">
      <a href="javascript:;" class="item" @click="orderBy('')">
        <span :class="{'f-theme':query.order===''}">综合</span>
      </a>
      <a href="javascript:;" class="item" @click="orderBy('sales')">
        <span :class="{'f-theme':query.order==='sales'}">销量</span>
      </a>
      <a href="javascript:;" class="item" @click="orderBy('aprice',true)">
        <span class="price">
          <span :class="{'f-theme':query.order==='aprice'||query.order==='dprice'}">价格</span>
          <i class="iconfont icon-unfold" :class="{active:query.order==='aprice'}" v-show="query.order==='aprice'"></i>
          <i class="iconfont icon-fold" :class="{active:query.order==='dprice'}" v-show="query.order==='dprice'"></i>
        </span>
      </a>
      <a href="javascript:;" class="item" @click="filterVisible=true">筛选
        <i class="iconfont icon-filter"></i>
      </a>
    </div>
    <div class="category-container shops-cate">
      <div class="category-left">
        <ul>
          <li class="category-left-li level-two" :class="{active:query.cate_id===''}" @click.stop="cateClick({isLeaf:true,cate_id:''})">
            <a href="javascript:;">全部</a>
          </li>
          <li v-for="(item,index) in localCate" :key="item.cate_id" class="category-left-l" :class="{active:item.isLeaf?query.cate_id===item.cate_id:item.open,'level-two':!item.isLeaf,'level-one':item.isLeaf}" @click.stop="cateClick(item)" v-if="item.cate_id > 9">
            <a href="javascript:;" class="item ellipsis">{{item.name}}</a>
            <ul v-if="item.child&&item.child.length" class="category-child">
              <li v-for="(child,index) in item.child" :key="index" :class="{active:child.isLeaf?query.cate_id===child.cate_id:child.open,'level-two':!child.isLeaf,'level-one':child.isLeaf}" @click.stop="cateClick(child)">
                <a href="javascript:;" class="child">{{child.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="category-right">
        <div class="category-right-content vux-flexbox pd0 mt0">
          <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="scrollTop">
            <div class="goods-wrapper">
              <ul class="list goods-list">
                <li v-for="(item,index) in scrollerParams.items" @click.prevent.stop="toGoodsDetail(item.goods_id)" :key="index">
                  <div class="goods-img">
                    <img :src="item.thumb" alt="">
                  </div>
                  <div class="goods-info-box">
                    <div class="goods-name ell-2">
                      <span>
                        {{item.title}}
                      </span>
                    </div>
                    <div class="goods-price">
                      <div class="price">
                        <em class="f-theme">￥
                          <span class="big-price">{{item.sales_price}}</span>
                          <span class="small-price">
                          </span>
                        </em>
                      </div>
                    </div>
                    <div class="goods-cart">
                      <i class="iconfont icon-cart" @click.prevent.stop="openNature(item)"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </b-scroll>
        </div>
      </div>
    </div>
    <!-- 筛选 -->
    <div v-transfer-dom>
      <popup v-model="filterVisible" width="85%" height="100%" position="right" class="filter-popup">
        <div class="filter-content">
          <div class="filter-title vux-flexbox">
            品牌
          </div>
          <div class="filter-list vux-flexbox">
            <template v-if="goodsBrand.length > 0">
              <div class="filter-item" @click="query.brand_name=item.name" :class="{'filter-item-selected':query.brand_name == item.name}" v-for="(item,index) in goodsBrand" :key="item.name">
                <span>{{item.name}}</span>
              </div>
            </template>
            <p class="pt10 plr10 tc" style="width:100%" v-else>
              还未有品牌
            </p>
          </div>
        </div>
        <div class="filter-content">
          <div class="filter-title vux-flexbox">
            类别
          </div>
          <div class="filter-list vux-flexbox">
            <div class="filter-item" @click="query.tags=item.value" :class="{'filter-item-selected':query.tags == item.value}" v-for="(item,index) in filterCate" :key="item.value">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="filter-content">
          <div class="filter-title vux-flexbox">
            价格
          </div>
          <div class="filter-list vux-flexbox pl10 tc mt10">
            <input v-model="query.lprice" type="number" class="inline-input vm tc" placeholder="最低价" @blur="onBlur('lprice',$event)">
            <span class="vm ml10 mr10">-</span>
            <input v-model="query.hprice" type="number" class="inline-input vm tc" placeholder="最高价" @blur="onBlur('hprice',$event)">
          </div>
        </div>
        <div class="filter-footer vux-flexbox">
          <a href="javascript:;" class="flex-one btn" @click="clearFilter">重置</a>
          <a href="javascript:;" class="flex-one btn btn-ok" @click="goSearch">确定</a>
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="natureVisible" width="100%" height="80%" position="bottom" v-if="natureVisible">
        <nature-popup :sid="sid" :client-id="clientId" :factory-id="factoryId" :goods-detail="itemObj" :goods-stock="goodsStock.group" @closepop="closeNature"></nature-popup>
      </popup>
    </div>
  </div>
</template>
<script>
import GcSearch from '@/common/search'
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
import naturePopup from '@/components/business/nature-popup'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'shops-goods',
  title: '商品列表',

  data() {
    return {
      showSearchBar: false,
      iconEmpty: '',
      scrollTop: 142,
      localCate: [],
      filterVisible: false,
      natureVisible: false,
      filterCate: [{
        name: '全部',
        value: 'all'
      }, {
        name: '新品',
        value: 'new'
      }, {
        name: '热卖',
        value: 'hot'
      }],
      query: {
        sid: '',
        keyword: '',
        cate_id: '',
        brand_name: '',
        sdate: '',
        edate: '',
        page: '',
        tags: 'all',
        order: '',
        lprice: '',
        hprice: ''
      },
      itemObj: {},
      goodsStock: {}
    }
  },
  mixins: [bscrollMixins],
  components: {
    GcSearch,
    BScroll,
    naturePopup
  },
  computed: {
    ...mapGetters(['goodsBrand', 'goodsCate', 'cartInfo']),
    sid() {
      let sid = this.$route.query.sid || '';
      return sid;
    },

    clientId() {
      let clientId = this.$route.query.clientId || '';
      return clientId;
    },
    factoryId() {
      let factoryId = this.$route.query.factoryId || '';
      return factoryId;
    },
    shopCartNum() {
      let cartNum = this.cartInfo.goods_count.toString() || '0';
      return cartNum;
    }
  },
  async created() {
    this.query.sid = this.$route.query.sid;
    this.query.keyword = this.$route.query.keyword || '';
    // 加载货物filter
    await this.getGoodsFilter(this.query.sid)
    this.localCate = this._getLocalCate(this.goodsCate)
  },
  methods: {
    ...mapActions(['getGoodsFilter']),
    // 加载列表
    async _loadList() {
      let _result = await this.$api.goodsGetList(this.assignQuery(this.query))
      return _result;
    },
    // 扩展商品分类数据
    _getLocalCate(cates) {
      return cates.map(c => {
        return {
          cate_id: c.cate_id,
          name: c.name,
          pid: c.pid,
          isLeaf: !c.child.length,
          open: false,
          child: this._getLocalCate(c.child || [])
        }
      })
    },
    // 清空筛选
    clearFilter() {
      this.query = Object.assign(this.query, { brand_name: '', edate: '', sdate: '', tags: 'all', hprice: '', lprice: '' })
    },
    // 搜索
    goSearch() {
      this.filterVisible = false
      this.onSearch()
    },
    // 分类点击查询
    cateClick(item) {
      if (item.isLeaf) {
        this.query.cate_id = item.cate_id
        this.onSearch()
      } else {
        item.open = !item.open
        this.localCate = this.localCate.slice(0)
      }
    },
    // 价格input失焦事件
    onBlur(type, evt) {
      let _val = parseFloat(this.query[type])
      evt.target.value = _val
      this.query[type] = _val || ''
    },
    // 排序
    orderBy(str, isPrice) {
      if (isPrice) {
        if (this.query.order !== str) {
          this.query.order = str
        } else {
          this.query.order = 'dprice'
        }
      } else {
        this.query.order = str
      }
      this.onSearch()
    },
    //产品详情页
    toGoodsDetail(goodsId) {
      this.$router.push({
        name: 'shopsGoodsDetail',
        query: {
          sid: this.query.sid,
          goodsId: goodsId
        }
      })
    },
    //去购物车
    toShopsCart() {
      this.$router.push({
        name: 'shopsCart',
        query: {
          sid: this.query.sid
        }
      })
    },
    //打开购物车
    openNature(item) {
      this.itemObj = {
        goods_id: item.goods_id,
        title: item.title,
        thumb: item.thumb,
        code: item.code,
        sales_price: item.sales_price
      };

      // this.natureVisible = true;
      //运行获取商品规格
      this.goodsGetStock(this.itemObj.goods_id);
    },
    //关闭购物车弹框
    closeNature() {
      this.natureVisible = false;
    },
    //获取商品规格库存等
    async goodsGetStock(goodsId) {
      let _result = await this.$api.goodsGetStock({
        sid: this.sid,
        client_id: '',
        factory_id: '',
        goods_id: goodsId,
      });
      if (_result) {
        this.$nextTick(() => {
          this.goodsStock = _result;
          this.natureVisible = true;
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/scss/_available';
.filter-container {
  height: 46px;
  line-height: 44px;
  padding: 0 10px;
  background: #fff;
  width: 100%;
  position: fixed;
  top: 46px;
  left: 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  .item {
    flex: 1;
    text-align: center;
    &.active {
      color: $theme;
    }
    .price {
      position: relative;
      line-height: 20px;
      height: 20px;
      display: inline-block;
      .iconfont {
        font-size: 12px; // position: absolute;
        // right: -15px;
        &.active {
          color: $theme;
        }
      }
      .icon-unfold {
        // bottom: -1px;
      }
      .icon-fold {
        // top: 1px;
      }
    }
  }
}

.inline-input {
  padding: 12px 12px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  width: 40%;
}

.search {
  background: rgba(0, 0, 0, .3);
  border-radius: 5px;
  padding: 0 10px;
}

.shops-goods {

  .goods-list {
    .goods-info-box {
      .goods-name {
        height: 30px;
      }
      .big-price {
        font-size: 18px !important;
      }
    }
    .goods-cart {
      margin-top: 10px;
      text-align: right;
      .icon-cart {
        color: $theme;
        font-size: 25px;
      }
    }
  }
}
</style>