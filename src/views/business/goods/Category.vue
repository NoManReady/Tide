<template>
  <div class="business-goods-category gc-container has-header">
    <x-header :left-options="{backText: ''}" on-click-back="toGoods" class="gc-header">选择商品分类
      <div slot="right" @click.prevent="toAddCategory('add')">
        <i class="iconfont icon-roundadd"></i>
      </div>
    </x-header>
    <div class="category-container">
      <div class="category-left">
        <ul>
          <li class="category-left-li level-one">
            <a href="javascript:;">全部</a>
          </li>
          <li v-for="(item,index) in categoryList" :key="item.cate_id" class="category-left-li level-one" :class="{active:currentCateId == item.cate_id}"
            @click="selectCategoryName(item,item.child)">
            <a href="javascript:;">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="category-right">
        <div class="category-right-content vux-flexbox">
          <div class="category-item" v-for="(item,index) in subCategoryList" :key="item.cate_id" :class="" @click="getCategoryId(item)">
            <div class="category-name">
              {{item.name}}
            </div>
            <!--<ul class="clearfix" ng-if="item.child.length > 0">
              <li ng-repeat="child in item.child"><a>{{child.name}}</a></li>
            </ul>-->
          </div>
        </div>
        <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="subCategoryList.length == 0"></empty>
      </div>
    </div>
  </div>
</template>
<script>
    import Empty from '@/common/empty'
    import {
        isEmpty
    } from '@/utils'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        name: 'business-goods-category',
        title: '商品分类',
        components: {
            Empty
        },
        data() {
            return {
                sid: '',
                categoryList: [],
                subCategoryList: [],
                currentCateId: '0'
            }
        },
        computed: {
            emptyText() {
                return "该分类暂无子分类哦"
            },
            iconEmpty() {
                return 'icon-empty'
            },
            ...mapGetters(['userSid', 'goodsCate'])
        },
        created() {
            this.getCategory()
        },
        methods: {
            ...mapActions(['setCurrentCategory', 'getGoodsFilter']),
            toAddCategory() {
                this.$router.push({
                    name: 'businessAddCategory'
                })
            },
            // async getCategory() {
            //   let _result = await this.$api.goodsFilter(this.userSid
            //   };
            //   this.$nextTick(() => {
            //     this.categoryList = Object.freeze(_result.cate || []);
            //     console.log(this.categoryList)
            //     if (_result.cate) {
            //       this.currentCateId = this.categoryList[0].cate_id;
            //       this.getCategoryChild(this.categoryList[0].cate_id, this.categoryList[0].child)
            //     }
            //   })
            // },
            getCategory() {
                this.getGoodsFilter(this.userSid);
                this.$nextTick(() => {
                    this.categoryList = this.goodsCate;
                })
            },
            getCategoryChild(cateId, child) {
                this.currentCateId = cateId;
                this.subCategoryList = child;
            },
            selectCategoryName(cateItem, child) {
                this.currentCateId = cateItem.cate_id;
                // child && this.getCategoryChild(cateId, child);
                if (!isEmpty(child)) {
                    this.getCategoryChild(cateItem.cate_id, child)
                } else {
                    this.backFn(cateItem);
                }
            },
            getCategoryId(cateItem) {
                this.backFn(cateItem)
            },
            backFn(cateItem) {
                this.setCurrentCategory(cateItem);
                let type = this.$route.query.type;
                let self = this;
                switch (type) {
                    case 'add':
                        self.toAddCategory();
                        break;
                    case 'select':
                        this.$router.push({
                            name: 'businessGoods'
                        })
                        break;
                    case 'addGoods':
                        this.$router.push({
                            name: 'businessAddGoods'
                        })
                        break;
                }
            },
            toGoods() {
                this.$router.push({
                    name: 'businessGoods'
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../style/scss/_mixin.scss';
    @import '../../../style/scss/_available.scss';
    .business-goods-category {
        .icon-roundadd {
            font-size: 20px;
            padding: 10px 0 10px 10px;
            touch-action: none;
        }
    }
</style>