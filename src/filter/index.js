import Vue from 'vue';
import { toFixed } from '@/utils'
import './platform'
//保留2位小数
Vue.filter('toFixed', function (value) {
    return toFixed(value)
})