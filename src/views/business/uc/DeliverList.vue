<template>
    <div class="business-uc-deliver-list gc-container has-header has-footer">
        <x-header :left-options="{backText:''}" class="gc-header">
            <span>搬运列表</span>
            <a href="javascript:;" slot="right" @click="toAdd">
                <i class="iconfont icon-roundadd fs22"></i>
            </a>
        </x-header>
        <group v-for="(item,index) in items" :class="{'no-margin-group':index===0}" :key="item.deliver_id" @click.native="toDetail(item.deliver_id)">
            <cell>
                <div slot="title">{{item.uname}}</div>
                <div slot="value" class="value f-red">{{item.status===0?'禁用':'启用'}}</div>
            </cell>
            <cell>
                <div slot="title">{{item.dname}}</div>
                <div slot="value" class="value fc-6">{{item.umobile}}</div>
            </cell>
        </group>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'business-uc-deliver-list',
    title: '搬运列表',
    data() {
        return {
            items: []
        }
    },
    created() {
        this._loadList()
    },
    components: {
    },
    computed: {
        ...mapGetters(['userSid'])
    },
    methods: {
        // 加载订单列表
        async _loadList() {
            let _result = await this.$api.manageGetDeliverList(this.userSid)
            this.items = Object.freeze(_result.list)
        },
        // 搬运详情
        toDetail(deliverId) {
            this.$router.push({ name: 'businessUcDeliverDetail', params: { deliverId } })
        },
        // 添加搬运
        toAdd() {
            this.$router.push({ name: 'businessUcDeliverAdd' })
        }
    }
}

</script>
<style lang="scss" scoped>

</style>
