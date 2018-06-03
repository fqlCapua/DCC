<template>
  <div class="declaration">
    <div action="" class="declaration-form">
      <label for="" class="amount"><div>擁有DCC</div><input type="text" name=""v-model="zNum" readonly value="" placeholder="DCC數量"/></label>
      <label for="" class="amount"><div>轉出数量</div><input type="text" name=""v-model="zcNum" value="" placeholder="請輸入轉出數量"/><span>DCC</span></label>
      <label for=""><div>對方帳號</div><input type="text"  name=""  value="" v-model="address" placeholder="請輸入對方帳號/手機號"/></label>
      <label for="" class="code"><div>验证码</div><input type="text" name=""  value="" v-model="code"  placeholder="請輸入手機驗證碼"/><span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span></label>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
  export default {
    name: 'C2C',
    data () {
      return {
        phone:localStorage.getItem("phone"),
        code: '',
        codeTime: 61,
        address:'',
        zNum:'',
        zcNum:"",
        name:''
      }
    },
    mounted () {
      let vm = this;
      this.$bus.$emit('pageHead',
        {
          title:"用戶轉賬",
          rightShow:true,
      		rightText:'轉出記錄',
          rightColor:'#2d8afd',
          rightBack:function(){
            vm.$router.push({path:'accountsList'})
          }
        });
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
        this.codeTime = 60;
        let timer = setInterval(() => {
          if (--this.codeTime === 0) {
            this.codeTime = 61;
            clearInterval(timer)
          }
        }, 1000)
        this.axios.post('sms', {
          phoneNo:localStorage.getItem('phone')
        }).then(({data}) =>{
        })
      },
      submit(){
        //console.log(this.name)
        if (this.code === '') return this.$bus.$emit('alert', '请输入手机验证码');
        if(this.name === undefined){
          this.$bus.$emit('alert', '没有此账户');
          return false;
        }else{
          this.axios.post('withDrawDcc',{
            token:this.getCookie("token"),
            amount:this.zcNum,
            code:this.code,
            to_uid:this.phone
          }).then(({data}) => {
            if(data.ret === 0){
              this.$router.go(-1)
            }else{
              this.$bus.$emit('alert', data.msg);

            }
          })
        }


      }
    },
    components: {
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
