<template>
  <div class="platform-business-search">
    <search v-model="value" placeholder="商户/联系人/电话号码" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" :auto-fixed="false"
      ref="search" class="search-box"></search>
    <!--热门搜索-->
    <div class="hot-search search-list pt10">
      <div class="hd">
        热门搜索
      </div>
      <div class="bd">
        <a class="search-item" href="javascript:;" v-for="(item,index) in hotSearch" :key="item.id" @click.prevent="goPage(item)">
            <span>{{item.name}}</span>
        </a>
      </div>
    </div>
    <div class="history-seach search-list">
      <div class="hd vux-flexbox">
        <div class="flex-one">历史搜索</div>
        <i class="iconfont icon-delete"></i>
      </div>
      <div class="bd">
        <a class="search-item" v-for="(item,index) in historySearch" :key="item.id" @click.prevent="goPage(item)">
            <span class="">{{item.name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
    import {
        Search
    } from 'vux'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        saveToLocal,
        loadFromLocal
    } from '@/utils/localStorage'
    export default {
        name: 'platform-business-search',
        title: '商户搜索',
        components: {
            Search
        },
        data() {
            return {
                results: [],
                value: '',
                hotSearch: [{
                    id: '1',
                    name: '茵曼'
                }, {
                    id: '1',
                    name: 'nike'
                }, {
                    id: '1',
                    name: '中亭街address'
                }],
                historySearch: [{
                    id: '1',
                    name: '茵曼'
                }, {
                    id: '2',
                    name: '茵曼1'
                }]
            }
        },
        computed: {
            ...mapGetters(['city'])
        },
        methods: {
            setFocus() {

            },
            onSubmit() {

                // this.$vux.toast.show({
                //     type: 'text',
                //     position: 'top',
                //     text: 'on submit'
                // })
                this.$router.push({
                    name: 'platformShopList',
                    query: {
                        keyword: this.value,
                        cid: loadFromLocal('city').id
                    }
                })
            },
            onFocus() {

            },
            onCancel() {
                this.$router.push({
                    name: 'platformHome'
                })
            },
            goPage(item) {
                this.$router.push({
                    name: 'platformShopList',
                    query: {
                        keyword: item.name,
                        cid: loadFromLocal('city').id
                    }
                })
            }
        }

    }
</script>
<style lang="less">
    .weui-search-bar {
        background-color: @theme;
        &:before {
            border: none;
        }
        &__form {
            border-radius: 4px;
        }
        &__cancel-btn {
            color: #fff
        }
    }
</style>
<style lang="scss" scoped>
    @import '../../../style/scss/_mixin.scss';
    @import '../../../style/scss/_available.scss';
    .weui-search-bar__form {
        border-radius: 25px;
        overflow: hidden;
    }
    
    .platform-business-search {
        .search-list {
            padding: 0 15px;
            .hd {
                line-height: 40px;
                color: #999;
                font-size: 15px;
            }
            .bd {
                margin-left: -10px;
            }
        }
        .search-item {
            display: inline-block;
            height: 32px;
            line-height: 32px;
            background-color: #e5e5e5;
            color: #333;
            font-size: 13px;
            border-radius: 5px;
            text-align: center;
            padding: 0 10px;
            margin: 0 0 10px 10px;
        }
    }
</style>