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
			<li>
				<span class="listTitle_common">訂單號：</span>
				<span>{{content.order_id}}</span>
			</li>
			<li>
				<span class="listTitle_common">支付時間：</span>
				<span>{{content.created}}</span>
			</li>
			<li>
				<span class="listTitle_common">訂單金額：</span>
				<span>{{content.trans_amount}} USDT</span>
			</li>
			<li>
				<span class="listTitle_common">訂單名稱：</span>
				<span>{{content.name}}</span>
			</li>
		</ul>
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
        show:false,
	  	}
	},
    mounted(){
     let $that=this;
        if(!this.getCookie('token') || this.getCookie('token') === "null" ){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            $that.$router.push('/login')
          },2000)
        }
      if(!localStorage.getItem('token') || localStorage.getItem('token') === "null" ){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          $that.$router.push('/login')
        },2000)
      }

    },
    methods:{
        goHome(){
        	this.$router.push("/index")
        }
    },
    props:{
      content:{
        show:false,
      }
     }
}
</script>

<style lang="scss" scoped="">
	@import '../assets/scss/style.scss';
	.orderSuccess {
		padding-top:65px;
		width: 100vw;
	    height: 100vh;
	    position: fixed;
	    top: 0;
	    left: 0;
	    z-index: 120;
	    background: #000;
		.bgImg {
			display:block;
			width: 200px;
			margin: 0 auto 40px;
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
