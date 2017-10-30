<template>
  <div class="paltform-uc-auth-business gc-container has-header has-footer gc-form">
    <x-header :left-options="{backText: ''}" class="gc-header">工商认证</x-header>
    <group>
      <x-input title="工商名称" text-align="right" v-model="gcForm.name" placeholder="请输入真实工商名称" v-verify="gcForm.name" :readonly="readonly"></x-input>
      <x-input title="工商注册号" text-align="right" v-model="gcForm.sn" placeholder="请输入工商注册号" v-verify="gcForm.sn" :readonly="readonly"></x-input>
    </group>
    <group>
      <div class="upload-box">
        <Uploader :show-header="false" :upload-url="uploadUrl" :imgs.sync="gcForm.imgs" size="small" v-verify="gcForm.imgs" :max-size="3*1024*1024" :default-list="defaultList" :readonly="readonly"></Uploader>
        <div class=" fc-9 fs14 pb10 plr10">
          上传营业执照,便于我们审核，单张大小不要超过3M
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
  name: 'paltform-uc-auth-business',
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
      name: this.authBusinessObj.name,
      sn: this.authBusinessObj.sn
    }
    this.defaultList = this.authBusinessObj.defaultList
  },
  computed: {
    ...mapGetters(['authBusinessObj']),
    readonly() {
      return !!this.authBusinessObj.name
    }
  },
  mixins: [validateMixins],
  verify: {
    gcForm: {
      name: [{
        test: required,
        message: '请输入工商名称'
      }],
      sn: [{
        test: required,
        message: '请输入工商注册号'
      }],
      imgs: [{
        test(val) {
          return val.split(',').length >= 1
        },
        message: '请上传营业执照'
      }]
    }
  },
  components: {
    Uploader
  },
  methods: {
    //提交
    onSubmitConfirm() {
      this.$api.userBlv(this.gcForm)
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