<template>
	<div class="trade_dcc">
	<!--	头部标题-->
		<div class="headerNav">
			<div class="headerNav_wz" :class="{'active' : addClass === index}" :key='index' v-for="(item,index) in titleNav" @click='tabNav(item,index)'>
				<router-link :to='item.router'>{{item.title}}</router-link>
			</div>
		</div>
<!--		交易信息-->
		<div class="tradeInfoBox">
			<ul class="tradeInfo_left">
				<li v-for="(item,index) in price">
					<p class="wz_comm">{{item.kp}}</p>
					<p class="kpPrice">{{item.kpPrice}}<i class="moneySymbol">&nbsp;$</i> </p>
					<p class="wz_comm">{{item.sp}}</p>
					<p class="spPrice">{{item.spPrice}}<i class="moneySymbol">&nbsp;$</i></p>
				</li>
			</ul>
			<ul class="tradeInfo_right">
				<li v-for="(item,index) in info">
					<p>{{item.topWZ}} <i class="topPrice greenColor">{{item.topPrice}}$</i> </p>
					<p>{{item.bottomWz}} <i class="bottomPrice redColor">{{item.bottomPrice}}$</i> </p>
					<p>{{item.nowWz}} <i class="nowPrice greenColor">{{item.nowPrice}}</i> </p>
					<p>{{item.historyWz}} <i class="historyPrice greenColor">{{item.historyPrice}}</i></p>
				</li>
			</ul>
		</div>
		<!--买入/卖出/我的订单-->
		<div class="listBox">
			<!--列表菜单-->
			<div class="listNav">
				<div class="listNav_buyOfftake" :class="{clicked : addClass2 === index }" v-for='(item,index) in listNav' @click="navClicked(item,index)">
					{{item.title}}
				</div>
				<p class="listNav_myOrder">
					<router-link to='/c2cTradeBuyOrder'>
						我的訂單
					</router-link>

				</p>
			</div>
			<!--买入列表-->
			<div class="buyList" v-show="listShow">
				<ul>
					<li class="buyList_li" v-for='(item,index) in buyList'>
						<div class="list_top">
							<div class="name">
								<img :src="item.tx" alt="" class="tx_img"/>
								<i class="name">{{item.name}}</i>
							</div>
							<router-link to="c2cTradeBuy">
								<p class="buyBtn">{{item.buyBtn}}</p>
							</router-link>

						</div>
						<div class="list_bottom">
							<div class="amountBox">
								<p class="amount">{{item.buyNum}}</p>
								<p class="sl_wz">{{item.sl_wz}}</p>
							</div>
							<div class="priceBox">
								<div class="univalentBox">
									<p class="commentP">
										<img :src="item.dj" alt="" class="imgCommont"> 單價 : $ <i class="univalent">{{item.univalent}}</i>
									</p>
									<p class="cnyP">CNY: <i class="univalent_cny">{{item.univalent_cny}}</i></p>
								</div>
								<div class="sumBox">
									<p class="commentP">
										<img :src="item.zje" alt="" class="imgCommont"> 總金額 : $ <i class="sum">{{item.univalent}}</i>
									</p>
									<p class="cnyP">CNY: <i class="sum_cny">{{item.sum_cny}}</i></p>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<!--查看更多-->
				<div class="moreBox">
					查看更多
				</div>
			</div>

			<!--卖出的表单-->
			<div class="offtake_form" v-show="formShow">
				<p class="kcsDcc">可出售的DCC數量：</p>
				<div class="offtakeInfo">
					<p class="scslP">
						<i class="whiteColor">出售數量</i>
						<i class="zdcsDcc">最低出售量:DCC</i>
					</p>
					<div class="input_common">
						<input type="text" placeholder="請輸入出售數量" class="csslInput" />
						<i>DCC</i>
					</div>
					<p class="sxfP whiteColor">手續費:DCC</p>
					<p class="prompt">平台预收10%手续费，若交易失败手续费原路返回</p>
					<p class="scdj whiteColor">出售單價</p>
					<div class="csdjInput input_common">
						<input type="text" placeholder="請輸入區間內的單價" />
						<i>CNY</i>
					</div>
					<p class="prompt">單價區間：最低0.02-最高0.06</p>
					<p class="yjsrP whiteColor">預計收入：$</p>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		name: 'c2cTradeDcc',
		data() {
			return {
				addClass: 0,
				addClass2: 0,
				listShow: true,
				formShow: false,
				titleNav: [
				{
						title: 'DCC',
						router: 'c2cTradeDcc'
					},
					{
						title: 'USDT',
						router: 'c2cTradeUsdt'
					}
				],
				price: [{
					kp: '开盘价：',
					kpPrice: '0.10',
					sp: '收盘价：',
					spPrice: '0.00'
				}],
				info: [{
					topWZ: '最高：',
					topPrice: '0.00',
					bottomWz: '最低：',
					bottomPrice: '0.00',
					nowWz: '当前出售总额：',
					nowPrice: '0',
					historyWz: '历史购买总额：',
					historyPrice: '0'
				}],
				listNav: [{
						title: '买入'
					},
					{
						title: '卖出'
					}
				],
				buyList: [{
						tx: require('../assets/images/tx.png'),
						name: '匿名',
						buyBtn: '购买',
						buyNum: '200',
						sl_wz: '數量(DCC)',
						dj: require('../assets/images/dj.png'),
						univalent: '0.80',
						zje: require('../assets/images/zje.png'),
						univalent_cny: '0.00',
						sum_cny: '500,000.00'
					},
					{
						tx: require('../assets/images/tx.png'),
						name: '匿名',
						buyBtn: '购买',
						buyNum: '200',
						sl_wz: '數量(DCC)',
						dj: require('../assets/images/dj.png'),
						univalent: '0.80',
						zje: require('../assets/images/zje.png'),
						univalent_cny: '0.00',
						sum_cny: '500,000.00'
					}

				],

			}
		},

		mounted () {
		    this.$bus.$emit('footer', {
		      button: [],
		      navShow: true
		    })
      if(!this.getCookie('token') || this.getCookie('token') === "null" ){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          this.$router.push('/login')
        },2000)
      }
		  },
		  beforeDestroy () {
		    this.$bus.$emit('footer', false)
		  },

		methods: {
			tabNav(val, index) {
				this.addClass = index;
			},
			navClicked(val, index) {
				this.addClass2 = index;
				if(index == 0) {
					this.listShow = true;
					this.formShow = false;
				} else {
					this.listShow = false;
					this.formShow = true;
				}
			}
		}

	}
