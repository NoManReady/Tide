<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'

export default {
    name: 'app',
    data() {
        return {
            wxConfig: {
                debug: false,
                url: window.location.href.split('#')[0],
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'getLocation', 'scanQRCode']
            },
            wxShare:{
                title: '敢潮云订货',
                link: window.location.href.split('#')[0],
                imgUrl: this.$config.qiniuView+'img/logo.png',
                desc: '服装批发整体解决方案'
            }
        }
    },
    created() {
        console.log('app created start!')
        if (this.$store.getters.device == 'weixin'){
            this.$api.weixinJssdk(this.wxConfig).then((obj) => {
                wx.config(obj)
                console.log('weixin-js-sdk config!')
                wx.ready(() => {
                    wx.onMenuShareTimeline(this.wxShare);
                    wx.onMenuShareAppMessage(this.wxShare);
                    wx.onMenuShareQQ(this.wxShare);
                    wx.onMenuShareQZone(this.wxShare);
                })
                console.log('weixin-js-sdk ready!')
            })
        }
        console.log('app created end!')
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/close.less';
body {
    background-color: #fbf9fe;
    font-size: 14px;
}
</style>
<style lang="scss">
@import './style/scss/_common.scss';
@import './style/scss/_animate.scss';
@import './style/scss/_base.scss';
@import './style/scss/_icons.css';
@import './style/scss/product.scss';
@import './style/scss/category.scss';
@import './style/scss/filter';
html,
body,
#app,
.layout {
    height: 100%;
    overflow: hidden;
}
</style>