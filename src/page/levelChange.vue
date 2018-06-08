<template>
	<div class="main">
		<div class="exchange">
			<div class="form">
				<label class="label" @click="getAddress">
		        <span class="name">地区</span>
		        <input class="input"  type="text"  readonly v-model="addr" placeholder="選擇省市區"   />
		        <span class="iconfont icon-zhuanchu"></span>
		     </label>
				<label class="label" @click="call">
		        <span class="name">等級</span>
		        <input class="input"  type="text"  disabled="true" v-model="grade" placeholder="選擇等級"   />
		         <span class="iconfont icon-zhuanchu" ></span>
		     </label>
        <label class="label">
          <span class="name">需要DCC</span>
          <input class="input"  type="text"  disabled="true" v-model="amount" />
        </label>
			<label class="label" :for="index" v-for="(item, index) in form" :key="index">
		        <span class="name">{{ item.name }}</span>
		        <button class="input_button"  @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : codeTime + 's后重試' }}</button>
		        <input class="input_code"  type="text" v-model="PhoneCode" :placeholder="item.placeholder">
		    </label>
			</div>
			<button class="submit" @click="submit">提交</button>
		</div>
		<myAddress></myAddress>
    <div class="modul" v-show="show">
      <div class="close" @click="closeType"></div>
       <div class="_ul">
       	<div class="modul_title">請選擇</div>
       	<ul>
       		<li v-for="(item,index) in list" @click="cele(index)" :key="index">
	         	<span>{{item.name}}</span>
	         	<span>{{item.amount}} DCC</span>
	         	<span class="garden" :class="{'active':addActive === index }"></span>
            </li>
       	</ul>
       </div>
    </div>
	</div>

</template>

<script>
	import myAddress from '../components/address'
	export default {
    submitStatus:false,
		name: 'levelChange',
		data() {
			return {
				addActive:"",
				addr:"",
        level_id:"",
        city_id:'',
				Phone: '',
				grade:"",
				PhoneCode:"",
        amount:'',
        show:false,
        token:'',
				form: {
					newsCode: {
						name: '短信驗證碼',
						placeholder: '請輸入驗證碼',
						num: ''
					}
				},
				codeTime: 61,
        list:[]
			}
		},
		mounted() {
		   let vm = this;
		   this.$bus.$emit('pageHead',"等级兑换")
		   this.Phone = localStorage.getItem("phone")
       this.grades();
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.Phone = localStorage.getItem("phone")
        if(!localStorage.getItem('token')){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            $that.$router.push('/login')
          },2000)
        }
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.Phone = this.getCookie("phone")
        if(!$that.getCookie('token')){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            $that.$router.push('/login')
          },2000)
        }
      }
		},
		destroyed() {
			this.$bus.$emit('pageHead');
		},
		methods: {
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
          phoneNo:this.Phone
				}).then(({data}) => {

				})
			},
			submit() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.token=localStorage.getItem('token')
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
          this.token = this.getCookie('token')
        }
				if(this.addr === '') return this.$bus.$emit('alert', '請選擇地區');
				if(this.grade === '') return this.$bus.$emit('alert', '請選擇等級');
				if(this.PhoneCode === '') return this.$bus.$emit('alert', '請輸入驗證碼');
//   預約
				this.axios.post('levelBuy', {
          token:this.token,
          level_id: this.level_id,
          city_id:this.city_id,
          dcc_amount:this.amount,
          code:this.PhoneCode
				}).then(({data}) => {
				  let $that = this;
					this.$bus.$emit('alertCer', "提交成功")
          setTimeout(function () {
            if(data.ret ===0) $that.$router.push("/submitSuccess")
          },2000)

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
           console.log(data)
		     	this.city_id = data.code   //id
		     },
//       等级
      grades (){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.token=localStorage.getItem('token')
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
          this.token = this.getCookie('token')
        }
        this.axios.post('levelShow', {
          token:this.token,
        }).then(({data}) => {
           this.list =data.data;
           this.grade =this.list.name;
        })
      },
      cele(index){
      	let $that = this
        this.grade =this.list[index].name;
        this.level_id=this.list[index].id;
        this.addActive = index
        if(!this.grade == ""){
//        this.show = false;
          setTimeout(function(){
    	   	   $that.closeType()
    	   },200)
        }
        this.amount =this.list[index].amount
      },
      closeType (){
       	this.show = false;
      },
      call(){
        this.show = true;
      }
		},
		components: {
		   myAddress
		}
	}
</script>
<style lang="scss" scoped>
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

  .modul{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 11;
    div.close{
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: 2;
    }
    ._ul{
      width: 100vw;
      background: #fff;
      position: absolute;
      bottom:0;
      left:0;
      animation: listClass .2s ease-in-out;
      /*padding: 50px 50px;*/
      padding-top: 0;
      padding-bottom: 20px;
      /*transform: translate(-50%,-50%);*/
      /*border-radius: 10px;*/
      z-index: 5;
      .modul_title{
      	width: 100%;
      	height: 90px;
      	line-height: 90px;
      	text-align: center;
      	font-size: 28px;
      	color: #666;
      	border-bottom: 1px solid #ececec;
      }
      ul{
         width: 100%;
         height: 270px;
         overflow-y:scroll;
	      li{
	      	width: 60%;
	      	margin: 0 auto;
	      	display: flex;
	      	justify-content: space-between;
	        font-size:32px;
	        height:90px;
	        line-height:90px;
	        .garden{
				width: 30px;
				height: 30px;
				border-radius: 50%;
				border: 1px solid #eee;
				padding: 4px;
				box-sizing: border-box;
				margin-top: 30px;
				&.active:before{
					content: "";
					width: 100%;
				    height: 100%;
				    display: block;
				    border-radius: 50%;
				    background-color: #D7A82B;
				}
	        }
	      }
      }
    }
  }
  @keyframes listClass {
  0% {
    transform: translateY(100%);
    opacity: 0.6;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
