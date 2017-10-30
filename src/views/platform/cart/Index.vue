<template>
  <div class="platform-cart">
    <!--header-->
    <x-header :left-options="{showBack: false}">购物车
      <a slot="right" @click.prevent.stop="edit"></a>
    </x-header>
    <!--cart list-->
    <div class="cart-list">
      <group class="cart-item" v-for="(item,index) in cartsList" :key="index">
        <cell-box class="cart-item-top vux-flexbox">
          <div class="avatar">
            <img :src="item.logo" alt="" width="100%" height="100%">
          </div>
          <div class="shop-name plr15" @click.prevent.stop="toShopsHome(item)">
            {{item.name}}
            <i class="iconfont icon-right ml20"></i>
          </div>
        </cell-box>
        <div class="cart-item-list" v-if="item.goods.length > 0">
          <div class="goods-content" v-for="(good,index) in item.goods" :key="index">
            <div class="goods-img">
              <img :src="good.thumb" alt="">
            </div>
            <div class="goods-info">
              <div class="goods-name ell-2">
                {{good.title}}
              </div>
              <div class="goods-type">
                货号：{{good.code}}
              </div>
              <div class="goods-price vux-flexbox">
                <div class="price f-theme">
                  ￥
                  <span class="current-price">{{good.sales_price}}</span>
                  <span class="orign-price">￥{{good.market_price}}</span>
                </div>
                <div class="num"></div>
              </div>
              <div class="goods-spec" v-if="good.list">
                <div class="spec-item vux-flexbox" v-for="(spec,index) in good.list" :key="index">
                  <div class="spec-item-left">
                    {{spec.sname}}
                  </div>
                  <div class="spec-item-right">
                    <span class="f-theme pr10">￥{{spec.sales_price}}</span>x{{spec.num}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <cell-box class="cart-item-bottom vux-flexbox">
          <div class="total-item flex-one">
            总计：
            <span class="f-theme">￥{{item.total}}</span>
          </div>
          <div class="btn-settle" @click.prevent.stop="toSettle(item)">
            <x-button type="warn">结算</x-button>
          </div>
        </cell-box>
      </group>

    </div>
    <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="cartsList.length == 0"></empty>
  </div>
</template>
<script>
import apis from '@/api'
import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from 'vux'
import Empty from '@/common/empty'
import { mapGetters, mapActions } from 'vuex'
import {
  saveToLocal,
  loadFromLocal
} from '@/utils/localStorage'
import {
  toFixed
} from '@/utils'
export default {
  name: 'platform-home',
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Empty,
  },
  data() {
    return {
      isEdit: false,
      cartsList: []
    }
  },
  created() {
    this.goodsGetCarts()
  },
  computed: {
    emptyText() {
      return '购物车为空哦'
    },
    iconEmpty() {
      return 'icon-empty'
    }
  },
  filters: {
    editText(isEidt) {
      return !isEidt ? '编辑' : '完成'
    }
  },
  methods: {
    ...mapActions(['loading']),
    async goodsGetCarts() {
      let _result = await this.$api.goodsGetCarts();
      if (_result) {

        _result.shops.forEach((item) => {
          let total = 0;
          let cartGoods = [];
          let cartGoodItem = {};

          item.goods.forEach((good) => {
            if (good.list.length > 0) {
              good.list.forEach((spec) => {
                total += parseFloat(spec.sales_price) * parseFloat(spec.num);
                // cartGoodItem = {
                //   goods_id: good.goods_id,
                //   stock_id: spec.stock_id,
                //   price: spec.sales_price,
                //   num: spec.num
                // }
                // cartGoods.push(cartGoodItem);
                this.$set(item, 'total', toFixed(total));
                // this.$set(item, 'cartGoods', cartGoods);
              })

            }
          })
        });
        this.cartsList = _result.shops;
        console.log(this.cartsList)
      }
    },
    edit() {
      this.isEdit = !this.isEdit;
    },
    toSettle(item) {
      // if (item.cartGoods) {
      //   saveToLocal('cartGoods', item.cartGoods);
      // }
      this.$router.push({
        name: 'shopsCart',
        query: {
          sid: item.sid
          // total: item.total
        }
      })
    },
    toShopsHome(item) {
      this.$router.push({
        name: 'shopsHome',
        query: {
          sid: item.sid
        }
      })
    }
  }
}

</script>
<style lang="less">
.weui-cells {
  margin-top: 10px;
}

.cart-list {
  .weui-cell {
    padding: 5px 0;
  }
  .vux-swipeout-item {
    width: 100%;
  }
  .vux-swipeout-content {
    width: 100%;
    padding: 10px;
  }
}
</style>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';

.cart-list {
  .cart-item {}
  .cart-item-top {
    background-color: #fefefe;
    height: 45px;
    font-size: 14px;
    padding: 0 10px;
    position: relative;
    @include border-1px(#e5e5e5, before, top);
    .avatar {
      width: 34px;
      height: 34px;
      padding: 2px;
      border: 1px solid #e5e5e5;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .cart-item-list {
    padding-left: 10px;
  }
  .goods-content {
    width: 100%;
    padding: 10px 10px 0 0;
    position: relative;
    @include border-1px(#e8e8e8, before, top);
    .goods-img {
      width: 90px;
      height: 90px;
      position: relative;
      float: left;
      background-color: #e5e5e5;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0)
      }
    }
    .goods-info {
      margin-left: 100px;
      .goods-name {
        font-size: 13px;
        color: #666;
        padding-right: 30px;
      }
      .goods-type {
        color: #999;
        font-size: 12px;
        padding-top: 4px;
      }
      .goods-price {
        padding-top: 6px;
        @include justify-content(space-between);
        .price {}
        .current-price {
          font-size: 20px;
        }
        .orign-price {
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
        }
      }
      .goods-spec {
        padding-left: 10px;
        .spec-item {
          @include justify-content(space-between);
          padding: 6px 0;
          position: relative;
          @include border-1px(#e8e8e8, before, top);
          &:first-child {
            @include border-none();
          }
          .spec-item-right {}
        }
      }
    }
  }
  .cart-item-bottom {
    padding: 5px 10px;
    .total-item {
      font-size: 16px;
    }
    .btn-settle {
      width: 30%;
      text-align: center;
    }
  }
}
</style>
