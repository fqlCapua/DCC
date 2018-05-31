<template>
	<div class="main">
		<div class="back iconfont icon-fanhuijiantou" @click="back"></div>
		<div class="exchange">
			<div class="form">
				<label class="label">
        <span class="name">地区</span>
        <input class="input"  type="text"  disabled="true"  placeholder="選擇省市區"   />
        <span class="iconfont icon-zhuanchu"></span>
        <areaSelect></areaSelect> 
      </label>
				<label class="label">
        <span class="name">等級</span>
        <input class="input"  type="text"  disabled="true"  placeholder="選擇等級"   />
         <span class="iconfont icon-zhuanchu"></span>
      </label>

				<label class="label" :for="index" v-for="(item, index) in form" :key="index">
        <span class="name">{{ item.name }}</span>
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index !== 'newsCode'&& index !== 'phone' && index !== 'dccNum' " :placeholder="item.placeholder"  v-model="item.num" :readonly="item.readOnly">
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index == 'phone'" :placeholder="item.placeholder"  v-model="Phone"  >
        <button class="input_button" v-if="index === 'newsCode'"  @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : codeTime + 's后重試' }}</button>
        <input class="input_code" :id="index" :type="item.type || 'text'" v-if="index === 'newsCode'" v-model="item.num" :placeholder="item.placeholder">
        <input class="input_code" :id="index" :type="item.type || 'text'" v-if="index === 'dccNum'" v-model="item.num" :placeholder="item.placeholder">
        
      </label>
			</div>
			<button class="submit" @click="submit">提交</button>
		</div>
	</div>
</template>

<script>
	import picker from '../components/picker.vue'
	import areaSelect from "../components/area_select.vue"
	export default {
    submitStatus:false,
		name: 'levelChange',
		data() {
			return {
				Phone: '',
				form: {

					phone: {
						name: '手機號碼',
						placeholder: '请输入手機號',
						num: '18845678899',
						readOnly: true
					},
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
			this.$bus.$emit('pageHead', {
				title: "等级兑换",
				// rightShow:true,
				// rightText:'转入对方账户',
				rightColor: '#2d8afd',
				rightBack: function() {
					vm.$router.push({
						path: ''
					})
				}
			});

		},
		destroyed() {
			this.$bus.$emit('pageHead');
		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			showPhone() {
				let phoneStr;
				if(typeof(this.form.phone.num) !== 'string') {
					phoneStr = this.form.phone.num.toString()
				} else {
					phoneStr = this.form.phone.num
				}
				return phoneStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			},
			getCode() {

				if(this.codeTime !== 61) return false
				if(this.form.phone.num === '') return this.$bus.$emit('alert', '請輸入手機號碼')
				this.codeTime = 60
				let timer = setInterval(() => {
					if(--this.codeTime === 0) {
						clearInterval(timer)
						this.codeTime = 61
					}
				}, 1000)
				this.axios.post('Sms/send', {
					type: 3,
					phone: '18337131078'
					//      phone: "this.form.phone.num"
				}).then(({
					data
				}) => {
					if(data.status !== 200) this.$bus.$emit('alert', data.message)
				})
			},
			submit() {
				if(this.form.dccNum.num === '') return this.$bus.$emit('alert', '請輸入轉出數量')
				if(this.form.wallet.num === '') return this.$bus.$emit('alert', '請輸入錢包地址')
				if(this.form.newsCode.num === '') return this.$bus.$emit('alert', '請輸入驗證碼')

				this.axios.post('quotation/decl_from', {
					usdt: this.form.usdt.num,
					carry_usdt: this.form.backCode.num,
					code: this.form.newsCode.num,
					type: 1
				}).then(({data}) => {
					this.$bus.$emit('alert', data.message)
					if(data.status === 200) this.$router.go(-1)
				})

			}

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