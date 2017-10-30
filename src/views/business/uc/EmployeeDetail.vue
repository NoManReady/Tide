<template>
    <div>
        <x-header :left-options="{backText: '',preventGoBack:true}" class="gc-header" @on-click-back="onClickBack">员工详情
            <a href="javascript:;" slot="right" @click="toEdit">编辑</a>
        </x-header>
        <group label-width="100px">
            <cell title="员工账号" :value="info.umobile">
            </cell>
            <cell title="员工姓名" :value="info.uname"></cell>
            <cell title="员工角色" :value="getNameById(info.roleid)"></cell>
            <cell title="状态" :value="info.status===1?'已启用':'已禁用'"></cell>
            <cell title="备注" :value="info.remark"></cell>
        </group>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/model'
const employee = model.employeeFn
export default {
    name: 'business-uc-employee-detail',
    data() {
        return {
            employeeId: '',
            info: employee()
        }
    },
    computed: {
        ...mapGetters(['userSid', 'employeeRoleFilter'])
    },
    async created() {
        this.employeeId = this.$route.params.employeeId
        await this.getEmployeeFilter()
        await this.getInfo()
    },
    methods: {
        ...mapActions(['getEmployeeFilter']),
        // 获取详情
        async getInfo() {
            let _result = await this.$api.manageGetEmployeeDetail({ employee_id: this.employeeId, sid: this.userSid })
            this.info = _result
        },
        // 返回列表
        onClickBack() {
            this.$router.replace({ name: 'businessUcEmployeeList' })
        },
        // 编辑
        toEdit() {
            this.$router.push({ name: 'businessUcEmployeeEdit', params: { employeeId: this.employeeId } })
        },
        // 获取角色名
        getNameById(id) {
            let _role = this.employeeRoleFilter.find(role => {
                return role.roleid === id
            })
            return _role ? _role.rolename : '未知'
        }
    }

}
</script>

