<template>
    <div class="platform-business-list gc-container has-header">
        <x-header :left-options="{backText:''}" class="gc-header">
            <i class="iconfont icon-locationfill mr5"></i>
            <span>{{currentCity}}</span>
        </x-header>
        <div class="sort-tab">
            <tab :line-width="1" custom-bar-width="60px">
                <tab-item :selected="tags==='new'" @click.native="tagChange('new')">新品</tab-item>
                <tab-item :selected="tags==='hot'" @click.native="tagChange('hot')">爆款</tab-item>
                <tab-item :selected="tags==='clean'" @click.native="tagChange('clean')">尾货</tab-item>
            </tab>
        </div>
        <div class="business-list">
            <b-scroll ref="scroller" :data="scrollerParams.items" @pullingDown="onFresh" @pullingUp="onFetch" :scrollTop="scrollTop">
                <shop-list :shops="scrollerParams.items" :isOperate="true"></shop-list>
            </b-scroll>
        </div>
    </div>
</template>
<script>
import {
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
        Grid,
        GridItem,
        Empty,
        BScroll,
        shopList
    },
    data() {
        return {
            currentCity: '',
            tags: 'new',
            query: {
                cid: loadFromLocal('city').id || '',
                tags: '',
                page: 1
            },
            shopList: []
        }
    },
    mixins: [bscrollMixins],
    created() {
        this.currentCity = this.city.name || loadFromLocal('city').name;
        this.tags = this.$route.query.tags || 'new';
    },
    computed: {
        emptyText() {
            return '暂无数据！'
        },
        iconEmpty() {
            return 'icon-empty'
        },
        ...mapGetters(['city']),
        scrollTop() {
            return  100
        }
    },
    methods: {
        ...mapActions(['loading']),
        async _loadList() {
            this.loading = true;
            this.query.tags = this.tags;
            let _result = await this.$api.sysListByTag(this.assignQuery(this.query));
            return _result;
        },
        tagChange(tags) {
            this.tags = tags;
            this.$nextTick(() => {
                this.query.tags = this.tags;
                this.query.page = 1;
                this.onFresh();
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

.sort-tab {
    &.isfixed {
        top: 0px;
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