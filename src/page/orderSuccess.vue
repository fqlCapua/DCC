<template>
	<div class="orderSuccess" v-if="content.show">
		<!--背景图片-->
		<img :src="ordeInfo" alt="" class="bgImg" />
		<div class="promptBox">
			<p>订单已提交成功</p>
			<p>您的定订单已提交总平台进行审核，请耐心等待1-2日</p>
		</div>
		<!--订单成功列表-->
		<ul class="orderList">
			<li v-for="(item,index) in orderList">
				<span class="listTitle_common">{{item.title}}</span>
				<span>{{item.listInfo}}</span>
			</li>
		</ul>
<div>{{content}}</div>
		<!--返回首页-->
		<router-link to="/index">
			<p class="fhsyBtn">返回首页</p>
		</router-link>

	</div>
</template>

<script>

	export default {
	 name:'orderSuccess',
	  data(){
	  	return{
        ordeInfo:require("../assets/images/ordeInfo_bg.png"),
	  		orderList:[
	  		{ title:'訂單號：' ,listInfo:'564545'},
	  		{ title:'支付時間：' ,listInfo:'2018-05-16 14:24:50'},
	  		{ title:'訂單金額：' ,listInfo:'20000USDT'},
	  		{ title:'訂單名稱：' ,listInfo:'决策合作人'}
	  		],
        show:false,
	  	}
	},
    mounted(){

    },
    methods:{
        props:{
          cpntent:{
            show:false,

          }
        }
    }
}
</script>

<style lang="scss" scoped="">
	@import '../assets/scss/style.scss';
	.orderSuccess {
		padding-top:65px;
		.bgImg {
			display:block;
			width: 282px;
			height: 379px;
			margin: 0 auto 65px;
		}
		.promptBox {
			color: #fff;
			font-size: 28px;
			text-align: center;
			p {
				margin-bottom: 20px
			}
			p:first-child {
				font-size: 36px;
			}
		}
		/*订单成功列表*/
		.orderList {
			margin-top: 60px;
			li {
				margin-bottom: 10px;
				background: rgb(63, 60, 60);
				height: 86px;
				line-height: 86px;
				font-size: 28px;
				color: #fff;
				padding: 0 25px;
				  display: flex;
				  justify-content:space-between;
			}
		}
		.fhsyBtn{
			width: 607px;
			height: 90px;
			background: rgb(218,168,43);
			color: #fff;
			line-height: 90px;
			text-align: center;
			border-radius: 50px;
			margin: 80px auto;
			font-size: 28px;
		}
	}
</style>
