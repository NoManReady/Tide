<template>
  <div class="platform-uc-qa gc-container has-header has-footer gc-form">
    <x-header :left-options="{backText: ''}" class="gc-header">系统建议和反馈</x-header>
    <group>
      <x-textarea type="textarea" :rows="6" placeholder="欢迎您反馈：对产品的使用体验，功能建议等" v-model="gcForm.content" v-verify="gcForm.content"></x-textarea>
    </group>
    <group>
      <div class="upload-box">
        <Uploader :max="5" :upload-url="uploadUrl" :imgs.sync="gcForm.imgs" size="small" v-verify="gcForm.imgs"></Uploader>
        <div class="fc-9 fs14 plr10 pb10">
          上传页面截图，便于我们理解您的反馈，最多5张，单张大小不要超过3M
        </div>
      </div>
    </group>
    <div class="gc-footer">
      <x-button type="primary" @click.native="onSubmit">确定</x-button>
    </div>
  </div>
</template>
<script>
import { required } from '@/utils/validateGroup'
import validateMixins from '@/mixins/validateMixins'
import Uploader from '@/common/uploader'
export default {
  name: 'platform-uc-qa',
  title: '建议反馈',
  data() {
    return {
      uploadUrl: this.$config.qiniuHost,
      gcForm: {
        content: '',
        imgs: '',
      }
    }
  },
  components: {
    Uploader
  },
  mixins: [validateMixins],
  verify: {
    gcForm: {
      content: [{
        test: required,
        message: '请输入意见反馈'
      }]
    }
  },
  methods: {
    onSubmitConfirm() {
      let vm = this
      this.$api.userFeedback(this.gcForm)
        .then(d => {
          this.$vux.alert.show({
            title: '意见反馈',
            content: '已收到你的建议，我们将在第一时间处理',
            onHide() {
              vm.$router.go(-1)
            }
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>