<template>
    <group class="index-list-item" :title="index">
        <slot></slot>
    </group>
</template>
<script>
import {
    Group
} from 'vux'
export default {
    props: {
        index: {
            type: String,
            require: true
        }
    },
    components: {
        Group
    },
    mounted() {
        this.$parent.sections.push(this);
    },
    beforeDestroy() {
        let index = this.$parent.sections.indexOf(this);
        if (index > -1) {
            this.$parent.sections.splice(index, 1);
        }
    }
}
</script>
<style lang="scss">

</style>