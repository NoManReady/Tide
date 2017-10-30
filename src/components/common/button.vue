<template>
  <button :disabled="disabled" class="el-button"
    @click="handleClick"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      size ? 'el-button--' + size : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="'el-icon-' + icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
<style scope lang="scss">
@import '../../style/scss/_available';
@charset "UTF-8";
:root{
    /* Transition
  -------------------------- */
    /* Colors
  -------------------------- */
    /* Link
  -------------------------- */
    /* Border
  -------------------------- */
    /* Box-shadow
  -------------------------- */
    /* Fill
  -------------------------- */
    /* Font
  -------------------------- */
    /* Size
  -------------------------- */
    /* z-index
  -------------------------- */
    /* Disable base
  -------------------------- */
    /* Icon
  -------------------------- */
    /* Checkbox
  -------------------------- */
    /* Radio
  -------------------------- */
    /* Select
  -------------------------- */
    /* Alert
  -------------------------- */
    /* Message Box
  -------------------------- */
    /* Message
  -------------------------- */
    /* Notification
  -------------------------- */
    /* Input
  -------------------------- */
    /* Cascader
  -------------------------- */
    /* Group
  -------------------------- */
    /* Tab
  -------------------------- */
    /* Button
  -------------------------- */
    /* cascader
  -------------------------- */
    /* Switch
 -------------------------- */
    /* Dialog
 -------------------------- */
    /* Table
 -------------------------- */
    /* Pagination
 -------------------------- */
    /* Popover
 -------------------------- */
    /* Tooltip
  -------------------------- */
    /* Tag
  -------------------------- */
    /* Dropdown
  -------------------------- */
    /* Badge
  -------------------------- */
    /* Card
  --------------------------*/
    /* Slider
  --------------------------*/
    /* Steps
  --------------------------*/
    /* Menu
  --------------------------*/
    /* Rate
  --------------------------*/
    /* DatePicker
  --------------------------*/
    /* Loading
  --------------------------*/
    /* Scrollbar
  --------------------------*/
    /* Carousel
  --------------------------*/
    /* Collapse
  --------------------------*/
}

.el-button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid rgb(217, 206, 191);
    color: rgb(61, 48, 31);
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
}

.el-button + .el-button{
    margin-left: 10px;
}
.el-button:active{
    color: lighten($theme,5%);
    border-color: lighten($theme,5%);
    outline: none;
}

.el-button::-moz-focus-inner{
    border: 0;
}

.el-button [class*="el-icon-"]{}

.el-button [class*="el-icon-"] + span{
    margin-left: 5px;
}

.el-button.is-loading{
    position: relative;
    pointer-events: none;
}

.el-button.is-loading:before{
    pointer-events: none;
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background-color: rgba(255,255,255,.35);
}

.el-button.is-disabled{}

.el-button.is-disabled{
    color: rgb(217, 206, 191);
    cursor: not-allowed;
    background-image: none;
    background-color: rgb(246, 244, 238);
    border-color: rgb(229, 221, 209);
}

.el-button.is-disabled.el-button--text{
    background-color: transparent;
}

.el-button.is-disabled.is-plain{}

.el-button.is-disabled.is-plain{
    background-color: #fff;
    border-color: rgb(229, 221, 209);
    color: rgb(217, 206, 191);
}

.el-button.is-active{
    color: lighten($theme,5%);
    border-color: lighten($theme,5%);
}

.el-button.is-plain{}

.el-button.is-plain:active{
    background: #fff;
    border-color: lighten($theme,5%);
    color: lighten($theme,5%);
    outline: none;
}

.el-button--primary{
    color: #fff;
    background-color: $theme;
    border-color: $theme;
}
.el-button--primary:active{
    background: lighten($theme,5%);
    border-color: lighten($theme,5%);
    color: #fff;
    outline: none;
}

.el-button--primary.is-active{
    background: lighten($theme,5%);
    border-color: lighten($theme,5%);
    color: #fff;
}

.el-button--primary.is-plain{
    background: #fff;
    border: 1px solid rgb(217, 206, 191);
    color: rgb(61, 48, 31);
}

.el-button--primary.is-plain:active{
    background: #fff;
    border-color: lighten($theme,5%);
    color: lighten($theme,5%);
    outline: none;
}

.el-button--success{
    color: #fff;
    background-color: #13ce66;
    border-color: #13ce66;
}

.el-button--success:active{
    background: rgb(17, 185, 92);
    border-color: rgb(17, 185, 92);
    color: #fff;
    outline: none;
}

.el-button--success.is-active{
    background: rgb(17, 185, 92);
    border-color: rgb(17, 185, 92);
    color: #fff;
}

.el-button--success.is-plain{
    background: #fff;
    border: 1px solid rgb(217, 206, 191);
    color: rgb(61, 48, 31);
}


.el-button--success.is-plain:active{
    background: #fff;
    border-color: rgb(17, 185, 92);
    color: rgb(17, 185, 92);
    outline: none;
}

.el-button--warning{
    color: #fff;
    background-color: #f7ba2a;
    border-color: #f7ba2a;
}

.el-button--warning:active{
    background: rgb(222, 167, 38);
    border-color: rgb(222, 167, 38);
    color: #fff;
    outline: none;
}

.el-button--warning.is-active{
    background: rgb(222, 167, 38);
    border-color: rgb(222, 167, 38);
    color: #fff;
}

