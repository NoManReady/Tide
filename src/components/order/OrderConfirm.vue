<template>
  <div class="platform-order-bills">
    <x-header :left-options="{backText: '',preventGoBack:true}" class="gc-header" @click.native="goBack">收货确认</x-header>
    <group v-if="orderInfo">
      <cell>
        <div slot="title">
          共{{orderInfo.goods_count}}种商品
        </div>
        <span slot="value" class="f-red">¥{{orderInfo.fee_goods|toFixed}}</span>
      </cell>
    </group>
    <group class="pro-bills prop-checker-list">
      <checker v-model="goodsCheckeds" type="checkbox" default-item-class="prop-checker-item" selected-item-class="prop-checker-item-selected">
          <checker-item v-for="(goods,index) in goodsList" :key="goods.goods_id" :value="goods.goods_id">
              <div class="pro-bill">
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
          </checker-item>
      </checker>
    </group>
    <div class="gc-footer plr20 ptb10">
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="confirmOrder">确认收货</x-button>
        </flexbox-item>
      </flexbox>
    </div>
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
      goodsList: [],
      goodsCheckeds: []
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
    // 确认订单
    confirmOrder() {
      let vm = this;
      if (this.goodsCheckeds.length < this.goodsList.length) {
        this.$vux.confirm.show({
          title: "提示",
          content: "有商品未验收，是否确认收货",
          onCancel() {},
          onConfirm() {
            vm._confirmOrder();
          }
        });
      } else {
        vm._confirmOrder();
      }
    },
    _confirmOrder() {
      this.$api.orderReceipt(this.orderId).then(d => {
        this.$vux.toast.show({
          content: "确认成功",
          type: "success"
        });
        this.$router.back();
      });
    },
    // 返回
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.prop-checker-list {
  padding: 10px;
}

.prop-checker-item {
  padding: 0 10px;
  width: 100%;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}

.prop-checker-item-selected {
  background: #ffffff url(../../assets/checker/active.png) no-repeat right
    bottom;
  border-color: #ff4a00;
}
</style>