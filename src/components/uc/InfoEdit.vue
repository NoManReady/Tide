<template>
  <div class="components-uc-seller gc-form">
    <x-header :left-options="{backText: ''}">商户资料
      <a href="javascript:;" @click="onSubmit" slot="right">保存</a>
    </x-header>
    <group label-width="100px">
      <x-input title="联系人" v-model="gcForm.contact" v-verify="gcForm.contact">
        <i class="iconfont icon-post" slot="right"></i>
      </x-input>
      <x-input title="联系电话" type="tel" v-model="gcForm.mobile" v-verify="gcForm.mobile">
        <i class="iconfont icon-post" slot="right"></i>
      </x-input>
      <x-textarea title="地址" v-model="gcForm.addr" :rows="2" placeholder="请输入"></x-textarea>
    </group>
    <group label-width="100px">
      <x-input title="QQ" v-model="gcForm.qq">
        <i class="iconfont icon-post" slot="right"></i>
      </x-input>
      <x-input title="微信" v-model="gcForm.wx">
        <i class="iconfont icon-post" slot="right"></i>
      </x-input>
      <x-input title="简介" v-model="gcForm.introduce">
        <i class="iconfont icon-post" slot="right"></i>
      </x-input>
    </group>
    <group label-width="100px">
      <cell-box is-link>
        <flexbox class="pr15">
          <flexbox-item>
            <span>LOGO</span>
          </flexbox-item>
          <img v-lazy="logo" class="logo" alt="" v-if="!isLoading">
          <inline-loading class="logo" v-else></inline-loading>
          <input class="hidden-file" type="file" ref="uploadAvatar" @change="onFileChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-show="!isLoading">
        </flexbox>
      </cell-box>
    </group>
  </div>
</template>

<script>
import { required } from '@/utils/validateGroup'
import validateMixins from '@/mixins/validateMixins'
import { mapGetters } from 'vuex'
import { uploadFile } from '@/utils'
import model from '@/model'
export default {
  name: 'components-uc-seller',
  title: '商户资料',
  data() {
    return {
      gcForm: model.shopFn(),
      isLoading: false,
      logo: ''
    }
  },
  mixins: [validateMixins],
  verify: {
    gcForm: {
      contact: [{
        test: required,
        message: '请输入联系人'
      }],
      mobile: [{
        test: required,
        message: '请输入手机号'
      }, 'phone']
    }
  },
  computed: {
    ...mapGetters(['shopSid'])
  },
  created() {
    this.getInfo()
  },
  methods: {
    // 获取商铺详情
    async getInfo() {
      let _result = await this.$api.shopGetDetail(this.shopSid)
      this.gcForm = Object.assign({}, model.shopFn(), _result)
      this.logo = _result.logo
    },
    // 文件变化监听
    onFileChange(e) {
      let _file = e.target.files[0]
      let _type = _file.type
      let _size = _file.size
      if (!_type.includes('image')) {
        this.$vux.toast.show({
          text: '请上传图片格式',
          type: 'cancel',
          width: '9em'
        })
        return
      }
      if (_size >= 2 * 1024 * 1024) {
        this.$vux.toast.show({
          text: '请上传小于2M的图片',
          type: 'cancel',
          width: '9em'
        })
        return
      }
      this.isLoading = true
      uploadFile(e.target.files[0], this.$config.qiniuHost).then(d => {
        this.isLoading = false
        e.target.value = ''
        this.logo = d.domain + d.key
        this.$set(this.gcForm, 'logo', d.id)
      }, () => {
        e.target.value = ''
        this.isLoading = false
      })
    },
    //提交
    onSubmitConfirm() {
      this.$api.shopUpdate({ ...this.gcForm, sid: this.shopSid })
        .then(d => {
          this.$vux.toast.show({
            text: '修改成功',
            type: 'success'
          })
          this.$store.dispatch('updateShopInfo', { ...this.gcForm, logo: this.logo })
          this.$router.replace({ name: 'businessUc' })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.hidden-file {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>