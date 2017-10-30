<template>
    <div class="platform-uc-sign uc-sign">
        <x-header :left-options="{backText: ''}" class="pos-header">签约</x-header>
        <div class="sign-box">
            <div class="inner">
                fdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd

            </div>
        </div>
        <div class="pos-footer plr20">
            <p class=" ">
                <check-icon :value.sync="isRead" class="mt10 mb10">阅读并同意以上内容</check-icon>
            </p>
            <flexbox class="pb10">
                <flexbox-item class="mr20">
                    <x-button type="primary" :disabled="!isRead" @click.native="doResolve">同意</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button @click.native="doReject">不同意</x-button>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'platform-uc-sign',
    title: '入驻签约',
    data() {
        return {
            isRead: false,
            sid: ''
        }
    },
    created() {
        this.sid = this.$route.params.sid
    },
    computed: {
        ...mapGetters(['userShops'])
    },
    methods: {
        ...mapActions(['getUserInfo']),
        // 同意
        async doResolve() {
            let vm = this
            let _result = await this.$api.shopSign(this.sid)
            await this.getUserInfo()
            if (_result && this.userShops[0].stype != 3) {
                this.$router.replace({ name: 'platformBuyService', params: { sid: this.sid } })
            } else {
                this.$vux.toast.show({
                    text: '签约已完成!',
                    onHide() {
                        vm.doReject()
                    }
                })
            }
        },
        // 不同意
        doReject() {
            this.$router.replace({ name: 'platformHome' })
        }
    }
}
</script>

<style scoped lang="scss">
.uc-sign {
    height: 100%;
    overflow: hidden;
    position: relative;
    .pos-header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .pos-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .sign-box {
        height: 100%;
        padding: 66px 15px 92px;
        overflow: hidden;
        .inner {
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            word-break: break-all;
            word-wrap: break-word;
            border: 1px solid #d9d9d9;
            padding: 15px;
        }
    }
}
</style>