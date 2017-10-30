import Vue from 'vue'
import * as comps from 'vux'
for (let comp in comps) {
  let _name = comps[comp]['name']
  if (_name) {
    if (!['video','agree','clocker','color-picker','debounce','plugin','dev-tip','drawer','fullpage','md5','msg',
  'number-roller','qrcode','scroller','shake','tip','throttle','wechat-emotion','wepay-input'].includes(_name)) {
      Vue.component(_name, comps[comp])
    }
  }
}