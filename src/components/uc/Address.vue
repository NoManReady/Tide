<template>
  <div class="components-uc-address gc-container has-header has-footer">
    <x-header :left-options="{backText: '',preventGoBack:payment}" @on-click-back="selectAddress" class="gc-header">管理地址</x-header>
    <template v-if="addrs.length">
      <group v-for="(addr,index) in addrs" :key="addr.addr_id">
        <div class="gc-cell" @click.prevent.stop="selectAddress(addr)">
          <div class="box-flex">
            <div class="flex-one">
              <span class="fs16 fc-3">{{addr.contact}}</span>
            </div>
            <span class="tel vm">{{addr.mobile}}</span>
          </div>
          <div class="word-break tl mt10 fs14">{{addr.addr}}</div>
        </div>
        <div class="gc-cell box-flex">
          <label class="gc-radio-box flex-one" @click="onCheck(addr)">
            <input type="radio" name="addressRadios" value="1" class="gc-radio" :checked="!!addr.default" />
            <i class="iconfont vm" :class="['icon-round'+(!!addr.default?'checkfill':'')]"></i>
            <span class="vm fs14">默认地址</span>
          </label>
          <el-button type="text " size="mini" @click.native="onDel(addr.addr_id,index)">删除</el-button>
          <el-button type="text success" size="mini" @click.native="onEdit(index)">编辑</el-button>
        </div>
      </group>
    </template>
    <template v-else>
      <p class="mt30 tc fs18 fc-6">还未添加地址，请添加新地址。</p>
    </template>
    <div class="gc-footer">
      <x-button type="primary" @click.native="onAdd">添加新地址</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="addressPopup" position="right" width="100%" :show-mask="false" style="z-index:510">
        <x-header :left-options="{backText: '',preventGoBack:true}" class="gc-header" @on-click-back="onBack">{{popupName}}
          <a href="javascript:;" slot="right" @click="onSubmit">确定</a>
        </x-header>
        <group class="gc-form">
          <x-address title="城市" v-model="gcForm.city" :list="addressData" hide-district placeholder="请填写城市" :popup-style="{'z-index':1000}" v-verify="gcForm.city"></x-address>
          <x-input title="收货人" label-width="80px" placeholder-align="right" text-align="right" v-model="gcForm.contact" placeholder="请填写收货人姓名" v-verify="gcForm.contact"></x-input>
          <x-input title="手机号" label-width="80px" placeholder-align="right" text-align="right" v-model="gcForm.mobile" placeholder="请填写收货人手机" v-verify="gcForm.mobile"></x-input>
          <x-input title="地址" label-width="80px" placeholder-align="right" text-align="right" v-model="gcForm.addr" placeholder="请填写收货地址" v-verify="gcForm.addr"></x-input>
          <cell-box>
            <label class="gc-radio-box">
              <check-icon :value.sync="gcForm.isDefault">设为默认地址</check-icon>
            </label>
          </cell-box>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
import ElButton from '@/components/common/button'
import { ChinaAddressV3Data } from 'vux'
import validateMixins from '@/mixins/validateMixins'
import { required } from '@/utils/validateGroup'
import model from '@/model'
export default {
  name: 'components-uc-address',
  title: '地址列表',
  props: {
    payment: Boolean,
    default: false
  },
  data() {
    return {
      addrs: [],
      addressPopup: false,
      addressData: ChinaAddressV3Data,
      gcForm: model.addrFn()
    }
  },
  components: {
    ElButton
  },
  verify: {
    gcForm: {
      city: [{
        test: required,
        message: '请选择城市'
      }],
      contact: [{
        test: required,
        message: '请输入收货人'
      }],
      mobile: [{
        test: required,
        message: '请输入手机号'
      }, 'phone'],
      addr: [{
        test: required,
        message: '请输入收货地址'
      }]
    }
  },
  computed: {
    popupName() {
      return this.gcForm.addr_id ? '编辑地址' : '添加新地址'
    }
  },
  mixins: [validateMixins],
  created() {
    this._loadAddrs()
  },
  methods: {
    // 加载地址列表
    async _loadAddrs() {
      let _result = await this.$api.userListAddr()
      this.addrs = _result.list
    },
    // 编辑地址
    onEdit(index) {
      let _addr = this.addrs[index]
      this.gcForm = Object.assign(model.addrFn(), _addr, { isDefault: !!_addr.default, city: [_addr.city.toString().substr(0, 2).padEnd(6, 0), _addr.city.toString()] })
      this.addressPopup = true
    },
    // 删除地址
    onDel(addrId, index) {
      let vm = this
      this.$vux.confirm.show({
        content: '确认删除该地址？',
        title: '友情提示',
        onCancel() {
        },
        onConfirm() {
          vm.$api.userDelAddr(addrId)
            .then(d => {
              if (d) {
                vm.addrs.splice(index, 1)
              }
            })
        }
      })
    },
    // 添加地址
    onAdd() {
      this.gcForm = model.addrFn()
      this.$nextTick(() => {
        this.$verify.reset()
      })
      this.addressPopup = true
    },
    // 设置默认地址
    onCheck(addr, index) {
      if (addr.default == 1) {
        return
      }
      this.$api.userSetAddrDefault(addr.addr_id)
        .then(d => {
          if (d) {
            this.resetDedault(addr.addr_id)
          }
        })
    },
    // 关闭popup
    onBack() {
      this.addressPopup = false
    },
    // popup确定（添加或编辑地址）
    onSubmitConfirm() {
      let _method = `user${this.gcForm.addr_id ? 'Update' : 'Add'}Addr`
      this.$api[_method](Object.assign({}, this.gcForm, { city: this.gcForm.city[1], isDefault: +this.gcForm.isDefault }))
        .then(d => {
          if (d) {
            let _gcForm = Object.assign({}, this.gcForm, { city: this.gcForm.city[1], default: !!this.gcForm.isDefault })
            if (this.gcForm.addr_id) {
              this.$vux.toast.show({
                text: '编辑成功',
                type: 'success'
              })
              let _index = this.addrs.findIndex(a => a.addr_id == this.gcForm.addr_id)
              if (_index > -1) {
                this.addrs.splice(_index, 1, _gcForm)
              }
            } else {
              this.$vux.toast.show({
                text: '新增成功',
                type: 'success'
              })
              _gcForm.addr_id = this.gcForm.addr_id = d.addr_id
              this.addrs.unshift(_gcForm)
            }
            if (_gcForm.isDefault) {
              this.resetDedault(this.gcForm.addr_id)
            }
            this.addressPopup = false
          }
        })
    },
    resetDedault(checkedId) {
      this.addrs.forEach((_addr, _index) => {
        if (checkedId && checkedId === _addr.addr_id) {
          this.$set(this.addrs, _index, { ..._addr, default: 1 })
        } else {
          this.$set(this.addrs, _index, { ..._addr, default: 0 })
        }
      })
    },
    //选择地址
    selectAddress(addr) {
      let addrItem = addr || '';
      this.$emit('close-address-visable', addrItem)
    }

  }
}
</script>

<style lang="scss" scoped>
.gc-radio-box {
  position: relative;
  i {
    font-size: 22px;
  }
  input {
    position: absolute;
    left: -100px;
    &:checked {
      &+i {
        color: red;
      }
    }
  }
}
</style>