<template>
    <div>
        <x-header :left-options="{backText: ''}" class="gc-header">搬运详情
            <a href="javascript:;" slot="right" @click="toEdit">编辑</a>
        </x-header>
        <group label-width="100px">
            <cell title="搬运账号" :value="info.umobile">
            </cell>
            <cell title="标记名称" :value="info.dname"></cell>
            <cell title="状态" :value="info.status===1?'已启用':'已禁用'"></cell>
            <cell title="备注" :value="info.remark"></cell>
        </group>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/model'
const deliver = model.deliverFn
export default {
    name: 'business-uc-deliver-detail',
    data() {
        return {
            deliverId: '',
            info: deliver()
        }
    },
    computed: {
        ...mapGetters(['userSid'])
    },
    async created() {
        this.deliverId = this.$route.params.deliverId
        await this.getInfo()
    },
    methods: {
        // 获取详情
        async getInfo() {
            let _result = await this.$api.manageGetDeliverDetail({ deliver_id: this.deliverId, sid: this.userSid })
            this.info = _result
        },
        // 编辑
        toEdit() {
            this.$router.push({ name: 'businessUcDeliverEdit', params: { deliverId: this.deliverId } })
        }
    }

}
</script>

