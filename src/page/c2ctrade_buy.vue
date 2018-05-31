<template>
	<div class="buyBox">
		<!--头部-->
		<div class="headerBox">
			<router-link to="c2cTradeDcc">
				<i class="icon iconfont icon-fanhuijiantou" style="color: #fff;"></i>
			</router-link>
			
			<span>購買</span>
		</div>
		<!--购买人的用户名和时间-->
		<div class="userBox">
			<p class="userName">
				<img :src="userName.tx" alt="" /> {{userName.user}}
			</p>
			<p class="time">
				{{userName.time}}
			</p>
		</div>
		<!--购买的价格和数量-->
		<div class="buyInfoBox">
			<div class="buyInfo">
				<div class="buyInfo_left">
					<p class="buyNum">{{buyNum.num}}</p>
					<p>數量(DCC)</p>
				</div>
				<ul class="buyInfo_right">
					<li v-for="(item,index) in buyPrice">
						<p class="priceP">
							<i class="iconfont" :class="item.class_i"></i> 單價：$&nbsp;{{buyPrice.price}}
						</p>
						<p class="cnyP">
							CNY：{{buyPrice.cny}}
						</p>
					</li>
				</ul>
			</div>
			<p class="userInfoTitle">
				<i class="icon iconfont icon-ziliao"></i>買家資料
			</p>
		</div>
		<!--卖家的资料-->
		<ul class="userInfoBox">
			<li v-for="(item,index) in userInfo">
				<span class="info_title">{{item.infoTitle}}</span>
				<span class="info_content">{{item.infoContent}}</span>
			</li>
		</ul>
		<!--输入支付信息-->
		<ul class="payInfoBox">
			<li class="whiteColor">
				<i  class="iconfont icon-zhifuxinxi payInfoLogo"></i>填寫您的支付信息
			</li>
			<li>
				<span class="whiteColor">
					付款賬號方式
				</span>
				<span class="payWay khakiColor">選擇付款方式</span>
				<i class="iconfont icon-jinrujiantou payWayBtn"></i>
			</li>
			<li>
				<span class="whiteColor">
				  付款賬號
				</span>
				<input type="text" placeholder="請輸入付款賬號" class="payNumber" />
			</li>
		</ul>

		<!--提交订单-->
		<router-link to="c2ctradeOrderCompletion">
			<p class="submitBtn">
				提交訂單
			</p>
		</router-link>

	</div>

</template>

<script>
	export default {
		name: 'c2cTradeBuy',
		data() {
			return {
				userName: {
					tx: require('../assets/images/tx.png'),
					user: '23115646546',
					time: '2018-04-14'
				},
				buyNum: {
					num: '5000'
				},
				buyPrice: [{
					    class_i:'icon-danjia1',
						price: '0.650',
						cny: '0.00'
					},
					{
						class_i:'icon-zongjia',
						price: '20,235.00',
						cny: '500,000.00'
					}
				],
				userInfo: [{
						infoTitle: '真實姓名：',
						infoContent: '李亞桐',

					},
					{
						infoTitle: '聯系方式：',
						infoContent: '1365685956',
					},
					{
						infoTitle: '成交量(DCC)：',
						infoContent: '15000',
					}

				]

			}
		}

	}
</script>

<style lang="scss" scoped="">
	@import '../assets/scss/style.scss';
	.buyBox {
		.whiteColor {
			color: #fff;
		}
		.khakiColor {
			color: #a59569;
		}
		.headerBox {
			height: 80px;
			background: rgb(63, 60, 60);
			position: relative;
			color: #fff;
			i {
				font-size: 36px;
				position: absolute;
				top: 20px;
				left: 34px;
			}
			span {
				display: block;
				margin: 0 auto;
				font-size: 32px;
				text-align: center;
				line-height: 80px;
			}
		}
		/*购买人的id和时间*/
		.userBox {
			padding: 28px 34px;
			display: flex;
			justify-content: space-between;
			background: rgb(63, 60, 60);
			font-size: 28px;
			border-bottom: 1px solid rgb(101, 99, 99);
			.userName {
				color: #fff;
				img {
					width: 28px;
					margin-right: 10px;
					vertical-align: middle;
					margin-bottom: 6px;
				}
			}
			.time {
				color: rgb(165, 149, 105);
			}
		}
		/*购买的价格和数量*/
		.buyInfoBox {
			height: 290px;
			background: url(../assets/images/tradeBuy_img.png) no-repeat;
			background-size: cover;
			border-bottom: 1px solid #fff;
			position: relative;
			.buyInfo {
				height: 150px;
				padding: 25px 34px;
				display: flex;
				justify-content: space-between;
				.buyInfo_left {
					border-right: 1px solid rgb(101, 99, 99);
					height: 120px;
					width: 220px;
					color: #fff;
					padding-left: 12px;
					.buyNum {
						margin: 3px 0 15px;
						font-size: 46px;
						
					}
				}
				.buyInfo_right {
					width: 410px;
					li {
						margin-bottom: 10px;
					}
					.priceP {
						color: #fff;
						font-size: 24px;
						margin-bottom: 5px;
						i{
							margin-right: 5px;
							position: relative;
							top: 4px;
						}
					}
					.cnyP {
						color: #a59569;
						padding-left: 38px;
					}
				}
			}
			.userInfoTitle {
				position: absolute;
				bottom: 20px;
				left: 47px;
				color: #fff;
				font-size: 26px;
				i {
					color: rgb(207, 162, 41);
					margin-right: 20px;
					font-size: 36px;
					position: relative;
					top: 4px;
				}
			}
		}
		/*买家资料*/
		.userInfoBox {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 35px 34px;
			li {
				width: 50%;
				font-size: 26px;
				margin-bottom: 45px;
				.info_title {
					color: #a59569;
				}
				.info_content {
					color: #fff;
				}
			}
		}
		/*输入支付信息*/
		.payInfoBox {
			background: rgb(63, 60, 60);
			li {
				height: 75px;
				padding: 0 47px;
				font-size: 26px;
				line-height: 75px;
				border-bottom: 1px solid rgb(230, 230, 230);
				.payWay {
					margin-left: 20PX;
				}
				.payNumber {
					background: rgb(63, 60, 60);
					margin-left: 83px;
					color: #a59569;
				}
				.payWayBtn{
					float: right;
					color: #fff;
					font-size: 38px;
				}
				.payInfoLogo{
					color: rgb(207, 162, 41);
					margin-right: 18px;
					font-size: 36px;
					position: relative;
					top:4px;
				}
				::-webkit-input-placeholder {
					/* WebKit browsers */
					color: #a59569;
				}
				:-moz-placeholder {
					/* Mozilla Firefox 4 to 18 */
					color: #a59569;
				}
				::-moz-placeholder {
					/* Mozilla Firefox 19+ */
					color: #a59569;
				}
				:-ms-input-placeholder {
					/* Internet Explorer 10+ */
					color: #a59569;
				}
			}
		}
		/*提交订单*/
		.submitBtn {
			margin: 170px auto;
			width: 598px;
			height: 90px;
			background: rgb(215, 168, 43);
			color: #000;
			text-align: center;
			line-height: 90px;
			border-radius: 50px;
			font-size: 30px;
		}
	}
</style>