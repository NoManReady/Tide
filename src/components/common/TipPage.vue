<template>
    <div class="business-Message">
        <msg :title="titles" :icon="icon" :buttons="buttons">
            <div class="msg-description tl w220" slot="description">
                <ul class="desc-list" v-for="(item,index) in description" :key="index" v-if="descType">
                    <li class="ellipsis fc-3">
                        <span class="vm w80">{{item.key}}:</span>
                        <span class="vms">{{item.value}}</span>
                    </li>
                </ul>
                <template v-html="description" v-else></template>
            </div>
        </msg>
    </div>
</template>
<script>
import { Msg } from 'vux'
export default {
    components: {
        Msg
    },
    props: ['titles', 'confirmText', 'cancelText', 'confirm', 'cancel', 'icon','description','buttons'],
    beforeMount() {
        this.descType = Array.isArray(this.description)
    },
    data() {
        return {
            descType: false
            
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scope>
    .msg-description{
        margin:15px auto 0;
    }
    .desc-list{
        li{
            line-height: 2;
        }
    }
</style>

