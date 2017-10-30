<template>
    <div class="business-goods-brand gc-container has-header">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="closeBrandVisable" class="gc-header">选择商品品牌
            <div slot="right" @click.prevent="openAddBrandVisable">
                <i class="iconfont icon-roundadd"></i>
            </div>
        </x-header>
        <ul class="brand-list" v-if="brandList.length > 0">
            <li class="brand-item vux-flexbox" v-for="(item,index) in brandList" :key="index">
                <div class="flex-one" @click.prevent.stop="selectBrandName(item)">{{item.name}}</div>
                <div @click.prevent.stop="delBrand(item.name)" v-if="!item.type">
                    <i class="iconfont icon-delete"></i>
                </div>
            </li>
        </ul>
        <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="brandList.length == 0"></empty>
        <div v-transfer-dom>
            <popup v-model="addBrandVisable" width="100%" height="100%" position="right" class="cate-popup" style="z-index:502">
                <add-brand @close-add-brand="addBrandBack"></add-brand>
            </popup>
        </div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import Empty from '@/common/empty'
import AddBrand from '@/components/business/AddBrand'
export default {
    name: 'business-goods-brand',
    title: '商品品牌',
    components: {
        Empty,
        AddBrand
    },
    data() {
        return {
            brandList: [],
            brandName: '',
            addBrandVisable: false,
            type: ''
        }
    },
    created() {
        this.getGoodsFilter()
    },
    computed: {
        emptyText() {
            return "该分类暂无品牌哦"
        },
        iconEmpty() {
            return 'icon-empty'
        },
        ...mapGetters(['userSid'])
    },
    methods: {
        async getGoodsFilter() {
            let _result = await this.$api.goodsFilter(this.userSid)
            if (_result) {
                this.brandList = _result.brand;
                this.brandList.unshift({
                    name: '无',
                    type: 'none'
                })
            }

        },
        openAddBrandVisable() {
            this.addBrandVisable = true
        },
        //关闭弹框
        closeBrandVisable(brandName) {
            this.$emit('close-brand-visable', brandName);
        },

        selectBrandName(item) {
            this.closeBrandVisable(item)
        },
        addBrandBack() {
            this.addBrandVisable = false;
            this.getGoodsFilter()
        },
        delBrand(name) {
            let self = this;
            this.$vux.confirm.show({
                title: "提示",
                content: "确定删除品牌么？",
                onCancel() { },
                onConfirm() {
                    self.$api.goodsDelBrand(self.userSid, name).then(d => {
                        if (d) {
                            self.$vux.toast.show({
                                text: '删除成功',
                                type: 'success'
                            });
                            self.getGoodsFilter()
                        }
                    })
                }
            })

        }
    }
}
</script>
<style lang="scss" scoped>
.business-goods-brand {
    .icon-roundadd {
        font-size: 20px;
    }
    .brand-list {
        li {
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            background-color: #f5f5f5;
            border-top: 1px solid #e5e5e5;
            padding: 0 20px;
            &:first-child {
                border-top: 0;
            }
        }
    }
}
</style>