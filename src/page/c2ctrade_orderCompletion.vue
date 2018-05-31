<template>
	<div class="c2ctrade_orderCompletion">
		<div class="top">
			<div class="promtDiv">
				<p class="orderPromt whiteColor">訂單已提交</p>
				<p class="whiteColor payTimeP">請在<i class="payTime">{{payTime.time}}</i>分鐘內完成付款</p>
				<p class="whiteColor csPromt">超時將取消訂單</p>
			</div>

			<div class="payInfo whiteColor">
				<p>{{payInfo.userName}}出售的{{payInfo.payNum}}DCC</p>
				<p>¥&nbsp;{{payInfo.payPrice}}</p>
			</div>
		</div>

		<div class="bottom">
			<div class="skmBox">
				<img :src="df_ewm.ewmImg" />
				<p class="whiteColor">對方支付寶收款碼</p>
			</div>
			<div class="tsy">
				<p>請您長按保存此二維碼，線下進行操作轉賬</p>
				<p>返回此界面進行提交申請</p>
			</div>
		</div>

		<p class="confirmBtn">
			確定
		</p>

	</div>

</template>

<script>
	export default {
		name: 'c2ctradeOrderCompletion',
		data() {
			return {
				payTime: {
					time: '29:59:00',
				},
				payInfo: {
					userName: '155****589',
					payNum: '500',
					payPrice: '500.00'
				},
				df_ewm:{
					ewmImg:require('../assets/images/df_ewm.png'),
				}
			}

		}

	}
</script>

<style lang="scss" scoped="">
@import '../assets/scss/style.scss';
	.c2ctrade_orderCompletion {
		i {
			font-style: normal;
		}
		.whiteColor {
			color: #fff;
		}
		.top {
			height: 525px;
			border-bottom: 1px solid rgb(130, 130, 130);
			position: relative;
			padding-top: 120px;
			.promtDiv {
				p {
					text-align: center;
				}
				.orderPromt {
					font-size: 36px;
				}
				.payTimeP {
					margin: 56px 0 28px;
					font-size: 28px;
					.payTime {
						color: rgb(255, 76, 24);
						margin: 0 5px;
						font-weight: blod;
					}
				}
				.csPromt {
					font-size: 28px;
				}
			}
			.payInfo {
				width: 100%;
				padding: 0 33px;
				font-size: 28px;
				position: absolute;
				bottom: 30px;
				display: flex;
				justify-content: space-between;
			}
		}
		.bottom {
			.skmBox {
				width: 225px;
				margin: 55px auto;
				font-size: 28px;
				img{
					width: 212px;
				}
				p{
					margin-left: -5px;
				}
			}
			.tsy{
				width: 488px;
				margin:60px auto;
				text-align: center;
				color: rgb(160,153,153);
				p{
					margin-bottom: 5px;
				}
			}
		}
		.confirmBtn{
			width: 600px;
			height: 90px;
			background: rgb(215,168,43);
			color: #000;
			text-align: center;
			line-height: 90px;
			border-radius: 50px;
			margin: 120px auto;
			font-size: 28px;
		}
	}
</style>