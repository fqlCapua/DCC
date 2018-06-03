<template>
  <div class="declaration">
    <div action="" class="declaration-form">
      <label for="" class="amount"><div>擁有DCC</div><input type="text" name=""v-model="zNum" readonly value="" placeholder="DCC數量"/></label>
      <label for="" class="amount"><div>轉出数量</div><input type="text" name=""v-model="zcNum" value="" placeholder="請輸入轉出數量"/><span>DCC</span></label>
      <label for=""><div>钱包地址</div><input type="text" name=""  value="" v-model="address" placeholder="請輸入錢包地址"/></label>
      <label for="" class="code"><div>验证码</div><input type="text" name=""  value="" v-model="code"  placeholder="請輸入手機驗證碼"/><span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span></label>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
        phone:localStorage.getItem("phone"),
        code: '',
        codeTime: 61,
        address:'',
        zNum:'',
        zcNum:""
      }
    },
    mounted () {
      let $that =this;
      this.$bus.$emit('pageHead',{
        title:"轉出至錢包",
        rightShow: true,
        rightText: '轉出記錄',
        rightBack:function(){
          $that.$router.push('walletList')
        }
      }),
      this.num()
    },
    destroyed () {
      this.$bus.$emit('pageHead');
    },
    methods: {

      num(){
        this.axios.post('userHomePage', {
          token:this.getCookie("token")
        }).then(({data}) => {
         this.zNum = data.data.DCC_total
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
        //console.log(this.zNum)
        //console.log(this.zcNum)
        if( this.zNum < this.zcNum ){
          this.$bus.$emit('alert', '数量不能大于可用dcc的数值')
          return false;
        }else if((/0x[0-9a-zA-Z]{40}/.test(this.address))){
          this.axios.post('withDrawDcc', {
            token:this.getCookie("token"),
//        钱包地址
            wallet_address:this.address,
//        数量
            amount:this.zcNum,
            sn:this.code
          }).then(({data}) => {
          	if(!data.ret){
          		 this.$router.push({path:'submitSuccess' })
          	}else{
          		this.$bus.$emit('alertCer', data.msg)
          	}
            
          })
        }else{
          this.$bus.$emit('alert', '钱包地址必须为0x开头的42位英文或者数字')
        }
      }
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
