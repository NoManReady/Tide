<template>
  <div class="platform-uc-seller gc-form">
    <x-header :left-options="{backText: ''}">我要入驻</x-header>
    <group title="不可更改" label-width="100px">
      <x-input title="商户名称" v-model="gcForm.name" text-align="left" v-verify="gcForm.name"></x-input>
    </group>
    <group label-width="100px">
      <popup-radio title="商户类型" :options="typeList" v-model="gcForm.type" v-verify="gcForm.type" placeholder="请选择商户类型"></popup-radio>
      <x-address title="城市" v-model="gcForm.city" :list="addressData" :hide-district="true" value-text-align="left" v-verify="gcForm.city"></x-address>
      <popup-radio v-if="gcForm.type!=3" title="商圈" :options="businessList" v-model="gcForm.area" v-verify="gcForm.area" placeholder="请选择商圈">
        <template scope="props" slot="each-item">
          <img :src="businessList[props.index].cover" class="business-area-logo vm">
          <div class="business-area-content vm">
            <span class="business-area-tit">{{ props.label }}</span>
            <p class="business-area-desc" :class="{'ellipise-mutil':businessList[props.index].remark.length>50}">
              <small>{{businessList[props.index].remark}}</small>
            </p>
          </div>
        </template>
      </popup-radio>
      <x-input title="联系人" v-model="gcForm.contact" v-verify="gcForm.contact"></x-input>
      <x-input title="联系电话" type="tel" v-model="gcForm.mobile" v-verify="gcForm.mobile"></x-input>
      <x-textarea title="地址" v-model="gcForm.addr" :rows="2"></x-textarea>
    </group>
    <group label-width="100px">
      <x-input title="QQ" v-model="gcForm.qq"></x-input>
      <x-input title="微信" v-model="gcForm.wx"></x-input>
      <x-input title="简介" v-model="gcForm.introduce"></x-input>
    </group>
    <div class="plr15 ptb20">
      <x-button type="primary" @click.native="onSubmit">提交</x-button>
    </div>
  </div>
</template>

<script>
import { ChinaAddressV3Data } from 'vux'
import { required } from '@/utils/validateGroup'
import validateMixins from '@/mixins/validateMixins'
import { mapActions, mapGetters } from 'vuex'
import model from '@/model'
export default {
  name: 'platform-uc-seller',
  title: '我要入驻',
  data() {
    return {
      typeList: [
        //{
        //  key: 1,
        //  value: "上游"
        //},
        {
          key: 2,
          value: "批发商"
        }, {
          key: 3,
          value: "零售商"
        }
      ],
      businessList: [],
      cityArray: [],
      addressData: ChinaAddressV3Data,
      gcForm: model.shopFn()
    }
  },
  mixins: [validateMixins],
  verify: {
    gcForm: {
      city: [{
        test: required,
        message: '请选择城市'
      }],
      name: [{
        test: required,
        message: '请输入商铺名称'
      }],
      contact: [{
        test: required,
        message: '请输入联系人'
      }],
      area: [{
        test(val) {
          if (this.gcForm.type == 3) {
            return true
          }
          return !!val
        },
        message: '请选择商圈'
      }],
      type: [{
        test: required,
        message: '请选择商铺类型'
      }],
      mobile: [{
        test: required,
        message: '请输入手机号'
      }, 'phone']
    }
  },
  computed: {
    ...mapGetters(['userShops', 'city'])
  },
  created() {
    // 存在商铺，过滤出非搬运sid,存在说明入驻过，否则进入入驻第一步
    let _shop = this.userShops.find(s => !!s.sid)
    if (_shop) {
      if (!_shop.sign) {// 是否入驻
        // 跳转签约页
        this.$router.replace({ name: 'platformUcSign', params: { sid: _shop.sid } })
      } else if (!_shop.server) {//是否开启服务
        // 跳转服务页
        this.$router.replace({ name: 'platformBuyService', params: { sid: _shop.sid } })
      } else {//否则进入入驻第一步
        this._loadBusinessList()
      }
    } else {
      this._loadBusinessList()
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    // 加载商圈列表
    async _loadBusinessList() {
      if (this.city) {
        let _result = await this.$api.sysListArea(this.city.id)
        this.businessList = Object.freeze(_result.area.map(a => {
          return {
            key: a.aid,
            value: a.name,
            cover: a.cover,
            remark: a.remark
          }
        }))
      }
    },
    //提交
    async onSubmitConfirm() {
      let sid = await this.$api.shopAdd(Object.assign({}, this.gcForm, { city: this.gcForm.city[1] }))
      await this.getUserInfo()
      this.$router.replace({ name: 'platformUcSign', params: { sid } })
    }
  }
}
</script>

<style lang="scss" scoped>
.business-area-logo {
  width: 80px;
  height: 80px;
  margin-right: 8px;
}

.business-area-content {
  width: 230px;
  .business-area-tit {
    font-size: 15px;
  }
  .business-area-desc {
    color: #999;
    overflow: hidden;
    line-height: 1.4em;
    height: 2.8em;
  }
}

.ellipise-mutil {
  position: relative;
}

.ellipise-mutil::after {
  content: "...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: -16px;
  padding: 0 20px 1px 45px;
  background: url('../../../assets/ellipsis_bg.png') repeat-y;
}
</style>