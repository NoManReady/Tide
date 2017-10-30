<template>
    <div class="pay-result">
        <x-header :left-options="{backText: ''}">支付结果</x-header>
        <div>
            <msg :title="title" :description="descript" :buttons="buttons" :icon="icon"></msg>
        </div>
    </div>
</template>

<script>
    import {
        Msg
    } from 'vux'
    export default {
        components: {
            Msg
        },
        data() {
            return {
                title: '支付成功',
                descript: '技术维护：小王</br>联系电话：130********</br> 24小时内会与您联系！',
                icon: '',
                buttons: [{
                    type: 'primary',
                    text: '返回',
                    onClick: this.changeIcon.bind(this)
                }],
                isServerHold:false,//待审核的入驻跳转过来
            }
        },
        created(){
            debugger
            this.isServerHold = (this.$route.query.type==3?true:false)
            if(this.isServerHold){
                this.title='支付成功，审核中'
            }
        },
        methods: {
            changeIcon() {
    
            }
        }
    }
</script>