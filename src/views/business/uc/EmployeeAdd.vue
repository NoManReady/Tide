<template>
    <div>
        <x-header :left-options="{backText: ''}" class="gc-header">
            <span>{{title}}</span>
            <a href="javascript:;" slot="right" @click='onSubmit'>保存</a>
        </x-header>
        <group label-width="100px" class="gc-form">
            <x-input title="员工账号" placeholder="手机号" v-model="gcForm.umobile" type="tel" v-verify="gcForm.umobile" v-if="!employeeId">
                <i class="iconfont icon-post" slot="right"></i>
            </x-input>
            <selector title="员工角色" placeholder="请选择" :options="roleList" v-model="gcForm.roleid"></selector>
            <x-switch title="状态" v-model="gcForm.status" v-if="employeeId"></x-switch>
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
const employee = model.employeeFn
export default {
    name: 'business-uc-employee-add',
    data() {
        return {
            employeeId: '',
            gcForm: employee()
        }
    },
    mixins: [validateMixins],
    verify: {
        gcForm: {
            umobile: [{
                test: required,
                message: '请输入员工账号（联系电话）'
            }, 'phone'],
            roleid: [{
                test: required,
                message: '请选择员工角色'
            }]
        }
    },
    async created() {
        this.employeeId = this.$route.params.employeeId
        await this.getEmployeeFilter()
        if (this.employeeId) {
            await this.getInfo()
        }
    },
    computed: {
        ...mapGetters(['userSid', 'employeeRoleFilter']),
        roleList() {
            return this.employeeRoleFilter.map(role => {
                return { key: role.roleid, value: role.rolename }
            })
        },
        title() {
            return this.employeeId ? '编辑员工' : '新增员工'
        }
    },
    methods: {
        ...mapActions(['getEmployeeFilter']),
        // 获取详情
        async getInfo() {
            let _result = await this.$api.manageGetEmployeeDetail({ employee_id: this.employeeId, sid: this.userSid })
            this.gcForm = Object.assign({}, _result, { status: _result.status === 1 })
        },
        // 表单确认
        onSubmitConfirm() {
            let _method = `manage${this.employeeId ? 'Update' : 'Add'}Employee`
            this.$api[_method](Object.assign({}, this.gcForm, { sid: this.userSid, employee_id: this.employeeId, status: this.gcForm.status ? 1 : 0 }))
                .then(d => {
                    if (d) {
                        if (this.employeeId) {
                            this.$vux.toast.show({
                                text: '编辑成功',
                                type: 'success'
                            })
                            this.$router.replace({ name: 'businessUcEmployeeDetail', params: { employeeId: this.employeeId } })
                        } else {
                            this.$vux.toast.show({
                                text: '新增成功',
                                type: 'success'
                            })
                            this.$router.replace({ name: 'businessUcEmployeeList' })
                        }
                    }
                })
        }
    }

}
</script>

