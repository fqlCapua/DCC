<template>
	<div class="walletEwm">
		<!-- 頭部 -->
		<div class="head">
			<router-link to="userCenter">
				<span class="icon iconfont icon-fanhuijiantou returnBtn"></span>
			</router-link>
			<h2 class="title">錢包二維碼</h2>
		</div>

		<!--二维码-->
		<div class="ewmBox">
			<div class="infoBox">
				<p class="name">{{ewmInfo.name}}</p>
				<p class="number">{{ewmInfo.number}}</p>
			</div>
			<img :src="ewmInfo.ewmImg" alt="" />

			<p class="saveImg">保存為圖片</p>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'walletEwm',
		data() {
			return {
				ewmInfo: {
						name: '劉洋',
						number: '415asdsad56465asd',
						ewmImg: require('../assets/images/wallet_ewm.png')
					}
			}

		}

	}
</script>

<style lang="scss" scoped>
	@import '../assets/scss/style.scss';
	.walletEwm {
		padding-top: 60px;
		.head {
			position: relative;
			@include headBlack;
			a {
				color: #fff;
			}
			.returnBtn {
				position: absolute;
				left: 35px;
				top: 5px;
				font-size: 38px;
			}
		}
		.ewmBox {
			background: #fff;
			width: 674px;
			height: 874px;
			margin: 180px auto;
			border-radius: 10px;
			.infoBox {
				padding: 65px 0;
				text-align: center;
				p {
					margin-bottom: 20px;
					font-size: 28px;
				}
				p:first-child {
					font-weight: bold;
				}
				P:last-child {
					margin-bottom: 0;
				}
			}
			img {
				display: block;
				width: 496px;
				height: 496px;
				margin: 0 auto;
			}
			.saveImg {
				text-align: center;
				margin: 60px 0;
				font-size: 26px;
				color: rgb(215, 168, 43);
			}
		}
	}
</style>