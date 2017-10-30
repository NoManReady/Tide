<template>
  <div class="paltform-uc-auth gc-container has-header has-footer gc-form">
    <x-header :left-options="{backText: ''}" class="gc-header">实名认证</x-header>
    <group>
      <x-input title="姓名" text-align="right" v-model="gcForm.name" placeholder="请输入真实姓名" v-verify="gcForm.name" :readonly="readonly"></x-input>
      <x-input title="身份证号" text-align="right" v-model="gcForm.sn" placeholder="请输入身份证号" v-verify="gcForm.sn" :readonly="readonly"></x-input>
    </group>
    <group>
      <div class="upload-box">
        <Uploader :max="2" :upload-url="uploadUrl" :imgs.sync="gcForm.imgs" v-verify="gcForm.imgs" :max-size="3*1024*1024" :default-list="defaultList" :readonly="readonly"></Uploader>
        <div class=" fc-9 fs14 pb10 plr10">
          上传身份证正反面,便于我们审核，单张大小不要超过3M
        </div>
      </div>
    </group>
    <div class="gc-footer" v-if="!readonly">
      <x-button type="primary" @click.native="onSubmit">确定</x-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { required } from '@/utils/validateGroup'
import validateMixins from '@/mixins/validateMixins'
import Uploader from '@/common/uploader'
export default {
  name: 'paltform-uc-auth-name',
  data() {
    return {
      uploadUrl: this.$config.qiniuHost,
      gcForm: {
        name: '',
        sn: '',
        imgs: ''
      },
      defaultList: []
    }
  },
  created() {
    this.gcForm = {
      name: this.authNameObj.name,
      sn: this.authNameObj.sn
    }
    this.defaultList = this.authNameObj.defaultList
  },
  computed: {
    ...mapGetters(['authNameObj']),
    readonly() {
      return !!this.authNameObj.name
    }
  },
  mixins: [validateMixins],
  verify: {
    gcForm: {
      name: [{
        test: required,
        message: '请输入姓名'
      }],
      sn: [{
        test: required,
        message: '请输入身份证号'
      }, 'idCard'],
      imgs: [{
        test(val) {
          return val.split(',').length >= 2
        },
        message: '请至少上传正反两张身份证照片'
      }]
    }
  },
  components: {
    Uploader
  },
  methods: {
    //提交
    onSubmitConfirm() {
      this.$api.userIdv(this.gcForm)
        .then(d => {
          this.$vux.toast.show({
            text: '提交成功',
            type: 'success',
            time: 1000
          })
          this.$store.dispatch('getUserInfo')
        })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>