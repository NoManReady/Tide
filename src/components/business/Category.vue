<template>
    <div class="gc-container business-goods-category">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="closeCateVisable" class="">选择商品分类
            <div slot="right" @click.prevent="openAddCateVisable" v-if="viewType=='add'">
                <i class="iconfont icon-roundadd"></i>
            </div>
        </x-header>
        <ul class="category-list" v-if="goodsCate.length > 0">
            <li class="category-item" v-for="(item,index) in goodsCate" :key="index">
                <div class="item-name vux-flexbox" @click.prevent="selectCategory(item,item.child)">
                    <div class="flex-one">{{item.name}}</div>
                    <div class="cate-item-operate" v-if="showCateOpreate">
                        <span class="btn-edit" @click.prevent.stop="editCate(item)">
                            <i class="iconfont icon-edit"></i>
                        </span>
                        <span class="btn-del" @click.prevent.stop="delCate(item)">
                            <i class="iconfont icon-delete"></i>
                        </span>
                    </div>
                    <!-- <i class="iconfont icon-fold" v-if="item.child.length>0" :class="{'icon-unfold':item.showChild}"></i> -->
                </div>
                <div class="sub-category-list" v-if="item.child.length>0 && showCateItem" :class="{'active':item.showChild}">
                    <div class="sub-cate-item vux-flexbox" v-for="(item1,index1) in item.child" :key="index1" @click.prevent="getCategoryId(item1)" :class="{'selected':cate.cateId == item1.cate_id}">
                        <div class="flex-one">
                            {{item1.name}}
                        </div>
                        <div class="cate-item-operate" v-if="showCateOpreate">
                            <span class="btn-edit" @click.prevent.stop="editCate(item1)">
                                <i class="iconfont icon-edit"></i>
                            </span>
                            <span class="btn-del" @click.prevent.stop="delCate(item1)">
                                <i class="iconfont icon-delete"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="goodsCate.length == 0"></empty>
        <div v-transfer-dom>
            <popup v-model="addCateVisible" width="100%" height="100%" position="right" class="cate-popup" style="z-index:502" v-if="addCateVisible">
                <add-category :cate="cate" @close-add-cate="addCateBack"></add-category>
            </popup>
        </div>
    </div>
</template>
<script>
import Empty from '@/common/empty'
import AddCategory from '@/components/business/AddCategory'
import {
    isEmpty
} from '@/utils'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    components: {
        Empty,
        AddCategory
    },
    props: {
        viewType: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            cate: {
                cateId: '',
                cateName: '',
                pId: ''
            },
            goodsCate: [],
            addCateVisible: false,
            editCateVisible: false,
            type: '',
            showCateItem: true,
            showCateOpreate: true
        }
    },
    computed: {
        emptyText() {
            return "该分类暂无子分类哦"
        },
        iconEmpty() {
            return 'icon-empty'
        },
        ...mapGetters(['userSid'])

    },
    created() {
        this.getGoodsFilter();
        this.showCateOpreate = this.viewType == 'filter' ? false : true;
    },
    methods: {
        async getGoodsFilter() {
            let _result = await this.$api.goodsFilter(this.userSid)
            if (_result) {
                this.goodsCate = _result.cate;
                if (this.viewType == 'filter') {
                    this.goodsCate.unshift({
                        cate_id: 0,
                        pid: 0,
                        name: '全部分类',
                        child: []
                    })
                }

                // this.goodsCate.forEach((item) => {
                //     this.$set(item, 'showChild', true)
                // });
            }

        },
        selectCategory(cateItem, child) {
            if (this.type == 'select') {
                // cateItem.showChild = false;
                this.cate.cateId = cateItem.cate_id;
                this.cate.cateName = cateItem.name;
                this.addCateVisible = true;
                return;
            }

            if (this.viewType == 'filter') {
                this.getCategoryId(cateItem);
            } else {

                if (!isEmpty(child)) {
                    // cateItem.showChild = !cateItem.showChild;
                } else {
                    if (this.type == 'select') {
                        return;
                    }
                    this.getCategoryId(cateItem);
                }
            }

        },
        getCategoryId(cateItem) {
            this.cate.cateId = cateItem.cate_id;
            this.cate.cateName = cateItem.name;
            this.closeCateVisable(this.cate)

        },
        //关闭弹框
        closeCateVisable(cate) {
            this.$emit('close-cate-visable', cate);
        },
        openAddCateVisable() {
            this.cate = {
                cateId: 0,
                cateName: '无',
                pId: 0
            };
            this.addCateVisible = true;
        },
        addCateBack(type) {
            this.type = type;
            this.showCateItem = type == 'select' ? false : true;
            this.showCateOpreate = type == 'select' ? false : true;
            this.addCateVisible = false;
            // if (type == 'success') {
            this.getGoodsFilter()
            // }

            //    this.closeCateVisable(addCate)
        },
        editCate(item) {
            this.cate = {
                cateId: item.cate_id,
                cateName: item.name,
                pId: item.pid,
                isEdit: true
            };
            this.addCateVisible = true;
        },
        delCate(item) {
            let self = this;
            this.$vux.confirm.show({
                title: "提示",
                content: "确定删除该分类么？",
                onCancel() { },
                onConfirm() {
                    self.$api.goodsDelCate(self.userSid, item.cate_id).then(d => {
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
@import '../../style/scss/_mixin.scss';
@import '../../style/scss/_available.scss';
.business-goods-category {
    .icon-roundadd {
        font-size: 20px;
        padding: 10px 0 10px 10px;
        touch-action: none;
    }
}

.category-list {
    .category-item {
        line-height: 44px;
        position: relative;
        color: #333;
        font-size: 15px;
        .item-name {
            @include justify-content(space-between);
            widows: 100%;
            padding: 0 10px;
            height: 44px;
        }
        @include border-1px(#e8e8e8, after, bottom);
        .cate-item-operate {
            span {
                display: inline-block;
                padding: 0 15px;
                i {
                    font-size: 18px;
                    color: #333
                }
            }
        }
    }
    .sub-category-list {
        // display: none;
        background-color: #f5f5f5;
        &.active {
            display: block;
        }
        .sub-cate-item {
            padding: 0 10px;
            line-height: 44px;
            position: relative;
            color: #333;
            @include border-1px(#e8e8e8, before, top);
            &.selected {
                color: $theme;
            }
        }
    }
}
</style>