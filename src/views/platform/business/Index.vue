<template>
  <div class="platform-business-list">
    <x-header :left-options="{backText: ''}">全国商圈</x-header>
    <!--城市滚动-->
    <scroller class="city-scroller" lock-y :scrollbar-x=false>
      <div class="city-scroller-box">
        <div class="city-item" v-for="(city,index) in hotCity" :key="city.id" @click.prevent="getCity(city)" :class="{current:city.id==currentCity.id}">
          <span class="">{{city.name}}</span>
        </div>
      </div>
      <div class="city-item more" @click.prevent="toSelectCity">
        <span>更多></span>
      </div>
    </scroller>
    <!--商圈列表-->
    <div class="current-city mt10">
      当前城市：
      <span class="f-theme pl-10">{{currentCity.name}}</span>
    </div>
    <grid class="business-count mt10">
      <grid-item>
        <span class="count-text f-theme">{{businessData.area_count || 0}}</span>
        <span slot="label">
          商圈
        </span>
      </grid-item>
      <grid-item>
        <span class="count-text f-theme">{{businessData.factory_count}}</span>
        <span slot="label">
          厂家
        </span>
      </grid-item>
      <grid-item>
        <span class="count-text f-theme">{{businessData.trade_count}}</span>
        <span slot="label">
          批发商
        </span>
      </grid-item>
    </grid>
    <div class="business-list mt10">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
          <div v-for="(item,index) in businessList" :key="index" @click.prevent="toShopList(item,index)" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.cover" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}</h4>
              <p class="weui-media-box__desc">{{item.remark}}</p>
            </div>
          </div>
        </div>
      </div>
      <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="businessList.length == 0"></empty>
    </div>
  </div>
</template>
<script>
    import apis from '@/api'
    import {
        Grid,
        GridItem
    } from 'vux';
    import GcScroller from '@/common/scroller'
    import scrollerMixins from '@/mixins/scrollerMixins'
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
            Empty
        },
        // mixins: [scrollerMixins],
        data() {
            return {
                businessData: [],
                businessList: [],
                hotCity: []
            }
        },
        created() {
            this.getHotCity();
            if (this.city) {
                this.getListArea(this.city.id);
            }
        },
        watch: {
            currentCity(c) {
                this.getListArea(c.id)
            }
        },
        computed: {
            ...mapGetters({
                currentCity: 'city'
            }),
            emptyText() {
                return "该城市暂无商圈哦"
            },
            iconEmpty() {
                return 'icon-empty'
            },
            ...mapGetters(['city', 'businessArea'])
        },
        methods: {
            ...mapActions(['loading', 'setCity', 'setBusinessArea']),
            getListArea(cid) {
                this.loading = true;
                apis.sysListArea(cid).then(response => {
                    this.$nextTick(() => {
                        this.businessData = response;
                        this.businessList = response.area;
                        this.setBusinessArea(this.businessList);
                        this.loading = false;
                    });
                })
            },
            async getHotCity() {
                this.loading = true;
                let _result = await apis.sysCity();
                if (_result) {
                    this.$nextTick(() => {
                        this.hotCity = Object.freeze(_result.hot || []);
                    })
                }
            },
            toSelectCity() {
                this.$router.push({
                    name: 'platformSelectCity'
                })
            },
            getCity(city) {
                this.setCity(city);
            },
            toShopList(item, index) {
                this.$router.push({
                    name: 'platformShopList',
                    query: {
                        cid: item.cid,
                        aid: item.aid,
                        index: index
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .business-list {
        .weui-media-box_appmsg {
            .weui-media-box__hd {
                width: 90px;
                height: 90px;
            }
        }
        .weui-media-box__desc {
            line-height: 1.5;
            padding-top: 10px;
        }
    }
</style>
<style lang="scss" scoped>
    @import '../../../style/scss/_mixin.scss';
    @import '../../../style/scss/_available.scss';
    .city-scroller-box {
        width: 810px;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        position: relative;
    }
    
    .city-scroller {
        position: relative;
        background-color: #fff;
        @include border-1px(#e5e5e5, after, bottom);
        height: 40px;
        line-height: 40px;
        .city-item {
            &.current {
                color: $theme;
            }
            float: left;
            display: inline-block;
            width: 50px;
            text-align: center;
            &:first-child {
                /*font-weight: 700;*/
            }
            &.more {
                padding-left: 8px;
                position: absolute;
                right: 0;
                top: 0;
                background-color: #fff;
                @include border-1px(#e5e5e5, after, bottom);
                @include border-1px(#e5e5e5, before, left);
            }
        }
    }
    
    .current-city {
        width: 100%;
        background-color: #fff;
        position: relative;
        text-align: center;
        font-size: 14px;
        line-height: 50px;
        @include border-1px(#e5e5e5, before, top);
        @include border-1px(#e5e5e5, after, bottom);
        span {
            font-size: 16px;
        }
    }
    
    .business-count {
        background-color: #fff;
        text-align: center;
        .weui-grid {
            padding: 15px 10px;
            .weui-grid__label {
                padding-bottom: 5px;
            }
        }
        .count-text {
            font-size: 16px;
            font-weight: 700;
        }
    }
    
    .business-list {
        .weui-media-box_appmsg {
            .weui-media-box__hd {
                width: 90px;
                height: 90px;
            }
        }
    }
</style>