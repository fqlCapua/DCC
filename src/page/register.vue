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
      <input class="input" id="area" type="text"  placeholder="请输入验证码">
      <span class="more"><img :src="img" alt="" width="100%" height="100%"></span>
    </label>
		<button class="submit" @click="submit">注冊</button>
	</div>
</template>

<script>
	import areaPage from '../components/area_select.vue'
	export default {
		name: 'login',
		data() {
			return {
        img:'',
        phone: '',
        code: '',
        codeTime: 61,
        imgData:''
			}
		},
		methods: {
			// 獲取驗證碼
			getCode() {
				if(this.codeTime !== 61) return false
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
            msg:data.data
          });
        })
			},

			// 註冊提交
			submit() {
				if(this.phone === '') return this.$bus.$emit('alert', '請輸入手機號碼')
				if(this.code === '') return this.$bus.$emit('alert', '請輸入手機驗證碼')
				this.axios.post('userRegister', {
					phone: this.phone,
					code: this.code
				}).then(({
					data
				}) => {
					if(data.status === 200) {
						this.$bus.$emit('alert', {
							msg: '恭喜您登錄成功，您的登錄密碼與交易密碼將以短信的方式發送至您的手機，請注意查收。',
							cb: () => {
								this.$router.push('index')
							}
						})
					} else {
						this.$bus.$emit('alert', data.message)
					}
				})
			},
      bock (){
			   this.$router.go(-1)
      },
      //校验图片验证
      imgCaptcha(){
        this.axios.post('captchaInfo', {
        }).then(({data}) => {
          this.img= data.data.img
          this.imgData= data.data.str

        })
      },
      checkoutCaptcha () {
        let $that=this;
        this.axios.post('checkCaptcha', {
          cap: $that.imgData,
          captcha:$that.captCha
        }).then(({data}) => {

        })
      },



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
				 i{
					font-size:45px;
					top: 2px;
           padding-left:35px;
				}
         h2{
           position: absolute;
           top:0;
           left:50%;
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
				color: #fff;
				font-size: 40px;
				&.number {
					font-size: 28px;
				}
			}
			.input {
				background: none;
				color:#fff;
				font-size: 28px;
        width:60%;
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
      .more{
        border:1px solid #fff;
        float: right;
        width:150px;
        height:60px;
      }
		}
		.submit {
			@include submitButton;
			width: 80%;
		}
	}
</style>
