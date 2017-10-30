<template>
    <div class="business-factory-index gc-container has-header has-footer gc-form">
        <x-header :left-options="{backText:''}" class="gc-header">{{title}}</x-header>
        <group label-width="100px" text-align="right">
            <x-input title="厂家名称" placeholder="请输入" v-model="gcForm.name" v-verify="gcForm.name">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-input title="联系人" placeholder="请输入" v-model="gcForm.contact" v-verify="gcForm.contact">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-input title="联系电话" placeholder="请输入" v-model="gcForm.mobile" v-verify="gcForm.mobile">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-address title="城市" placeholder="请选择" value-text-align='left' v-model="gcForm.cid" raw-value :list="addressData" hide-district v-verify="gcForm.cid"></x-address>
            <x-input title="联系地址" placeholder="请输入" v-model="gcForm.addr" v-verify="gcForm.addr">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
        </group>
        <div class="plr15 ptb20">
            <x-button type="primary" @click.native="onSubmit">保存</x-button>
        </div>
    </div>
</template>
<script>
import { ChinaAddressV3Data } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import validateMixins from '@/mixins/validateMixins'
import { required } from '@/utils/validateGroup'
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
        if (this.factoryId) {
            this._loadInfo()
        }
    },
    mixins: [validateMixins],
    verify: {
        gcForm: {
            cid: [{
                test: required,
                message: '请选择城市'
            }],
            name: [{
                test: required,
                message: '请输入厂家名称'
            }],
            contact: [{
                test: required,
                message: '请输入联系人'
            }],
            mobile: [{
                test: required,
                message: '请输入联系电话'
            }, 'phone'],
            addr: [{
                test: required,
                message: '请输入联系地址'
            }]
        }
    },
    computed: {
        ...mapGetters(['userSid']),
        title() {
            return this.factoryId ? '编辑上游' : '新增上游'
        }
    },
    methods: {
        // 获取详情
        async _loadInfo() {
            let _result = await this.$api.manageGetFactoryDetail({ sid: this.userSid, factory_id: this.factoryId })
            this.gcForm = Object.assign({}, _result, { cid: [_result.cid.toString().substr(0, 2).padEnd(6, 0), _result.cid.toString()] })
        },
        // 提交
        onSubmitConfirm() {
            let _method = `manage${this.factoryId ? 'Update' : 'Add'}Factory`
            this.$api[_method](Object.assign({}, this.gcForm, { cid: this.gcForm.cid[1], sid: this.userSid, factory_id: this.factoryId }))
                .then(d => {
                    if (d) {
                        if (this.factoryId) {
                            this.$vux.toast.show({
                                text: '编辑成功',
                                type: 'success'
                            })
                            this.$router.push({ name: 'businessFactoryDetail', params: { factoryId: this.factoryId } })
                        } else {
                            this.$vux.toast.show({
                                text: '新增成功',
                                type: 'success'
                            })
                            this.$router.replace({ name: 'businessFactory' })
                        }
                    }
                })
        }
    }
}

</script>
<style lang="scss" scoped>

</style>