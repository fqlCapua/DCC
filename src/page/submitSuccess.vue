<template>
	<div class="submitSuccess">
		<div class="successPrompt">
			<img src="../assets/images/ordeInfo_bg.png" />
			<p class="successP">提交成功</p>
			<p class="nxddP">請耐心等待後臺審核</p>

		</div>

		<!--返回首页-->
		<router-link to="index">
			<p class="returnBtn">返回首页</p>
		</router-link>

	</div>

</template>

<script>
	export default {
		name: 'submitSuccess',
		data() {
			return {

			}
		},
    mounted() {
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
	}
</script>

<style lang="scss" scoped>
	@import '../assets/scss/style.scss';
	.submitSuccess {
		padding-top: 80px;
		.successPrompt {
			height: 522px;
			img {
				display: block;
				width: 285px;
				margin: 0 auto;
			}
			.successP {
				color: #fff;
				margin: 20px 0 58px;
				font-size: 32px;
			}
			.nxddP {
				color: rgb(102, 102, 102);
				font-size: 30px;
			}
			p {
				text-align: center;
			}
		}
		.returnBtn {
			width: 600px;
			height: 90px;
			color: #fff;
			font-size: 28px;
			border-radius: 50px;
			text-align: center;
			line-height: 90px;
			margin: 320px auto;
			background: rgb(215,168,43);
		}
	}
</style>
