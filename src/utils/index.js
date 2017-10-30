import apis from '@/api'
import store from '@/store'
import axios from 'axios'
import Vue from 'vue'
import wx from 'weixin-js-sdk'

// 环境value
let _isDev = process.env.NODE_ENV === 'development'

/**
 * 去中心化
 * @param {上下文} requireContext 
 * @param {排除文件} exinclude 
 */
export const deCentralization = (requireContext, exinclude = /index/, fn = (argv) => argv) => {
    const sourceMap = {}
    const paths = requireContext.keys().filter(p => {
        return !exinclude.test(p)
    })
    for (let p of paths) {
        const ss = fn(requireContext(p))
        for (let s in ss) {
            sourceMap[s] = ss[s]
        }
    }
    return sourceMap
}

/**
 * 开发输出log
 * @param {消息} msg 
 */
export const log = (msg) => {
    if (_isDev && console && console.log) {
        console.log(msg)
    }
}

/**
 * 获取上传token
 */
export const getUploadToken = () => {
    return new Promise((resolve, reject) => {
        if (Cookies('Upload_Token')) {
            resolve(Cookies('Upload_Token'))
        } else {
            apis.userUploadToken()
                .then(d => {
                    Cookies('Upload_Token', d.upload_token, {
                        expires: 3600
                    })
                    resolve(d.upload_token)
                })
        }
    })
}

/**
 * 构造fromData数据
 * @param {文件} f 
 * @param {资源远程目录} key 
 * @param {formData文件名} name 
 */
export const appendFormData = (f, name, key = '') => {
        let formData = new window.FormData()
        formData.append(name, f)
        return new Promise((resolve, reject) => {
            getUploadToken()
                .then(token => {
                    formData.append('token', token)
                    resolve(formData)
                })
        })
    }
    /**
     * 简易上传（头像上传）
     * @param {文件} f 
     * @param {host} host 
     * @param {资源远程目录} key 
     */
export const uploadFile = (f, host, key) => {
    return new Promise((resolve, reject) => {
        appendFormData(f, 'file', key)
            .then(fd => {
                axios.post(host, fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(d => {
                        resolve(d.data)
                    })
                    .catch(res => {
                        let _response = res.response
                        Vue.$vux.toast.show({
                            text: _response.data && _response.data.error ? _response.data.error : '上传错误',
                            type: 'warn'
                        })
                        Cookies('Upload_Token', undefined)
                        reject(_response)
                    })
            })
    })
}

/**
 * 判断空数组或对象
 * @param value
 */
export const isEmpty = (value) => {
    return Object.keys(value).length === 0;
}

/**
 * 截取小数点位数
 * @param {数值} value 
 * @param {小数点位数} len 
 */
export const toFixed = (value, len = 2) => {
    return value ? parseFloat(value).toFixed(len) : 0
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr) => {
    let target
        // scrollTop 获取方式不同，不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop
    } else if (element.currentStyle) {
        target = element.currentStyle[attr]
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr]
    }
    return target
}


/**
 * 扫码
 */
export function scanQr() {
    console.log(store.getters.device + ' scan!!!')
    switch (store.getters.device) {
        case 'browser':
            Vue.$vux.toast.text('请用App或微信！');
            break;
        case 'weixin':
            wx.scanQRCode({
                needResult: 1,
                scanType: ["qrCode"],
                success: function (res) {
                    Vue.$router.push({path: res.resultStr.split('#')[1]});
                }
            });
            break;
        case 'android':
        case 'ios':
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    Vue.$router.push({path: result.text.split('#')[1]});
                },
                function (error) {
                    Vue.$vux.toast.text('扫码失败，请再试试！');
                },
                {
                    showTorchButton : true, //显示闪光灯按钮
                    torchOn: false, //开启闪光灯
                    prompt : "请把二维码放入框内",
                    resultDisplayDuration: 500, //扫描成功停留毫秒数
                    formats : "QR_CODE", //解码格式
                    disableSuccessBeep: false //禁用成功提示音
                }
            )
            break;
    }
}

/**
 * 数组删除指定元素
 */
export function removeByValue(arr, val) {  
    for (var i = 0; i < arr.length; i++) {    
        if (arr[i] == val) {  
            arr.splice(i, 1);      
            break;    
        }  
    }
}