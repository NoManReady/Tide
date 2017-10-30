<template>
    <div class="buy-service">
        <x-header :left-options="{backText: ''}" class="pos-header">签约</x-header>
        <group>
            <checklist title="必选服务" :options="requireServer" v-model="requireChecked" :disabled="true" v-if="requireServer.length"></checklist>
            <cell v-else title="必选服务" value="无"></cell>
        </group>
        <group>
            <checklist title="可选服务" :options="optionalServer" v-model="optionalChecked" @on-change="onServerChange" v-if="optionalServer.length"></checklist>
            <cell v-else title="必选服务" value="无"></cell>
        </group>
        <div class="plr15 ptb20">
            <flexbox>
                <flexbox-item>
                    <div class="vm">总计：
                        <span class="f-red">{{total}}</span>元</div>
                </flexbox-item>
                <x-button type="primary" mini v-tap @tap.native="onBill">结算</x-button>
            </flexbox>
        </div>
    </div>
</template>

<script>
export default {
    name: 'buyService',
    title: '购买服务',
    data() {
        return {
            sid: '',
            serverList: [],
            requireChecked: [],
            optionalChecked: [],
            optionalTotal: 0,
            requireTotal: 0
        }
    },
    created() {
        this.sid = this.$route.params.sid
        this._loadServeList()
    },
    computed: {
        total() {
            return this.optionalTotal + this.requireTotal
        },
        optionalServer() {
            return this.serverList.filter(s => !s.require).map(s => {
                return { key: s.server_id, value: s.name, price: s.price }
            })
        },
        requireServer() {
            return this.serverList.filter(s => !!s.require).map(s => {
                return { key: s.server_id, value: s.name, price: s.price }
            })
        }
    },
    methods: {
        // 获取服务列表
        async _loadServeList() {
            let _result = await this.$api.shopServer(this.sid)
            let _reqired = []
            let _optional = []
            let _requireTotal = 0
            this.serverList = Object.freeze(_result.list)
            this.serverList.forEach(s => {
                if (!!s.require) {
                    _reqired.push(s.server_id)
                    _requireTotal += (+(s.price || 0))
                } else {
                    _optional.push(s.server_id)
                }
            })
            this.requireTotal = _requireTotal
            this.requireChecked = _reqired
            // this.optionalChecked = _optional
        },
        // 结算
        onBill() {

        },
        onServerChange(vals) {
            let _optionalTotal = 0
            this.optionalServer.forEach(obj => {
                if (vals.indexOf(obj.key) > -1) {
                    _optionalTotal += (+(obj.price || 0))
                }
                this.optionalTotal = _optionalTotal
            })
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
        padding: 66px 15px 82px;
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