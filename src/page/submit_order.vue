<template>
  <div class="submitOrder">
    <div action="" class="declaration-form">
      <label for="" class="amount"><div>售價USDT</div><input type="text" name=""v-model="ustd" readonly value="" placeholder="DCC數量"/><span>USDT</span></label>
      <label for="" class="code">
      	<div>USDT提款碼</div>
      	<input class="Usdt_code" type="text" name=""  value="" v-model="usdt_code" placeholder="請輸入USTD提款碼"/>
      	<span class="iconr iconfont icon-richscan_icon">
      		<input type="file" class="file12" @change="onFileChange">
      	</span>
      </label>
      <label for="" class="code">
      	<div>验证码</div>
      	<input type="text" name=""  value="" v-model="code"  placeholder="請輸入手機驗證碼"/>
      	<span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span>
      </label>
    </div>
    <div class="submit" @click="submit">提交</div>
    <orderSuccess :content ="orderSuccess"></orderSuccess>
  </div>
</template>

<script>
import orderSuccess from './orderSuccess'
  export default {
    name: 'submitOrder',
    data () {
      return {
        phone:"",
        code: '',
        price_usdt:'',
        codeTime: 61,
        usdt_code:'',
        ustd:'',
        mac:[],
        token:'',
        orderSuccess:{
        	show:false,
        }
      }
    },
    mounted () {
      let $that =this;
      this.$bus.$emit('pageHead',{
        title:"支付頁面" ,
        rightShow: true,
        rightBack:function(){
          $that.$router.push('walletList')
        }
      }),
        this.num();
        this.macd();

      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token=localStorage.getItem('token')
        this.phone  = localStorage.getItem("phone");
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
        this.phone = this.getCookie("phone");
      }

      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if(!localStorage.getItem('token')){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            $that.$router.push('/login')
          },2000)
        }
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
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
    destroyed () {
      this.$bus.$emit('pageHead');
      this.$bus.$off('orderSuccess')
    },
    methods: {

      num(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.token=localStorage.getItem('token')
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
          this.token = this.getCookie('token')
        }
        this.axios.post('userHomePage', {
          token:this.token
        }).then(({data}) => {

        })
      },
      macd(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.token=localStorage.getItem('token')
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
          this.token = this.getCookie('token')
        }
        this.axios.post('coparntner', {
          token:this.token
        }).then(({data}) => {
          this.mac=data.data;
          //console.log(this.mac[0].amount)
          if( this.getCookie('id') == 1){
            this.ustd =this.formatNum(this.mac[0].amount,4) 
          }
          if( this.getCookie('id') == 2){
            this.ustd =this.formatNum(this.mac[1].amount,4) 
          }
          if( this.getCookie('id') == 3){
            this.ustd =this.formatNum(this.mac[2].amount,4) 
          }
        })
      },
      //扫码二维码
      onFileChange(e) {
    	let  $that  =this
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
//    this.createImage(files[0]);
       var fileUrl = this.getObjectURL(files[0]);
       qrcode.decode(fileUrl);
       qrcode.callback = function(imgMsg){  
				    if(imgMsg.indexOf("error") > -1){
				    	return $that.$bus.$emit('alert', "二维码无效")
				    }else {
				       $that.usdt_code = imgMsg
				    }
				} 
    },
      getCode(){
        if (this.codeTime !== 61) return false;
        this.codeTime = 60
        let timer = setInterval(() => {
          if (--this.codeTime === 0) {
            this.codeTime = 61
            clearInterval(timer)
          }
        }, 1000)
        this.axios.post('sms', {
          phoneNo:this.phone
        }).then(({data}) => {
        })
      },
      submit(){
           let $that= this;
          this.axios.post('coparntnerBuy', {
              token:this.token,
              copartner_id:this.getCookie('id'),
              usdt_code:this.usdt_code,
              code:this.code
          }).then(({data}) => {
             this.$bus.$emit('alertCer', data.msg)
            if(data.ret == 0){
              this.orderSuccess = data.data
              this.orderSuccess.show = true
              if(data.msg ==="操作成功"){
                setTimeout(function () {
//             $that.$router.push({path:'orderSuccess' })
                },2000)
              }

            }else{
              this.$bus.$emit('alertCer', {
                msg:data.msg
              });
            }



          })


      }
    },
    components: {
       orderSuccess
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .submitOrder{
    padding-top:100px;
  .declaration-form{
    margin-top:12px;
    height:auto;
    margin-bottom:335px;
  label{
    height:93px;
    width: 100%;
    line-height: 93px;
    margin-top:30px;
    padding-left: 18px;
    display: flex;
    background: #3f3c3c;
   /*justify-content: space-around;*/
  div{
    font-size: 28px;
    color:#fff;
    width:176px;
  }
  input{
    font-size: 26px;
    background: none;
    color:#fff;
    width: 70%;

  }
  }
  .amount{

    line-height: 108px;
  input{
    width:30%;
  }
  span{
    color:#fff;
    position:absolute;
    right:40px;
    font-size: 27px;
  }
  }
  .code{
	  input{
	    width:50%;
	  }
	  span{
	    color:#D7A82B;
	    font-size: 26px;
	    text-align: right;
	  }
	  .Usdt_code{
	  	width: 60%;
	  }
	  .iconr{
	  	font-size: 40px;
	  	display: block;
	  	position: relative;
	  	 .file12{
				  outline: none;
				  opacity: 0;
				  width: 100%;
				  height: 100%;
				  position: absolute;
				  top: 0;
				  left:0;
				  z-index: 10;
		  }
	  }
  }

  }
  .submit{
    width:590px;
    height:87px;
    line-height:87px;
    background: #D7A82B;
    color: #fff;
    font-size: 34px;
    text-align: center;
    margin:0 auto;
    border-radius:70px 70px;
  }
 
  }
</style>
