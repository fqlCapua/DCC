<template>
	<div class="login">
		<areaPage></areaPage>
		<!-- 頭部 -->
		<div class="head">
			<i class=" iconfont icon-fanhuijiantou" @click="bock"></i>
			<h2 class="title">註冊</h2>
			<!--<router-link tag="span" class="change_language" to="changeLanguage">切換語言<span class="iconfont icon-jinrujiantou"></span></router-link>-->
		</div>
		<!-- logo -->
		<img class="logo" src="../assets/images/logo.png" alt="">

		<label class="label" for="phone">
      <span class="icon iconfont icon-shouji"></span>
      <input class="input number" id="phone" type="number" v-model="phone" placeholder="請輸入手機號碼">
    </label>
		<label class="label" for="code">
      <span class="icon iconfont icon-navicon-dxmbwh"></span>
      <input class="input" id="code" type="text" v-model="code" placeholder="請輸入驗證碼">
      <button class="code_button" @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : `${codeTime}s後重試`}}</button>
    </label>
		<label class="label" for="area">
      <span class="icon iconfont icon-theearth2diqiu"></span>
      <input class="input" id="area" type="text" v-model="captCha"  placeholder="请输入验证码">
      <span class="more" @click="tab"><img :src="img" alt="" width="100%" height="100%"></span>
    </label>
    <!--验证码和登录密码-->
		<label class="label">
      <span class="icon iconfont icon-yaoqingma"></span>
      <input class="input specialWidth"  type="text" v-model="yqm" placeholder="請輸入邀请碼(选填)">
    </label>
		<label class="label" for="password">
      <span class="icon iconfont icon-mima54"></span>
      <input class="input specialWidth" id="password" v-model="psd" type="text"  placeholder="請設置您的登錄密碼">
    </label>
    <p class="toLoginBox">
    	已有賬號 <router-link to="/" class="toLogin">去登陸</router-link>
    </p>
		<button class="submit" @click="submit">注冊</button>
	</div>
</template>

<script>
	import areaPage from '../components/area_select.vue'
	export default {
		name: 'register',
		data() {
			return {
				img: '',
				phone: '',
        psd:'',
				code: '',
				codeTime: 61,
				imgData: '',
        yqm:'',
        captCha:'',
			}
		},
		methods: {
			// 獲取驗證碼
			getCode() {
				if(this.codeTime !== 61) return false;
				if(this.phone === '') return this.$bus.$emit('alert', '請輸入手機號碼')
				this.codeTime = 60
				let timer = setInterval(() => {
					if(--this.codeTime === 0) {
						this.codeTime = 61
						clearInterval(timer)
					}
				}, 1000)
				this.axios.post('sms', {
					phoneNo: this.phone
				}).then(({
					data
				}) => {
					this.$bus.$emit('alertCer', {
						msg: data.data
					});
				})
			},

			// 註冊提交
			submit() {
				if(this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '請輸入手機號碼');
				if(this.code === '') return this.$bus.$emit('alert', '請輸入手機驗證碼');
				this.axios.post('userRegister', {
          username: this.phone,
          password:this.psd,
          captcha:this.captCha,
          cap: this.imgData,
          code:this.code
				}).then(({
					data
				}) => {
					if(data.ret === 0) {
						this.$bus.$emit('alertCer',{
							msg: '恭喜您登錄成功',
							cb: () => {
								this.$router.push('index')
							}
						})
					} else {
						this.$bus.$emit('alert', data.message)
					}
				})
			},
			bock() {
				this.$router.go(-1)
			},
      tab(){
        this.imgCaptcha();
      },
			//校验图片验证
			imgCaptcha() {
				this.axios.post('captchaInfo').then(({
					data
				}) => {
					this.img = data.data.img
					this.imgData = data.data.str

				})
			},
			checkoutCaptcha(){
				let $that = this;
				this.axios.post('checkCaptcha', {
					cap: $that.imgData,
					captcha: $that.captCha
				}).then(({
					data
				}) => {

				})
			},
		},
    mounted (){
      this.imgCaptcha()
  },
		components: {
			areaPage
		}
	}
</script>

<style lang="scss" scoped>
	@import '../assets/scss/style.scss';
	.login {
		padding-top: 90px;
		.head {
			@include headBlack;
			i {
				font-size: 45px;
				top: 2px;
				padding-left: 35px;
			}
			h2 {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translate(-50%);
			}
		}
		.logo {
			width: 120px;
			height: 140px;
			display: block;
			margin: 90px auto;
		}
		.label {
			display: block;
			width: 470px;
			margin: 0 auto;
			border-bottom: 1px solid #3c444d;
			margin-top: 28px;
			height: 85px;
			line-height: 85px;
			position: relative;
			padding-left: 80px;
			.icon {
				position: absolute;
				top: 0;
				left: 0;
				width: 80px;
				color: #D7A82B;
				font-size: 40px;
				&.number {
					font-size: 28px;
				}
			}
			.input {
				background: none;
				color: #fff;
				font-size: 28px;
				width: 60%;
				&.number {
					border-left: 1px solid #fff;
					padding-left: 16px;
				}
			}
			.code_button {
				position: absolute;
				top: 0;
				right: 0;
				font-size: 26px;
				color: $mainColor;
				height: 85px;
				background: none;
			}
			.more {
				border: 1px solid #fff;
				float: right;
				width: 150px;
				height: 60px;
			}
			.specialWidth {
				width: 66%;
			}
		}
		.submit {
			@include submitButton;
			width: 80%;
			color: #000;
		}
		.toLoginBox{
			width: 470px;
			margin: 10px auto;
			font-size: 26px;
			color: rgb(123,96,24);
			.toLogin{
				color: #D7A82B;
			}
		}
	}
</style>
