<template>
    <div class="business-goods-index">
        <x-header :left-options="headerLeftOptions" @on-click-back="toBusinessGoods" class="x-header" v-if="showHeader">
            {{pageTitle}}
            <div slot="right" class="cart-box" @click="toBusinessCart" v-if="showIconCart">
                <badge :text="cartNum" v-if="cartNum > 0"></badge>
                <i class="iconfont icon-cart"></i>
            </div>
        </x-header>
        <div class="search-sort-bar vux-flexbox" :class="{'no-header':!showHeader}">
            <div class="search flex-one ml10" @click="showSearchBar=true">
                <div class="search-input ellipsis">
                    <i class="iconfont icon-search"></i>
                    <span class="fc-9">
                        {{query.keyword || '商品名称/品牌/货号'}}
                    </span>
                </div>
            </div>
            <div class="filter pl10 pr5" @click="openFilter">
                <i class="iconfont icon-filter"></i>
            </div>
            <div class="add-goods pl5 pr10" @click="addGoods('add')">
                <i class="iconfont icon-roundadd"></i>
            </div>
        </div>
        <gc-search history-key="goodsList" :word.sync="query.keyword" v-model="showSearchBar" :search-fn="onSearch" placeholder="商品名称/品牌/货号"></gc-search>
        <!---->
        <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="scrollTop" :style="{'margin-top':showHeader?'92px':'46px'}">
            <div class="goods-wrapper">
                <ul class="list goods-list">
                    <li v-for="(item,index) in scrollerParams.items" @click.prevent.stop="toGoodsDetail(item.goods_id)" :key="item.goods_id">
                        <div class="goods-img">
                            <img :src="item.thumb" alt="">
                        </div>
                        <div class="goods-info-box">
                            <div class="goods-name ell-2">
                                <span>
                                    {{item.title}}
                                </span>
                                <i class="goods-info-type" v-show="item.is_clean">清</i>
                            </div>
                            <div class="goods-desc">
                                <span>{{item.specn}}种规格</span>
                                <span class="pl20">货号：{{item.code}}</span>
                            </div>
                            <div class="goods-price vux-flexbox">
                                <div class="price">
                                    <em class="f-theme">￥
                                        <span class="big-price" v-if="clientId || (!clientId&&!factoryId)">{{item.sales_price}}</span>
                                        <span class="big-price" v-if="factoryId">{{item.buy_price}}</span>
                                        <span class="small-price">
                                        </span>
                                    </em>
                                </div>
                                <i v-if="showIconCart" class="iconfont icon-cart" @click.prevent.stop="openNature(item)"></i>
                                <div class="btn-box" v-if="!showIconCart">
                                    <div class="btn-box-inner vux-flexbox">
                                        <div class="btn-box-item mr5" @click.prevent.stop="addGoods('edit',item.goods_id)">
                                            <x-button mini type="default">编辑</x-button>
                                        </div>
                                        <div class="btn-box-item" @click.prevent.stop="delGoods(item.goods_id)">
                                            <x-button mini type="warn">删除</x-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </b-scroll>
        <!--filter筛选弹框-->
        <div v-transfer-dom>
            <popup v-model="rightVisible" width="85%" height="100%" position="right" class="filter-popup">
                <div class="filter-content">
                    <div class="filter-title vux-flexbox">
                        标签
                    </div>
                    <div class="brand-list filter-list vux-flexbox">
                        <div class="filter-item" @click="selectTags(item,index)" :class="{'filter-item-selected':tagsValue == item.name}" v-for="(item,index) in tags" :key="index">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="filter-content">
                    <div class="filter-title vux-flexbox">
                        品牌
                        <!-- <i class="iconfont icon-roundadd" @click.prevent="toAddBrand"></i> -->
                    </div>
                    <div class="brand-list filter-list vux-flexbox">
                        <div class="filter-item" @click="selectBrand(item,index)" :class="{'filter-item-selected':brandValue == item.name}" v-for="(item,index) in goodsBrand" :key="index" v-if="goodsBrand.length > 0">
                            <span>{{item.name}}</span>
                        </div>
                        <p class="pt10 plr10 tc" v-if="goodsBrand.length == 0" style="width:100%">
                            还未有品牌，请添加
                        </p>
                    </div>
                </div>
                <group>
                    <cell>
                        <span slot="title">分类</span>
                        <div slot="value" @click.prevent.stop="cateVisible = true">
                            <input type="text" class="weui-input fc-3 tr" placeholder="请选择分类" v-model="cateValue" disabled>
                        </div>
                    </cell>
                </group>
                <group title="时间区间">
                    <datetime v-model="query.sdate" title="开始时间" :end-date="query.edate"></datetime>
                    <datetime v-model="query.edate" title="结束时间" :start-date="query.sdate"></datetime>
                </group>
                <div class="filter-footer vux-flexbox">
                    <a href="javascript:;" class="flex-one btn" @click="clearFilter">重置</a>
                    <a href="javascript:;" class="flex-one btn btn-ok" @click="goSearch">确定</a>
                </div>
            </popup>
        </div>
        <div v-transfer-dom>
            <popup v-model="natureVisible" width="100%" height="80%" position="bottom" v-if="natureVisible">
                <nature-popup :sid="userSid" :client-id="clientId" :factory-id="factoryId" :goods-detail="itemObj" :goods-stock="goodsStock.group" @closepop="closeNature"></nature-popup>
            </popup>
        </div>
        <div v-transfer-dom>
            <popup v-model="cateVisible" width="85%" height="100%" position="right" class="cate-popup">
                <category view-type="filter" @close-cate-visable="selectCateBack"></category>
            </popup>
        </div>
    </div>
