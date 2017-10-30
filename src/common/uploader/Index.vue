<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div v-show="showHeader" class="weui-uploader__hd">
          <p class="weui-uploader__title"> {{ title }} </p>
          <div v-show="showHeader && showTip" class="weui-uploader__info">
            {{ images.length }} / {{ max }}
          </div>
        </div>

        <div class="weui-uploader__bd cf" :class="{small: size === 'small'}">
          <!-- <div v-show="!readonly && images.length > 0" class="weui-uploader__input-box remove" @click="remove">
                                                            </div> -->

          <ul class="weui-uploader__files">
            <uploader-item v-for="(image,index) in images" :background-image="image.url" :key="image.url" @click.native="preview(image)" :item="image" :index="index" @on-remove="remove"></uploader-item>
          </ul>

          <div v-show="!readonly && images.length < max" class="weui-uploader__input-box" @click="add">
            <input v-if="!handleClick" ref="input" class="weui-uploader__input" type="file" accept="image/*" @change="onFileChange ">
          </div>
        </div>
      </div>
    </div>
    <actionsheet v-model="pickshow" :menus="pickmenu" @on-click-menu="pick" show-cancel></actionsheet>
    <!-- modal -->
    <div v-transfer-dom>
      <x-dialog v-model="uploaderModel" class="uploader-modal" :hide-on-blur="true">
        <div class="img-box">
          <img v-lazy="fullViewUrl" style="max-width:100%" v-if="fullViewUrl">
        </div>
        <div @click="uploaderModel=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import UploaderItem from './UploaderItem'
import { Actionsheet } from 'vux'
import { appendFormData } from '@/utils'
import { fileToBase64ByQuality, convertBase64UrlToBlob } from '@/utils/compress'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'gcUploader',
  props: {
    imgs: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 1
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showTip: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '图片上传'
    },
    // 是否接管+号的click事件，如果是，点击不弹出选择文件的框
    handleClick: {
      type: Boolean,
      default: false
    },
    // 选择文件后是否自动上传，如果不是，则emit async 事件
    autoUpload: {
      type: Boolean,
      default: true
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    },
    capture: {
      type: String,
      default: 'camera'
    },
    fileName: {
      type: String,
      default: 'file'
    },
    didPreview: {
      type: Boolean,
      default: true
    },
    maxSize: {
      type: Number,
      default: 4 * 1024 * 1024
    },
    defaultList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pickshow: false,
      pickmenu: {
        camera: '拍照',
        file: '从相册选择'
      },
      images: this.defaultList,
      viewUrl: '',
      uploaderModel: false
    }
  },
  watch: {
    images(lis) {
      this.$emit('update:imgs', lis.map(l => l.id).join(','))
    },
    defaultList(list) {
      this.images = list
    }
  },
  components: {
    UploaderItem,
    Actionsheet
  },
  created() {
    if (this.device == 'android' || this.device == 'ios'){
        this.handleClick = true;
    }
  },
  computed: {
    ...mapGetters(['device']),
    showCapture() {
      return this.capture || false
    },
    fullViewUrl() {
      return this.viewUrl
    }
  },
  methods: {

    pick(key) {
        let options = {
            quality: 70,
            targetWidth: 800,
            destinationType: Camera.DestinationType.DATA_URL
        }
        switch (key) {
            case 'camera':
                options.sourceType = Camera.PictureSourceType.CAMERA;
                break;
            case 'file':
                options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                break;
        }
        console.log(options);
        navigator.camera.getPicture(this.pickupload, this.pickerror, options);
    },
    async pickupload(imageData) {
        let formData = await appendFormData(convertBase64UrlToBlob('data:image/jpeg;base64,'+imageData, 'image/jpeg'), this.fileName)
        if (this.$vux && this.$vux.loading) {
          this.$vux.loading.show('正在上传')
        }
        axios.post(this.uploadUrl, formData)
          .then((response) => {
            if (this.$vux && this.$vux.loading) {
              this.$vux.loading.hide()
            }
            console.log(response.data)
            let { key, id, domain } = response.data
            this.images.push({
              url: domain + key,
              id
            })
          })
    },
    pickerror(message) {
        console.log(message);
    },
    add() {
      if (this.handleClick) {
        this.pickshow = true
      }
    },
    // 移除第一张图
    remove(index) {
      this.images.splice(index, 1)
    },
    preview(image) {
      // 暂未实现，可以捕捉preview事件自己实现
      this.$emit('preview', image)
      if (this.didPreview) {
        this.viewUrl = image.url
        this.uploaderModel = true
      }
    },
    // 适用于action的情况
    async onFileChange() {
      if (this.handleClick) {
        return
      }
      let _file = this.$refs.input.files[0]
      if (this.autoUpload) {
        if (_file.size > this.maxSize) {
          this.$vux.toast.show({
            text: `图片大小不得超过${this.maxSize / 1024 / 1024}M`,
            type: 'warn'
          })
          return
        }
        if (!this.uploadUrl) {
          this.$vux.toast.show({
            text: `上传地址未提供`,
            type: 'warn'
          })
          return
        }
        let imaData = await fileToBase64ByQuality(_file, 70)
        let formData = await appendFormData(convertBase64UrlToBlob(imaData, _file.type), this.fileName)
        if (this.$vux && this.$vux.loading) {
          this.$vux.loading.show('正在上传')
        }
        axios.post(this.uploadUrl, formData)
          .then((response) => {
            if (this.$vux && this.$vux.loading) {
              this.$vux.loading.hide()
            }
            this.$refs.input.value = ''
            let { key, id, domain } = response.data
            this.images.push({
              url: domain + key,
              id
            })
          })
      } else {
        this.$emit('upload-image', _file)
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
.remove:before {
  width: 0;
  height: 0;
}

.weui-uploader__bd {
  overflow: visible;
  margin-top: 10px;
  &.small {
    .weui-uploader__input-box {
      margin-right: 5px;
      margin-bottom: 5px;
      width: 58px;
      height: 58px;
    }
    .weui-uploader__file {
      width: 60px;
      height: 60px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
