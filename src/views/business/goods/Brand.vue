<template>
  <div class="business-goods-brand gc-container has-header">
    <x-header :left-options="{backText: ''}" class="gc-header">选择商品品牌
      <div slot="right" @click.prevent="toAddBrand">
        <i class="iconfont icon-roundadd"></i>
      </div>
    </x-header>
    <ul class="brand-list"  v-if="brandList.length > 0">
        <li class="brand-item" v-for="(item,index) in brandList" :key="index" @click.prevent="selectBrandName(item)">
          {{item.name}}
        </li>
    </ul>
     <empty :empty-text="emptyText" :icon-class="iconEmpty" v-if="brandList.length == 0"></empty>
  </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import Empty from '@/common/empty'
    export default {
        name: 'business-goods-brand',
        title: '商品品牌',
        components: {
            Empty
        },
        data() {
            return {
                brandList: []
            }
        },
        created() {
            this.getBrand()
        },
        computed: {
            emptyText() {
                return "该分类暂无品牌哦"
            },
            iconEmpty() {
                return 'icon-empty'
            },
            ...mapGetters(['userSid', 'goodsBrand'])
        },
        methods: {
            ...mapActions(['setCurrentBrand', 'getGoodsFilter']),
            toAddBrand() {
                this.$router.push({
                    name: 'businessAddBrand',
                    query: {
                        type: 'add'
                    }
                })
            },
            getBrand() {
                this.getGoodsFilter(this.userSid);
                this.$nextTick(() => {
                    this.brandList = this.goodsBrand;
                })
            },
            //  async getBrand() {
            //         let _result = await this.$api.goodsFilter(this.userSid);
            //         this.$nextTick(() => {
            //           this.brandList = Object.freeze(_result.brand || []);
            //           console.log(this.brandList)
            //         })
            //       },
            selectBrandName(item) {
                this.currentBrandName = item.name;
                this.backFn(item);
            },
            backFn(item) {
                this.setCurrentBrand(item);
                let type = this.$route.query.type;
                let self = this;
                switch (type) {
                    case 'add':
                        self.toAddBrand();
                        break;

                    case 'addGoods':
                        this.$router.push({
                            name: 'businessAddGoods'
                        })
                        break;
                }
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