</template>
<script>
import {
    TransferDom,
    Badge,
    Popup,
    Group,
    Checker,
    CheckerItem
} from 'vux';
import GcSearch from '@/common/search'
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
import naturePopup from '@/components/business/nature-popup'
import Category from '@/components/business/Category'
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    loadFromLocal
} from '@/utils/localStorage'
import {
    isEmpty
} from '@/utils'
export default {
    name: 'business-goods-index',
    title: '商品列表',
    directives: {
        TransferDom
    },
    components: {
        Badge,
        Popup,
        Group,
        GcSearch,
        BScroll,
        Checker,
        CheckerItem,
        naturePopup,
        Category
    },
    data() {
        return {
            cateVisible: false,
            rightVisible: false,
            natureVisible: false,
            showSearchBar: false,
            showIconCart: false,
            query: {
                sid: '',
                tags: '',
                keyword: this.$route.query.keyword || '',
                cate_id: '',
                brand_name: '',
                tags: '',
                sdate: '',
                edate: '',
                order: '',
                page: ''
            },
            tags: [
                {key: 'clean', name: '尾货'},
                {key: 'hot', name: '爆款'},
                {key: 'new', name: '新款'}
            ],
            itemObj: {},
            showHeader: true,
            goodsStock: {},
            brandValue: '',
            cateValue: '',
            tagsValue: ''
        }
    },
    mixins: [bscrollMixins],
    created() {
        this.getGoodsFilter(this.userSid);
        let isBuy = this.$route.query.isBuy;
        let showTabbar = typeof isBuy == 'undefined' ? true : false;
        this.showHeader = typeof isBuy == 'undefined' ? false : true;
        this.showIconCart = typeof isBuy == 'undefined' ? false : true;
        this.setCommonTabbar(showTabbar);
        let ids = {
            sid: this.userSid,
            client_id: this.clientId,
            factory_id: this.factoryId,
        };
        this.getCartInfo(ids)
    },
    computed: {
        ...mapGetters(['userSid', 'goodsBrand', 'customerOrFactoryInfo', 'cartInfo']),
        pageTitle() {
            let title = ''
            let isBuy = this.$route.query.isBuy;
            if (typeof isBuy == 'undefined') {
                title = '搜索'
                this.showHeader = false
            } else {
                title = isBuy == 1 ? '采购' : '开单'
            }
            return title;
        },
        headerLeftOptions() {
            let isBuy = this.$route.query.isBuy;
            let showBack = typeof isBuy == 'undefined' ? false : true;
            let backText = this.customerOrFactoryInfo.name;
            let leftOptions = {
                showBack: showBack,
                backText: backText,
                preventGoBack: true
            }
            return leftOptions;
        },
        clientId() {
            let clientId = this.$route.query.clientId || '';
            return clientId;
        },
        factoryId() {
            let factoryId = this.$route.query.factoryId || '';
            return factoryId;
        },
        cartNum() {
            let num = this.cartInfo.goods_count;
            return num;
        },
        scrollTop() {
            let top = this.showHeader ? 46 : 100;
            return top;
        },
        emptyText() {
            return "暂无分类哦！"
        },
        iconEmpty() {
            return 'icon-empty'
        },
    },

    methods: {
        ...mapActions(['getGoodsFilter', 'setCommonTabbar', 'getCartInfo']),
        //获取商品列表
        async _loadList() {
            this.query.sid = this.userSid || '';
            let _result = await this.$api.goodsGetList(this.assignQuery(this.query))
            return _result;
        },
        //获取商品规格库存等
        async goodsGetStock(goodsId) {
            let _result = await this.$api.goodsGetStock({
                sid: this.userSid,
                client_id: this.clientId,
                factory_id: this.factoryId,
                goods_id: goodsId,
            });
            if (_result) {
                this.$nextTick(() => {
                    this.goodsStock = _result;
                    this.natureVisible = true;
                })
            }
        },
        //打开筛选框
        openFilter() {
            this.getGoodsFilter(this.userSid);

            this.rightVisible = true;

        },

        //得到分类信息
        selectCateBack(cateItem) {
            if (cateItem) {
                this.cateValue = cateItem.cateName;
                this.query.cate_id = cateItem.cateId;
            }

            this.cateVisible = false;
        },

        //选择标签
        selectTags(item, index) {
            this.tagsValue = item.name;
            this.query.tags = item.key;
        },

        //选择品牌
        selectBrand(item, index) {
            this.brandValue = item.name;
            this.query.brand_name = item.name;
        },

        //清除筛选
        clearFilter() {
            this.cateValue = '';
            this.brandValue = '';
            this.tagsValue = '';
            this.query.cate_id = '';
            this.query.brand_name = '';
            this.query.tags = '';
            this.query.sdate = '';
            this.query.edate = '';
        },
        //筛选确定
        goSearch() {
            // this.cateVisible = false;
            this.rightVisible = false;
            this.query.page = 1;
            this.onFresh();
        },
        //打开购物车
        openNature(item) {
            this.itemObj = {
                goods_id: item.goods_id,
                title: item.title,
                thumb: item.thumb,
                code: item.code,
                sales_price: this.clientId ? item.sales_price : item.buy_price
            };

            // this.natureVisible = true;
            //运行获取商品规格
            this.goodsGetStock(this.itemObj.goods_id);
        },

        //关闭购物车弹框
        closeNature() {
            this.natureVisible = false;
        },
        //添加商品
        addGoods(type, goodsId) {
            this.$router.push({
                name: 'businessAddGoods',
                query: type == 'edit' ? {
                    goodsId: goodsId || ''
                } : {}
            })
        },
        //删除商品
        delGoods(goodsId) {
            let self = this;
            this.$vux.confirm.show({
                title: "提示",
                content: "确定删除商品么？",
                onCancel() { },
                onConfirm() {
                    self.$api.goodsDelGoods(self.userSid, goodsId).then(d => {
                        if (d) {
                            self.$vux.toast.show({
                                text: '删除成功',
                                type: 'success'
                            });
                            self.onFresh();
                        }
                    })
                }
            })

        },
        //商品详情
        toGoodsDetail(goodsId) {
            this.$router.push({
                name: 'businessGoodsDetail',
                query: {
                    goodsId: goodsId,
                    factoryId: this.factoryId,
                    clientId: this.clientId
                }
            })
        },
        toBusinessCart() {
            this.$router.push({
                name: 'businessCart',
                query: {
                    clientId: this.clientId,
                    factoryId: this.factoryId
                }
            })
        },
        toBusinessGoods() {
            this.$router.push({
                name: 'businessGoods'
            })
        }

    }
}
</script>
<style lang="less">
.filter-content {
    .weui-cells {
        background: transparent;
    }
}
</style>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.business-goods-index {
    /*header*/
    .x-header {
        position: fixed
    }
}