</script>
<style lang="scss" scoped="">
	@import '../assets/scss/style.scss';
	i {
		font-style: normal;
	}

	.trade_dcc {
		padding: 22px 0 0 0;
		background: #040301;
		height: 100vh;
		.headerNav {
			display: block;
			width: 292px;
			height: 58px;
			font-size: 32px;
			color: #D7A82B;
			margin: 0 auto 22px;
			display: flex;
			justify-content: space-between;
			border: 1px solid #D7A82B;
			border-radius: 10px;
			div {
				width: 196px;
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
		.tradeInfoBox {
			height: 234px;
			padding: 18px 26px;
			background: #3F3C3C;
			border-bottom: 1px solid #fff;
			.tradeInfo_right {
				width: 46%;
				float: left;
				p {
					color: #fff;
					font-size: 26px;
					margin-bottom: 20px;
				}
			}
			.tradeInfo_left {
				width: 54%;
				float: left;
				p {
					margin-bottom: 15px;
				}
				p:last-child {
					margin-bottom: 0;
				}
			}
			.wz_comm {
				color: #D7A82B;
				font-size: 24px;
			}
			.moneySymbol {
				color: #fff;
				font-weight: normal;
				font-size: 26px;
			}
			.kpPrice,
			.spPrice {
				font-size: 36px;
				font-weight: bold;
			}
			.kpPrice {
				color: #4793F1;
			}
			.spPrice {
				color: #FF4C18;
			}
			.greenColor {
				color: #47CFB7;
			}
			.redColor {
				color: #FF4C18;
			}
		}
		/*买入/卖出/我的订单*/
		.listBox {
			margin-top: 10px;
			.listNav {
				height: 90px;
				background: #3F3C3C;
				display: flex;
				justify-content: space-between;
				a {
					color: #fff;
				}

				.listNav_buyOfftake,
				.listNav_myOrder {
					font-size: 24px;
					color: #fff;
					width: 33%;
					line-height: 90px;
					text-align: center;
				}
				.listNav_buyOfftake {
					color: #FF4C18;
					font-size: 28px;
					&.clicked {
						color: #D7A82B;
						border-bottom: 3px solid #D7A82B;
					}
				}
			}
		}
		/*买入列表*/
		.buyList {
			margin-top: 20px;
			.buyList_li {
				height: 300px;
				background: #3F3C3C;
				margin-top: 20px;
				.list_top {
					height: 83px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px 26px;
					border-bottom: 1px solid rgb(230, 230, 230);
					.name {
						color: #fff;
						.tx_img{
					width: 25px;
					vertical-align: middle;
					margin-right: 5px;
					margin-bottom: 3px;
				}
					}
					.buyBtn {
						width: 124px;
						height: 55px;
						border-radius: 30px;
						background: rgb(215, 168, 43);
						color: #000;
						font-size: 24px;
						text-align: center;
						line-height: 55px;
					}
				}
				.list_bottom {
					.amountBox {
						float: left;
						border-right: 1px solid rgb(230, 230, 230);
						width: 250px;
						height: 140px;
						margin-top: 36px;
						p {
							width: 213px;
							float: right;
							text-align: left;
						}
						.sl_wz {
							font-size: 24px;
							color: rgb(169, 145, 105);
							margin-top: 25px;
						}
						.amount {
							margin-top: 21px;
							font-size: 42px;
							color: rgb(255, 76, 24);
						}
					}
					.priceBox {
						margin-top: 26px;
						float: left;
						padding-left: 48px;
						.imgCommont {
							width: 30px;
							height: 30px;
							margin-right: 7px;
							position: relative;
							top: 7px;
						}
						p {
							text-align: left;
						}
						.commentP {
							color: #fff;
							font-size: 26px;
						}
						.sumBox {
							margin-top: 18px;
						}
						.cnyP {
							padding-left: 45px;
							color: rgb(144, 130, 95);
							font-size: 16px;
							margin-top: 5px;
						}
					}
				}
			}
			.moreBox {
				background: #3F3C3C;
				margin-top: 5px;
				text-align: center;
				height: 82px;
				line-height: 82px;
				color: rgb(215, 168, 43);
			}
		}
		/*卖出的表单*/
		.offtake_form {
			background: #040301;
			font-size: 28px;
			.kcsDcc {
				color: rgb(165, 145, 105);
				text-align: left;
				padding: 13px 26px;
			}
			.offtakeInfo {
				background: #3F3C3C;
				padding: 0 26px;
				.whiteColor {
					color: #fff;
				}
				.scslP {
					height: 105px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.zdcsDcc {
						color: rgb(255, 76, 24);
					}
				}
				.input_common {
					position: relative;
					input {
						width: 100%;
						height: 90px;
						border-radius: 5px;
						border: 1px solid rgb(230, 230, 230);
						background: rgb(51, 49, 48);
						color: #D7A82B;
						padding: 0 80px 0 20px;
					}
					i {
						position: absolute;
						right: 20px;
						top: 30px;
						color: rgb(163, 163, 163);
					}
				}
				.sxfP {
					margin-top: 47px;
				}
				.prompt {
					color: rgb(165, 145, 105);
					margin-top: 24px;
				}
				.scdj {
					height: 100px;
					line-height: 100px;
					text-align: left;
				}
				.yjsrP {
					height: 110px;
					line-height: 110px;
				}
			}
		}
	}
</style>
