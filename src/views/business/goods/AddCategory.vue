<template>
  <div class="platform-category-add gc-container has-header gc-form">
    <x-header :left-options="{backText: ''}" class="gc-header">新增商品分类</x-header>
    <group>
     
      <cell is-link>
        <span slot="title">上级分类</span>
        <div slot="value" @click.prevent="toCategory">
          <input type="text" class="weui-input tr" v-model="currentCategory.name" placeholder="请选择分类" v-verify="gcForm.pid" disabled>
        </div>
      </cell>
       <x-input title="分类名称" text-align="right" v-model="gcForm.name" placeholder="请填写分类名称" v-verify="gcForm.name"></x-input>
    </group>

    <div class="mg10">
      <x-button type="primary" @click.native="onSubmit">保存</x-button>
    </div>
  </div>
</template>
<script>
  import {
    required
  } from '@/utils/validateGroup'
  import validateMixins from '@/mixins/validateMixins'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'platform-category-add',
    components: {},

    data() {
      return {
        gcForm: {
          sid: '',
          pid: '',
          name: ''
        }
      }
    },
    created() {
      this.gcForm.pid = this.currentCategory.cate_id;
    },
    computed: {
      ...mapGetters(['currentCategory'])
    },
    mixins: [validateMixins],
    verify: {
      gcForm: {
        name: [{
          test: required,
          message: '请填写分类名称'
        }],
        pid: [{
          test: required,
          message: '请选择分类'
        }]
      }
    },
    methods: {
      toCategory() {
        this.$router.push({
          name: 'businessCategory',
          query: {
            type: 'add'
          }
        })
      },
      //提交
      onSubmit() {
        let self = this;
        this.$api.goodsAddCate(this.gcForm)
          .then(d => {

            this.$vux.toast.show({
              text: '保存成功',
              type: 'success',
              time: 1000,
               onHide () {
                self.$router.push({
                  name:'businessCategory'
                })
               }
            });
          })
      }
    }
  }

</script>
<style lang="scss" scoped>


</style>
