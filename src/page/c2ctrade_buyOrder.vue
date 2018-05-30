<template>
	<div class="trade_buyOrder">
		<!--头部菜单-->
		<div class="tradeNavBox">
			<!--返回图标-->
			<router-link to="C2CTradeDcc"><i class="iconfont icon-fanhuijiantou returnBtn"></i></router-link>
			
			<div class="tradeNav">
				<div class="tradeNav_wz" v-for="(item,index) in tradeNav" :class="{'active':addClass == index}" :key='index' @click="tabNav(item,index)">
					<router-link :to='item.router'>{{item.title}}</router-link>
				</div>
			</div>
		</div>

		<!--买入记录列表-->
		<ul class="buyList">
			<li v-for="(item,index) in orderInfo">
				<div class="slBox">
					<p class="whiteColor">
						<img :src="item.gwc_logo" class="gwc_logo" alt="" /> 数量(DCC)： <i class="dccNum">{{item.dccNum}}</i>
					</p>
					<p class="orderDate khakiColor">
						{{item.orderDate}}
					</p>
				</div>
				<div class="allMOneyBox">
					<p class="whiteColor">总金额&nbsp;($)：{{item.allMoney}}</p>
					<p class="khakiColor allMoney_cny">CNY：{{item.allMoney_cny}}</p>
				</div>
				<div>
					<p class="whiteColor">单价&nbsp;($)：{{item.univalent}}</p>
					<p class="khakiColor univalent_cny">CNY：{{item.univalent_cny}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'C2CTradeBuyOrder',
		data() {
			return {
				addClass: 0,
				tradeNav: [{
						title: '买入记录',
						router: 'C2CTradeBuyOrder'
					},
					{
						title: '卖出记录',
						router: 'C2CTradeOfftakeOrder'
					}
				],
				orderInfo: [{
						gwc_logo: require('../assets/images/gwc_logo.png'),
						dccNum: '60',
						orderDate: '2018-04-12',
						allMoney: '50,235.00',
						allMoney_cny: '5,000',
						univalent: '0.00',
						univalent_cny: '5,000'
					},
					{
						gwc_logo: require('../assets/images/gwc_logo.png'),
						dccNum: '50',
						orderDate: '2018-04-12',
						allMoney: '50,235.00',
						allMoney_cny: '5,000',
						univalent: '0.00',
						univalent_cny: '5,000'
					},

				]

			}

		},
		methods: {
			tabNav(val, index) {
				this.addClass = index;
			}
		}

	}
</script>

<style lang="scss" scoped="">
	@import '../assets/scss/style.scss';
	.trade_buyOrder {
		min-height: 100vh;
		padding: 0 27px 22px 27px;
		background: #040301;
		i {
			font-style: normal;
		}
		.tradeNavBox {
			width: 100%;
			background: #040301;
			padding: 26px;
			position: fixed;
			top: 0;
			left: 0;
			.returnBtn {
				position:absolute;
				top: 30px;
				left: 40px;
				color: #fff;
				font-size: 48px;
			}
			.tradeNav {
				width: 292px;
				height: 58px;
				font-size: 28px;
				color: #D7A82B;
				margin: 0 auto;
				border: 1px solid #D7A82B;
				display: flex;
				justify-content: space-between;
				border-radius: 10px;
				div {
					width: 193px;
					line-height: 58px;
					text-align: center;
					a {
						color: #D7A82B;
					}
					&.active {
						background: #D7A82B;
						color: #040301;
						a {
							color: #040301;
						}
					}
				}
			}
		}
		/*买入记录列表*/
		.buyList {
			font-size: 28px;
			padding-top: 120px;
			.whiteColor {
				color: #fff;
			}
			li {
				width: 693px;
				height: 224px;
				background: #3F3C3C;
				border-radius: 10px;
				padding: 31px 38px;
				margin-bottom: 22px;
				border: 1px solid rgb(245, 245, 245);
				div {
					p {
						display: inline-block;
					}
				}
				div:last-child {
					margin-top: 8px;
				}
				.slBox {
					display: flex;
					justify-content: space-between;
					margin-bottom: 20px;
					.dccNum {
						color: rgb(255, 76, 24);
					}
					.gwc_logo {
						width: 30px;
						height: 29px;
						vertical-align: middle;
						margin-right: 5px;
					}
				}
				.khakiColor {
					color: rgb(165, 149, 105);
				}
				.allMoney_cny,
				.univalent_cny {
					margin-left: 20px;
				}
			}
		}
	}
</style>