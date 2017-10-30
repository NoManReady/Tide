<template>
    <div>
        <x-header :left-options="{backText: ''}" class="gc-header">
            <span>{{title}}</span>
            <a href="javascript:;" slot="right" @click='onSubmit'>保存</a>
        </x-header>
        <group label-width="100px" class="gc-form">
            <x-input title="搬运账号" placeholder="手机号" v-model="gcForm.umobile" type="tel" v-verify="gcForm.umobile" v-if="!deliverId">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-input title="标记名称" placeholder="标记名称" v-model="gcForm.dname" v-verify="gcForm.dname">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <x-switch title="状态" v-model="gcForm.status" v-if="deliverId"></x-switch>
            <x-input title="备注" placeholder="备注" v-model="gcForm.remark">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
        </group>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import validateMixins from '@/mixins/validateMixins'
import { required } from '@/utils/validateGroup'
import model from '@/model'
const deliver = model.deliverFn
export default {
    name: 'business-uc-deliver-add',
    data() {
        return {
            deliverId: '',
            gcForm: deliver()
        }
    },
    mixins: [validateMixins],
    verify: {
        gcForm: {
            umobile: [{
                test: required,
                message: '请输入搬运账号（联系电话）'
            }, 'phone'],
            dname: [{
                test: required,
                message: '请输入编辑名称'
            }]
        }
    },
    async created() {
        this.deliverId = this.$route.params.deliverId
        if (this.deliverId) {
            await this.getInfo()
        }
    },
    computed: {
        ...mapGetters(['userSid']),
        title() {
            return this.deliverId ? '编辑搬运' : '新增搬运'
        }
    },
    methods: {
        // 获取详情
        async getInfo() {
            let _result = await this.$api.manageGetDeliverDetail({ deliver_id: this.deliverId, sid: this.userSid })
            this.gcForm = Object.assign({}, _result, { status: _result.status === 1 })
        },
        // 表单确认
        onSubmitConfirm() {
            let _method = `manage${this.deliverId ? 'Update' : 'Add'}Deliver`
            this.$api[_method](Object.assign({}, this.gcForm, { sid: this.userSid, deliver_id: this.deliverId, status: this.gcForm.status ? 1 : 0 }))
                .then(d => {
                    if (d) {
                        if (this.deliverId) {
                            this.$vux.toast.show({
                                text: '编辑成功',
                                type: 'success'
                            })
                            this.$router.replace({ name: 'businessUcDeliverDetail', params: { deliverId: this.deliverId } })
                        } else {
                            this.$vux.toast.show({
                                text: '新增成功',
                                type: 'success'
                            })
                            this.$router.replace({ name: 'businessUcDeliverList' })
                        }
                    }
                })
        }
    }

}
</script>

