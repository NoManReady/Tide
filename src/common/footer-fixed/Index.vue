<template>
    <div class="footer-check vux-flexbox">
        <slot name="check"></slot>
        <div class="total">
            <slot name="total"></slot>
        </div>
        <div class="btn">
            <slot name="btn"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {

    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
@import "../../style/scss/_mixin.scss";
@import '../../style/scss/_available.scss';
.footer-check {
    width: 100%;
    padding: 0 0 0 10px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    line-height: 50px;
    @include border-1px(#e5e5e5, before, top);
    .check-label {}
    .total {
        padding-left: 10px;
        font-size: 16px;
        flex: 1;
    }
    .btn {
        line-height: 50px;
        width: 40%;
        background-color: $theme;
        text-align: center;
        color: #fff;
        font-size: 18px;
    }
}
</style>