.goods-info-type {
    position: absolute;
    right: -2px;
    top: -12px;
    background: rgba(4, 251, 8, 0.5);
    -webkit-transform: rotate(-30deg);
    transform: rotate(-30deg);
    border-radius: 2px;
    color: #f04134;
    font-size: 12px;
    padding: 10px 3px;
}

/*search-filter*/

.search-sort-bar {
    height: 44px;
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 12;
    width: 100%;
    background-color: #fff;
    &.no-header {
        top: 0;
    }
    @include border-1px(#e5e5e5, after, bottom);
    .iconfont {
        font-size: 22px;
    }
    .category {}
    .search {
        border: 1px solid #e5e5e5;
        border-radius: 20px;
        background-color: #e3e3e5;
        padding: 4px 10px;
        .search-input {
            padding-right: 15px;
            .iconfont {
                font-size: 15px;
            }
            span {}
        }
    }
}






/*goods-list*/

.goods-wrapper {
    max-width: 640px;
    min-width: 320px;
    margin: 0px auto;
}

.filter-popup {
    /*background-color: #fff;*/
}

.filter-content {
    position: relative;
    background-color: #fff;
    @include border-1px(#e5e5e5, before, top);
    @include border-1px(#e5e5e5, after, bottom);
    .filter-title {
        @include justify-content(space-between);
        font-size: 15px;
        padding: 10px 10px 0;
        .iconfont {
            font-size: 20px;
        }
    }
    .filter-list {
        @include flex-wrap(wrap);
        padding: 0 10px 10px 0;
        max-height: 280px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .filter-item {
            height: 32px;
            width: 33%;
            color: #232326;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-left: 10px;
            margin-top: 10px;
            span {
                height: 31px;
                display: block;
                padding-left: 5px;
                padding-right: 5px;
                text-align: center;
                line-height: 32px;
                background-color: #f0f2f5;
                border-radius: 5px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .filter-item-selected {
            span {
                background-color: $theme;
                color: #fff;
            }
        }
    }
}

.filter-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    @include border-1px(#e5e5e5, before, top);
    >.btn {
        width: 50%;
        padding: 15px 0;
        font-size: 16px;
        text-align: center;
        &.btn-ok {
            background-color: $theme;
            color: #fff;
        }
    }
}

.cate-popup {
    background-color: #fff;
}
</style>