<template>
    <div class="platform-business-list gc-container has-header">
        <x-header :left-options="{backText:''}" class="gc-header">
            <i class="iconfont icon-locationfill mr5"></i>
            <span>{{currentCity}}</span>
            <div slot="right" class="city-item more" @click.prevent="toBusiness">
                <span>全部商圈</span>
            </div>
        </x-header>
        <!--该城市商圈-->
        <swiper dots-class="custom-bottom" dots-position="center" @on-index-change="areaIndexChange" class="business-info" height="100px" v-model="areaIndex" v-if="showArea">
            <swiper-item class="swiper-info" v-for="(item, index) in businessAreaList" :key="index">
                <div class="vux-flexbox">
                    <div class="img-wrapper">
                        <img :src="item.cover" alt="" height="100">
                    </div>
                    <div class="info-other">
                        <p>商圈名称：{{item.name}}</p>
                        <p>厂家：{{bussinessAreaData.factory_count}}</p>
                        <p>批发商：{{bussinessAreaData.trade_count}}</p>
                        <p>零售商：{{bussinessAreaData.retail_count}}</p>
                    </div>
                </div>
            </swiper-item>
        </swiper>
        <div class="business-list">
            <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="scrollTop">
                <shop-list :shops="scrollerParams.items" :isOperate="true"></shop-list>
            </b-scroll>
        </div>
    </div>
</template>
<script>
import {
    Swiper,
    Grid,
    GridItem
} from 'vux';
import BScroll from '@/common/bscroll'
import bscrollMixins from '@/mixins/bscrollMixins'
import shopList from '@/components/shop/List'
import Empty from '@/common/empty'
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    saveToLocal,
    loadFromLocal
} from '@/utils/localStorage'
export default {
    name: 'platform-business-list',
    title: '商圈列表',
    components: {
        Swiper,
        Grid,
        GridItem,
        Empty,
        BScroll,
        shopList
    },
    data() {
        return {
            areaIndex: 0,
            currentCity: '',
            query: {
                sid: '',
                keyword: '',
                cid: loadFromLocal('city').id || '',
                aid: '',
                with_goods: '',
                page: 1,
                types: '',
                in_watch: '',
                in_fellow: ''
            },
            businessAreaList: [],
            bussinessAreaData: {},
            showArea: true,
            shopList: []
        }
    },
    mixins: [bscrollMixins],
    created() {
        this.currentCity = this.city.name || loadFromLocal('city').name;
        this.getListArea(this.query.cid);
        let hasKeyWord = this.$route.query.keyword;
        this.showArea = hasKeyWord ? false : true;
        this.areaIndex = parseInt(this.$route.query.index) || 0;
        this.query.aid = parseInt(this.$route.query.aid) || '';
    },
    computed: {
        emptyText() {
            return '暂无商户哦'
        },
        iconEmpty() {
            return 'icon-empty'
        },
        ...mapGetters(['city']),

        keyword() {
            let kw = this.$route.query.keyword || '';
            return kw;
        },
        scrollTop() {
            return this.showArea ? 186 : 0
        }
    },
    methods: {
        ...mapActions(['loading']),
        async _loadList() {
            this.loading = true;
            this.query.keyword = this.keyword;
            let _result = await this.$api.shopGetList(this.assignQuery(this.query));
            this.bussinessAreaData = Object.freeze(_result || []);
            return _result;
        },
        async getListArea(cid) {
            let _result = await this.$api.sysListArea(cid);
            if (_result) {
                this.businessAreaList = Object.freeze(_result.area || []);
            }
        },
        areaIndexChange(index) {
            this.areaIndex = parseInt(index);
            this.$nextTick(() => {
                if (this.businessAreaList.length) {
                    this.query.aid = parseInt(this.businessAreaList[index].aid) || 0;
                    this.onFresh();
                }
            })
        },
        toBusiness() {
            this.$router.push({
                name: 'platformBusiness'
            })
        }

    }
}
</script>
<style lang="less">
.business-info {
    .custom-bottom {
        bottom: 0
    }
}
</style>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.business-info {
    padding: 20px;
    position: relative;
    background-color: #fff;
    @include border-1px(#e8e8e8, before, top);
    z-index: 1;
    .swiper-info {
        border: 1px solid #e5e5e5;
    }
    .info-other {
        padding: 0 10px;
        font-size: 14px;
    }
}

.shop-item {
    position: relative;
    padding: 0 15px;
    @include border-1px(#e8e8e8, before, top);
}

.shop-item-hd {
    padding: 10px 0;
    .shop-item-logo {
        width: 30px;
        height: 30px;
        padding: 5px;
        border: 1px solid #e8e8e8;
        border-radius: 45px;
        text-align: center;
        @include align-items(center);
        overflow: hidden;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .shop-item-info {
        margin-left: 10px;
        width: 75%;
        .shop-type {
            padding-left: 5px;
            color: $theme;
        }
    }
}

.shop-item-bd {
    padding-bottom: 10px;
}
</style>