<template>
    <div class="platform-category-add gc-container has-header gc-form">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="backBrand" class="gc-header">新增商品品牌</x-header>
        <group>
            <x-input title="品牌名称" text-align="right" v-model="gcForm.name" placeholder="请填写品牌名称" v-verify="gcForm.name"></x-input>
        </group>

        <div class="mg10">
            <x-button type="primary" @click.native="onSubmit">保存</x-button>
        </div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    required
} from '@/utils/validateGroup'
import validateMixins from '@/mixins/validateMixins'
export default {
    name: 'platform-brand-add',
    data() {
        return {
            gcForm: {
                sid: '',
                name: ''
            }
        }
    },
    created() {

    },
    computed: {
        ...mapGetters(['userSid'])
    },
    mixins: [validateMixins],
    verify: {
        gcForm: {
            name: [{
                test: required,
                message: '请填写品牌名称'
            }]
        }
    },
    components: {},
    methods: {
        backBrand() {
            this.$emit('close-add-brand')
        },

        //提交
        onSubmitConfirm() {
            let self = this;
            this.gcForm.sid = this.userSid;
            this.$api.goodsAddBrand(this.gcForm)
                .then(d => {
                    this.$vux.toast.show({
                        text: '新增成功',
                        type: 'success',
                        time: 1000,
                        onHide() {
                            self.backBrand()
                        }
                    });


                })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>