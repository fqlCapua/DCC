<template>
  <div class="declaration">
    <div action="" class="declaration-form">
      <label for="" class="amount"><div>售價USDT</div><input type="text" name=""v-model="ustd" readonly value="" placeholder="DCC數量"/><span>USDT</span></label>
      <label for=""><div>USDT提款嗎</div><input type="text" name=""  value="" v-model="usdt_code" placeholder="請輸入USTD提款嗎"/></label>
      <label for="" class="code"><div>验证码</div><input type="text" name=""  value="" v-model="code"  placeholder="請輸入手機驗證碼"/><span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span></label>
    </div>
    <div class="submit" @click="submit">提交</div>
    <orderSuccess :content ="orderSuccess"></orderSuccess>
  </div>
</template>

<script>
import orderSuccess from './orderSuccess'
  export default {
    name: 'personal',
    data () {
      return {
        phone:"",
        code: '',
        price_usdt:'',
        codeTime: 61,
        usdt_code:'',
        ustd:'',
        mac:[],
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
        this.num()
        this.macd()
        this.phone = localStorage.getItem("phone");

        if(!this.getCookie('token') || this.getCookie('token') === "null" ){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            this.$router.push('/login')
          },2000)
        }
    },
    destroyed () {
      this.$bus.$emit('pageHead');
      this.$bus.$off('orderSuccess')
    },
    methods: {

      num(){
        this.axios.post('userHomePage', {
          token:this.getCookie("token")
        }).then(({data}) => {

        })
      },
      macd(){
        this.axios.post('coparntner', {
          token:this.getCookie("token")
        }).then(({data}) => {
          this.mac=data.data;
          //console.log(this.mac[0].amount)
          if( localStorage.getItem('id') == 1){
            this.ustd =this.mac[0].amount
          }
          if( localStorage.getItem('id') == 2){
            this.ustd =this.mac[1].amount
          }
          if( localStorage.getItem('id') == 3){
            this.ustd =this.mac[2].amount
          }
        })
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
              token:this.getCookie("token"),
              copartner_id:localStorage.getItem('id'),
              usdt_code:this.usdt_code,
              code:this.code
          }).then(({data}) => {
             this.$bus.$emit('alertCer', data.msg)
             this.orderSuccess = data.data
             this.orderSuccess.show = true
           if(data.msg ==="操作成功"){
             setTimeout(function () {
//             $that.$router.push({path:'orderSuccess' })

             },2000)
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
  .declaration{
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
  //justify-content: space-between;
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
