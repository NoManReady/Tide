<template>
	<div class="shops-payment-goods-list gc-container has-header">
		<!-- header -->
		<x-header :left-options="{backText: ''}" class="gc-header">商品清单
			<span slot="right">共{{cartInfo.goods_count}}件</span>
		</x-header>
		<!-- 商品列表 -->
		<ul class="list goods-list">
			<li v-for="(item,index) in cartInfo.goods" :key="index">
				<div class="goods-img">
					<img :src="item.thumb" alt="">
				</div>
				<div class="goods-info-box">
					<div class="goods-name ell-2">
						<span>
							{{item.title}}
						</span>
					</div>
					<div class="goods-spec" v-if="item.list">
						<div class="spec-item vux-flexbox" v-for="(spec,index) in item.list" :key="index">
							<div class="spec-item-left">
								{{spec.sname}}
							</div>
							<div class="spec-item-right">
								<span class="f-theme pr10">￥{{spec.sales_price}}</span>x{{spec.num}}
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import {
	mapGetters,
	mapActions
} from 'vuex'
export default {
	name: 'shops-payment-goods-list',
	title: '商品清单',
	data() {
		return {
		}
	},
	created() {

	},
	computed: {
		...mapGetters(['cartInfo'])
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
@import '../../../style/scss/_available.scss';
.shops-payment-goods-list {
	.goods-list {
		li {
			height: auto;
		}
	}
}

.goods-spec {
	padding-left: 10px;
	.spec-item {
		@include justify-content(space-between);
		padding: 6px 0;
		position: relative;
		@include border-1px(#e8e8e8, before, top);
		&:first-child {
			@include border-none();
		}
		.spec-item-right {}
	}
}
</style>