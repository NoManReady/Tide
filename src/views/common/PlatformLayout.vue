<template>
    <common-layout class="platform-layout">
        <tabbar-item :link="{name:'platformHome'}">
            <i class="iconfont icon-home" slot="icon"></i>
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :link="{name:'platformCart'}">
            <i class="iconfont icon-cart" slot="icon"></i>
            <span slot="label">购物车</span>
        </tabbar-item>
        <tabbar-item @click.native="toManageShops">
            <i class="iconfont" slot="icon" :class="{'icon-roundadd':!isSettle,'icon-cascades':isSettle}"></i>
            <span slot="label">{{tabName}}</span>
        </tabbar-item>
        <tabbar-item :badge="unreadCount" :link="{name:'platformMessage'}">
            <i class="iconfont icon-message" slot="icon"></i>
            <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item :link="{name:'platformUcenter'}">
            <i class="iconfont icon-people" slot="icon"></i>
            <span slot="label">我的</span>
        </tabbar-item>
    </common-layout>
</template>
<script>
import CommonLayout from '@/common/layout'
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: 'platformLayout',
    title: '平台布局页面',
    components: {
        CommonLayout
    },
    computed: {
        ...mapGetters(['isSettle', 'unreadCount','userShops']),
        tabName() {
            return this.isSettle ? '管理' : '入驻'
        }
    },
    methods: {
        ...mapActions(['getUnreadCount']),
        // 进入管理页面
        toManageShops() {
            if(this.userShops.server==3){//入驻等待审核 跳到成功页面 提示等待审核
                this.$router.push({
                    name:'platformUcPaySuccess',
                    query:{type:3}
                })
            }else{
                this.$bus.$emit('$$resetTabIndex')
                this.$bus.$emit('$$goManageSysCheck', { from: 'platform',isSwitch:true })
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>