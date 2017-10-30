import AMap from 'AMap'
import { saveToLocal } from '@/utils/localStorage'
import store from '@/store'
export default {
  install(Vue, options) {
    Object.defineProperty(Vue.prototype, '$geolocation', {
      value() {
        // store.dispatch('locationing')
        let mapObj = null
        let geolocation = null
        mapObj = new AMap.Map(document.createElement('div'))
        mapObj.plugin('AMap.Geolocation', function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 10000,           //定位结果缓存0毫秒，默认：0
            convert: false,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false,        //显示定位按钮，默认：true
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)
        })
        function onComplete(result) {
          let _addr = result.addressComponent
          let _city = { id: _addr.adcode.toString().substr(0, 4).padEnd(6, 0), name: _addr.city || _addr.province }
          // store.dispatch('locationing', false)
          if(store.getters.city.id!==_city.id){
            Vue.$vux.confirm.show({
              content:`当前位于${_city.name},是否切换城市`,
              onCancel () {
                store.dispatch('setCity', { id: '350100', name: '福州' })
              },
              onConfirm () {
                saveToLocal('city', _city)
                store.dispatch('setCity', _city)
              }
            })
          }
        }
        function onError() {
          Vue.$vux.toast.show({
            text: '定位失败',
            type: 'warn',
            width: '10em'
          })
          // store.dispatch('locationing', false)
          store.dispatch('setCity', { id: '350100', name: '福州' })
        }
      }
    })
  }
}