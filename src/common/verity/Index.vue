<template>
<button class="vcode-btn" @click="onHandlerClick" :disabled="isDisabled">{{text}}</button>
</template>
<script>
import { saveToSession, loadFromSession } from '@/utils/sessionStorage'
let _timer=null
export default {
  name: "component_verity",
  props: {
    initText: {
      type: String,
      default: "获取验证码"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    keyCode:{
      type:String,
      required:true
    },
    max:{
      type:Number,
      default:60
    }
  },
  data() {
    return {
      text:'',
      time:0
    }
  },
  created(){
    this.time=parseInt(loadFromSession(this.keyCode+'_TIMER'))||0
    this.setTimer(this.time)
  },
  computed:{
    isDisabled(){
      return !!(this.disabled||this.time)
    }
  },
  methods:{
    onHandlerClick(){
      this.onClick().then(d=>{
        this.setTimer(this.max)
      })
    },
    setTimer(time){
      clearInterval(_timer)
      this.time=time
      if(this.time){
        this.text=this.time
        _timer=window.setInterval(()=>{
          this.time--
          saveToSession(this.keyCode+'_TIMER',this.time)
          if(!this.time){
            clearInterval(_timer)
            this.text=this.initText
          }else{
            this.text=this.time
          }
        },1000)
      }else{
        this.text=this.initText
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/scss/_available";
.vcode {
  position: relative;
  &-btn {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #fff;
    font-size: 10px;
    border-radius: 15px;
    background: $theme;
    position: absolute;
    right: 0;
    bottom: 5px;
    border: none;
    z-index: 10;
    min-width:80px;

    &[disabled] {
      background: #ccc;
    }
  }
}
</style>