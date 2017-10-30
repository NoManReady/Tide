<template>
    <div class="business-factory-index gc-container has-header has-footer">
        <x-header :left-options="{backText:''}" class="gc-header">
            上游详情
            <a href="javascript:;" slot="right" @click="toEdit">
                编辑
                <!-- <i class="iconfont icon-post fs22"></i> -->
            </a>
        </x-header>
        <group label-width="100px" text-align="right">
            <cell title="厂家名称" :value="gcForm.name">
            </cell>
            <cell title="联系人" :value="gcForm.contact">
            </cell>
            <cell title="联系电话" :value="gcForm.mobile">
                <a :href="'tel:'+gcForm.mobile" slot="right">
                    <i class="iconfont icon-phone fs22 f-red"></i>
                </a>
            </cell>
            <cell title="城市" :value="gcForm.cname"></cell>
            <div class="gc-cell box-flex">
                <div class="w100">联系地址</div>
                <div class="flex-one fc-9 tr">{{gcForm.addr}}</div>
            </div>
        </group>
    </div>
</template>
<script>
import { ChinaAddressV3Data } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import model from '@/model'
const factory = model.factoryFn
export default {
    name: 'business-factory-add',
    data() {
        return {
            factoryId: '',
            gcForm: factory(),
            addressData: ChinaAddressV3Data
        }
    },
    created() {
        this.factoryId = this.$route.params.factoryId
        this._loadInfo()
    },
    computed: {
        ...mapGetters(['userSid'])
    },
    methods: {
        // 获取详情
        async _loadInfo() {
            let _result = await this.$api.manageGetFactoryDetail({ sid: this.userSid, factory_id: this.factoryId })
            this.gcForm = _result
        },
        // 编辑
        toEdit() {
            this.$router.push({ name: 'businessFactoryEdit', params: { factoryId: this.factoryId } })
        }
    }
}

</script>
<style lang="scss" scoped>

</style>