.el-button--warning.is-plain{
    background: #fff;
    border: 1px solid rgb(217, 206, 191);
    color: rgb(61, 48, 31);
}

.el-button--warning.is-plain:active{
    background: #fff;
    border-color: rgb(222, 167, 38);
    color: rgb(222, 167, 38);
    outline: none;
}

.el-button--danger{
    color: #fff;
    background-color: #ff4949;
    border-color: #ff4949;
}

.el-button--danger:active{
    background: rgb(230, 66, 66);
    border-color: rgb(230, 66, 66);
    color: #fff;
    outline: none;
}

.el-button--danger.is-active{
    background: rgb(230, 66, 66);
    border-color: rgb(230, 66, 66);
    color: #fff;
}

.el-button--danger.is-plain{
    background: #fff;
    border: 1px solid rgb(217, 206, 191);
    color: rgb(61, 48, 31);
}

.el-button--danger.is-plain:active{
    background: #fff;
    border-color: rgb(230, 66, 66);
    color: rgb(230, 66, 66);
    outline: none;
}

.el-button--info{
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
}


.el-button--info:active{
    background: rgb(29, 144, 230);
    border-color: rgb(29, 144, 230);
    color: #fff;
    outline: none;
}

.el-button--info.is-active{
    background: rgb(29, 144, 230);
    border-color: rgb(29, 144, 230);
    color: #fff;
}

.el-button--info.is-plain{
    background: #fff;
    border: 1px solid rgb(217, 206, 191);
    color: rgb(61, 48, 31);
}

.el-button--info.is-plain:active{
    background: #fff;
    border-color: rgb(29, 144, 230);
    color: rgb(29, 144, 230);
    outline: none;
}

.el-button--large{
    padding: 11px 19px;
    font-size: 16px;
    border-radius: 4px;
}

.el-button--small{
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 4px;
}

.el-button--mini{
    padding: 4px 4px;
    font-size: 12px;
    border-radius: 4px;
}

.el-button--text{
    border: none;
    color: $theme;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
}
.el-button--text:active{
    color: lighten($theme,5%);
}

.el-button-group{
    display: inline-block;
    vertical-align: middle;
}

.el-button-group:before, .el-button-group:after{
    display: table;
    content: "";
}

.el-button-group:after{
    clear: both;
}

.el-button-group .el-button--primary{}

.el-button-group .el-button--primary:first-child{
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--primary:last-child{
    border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--primary:not(:first-child):not(:last-child){
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--success{}

.el-button-group .el-button--success:first-child{
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--success:last-child{
    border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--success:not(:first-child):not(:last-child){
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--warning{}

.el-button-group .el-button--warning:first-child{
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--warning:last-child{
    border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--warning:not(:first-child):not(:last-child){
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--danger{}

.el-button-group .el-button--danger:first-child{
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--danger:last-child{
    border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--danger:not(:first-child):not(:last-child){
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--info{}

.el-button-group .el-button--info:first-child{
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--info:last-child{
    border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--info:not(:first-child):not(:last-child){
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button{
    float: left;
    position: relative;
}

.el-button-group .el-button + .el-button{
    margin-left: 0;
}

.el-button-group .el-button:first-child{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.el-button-group .el-button:last-child{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.el-button-group .el-button:not(:first-child):not(:last-child){
    border-radius: 0;
}

.el-button-group .el-button:not(:last-child){
    margin-right: -1px;
}

.el-button-group .el-button:hover, .el-button-group .el-button:focus, .el-button-group .el-button:active{
    z-index: 1;
}

.el-button-group .el-button.is-active{
    z-index: 1;
}
:root{
    /* Transition
  -------------------------- */
    /* Colors
  -------------------------- */
    /* Link
  -------------------------- */
    /* Border
  -------------------------- */
    /* Box-shadow
  -------------------------- */
    /* Fill
  -------------------------- */
    /* Font
  -------------------------- */
    /* Size
  -------------------------- */
    /* z-index
  -------------------------- */
    /* Disable base
  -------------------------- */
    /* Icon
  -------------------------- */
    /* Checkbox
  -------------------------- */
    /* Radio
  -------------------------- */
    /* Select
  -------------------------- */
    /* Alert
  -------------------------- */
    /* Message Box
  -------------------------- */
    /* Message
  -------------------------- */
    /* Notification
  -------------------------- */
    /* Input
  -------------------------- */
    /* Cascader
  -------------------------- */
    /* Group
  -------------------------- */
    /* Tab
  -------------------------- */
    /* Button
  -------------------------- */
    /* cascader
  -------------------------- */
    /* Switch
 -------------------------- */
    /* Dialog
 -------------------------- */
    /* Table
 -------------------------- */
    /* Pagination
 -------------------------- */
    /* Popover
 -------------------------- */
    /* Tooltip
  -------------------------- */
    /* Tag
  -------------------------- */
    /* Dropdown
  -------------------------- */
    /* Badge
  -------------------------- */
    /* Card
  --------------------------*/
    /* Slider
  --------------------------*/
    /* Steps
  --------------------------*/
    /* Menu
  --------------------------*/
    /* Rate
  --------------------------*/
    /* DatePicker
  --------------------------*/
    /* Loading
  --------------------------*/
    /* Scrollbar
  --------------------------*/
    /* Carousel
  --------------------------*/
    /* Collapse
  --------------------------*/
}
</style>
