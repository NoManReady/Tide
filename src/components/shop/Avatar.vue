<template>
  <group class="component_avatar">
    <cell-box is-link>
      <flexbox class="pr15">
        <flexbox-item>
          <span>商铺中心</span>
        </flexbox-item>
        <img v-lazy="avatar" class="avatar" alt="" v-if="!isLoading">
        <inline-loading class="avatar" v-else></inline-loading>
        <input class="hidden-file" type="file" ref="uploadAvatar" @change="onFileChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-show="!isLoading">
      </flexbox>
    </cell-box>
    <cell title="商铺名称" is-link :value="shopInfo.name" @click.native="showNickname=true"></cell>
    <popup v-model="showNickname" position="right" height="100%" width="100%">
      <nickname :nick="shopInfo.name"></nickname>
    </popup>
  </group>
</template>
<script>
import { mapGetters } from 'vuex'
import { uploadFile } from '@/utils'
import Nickname from '@/components/shop/Nickname'
export default {
  name: 'component_avatar',
  data() {
    return {
      nickname: '',
      avatar: '',
      isLoading: false,
      showNickname: false
    }
  },
  components: {
    Nickname
  },
  created() {
    this.avatar = this.shopInfo.avatar
  },
  computed: {
    ...mapGetters(['shopInfo'])
  },
  methods: {
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
        this.$api.shopUpdate({ logo: d.id })
          .then(d => {
            this.$store.dispatch('updateShopInfo', { logo: this.logo })
          })
      }, () => {
        e.target.value = ''
        this.isLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar {
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