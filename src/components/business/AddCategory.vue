<template>
    <div class="platform-category-add gc-container has-header gc-form">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="backCategory" class="gc-header">{{cate.isEdit? '编辑' : '新增'}}商品分类</x-header>
        <group>
            <cell is-link v-if="!cate.isEdit">
                <span slot="title">上级分类</span>
                <div slot="value" @click.prevent="toCategory">
                    <input type="text" class="weui-input tr" v-model="cate.cateName" placeholder="请选择分类" v-verify="gcForm.pid" disabled>
                </div>
            </cell>
            <x-input title="分类名称" text-align="right" v-model="gcForm.name" placeholder="请填写分类名称" v-verify="gcForm.name"></x-input>
        </group>

        <div class="mg10">
            <x-button type="primary" @click.native="onSubmit">保存</x-button>
        </div>
    </div>
</template>
<script>
import validateMixins from '@/mixins/validateMixins'
import {
    required
} from '@/utils/validateGroup'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'platform-category-add',
    components: {},
    props: ['cate'],
    data() {
        return {
            gcForm: {
                sid: '',
                pid: '',
                name: ''
            }
        }
    },
    created() {
        if (this.cate.isEdit) {
            this.gcForm.cate_id = this.cate.cateId;
            this.gcForm.name = this.cate.cateName;
        }

    },
    computed: {
        ...mapGetters(['userSid'])
    },
    mixins: [validateMixins],
    verify: {
        gcForm: {
            name: [{
                test: required,
                message: '请填写分类名称'
            }]
        }
    },
    methods: {
        toCategory() {
            this.$emit('close-add-cate', 'select')
        },
        backCategory() {
            this.$emit('close-add-cate', 'success')
        },

        //提交
        onSubmitConfirm() {
            let self = this;
            this.gcForm.sid = this.userSid;
            this.gcForm.pid = this.cate.cateId;
            if (this.cate.isEdit) {
                this.$api.goodsUpdateCate(this.gcForm)
                    .then(d => {
                        this.$vux.toast.show({
                            text: '更新成功',
                            type: 'success',
                            time: 1000,
                            onHide() {
                                self.backCategory()
                            }
                        });
                    })
            } else {
                this.$api.goodsAddCate(this.gcForm)
                    .then(d => {
                        this.$vux.toast.show({
                            text: '保存成功',
                            type: 'success',
                            time: 1000,
                            onHide() {
                                self.gcForm.name = '';
                                self.backCategory()
                            }
                        });
                    })
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>