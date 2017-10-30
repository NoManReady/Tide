<template>
    <div class="business-order-custom-detail gc-container has-header gc-form">
        <x-header :left-options="{backText: ''}" class="gc-header">{{title}}
            <a href="javascript:;" slot="right" @click="onSubmit">保存</a>
        </x-header>
        <group label-width="100px" text-align="right">
            <x-input title="客户名称" placeholder="请输入" v-model="gcForm.name"
            v-verify="gcForm.name">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-address title="归属地" placeholder="请选择" value-text-align='left' v-model="gcForm.cid" raw-value :list="addressData" hide-district
            v-verify="gcForm.cid"></x-address>
        </group>
        <group label-width="100px">
            <x-input title="联系人" placeholder="请输入" v-model="gcForm.contact"
            v-verify="gcForm.contact">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-input title="联系电话" placeholder="请输入" v-model="gcForm.mobile"
            v-verify="gcForm.mobile">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-input title="联系地址" placeholder="请输入" v-model="gcForm.addr"
            v-verify="gcForm.addr">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
        </group>
    </div>
</template>
<script>
import { ChinaAddressV3Data } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import validateMixins from '@/mixins/validateMixins'
import { required } from '@/utils/validateGroup'
import model from '@/model'
const customer = model.customerFn
export default {
    data() {
        return {
            addressData: ChinaAddressV3Data,
            gcForm: customer()
        }
    },
    mixins: [validateMixins],
    verify: {
        gcForm: {
            // cid: [{
            //     test: required,
            //     message: '请选择城市'
            // }],
            name: [{
                test: required,
                message: '请输入客户名称'
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
            return this.factoryId ? '编辑客户' : '新增客户'
        }
    },
    methods: {
        onSubmitConfirm() {

        }
    }
}
</script>
