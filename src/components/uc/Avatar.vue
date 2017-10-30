<template>
  <group class="component_avatar">
    <cell-box is-link>
      <flexbox class="pr15">
        <flexbox-item>
          <span>用户头像</span>
        </flexbox-item>
        <img v-lazy="avatar" class="avatar" alt="" v-if="!isLoading">
        <inline-loading class="avatar" v-else></inline-loading>
        <input class="hidden-file" type="file" ref="uploadAvatar" @change="onFileChange" accept="image/*" v-show="!isLoading">
      </flexbox>
    </cell-box>
    <cell title="用户昵称" is-link :value="userInfo.nickname" @click.native="showNickname=true"></cell>
    <popup v-model="showNickname" position="right" height="100%" width="100%">
      <nickname :nick="userInfo.nickname"></nickname>
    </popup>
  </group>
</template>
<script>
import { mapGetters } from 'vuex'
import { appendFormData } from '@/utils'
import axios from 'axios'
import { fileToBase64ByQuality, convertBase64UrlToBlob } from '@/utils/compress'
import Nickname from '@/components/uc/Nickname'
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
    this.avatar = this.userInfo.avatar
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 文件变化监听
    async onFileChange(e) {
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
      if (_size >= 4 * 1024 * 1024) {
        this.$vux.toast.show({
          text: '请上传小于2M的图片',
          type: 'cancel',
          width: '9em'
        })
        return
      }
      this.isLoading = true
      let imaData = await fileToBase64ByQuality(_file, 70)
      let formData = await appendFormData(convertBase64UrlToBlob(imaData, _file.type), 'file')
      axios.post(this.$config.qiniuHost, formData)
        .then((d) => {
          let { key, id, domain } = d.data
          this.isLoading = false
          e.target.value = ''
          this.avatar = domain + key
          this.$api.userUpdate({ avatar: id })
            .then(d => {
              this.$store.dispatch('updateUserInfo', { avatar: this.avatar })
            })
        },()=>{
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