<template>
    <div class="shops-detail gc-container has-header">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="toShopHome" class="gc-header">商铺档案</x-header>
        <div class="gc-box tc">
            <div class="avatar">
                <div class="avatar-inner">
                    <img v-lazy="detailInfo.logo">
                </div>
                <div class="user-name fc-6">{{detailInfo.name}}</div>
            </div>
            <div class="user-money">联系人：{{detailInfo.contact}}</div>
        </div>
        <group>
            <cell :title="detailInfo.addr">
                <i class="iconfont icon-locationfill fs18 mr10 vm f-green" slot='icon'></i>
                <a :href="detailInfo.mobile?'tel:'+detailInfo.mobile:'javascript:;'" slot="value" class="fs22 f-red">
                    <i class="iconfont icon-phone"></i>
                </a>
            </cell>
        </group>
        <group>
            <div class="gc-cell">
                <div>
                    <span class="vm">商铺基本信息</span>
                </div>
                <div class="fc-9 fs-14 mt10">
                    <div>
                        <span class="vm">商品数量：</span>
                        <span class="vm">{{detailInfo.goods_all}}</span>
                    </div>
                    <div class="box-flex">
                        <span>商铺简介：</span>
                        <div v-html="detailInfo.introduce"></div>
                    </div>
                </div>
            </div>
        </group>
        <group>
            <cell-box class="tc auth">
                <div class="flex-one">
                    <span class="item">
                        <span class="vm">身份认证</span>
                        <i class="vm" :class="{active:authInfo.idv==1}">{{authInfo.idv==1?'已':'未'}}</i>
                    </span>
                </div>
                <div class="flex-one">
                    <span class="item">
                        <span class="vm">工商认证</span>
                        <i class="vm" :class="{active:authInfo.blv==1}">{{authInfo.blv==1?'已':'未'}}</i>
                    </span>
                </div>
            </cell-box>
            <div class="gc-cell" v-if="authInfo.idv==1">
                <div class="fc-9 fs-14">
                    <div>
                        <span class="vm">姓名：</span>
                        <span class="vm">{{authInfo.idv_name}}</span>
                    </div>
                    <div class="box-flex">
                        <span>身份证：</span>
                        <div class="flex-on">{{authInfo.idv_sn}}</div>
                    </div>
                </div>
            </div>
        </group>
    </div>
</template>
<script>
import { shopDetailFn } from '@/model/modules/shop'
import { userFn } from '@/model/modules/user'
export default {
    name: 'shopsDetail',
    data() {
        return {
            detailInfo: shopDetailFn(),
            authInfo: userFn()
        }
    },
    created() {
        this.sid = this.$route.query.sid
        this._getShopsDetail()
    },
    methods: {
        // 加载店铺详情
        async _getShopsDetail() {
            let _result = await this.$api.shopGetDetail(this.sid)
            this.detailInfo = _result
            await this._getShopUserInfo(this.detailInfo.owner)
        },
        //加载店铺用户信息
        async _getShopUserInfo(uid) {
            let resultInfo = await this.$api.userInfo(uid)
            this.authInfo = resultInfo
        },
        // 返回shop主页
        toShopHome() {
            this.$router.replace({ name: 'shopsHome', query: { sid: this.sid } })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/scss/_available';
.avatar {
    &-inner {
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
    }
    img {
        display: inline-block;
        width: 100%;
    }
}

.auth {
    .item {
        i {
            width: 18px;
            height: 18px;
            line-height: 18px;
            background: #999;
            border-radius: 50%;
            color: #fff;
            font-size: 10px !important;
            &.active {
                background: $green
            }
        }
    }
}
</style>