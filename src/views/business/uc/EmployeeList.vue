<template>
    <div class="business-uc-employee-list gc-container has-header has-footer">
        <x-header :left-options="{backText:''}" class="gc-header">
            <span>员工列表</span>
            <a href="javascript:;" slot="right" @click="toAdd">
                <i class="iconfont icon-roundadd fs22"></i>
            </a>
        </x-header>
        <group v-for="(item,index) in items" :class="{'no-margin-group':index===0}" :key="item.employee_id" @click.native="toDetail(item.employee_id)">
            <cell>
                <div slot="title">{{item.uname}}</div>
                <div slot="value" class="value f-red">{{item.status===0?'禁用':'启用'}}</div>
            </cell>
            <cell>
                <div slot="title">{{getNameById(item.roleid)}}</div>
                <div slot="value" class="value fc-6">{{item.umobile}}</div>
            </cell>
        </group>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ElButton from '@/components/common/button'
export default {
    name: 'business-uc-employee-list',
    title: '员工列表',
    data() {
        return {
            items: []
        }
    },
    created() {
        this.getEmployeeFilter()
        this._loadList()
    },
    components: {
        ElButton
    },
    computed: {
        ...mapGetters(['userSid', 'employeeRoleFilter'])
    },
    methods: {
        ...mapActions(['getEmployeeFilter']),
        // 加载订单列表
        async _loadList() {
            let _result = await this.$api.manageGetEmployeeList(this.userSid)
            this.items = Object.freeze(_result.list)
        },
        // 员工详情
        toDetail(employeeId) {
            this.$router.push({ name: 'businessUcEmployeeDetail', params: { employeeId } })
        },
        // 添加员工
        toAdd() {
            this.$router.push({name: 'businessUcEmployeeAdd'})
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
<style lang="scss" scoped>

</style>
