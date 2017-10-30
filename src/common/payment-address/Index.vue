<template>
    <group class="address-item">
		<div class="gc-cell vux-flexbox">
			<div class="flex-one">
				<p class="pl20">
					<span class="addr-name">
						{{addressInfo.contact}}
					</span>
					<span class="addr-tel pl20">
						{{addressInfo.mobile}}
					</span>
				</p>
				<div class="word-break pt5">
					<i class="iconfont icon-location"></i>
					{{addressInfo.addr}}
				</div>
			</div>
			<i class="iconfont icon-right"></i>
		</div>
	</group>
</template>
<script>
    export default {
        title: '订单地址',
        props: {
            addressInfo: Object
        },
        data() {
            return {}
        }
    }
</script>
<style lang="less">
    .address-item {
        .weui-cells {
            margin-top: 0;
        }
    }
</style>
<style lang="scss" scoped>
    @import "../../style/scss/_mixin.scss";
    @import '../../style/scss/_available.scss';
    .address-item {
        border-bottom: 2px solid transparent;
        background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, red 0, red 12.5%, transparent 0, transparent 25%, #58a 0, #58a 37.5%, transparent 0, transparent 50%) 0 / 3em 3em;
        p {
            font-weight: 700;
        }
    }
</style>