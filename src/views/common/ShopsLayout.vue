<template>
    <common-layout class="shops-layout" :sid="sid">
        <tabbar-item :link="{name:'shopsDetail',query:{sid}}">
            <span slot="label">店铺详情</span>
        </tabbar-item>
        <tabbar-item :link="{name:'shopsGoods',query:{sid}}">
            <span slot="label">
                <i class="iconfont icon-sort"></i>店铺分类</span>
        </tabbar-item>
        <tabbar-item :badge="shopCartNum" class="shops-cart" :link="{name:'shopsCart',query:{sid}}">
            <i class="iconfont icon-cart" slot="icon"></i>
        </tabbar-item>
    </common-layout>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

import CommonLayout from '@/common/layout'
export default {
    name: 'shopsLayout',
    title: '商铺布局页面',
    data() {
        return {
            sid: ''
        }
    },
    created() {
        let _sid = this.$route.query.sid
        if (!_sid) {
            this.$vux.toast.show({
                type: 'error',
                text: '商铺id未提供'
            })
            this.$router.back()
        } else {
            this.sid = _sid;
            // this.getShopCart(this.sid);
        }
    },
    computed: {
        ...mapGetters(['cartInfo']),
        shopCartNum() {
            let cartNum = this.cartInfo.goods_count.toString() || '0';
            return cartNum;
        },
    },
    methods: {
        ...mapActions(['getCartInfo']),
        getShopCart(sid) {
            this.getCartInfo(sid)
        }
    },
    components: {
        CommonLayout
    }
}
</script>
<style lang="less">
.shops-layout {
    .shops-cart {
        .weui-tabbar__icon {
            margin-top: 10px;
        }
        .weui-tabbar__label {
            display: none;
        }
    }
    .icon-sort {
        font-size: 18px;
        vertical-align: text-top;
        margin-right: 5px;
    }
}
</style>
<style lang="scss" scoped>

</style>