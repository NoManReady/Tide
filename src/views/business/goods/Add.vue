<template>
    <div class="business-goods-add gc-container has-header gc-form">
        <x-header :left-options="{backText: '',preventGoBack:true}" class="gc-header" @on-click-back="toGoodsList">{{title}}</x-header>
        <group>

            <!--<cell is-link>
                                                                                                                                                                                                                <span slot="title">分类</span>
                                                                                                                                                                                                                <div slot="value" @click.prevent.stop="cateVisible=true">
                                                                                                                                                                                                                    <input type="text" class="weui-input fc-3 tr" v-model="cateValue" placeholder="请选择分类" v-verify="gcForm.cate_id" disabled>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </cell>-->
            <x-input title="分类" text-align="right" v-model="cateValue" placeholder="请选择分类" v-verify="gcForm.cate_id" @on-focus="cateVisible=true" :show-clear="false"></x-input>
            <x-input title="品牌" text-align="right" v-model="gcForm.brand_name" placeholder="请选择品牌" v-verify="gcForm.brand_name" @on-focus="brandVisible=true" :show-clear="false"></x-input>
            <!--<cell is-link>
                                                                                                                                                                                                                <span slot="title">品牌</span>
                                                                                                                                                                                                                <div slot="value" @click.prevent.stop="brandVisible=true">
                                                                                                                                                                                                                    <input type="text" class="weui-input fc-3 tr" v-model="gcForm.brand_name" placeholder="请选择品牌" v-verify="gcForm.brand_name" disabled>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </cell>-->
            <x-input title="名称" text-align="right" v-model="gcForm.title" placeholder="请填写商品名称" v-verify="gcForm.title"></x-input>
            <x-input title="货号" text-align="right" v-model="gcForm.code" placeholder="请填写商品货号" v-verify="gcForm.code"></x-input>
        </group>
        <group>
            <x-input title="进货价" text-align="right" v-model="gcForm.buy_price" placeholder="请填写商品进货价" v-verify="gcForm.buy_price"></x-input>
            <x-input title="销售价" text-align="right" v-model="gcForm.sales_price" placeholder="请填写商品销售价" v-verify="gcForm.sales_price"></x-input>

            <x-input title="颜色" text-align="right" v-model="colorProp" placeholder="请输入颜色" v-if="!goodsId">
                <x-button class="ml10" slot="right" type="primary" mini @click.native.prevent.stop="addColorProp">添加</x-button>
            </x-input>
            <div class="prop-checker-list" v-if="!goodsId && colorArr.length > 0">
                <checker v-model="colorSpecs" type="checkbox" default-item-class="prop-checker-item" selected-item-class="prop-checker-item-selected">
                    <checker-item v-for="(item,index) in colorArr" :key="index" :value="item" @on-item-click="colorPropClick">
                        {{item}}
                    </checker-item>
                </checker>
            </div>

            <x-input title="尺码" text-align="right" v-model="sizeProp" placeholder="请输入尺码如M" v-if="!goodsId">
                <x-button class="ml10" slot="right" type="primary" mini @click.native.prevent.stop="addSizeProp">添加</x-button>
            </x-input>
            <div class="prop-checker-list" v-if="!goodsId && sizeArr.length > 0">
                <checker v-model="sizeSpecs" type="checkbox" default-item-class="prop-checker-item" selected-item-class="prop-checker-item-selected">
                    <checker-item v-for="(item,index) in sizeArr" :key="index" :value="item" @on-item-click="sizePropClick">
                        {{item}}
                    </checker-item>
                </checker>
            </div>
        </group>
        <group>
            <div class="ptb10">
                <check-icon :value.sync="gcForm.is_protected">仅对商友开发</check-icon>
            </div>
        </group>
        <group>
            <div class="ptb10">
                <check-icon :value.sync="gcForm.is_clean">尾货清仓</check-icon>
            </div>
        </group>
        <group>
            <div class="upload-box">
                <uploader :max="6" :upload-url="uploadUrl" :imgs.sync="gcForm.covers" v-verify="gcForm.covers" :show-header="false" v-if="!goodsId"></uploader>
                <uploader :max="6" :upload-url="uploadUrl" :imgs.sync="gcForm.covers" :default-list="gcForm.imgs" v-verify="gcForm.covers" :show-header="false" v-if="goodsId"></uploader>
                <div class=" fc-9 fs14 pb10 plr10">
                    单张大小不要超过3M
                </div>

            </div>
        </group>
        <div class="mg10">
            <x-button type="primary" @click.native="onSubmit">保存</x-button>
        </div>
        <div v-transfer-dom>
            <popup v-model="cateVisible" width="100%" height="100%" position="right" class="cate-popup" v-if="cateVisible">
                <category view-type="add" @close-cate-visable="selectCateBack"></category>
            </popup>
        </div>
        <div v-transfer-dom>
            <popup v-model="brandVisible" width="100%" height="100%" position="right" class="cate-popup" v-if="brandVisible">
                <brand @close-brand-visable="selectBrandBack"></brand>
            </popup>
        </div>

    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import validateMixins from '@/mixins/validateMixins'
