<template>
  <div class="platform-order-bills">
    <x-header :left-options="{backText: '',preventGoBack:true}" class="gc-header" @click.native="goBack">商品清单</x-header>
    <group v-if="orderInfo">
      <cell>
        <div slot="title">
          共{{orderInfo.goods_count}}种商品
        </div>
        <span slot="value" class="f-red">¥{{orderInfo.fee_goods|toFixed}}</span>
      </cell>
    </group>
    <group class="pro-bills">
      <div class="pro-bill" v-for="(goods,index) in goodsList" :key="goods.goods_id" @click="toShopDetail(goods.goods_id)">
        <div class="pro-bill-top box-flex">
          <img class="pro-bill-img w120" v-lazy="goods.thumb" alt="">
          <div class="pro-bill-right">
            <div class="pro-bill-name two-line">{{goods.title}}</div>
            <div class="mt15 mb10 fc-6">
              编号：{{goods.code}}
            </div>
            <div class="box-flex">
              <span class="flex-one fc-3">{{goods.specn}}种规格</span>
              <span class="fc-9">{{goods.list.reduce((p,n)=>p+n.num,0)}}件</span>
            </div>
          </div>
        </div>
        <ul class="pro-bill-bottom">
          <li class="item" v-for="(spec,index) in goods.list" :key="spec.sname">
            <span class="flex-one">{{spec.sname}} {{spec.price|toFixed}}/件</span>
            <span class="fc-9">{{spec.num}}件</span>
          </li>
        </ul>
      </div>
    </group>
  </div>
</template>
<script>
export default {
  name: "platform-order-bills",
  title: "商品清单",
  props: {
    orderId: {
      type: [String, Number],
      require: true
    },
    orderInfo: {
      type: Object
    },
    sid: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      goodsList: []
    };
  },
  activated() {
    this._loadList();
  },
  methods: {
    // 加载清单列表
    async _loadList() {
      let _result = await this.$api.orderGoods({
        order_id: this.orderId,
        sid: this.sid,
        by_deliver: this.sid === 0 ? 1 : ""
      });
      this.goodsList = Object.freeze(_result.goods);
    },
    toShopDetail(goodsId) {
      this.$router.push({
        name: "orderGoodsDetail",
        query: { goodsId, sid: this.sid }
      });
    },
    // 返回
    goBack() {
      if (this.$parent && this.$parent.$listeners.input) {
        this.$parent.$emit("input", false);
      } else {
        this.$router.back();
      }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>