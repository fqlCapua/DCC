<template>
	<div class="walletEwm">
		<!-- 頭部 -->
		<div class="head">
			<router-link to="">
				<span class="icon iconfont icon-fanhuijiantou returnBtn"></span>
			</router-link>
			<h2 class="title">钱包二维码</h2>
		</div>
		
			<!--二维码-->
	<div class="ewmBox" v-for="(item,index) in ewmInfo">
		<div class="infoBox">
			<p class="name">{{item.name}}</p>
			<p class="number">{{item.number}}</p>
		</div>
		<img src="" alt="" />
		
		<p class="saveImg">保存为图片</p>
	</div>
		
	</div>
</template>

<script>
	export default {
		name:'walletEwm',
		data(){
			return{
				ewmInfo:[
				{name:'刘洋',number:'415asdsad56465asd',ewmImg:'###'}
				
				]
				
				
			}
			
		}
		
		
	}
</script>

<style lang="scss" scoped>
	@import '../assets/scss/style.scss';
	.walletEwm {
		padding-top:160px;
		.head {
			position: relative;
			@include headBlack;
			a {
				color: #fff;
			}
			.returnBtn {
				position: absolute;
				left: 35px;
				top: 0;
				font-size: 48px;
			}
		}
		.ewmBox{
			background: #fff;
			width: 674px;
			height: 874px;
		}
		
		
		
	}
</style>