import {
    required
} from '@/utils/validateGroup'
import {
    isEmpty
} from '@/utils'
import Uploader from '@/common/uploader'
import Category from '@/components/business/Category'
import Brand from '@/components/business/Brand'
import model from '@/model'
const good = model.goodFn
export default {
    name: 'business-goods-add',
    title: '新增商品',
    components: {
        Uploader,
        Category,
        Brand
    },
    data() {
        return {
            uploadUrl: this.$config.qiniuHost,
            goodsId: '',
            gcForm: good(),
            cateVisible: false,
            brandVisible: false,
            brandList: [],
            cateValue: '',
            brandValue: [],
            colorArr: [],
            colorSpecs: [],
            colorProp: '',
            sizeArr: [],
            sizeSpecs: [],
            sizeProp: '',
        }
    },
    mixins: [validateMixins],
    verify: {
        gcForm: {
            title: [{
                test: required,
                message: '请填写商品名称'
            }],
            cate_id: [{
                test: required,
                message: '请选择分类'
            }],
            // brand_name: [{
            //     test: required,
            //     message: '请选择品牌'
            // }],

            buy_price: [{
                test: required,
                message: '请填写商品进货价'
            }],
            sales_price: [{
                test: required,
                message: '请填写商品销售价'
            }]
        }
    },
    created() {
        this.gcForm.imgs = [];
        this.goodsId = this.$route.query.goodsId;
        if (this.goodsId) {
            this._loadInfo()
        } else {
            this.gcForm = Object.assign({}, this.gcForm, {
                spec_c: '',
                spec_s: ''
            })
        }
        // this.getGoodsFilter();

    },
    computed: {
        ...mapGetters(['userSid']),
        title() {
            return this.goodsId ? '编辑商品' : '新增商品'
        },
        emptyText() {
            return "暂无分类哦！"
        },
        iconEmpty() {
            return 'icon-empty'
        },

    },
    methods: {

        // 获取详情
        async _loadInfo() {
            let _result = await this.$api.goodsGetDetail({
                sid: this.userSid,
                goods_id: this.goodsId
            })
            this.$nextTick(() => {
                this.gcForm = Object.assign({}, _result, {});
                this.cateValue = this.gcForm.cate_name;
                // this.brandValue = [this.gcForm.brand_name];
                let imgsArr = [];
                _result.imgs.forEach((item) => {
                    imgsArr.push(item.id);
                });
                this.gcForm.covers = imgsArr.join(',');
                this.gcForm.is_public = _result.is_public ? true : false;
                this.gcForm.is_protected = _result.is_public ? false : true;
                this.gcForm.is_clean = _result.is_clean ? true : false;
            })

        },
        // async getGoodsFilter() {
        //     let _result = await this.$api.goodsFilter(this.userSid)
        //     if (_result) {

        //     }
        // },
        //去商品列表页
        toGoodsList() {
            this.$router.push({
                name: this.$route.query.prev ? 'businessHome':'businessGoodsList'
            })
        },

        //得到分类信息
        selectCateBack(cateItem) {
            if (cateItem) {
                this.cateValue = cateItem.cateName;
                this.gcForm.cate_id = cateItem.cateId;
            }

            this.cateVisible = false;
        },
        //得到品牌信息
        selectBrandBack(brand) {
            if (brand) {
                this.gcForm.brand_name = brand.name;
                if (brand.type) {
                    this.gcForm.brand_name = '';
                }
            }


            this.brandVisible = false;
        },
        //颜色尺码优化
        addColorProp() {
            if (!this.colorProp) {
                this.$vux.toast.text('请输入颜色');
                return;
            }
            this.colorArr.push(this.colorProp);
            this.colorSpecs.push(this.colorProp);
            this.colorProp = '';
            this.gcForm.spec_c = this.colorSpecs.join(',');
            console.log(this.gcForm.spec_c);
        },
        colorPropClick() {
            this.gcForm.spec_c = this.colorSpecs.join(',');
        },
        addSizeProp() {
            if (!this.sizeProp) {
                this.$vux.toast.text('请输入尺码');
                return;
            }
            this.sizeArr.push(this.sizeProp);
            this.sizeSpecs.push(this.sizeProp);
            this.sizeProp = '';
            this.gcForm.spec_s = this.sizeSpecs.join(',');
        },
        sizePropClick() {
            this.gcForm.spec_s = this.sizeSpecs.join(',');
            console.log(this.gcForm.spec_s);
        },
        // 提交
        onSubmitConfirm() {
            let _method = `goods${this.goodsId ? 'Update' : 'Add'}Goods`;
            let param = this.goodsId ? {
                sid: this.userSid,
                goods_id: this.goodsId
            } : {
                    sid: this.userSid
            }
            this.gcForm.is_public = !this.gcForm.is_protected;
            this.$api[_method](Object.assign({}, this.gcForm, param))
                .then(d => {
                    if (d) {
                        this.$vux.toast.show({
                            text: this.goodsId ? '编辑成功' : '新增成功',
                            type: 'success'
                        });

                        this.$router.push({
                            name: 'businessGoodsList'
                        })
                    }
                })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.cate-popup {
    background-color: #fff;
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
    }
    .sub-category-list {
        display: none;
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

.prop-checker-list {
    padding: 10px;
}

.prop-checker-item {
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
}

.prop-checker-item-selected {
    background: #ffffff url(../../../assets/checker/active.png) no-repeat right bottom;
    border-color: #ff4a00;
}
</style>