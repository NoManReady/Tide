<template>
  <div class="shops-pay-resu">
    <group>
      <div class="gc-cell">
        <div class="cf w100p fs14 fc-6 mt10">
          <div class="fl">支付金额</div>
          <div class="fr f-red">¥{{payAmount}}</div>
        </div>
      </div>
    </group>
    <tip-page titles="支付成功，等待审核" :icon="icon" :buttons="buttons">
    </tip-page>
  </div>
</template>
<script>
    import TipPage from '@/components/common/TipPage'
    export default {
        components: {
            TipPage
        },
        data() {
            return {
                buttons: [{
                    type: 'primary',
                    text: '查看订单',
                    onClick: this.viewOrder.bind(this)
                }, {
                    type: 'default',
                    text: '继续逛',
                    onClick: this.continue.bind(this)
                }],
                icon: 'success'
            }
        },
        created() {},
        computed: {
            payAmount() {
                let amount = this.$route.query.payAmount
                return amount;
            }
        },
        methods: {
            viewOrder() {
                this.$router.push({
                    name: 'platformOrderDetail',
                    params: {
                        orderId: this.$route.query.orderId
                    }
                })
            },
            continue () {
                this.$router.push({
                    name: 'platformHome'
                })
            }
        }
    }
</script>