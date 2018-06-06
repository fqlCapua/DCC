<template>
	<div class="trade_myOrder">
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

		<!--卖出记录列表-->
		<div class="offtakeBox">
			<div class="offtakeListNav">
				<div class="offtakeNav_wz" v-for="(item,index) in offtakeNav" :class="{'clicked':addClass2 == index}" :key='index' @click="offtakeClicked(item,index)">
					{{item.title}}
				</div>
			</div>
			<!--出售中-->
			<ul class="offtakeList" v-show="csz">
				<li v-for="(item,index) in orderInfo1">
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
			<!--已完成-->
			<ul class="offtakeList" v-show="ywc">
				<li v-for="(item,index) in orderInfo2">
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
	</div>
</template>
<script>
	export default {
		name: 'c2cTradeOfftakeOrder',
		data() {
			return {
				addClass: 1,
				addClass2: 0,
				csz: true,
				ywc: false,
				tradeNav: [{
						title: '买入记录',
						router: 'C2CTradeBuyOrder'
					},
					{
						title: '卖出记录',
						router: 'C2CTradeOfftakeOrder'
					}
				],
				offtakeNav: [{
						title: '出售中',
					},
					{
						title: '已完成',
					}
				],
				orderInfo1: [{
						gwc_logo: require('../assets/images/gwc_logo.png'),
						dccNum: '50',
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

				],
				orderInfo2: [{
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
    mounted() {
      let $that = this;
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if(!localStorage.getItem('token')){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            $that.$router.push('/login')
          },2000)
        }
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        if(!$that.getCookie('token')){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            $that.$router.push('/login')
          },2000)
        }
      }
    },
		methods: {
			tabNav(val, index) {
				this.addClass = index;
			},
			offtakeClicked(val, index) {
				this.addClass2 = index;
				if(index == 0) {
					this.csz = true;
					this.ywc = false;
				} else {
					this.ywc = true;
					this.csz = false;
				}
			}
		}

	}
</script>

<style lang="scss" scoped="">
	@import '../assets/scss/style.scss';
	.trade_myOrder {
		min-height: 100vh;
		padding: 22px 0;
		background: #040301;
		i {
			font-style: normal;
		}
		.tradeNavBox {
			width: 100%;
			background: #040301;
			padding: 26px 0 0;
			position: fixed;
			top: 0;
			left: 0;
			.returnBtn {
				position: absolute;
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
		/*卖出记录列表*/
		.offtakeBox {
			padding-top: 80px;
			.offtakeListNav {
				height: 90px;
				width: 100vw;
				background: #3F3C3C;
				margin-bottom: 20px;
				display: flex;
				justify-content: space-around;
				.offtakeNav_wz {
					width: 95px;
					font-size: 28px;
					line-height: 90px;
					color: rgb(165, 149, 105);
					text-align: center;
					&.clicked {
						color: #D7A82B;
						border-bottom: 2px solid rgb(215, 168, 43);
					}
				}
			}
			.offtakeList {
				font-size: 28px;
				padding: 0 27px;
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
	}
</style>
