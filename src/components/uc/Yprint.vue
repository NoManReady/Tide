<template>
  <div class="components-uc-seller gc-form">
    <x-header :left-options="{backText: ''}">云打印设置
      <a href="javascript:;" @click="onSubmit" slot="right">设置</a>
    </x-header>
    <group label-width="100px">
      <x-input title="云打印编码" v-model="gcForm.shop_dev" readonly>
      </x-input>
      <x-input title="WIFI名称" v-model="gcForm.shop_dev_ssid" v-verify="gcForm.shop_dev_ssid">
        <i class="iconfont icon-post" slot="right"></i>
      </x-input>
      <x-input title="WIFI密码" v-model="gcForm.shop_dev_pwd" v-verify="gcForm.shop_dev_pwd">
        <i class="iconfont icon-post" slot="right"></i>
      </x-input>
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
      shop_dev_ssid: [{
        test: required,
        message: '请输入WIFI名称'
      }],
      shop_dev_pwd: [{
        test: required,
        message: '请输入WIFI密码'
      }]
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
    },
    //提交
    onSubmitConfirm() {
      this.$api.shopWifi({ sid: this.shopSid, ssid: this.gcForm.shop_dev_ssid, pwd: this.gcForm.shop_dev_pwd  })
        .then(d => {
          this.$vux.toast.show({
            text: '设置成功',
            type: 'success'
          })
          this.$router.replace({ name: 'businessUc' })
        })
        .catch(res => {
          this.$vux.toast.text(res.response.data.error)
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