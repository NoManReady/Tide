<template>
    <div class="choose-num vux-flexbox">
        <div class="btn-reduce" @click="reduce">
            <i class="iconfont icon-move" :class="{'no-tap':disabledMin}"></i>
        </div>
        <div class="num-input">
            <input type="tel" v-model="good.num" @blur="blur" pattern="[0-9]*">

        </div>
        <div class="btn-increase" @click="increase">
            <i class="iconfont icon-add" :class="{'no-tap':good.available == good.num}"></i>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    saveToLocal,
    loadFromLocal
} from '@/utils/localStorage'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    // props: {
    //     min: Number,
    //     max: Number,
    //     good: {
    //         type: Object,
    //         default: function() {
    //             return {}
    //         }
    //     },
    //     clientId:{
    //         type:String,
    //         default:''
    //     }
    // },
    props: ['good', 'sid', 'clientId', 'factoryId', 'min'],
    data() {
        return {

        }
    },
    created() {
    },
    computed: {
        disabledMin() {
            if (this.clientId != '') {
                return false
            }
            return typeof this.min === 'undefined' ? false : (this.good.num === '' ? true : this.good.num <= this.min)
        },
        disabledMax() {
            if (this.factoryId != '') {
                return false
            }
            return typeof this.max === 'undefined' ? false : (this.good.num === '' ? true : this.good.num >= this.max)
        }
    },
    // watch: {
    //     'good.num': {
    //         handler: function(newValue, old) {
    //             if (newValue !== '') {
    //                 if (typeof this.min !== 'undefined' && this.good.num < this.min) {
    //                     this.good.num = this.min
    //                 }
    //                 if (this.max && this.good.num > this.max) {
    //                     this.good.num = this.max
    //                 }
    //             }
    //             let changeType = '';
    //             if (newValue > old) {
    //                 changeType = 'add'
    //             }
    //             if (newValue < old) {
    //                 changeType = 'reduce'
    //             }

    //             // this.$emit('on-change', this.good, changeType);
    //         },
    //         deep: true
    //     },
    // },
    methods: {
        ...mapActions(['getCartInfo']),
        //减少
        reduce() {
            if (this.disabledMin) {
                if (this.good.num <= 0) {
                    this.good.num = 0;
                    return;
                }
            }
            this.good.num--;
            this.goodsToCart('reduce')
        },

        //增加
        increase() {

            if (!this.factoryId && this.good.available <= this.good.num) {
                this.$vux.toast.text('再点下去库存也不会增加呀~~')
                return;
            } else {
                this.good.num++;
                this.goodsToCart('add')
            }


        },
        blur() {
            if (this.good.num === '') {
                this.good.num = 0
            }
        },
        async goodsToCart(type) {
            this.query = {
                sid: this.sid,
                client_id: this.clientId,
                factory_id: this.factoryId,
                goods_id: this.good.goods_id,
                stock_id: this.good.stock_id,
                price: this.good.sales_price,
                num: this.good.num
            };
            //添加购物车
            let _result = await this.$api.goodsToCart(this.query);
            if (_result) {
                this.$nextTick(() => {
                    this.$vux.toast.text('更新购物车成功');
                    let ids = {
                        sid: this.sid,
                        client_id: this.clientId,
                        factory_id: this.factoryId,
                    };
                    this.getCartInfo(ids)
                })
            }
        },
    }
}
</script>
<style lang="scss" scoped>
@import "../../style/scss/_mixin.scss";
@import '../../style/scss/_available.scss';
.choose-num {
    // width: 85px;
    height: 32px;
    text-align: center;
    border: 1px solid #bfbfbf;
    border-radius: 3px;
    .btn-reduce,
    .btn-increase {
        width: 32px;
        height: 32px;
        line-height: 32px;
        .iconfont {
            font-size: 16px;
            color: #000;
            &.no-tap {
                color: #bfbfbf;
            }
        }
        .icon-add {}
    }
    .num-input {
        // width: 35px;
        flex: 1;
        height: 32px;
        position: relative;
        @include border-1px(#bfbfbf, after, right);
        @include border-1px(#bfbfbf, before, left);
        input {
            width: 100%;
            height: 32px;
            line-height: 32px;
            font-size: 15px;
            vertical-align: top;
            text-align: center;
            color: $theme;
        }
    }
}
</style>