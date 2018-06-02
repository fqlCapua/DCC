<template>
	<div class="main">
		<div class="exchange">
			<div class="form">
				<label class="label">
		        <span class="name">地区</span>
		        <input class="input"  type="text"  readonly v-model="addr" placeholder="選擇省市區"   />
		        <span class="iconfont icon-zhuanchu" @click="getAddress"></span>
		     </label>
				<label class="label">
		        <span class="name">等級</span>
		        <input class="input"  type="text"  disabled="true" v-model="grade" placeholder="選擇等級"   />
		         <span class="iconfont icon-zhuanchu"></span>
		     </label>
			<label class="label" :for="index" v-for="(item, index) in form" :key="index">
		        <span class="name">{{ item.name }}</span>
		        <button class="input_button"  @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : codeTime + 's后重試' }}</button>
		        <input class="input_code" type="text" v-model="PhoneCode" :placeholder="item.placeholder">
		    </label>
			</div>
			<button class="submit" @click="submit">提交</button>
		</div>
		<myAddress></myAddress>
	</div>
</template>

<script>
	import myAddress from '../components/address'
	export default {
    submitStatus:false,
		name: 'levelChange',
		data() {
			return {
				addr:"",
				getAddressCode:"",
				Phone: '',
				grade:"",
				PhoneCode:"",
				form: {
					newsCode: {
						name: '短信驗證碼',
						placeholder: '請輸入驗證碼',
						num: ''
					}
				},
				codeTime: 61
			}
		},
		mounted() {
		   let vm = this;
		   this.$bus.$emit('pageHead',"等级兑换")
		   this.Phone =  this.getCookie("userName")
		},
		destroyed() {
			this.$bus.$emit('pageHead');
		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			
			getCode() {
				if(this.codeTime !== 61) return false
				this.codeTime = 60
				let timer = setInterval(() => {
					if(--this.codeTime === 0) {
						clearInterval(timer)
						this.codeTime = 61
					}
				}, 1000)
				this.axios.post('sms', {
					phone:this.Phone
				}).then(({data}) => {
					
				})
			},
			submit() {
				if(this.addr === '') return this.$bus.$emit('alert', '請選擇地區')
				if(this.grade === '') return this.$bus.$emit('alert', '請選擇等級')
				if(this.PhoneCode === '') return this.$bus.$emit('alert', '請輸入驗證碼')

				this.axios.post('quotation/decl_from', {
					usdt: this.form.usdt.num,
					carry_usdt: this.form.backCode.num,
					code: this.form.newsCode.num,
					type: 1
				}).then(({data}) => {
					this.$bus.$emit('alert', data.message)
					if(data.status === 200) this.$router.go(-1)
				})

			},
			// 触发时间选择器
		     getAddress () {
		        this.$bus.$emit('myAddress', {
		          flag: true,
		          callBack: this.haveAddress
		        })
		     },
		     haveAddress (data){
		     	this.addr = data.addressStr
		     	this.getAddressCode = data.code
		     }

		},
		components: {
		   myAddress
		}
	}
</script>
<style lang="scss">
	@import '../assets/scss/style.scss';
	.main {
		position: relative;
		.back {
			color: #fff;
			position: absolute;
			top: 10px;
			left: 0;
			color: #fff;
			width: 100px;
			text-align: center;
			line-height: 80px;
			font-size: 40px;
		}
		.exchange {
			margin-top: 20px;
			.head {
				@include headBlack;
			}
			padding-top:100px;
			.form {
				.label {
					position: relative;
					height: 100px;
					display: block;
					margin-bottom: 22px;
					background: #3f3c3c;
					padding: 0 42px;
					box-sizing: border-box;
					@include clearFloat;
					.iconfont {
						position: absolute;
						right: 30px;
						line-height: 94px;
						font-size: 1.3em;
						color: $mainColor;
						display: inline-block;
					}
					.name {
						display: inline-block;
						width: 23%;
						float: left;
						color: #d1cece;
						font-size: 28px;
						display: block;
						height: 100%;
						line-height: 100px;
					}
					.dcc {
						float: right;
						line-height: 100px;
						font-size: 28px;
						color: #fff;
					}
					.input,
					.input_code {
						float: left;
						background: none;
						color: #fff;
						/*text-align: right;*/
						padding-right: 10px;
						height: 100%;
						line-height: 100px;
						width: 60%;
						padding-left: 25px;
						font-size: 28px;
					}
					.input_code {
						width: 40%;
					}
					.input_button {
						float: right;
						padding: 0 10px;
						background: none;
						color: #d7a72e;
						font-size: 28px;
						height: 100%;
					}
				}
			}
			.submit {
				@include submitButton;
				width: 80%;
				color: #111111;
			}
		}
	}
</style>