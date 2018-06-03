<template>
  <div class="forgetPssword">
    <!-- 頭部 -->
    <div class="head">
    		<i class="icon iconfont icon-fanhuijiantou returnBtn" @click="bock"></i>
      <h2 class="title">忘记密码</h2>
    </div>
    <label class="label" for="phone">
      <span class="icon iconfont icon-shouji"></span>
      <input class="input" id="phone" type="number" v-model="phone" placeholder="請輸入手機號">
    </label>
    <label class="label" >
      <span class="icon iconfont icon-navicon-dxmbwh"></span>
      <input class="input"  type="text" v-model="code" placeholder="請輸入验证码">
      <button class="code_button" @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : `${codeTime}s後重試`}}</button>
    </label>
    <label class="label" >
     <span class="icon iconfont icon-AAICon-"></span>
      <input class="input"  type="password"  placeholder="請設置新的登錄密碼" v-model="pass">
    </label>
     <label class="label" >
     <span class="icon iconfont icon-AAICon-"></span>
      <input class="input" type="password" placeholder="再次確認新密碼" v-model="pass2">
    </label>
    <button class="submit" @click="submit">登錄</button>
  </div>
</template>

<script>
export default {
  name: 'forgetPassword',
  data () {
    return {
      phone: '',
      pass: '',
      pass2:'',
      show:0,
      img:'',
      code:'',
      codeTime:61
    }
  },
  mounted () {
    this.imgCaptcha();
    this.getCookie();

      if(!this.getCookie('token') || this.getCookie('token') === "null" ){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          this.$router.push('/login')
        },2000)
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
//        this.$bus.$emit('alertCer', {
//          msg: data.data
//        });
      })
    },
    submit () {
      if (this.phone === '') return this.$bus.$emit('alert', '请输入手机号');
      if (this.pass === '') return this.$bus.$emit('alert', '请输入登录密码');
      if (this.pass !== this.pass2) return this.$bus.$emit('alertCer', '兩次密碼不匹配');
      this.doLogin()
    },
    say(){
      this.show = !this.show;
    },
    doLogin() {
      let $that=this;
      this.axios.post('getbackPassword', {
        phone:this.phone,
        code:this.code,
        password:this.pass
      }).then(({data}) => {
        //console.log(data)
        if (data.ret === 0){
          let token=data.data.token;
          this.setCookie("token",token)
          this.$bus.$emit('alertCer', {
            msg:"登录成功"
          });
          setTimeout(function () {
            $that.$router.push('index');
          },2000)
        }
        if(data.msg === '图片验证码不匹配'){
          this.imgCaptcha();
          $that.captCha =''
        }
        if(data.msg === '用户名和密码不匹配'){
          $that.pass =''
        }
        if(data.ret === 1){
          //this.$bus.$emit('alertCer', data.msg);
          this.$bus.$emit('alertCer', {
            msg:data.msg
          });

        }

      })
    },
    //校验图片验证
    imgCaptcha(){
      this.axios.post('captchaInfo', {
      }).then(({data}) =>{
        this.img= data.data.img;
        this.cap= data.data.str;
      })
    },
    checkoutCaptcha () {
      let $that=this;
      this.axios.post('checkCaptcha', {
        cap: $that.cap,
        captcha:$that.captCha
      }).then(({data}) => {
        //console.log(data)
      })
    },
    tab(){
      this.imgCaptcha();
    },
    bock(){
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .forgetPssword {
    padding-top: 160px;
    .head {
    	position:relative;
      @include headBlack;
      a{
      	color: #fff;
      }
      .returnBtn{
      	position: absolute;
      	left: 35px;
      	top: 0;
      	font-size: 48px;
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
      width: 600px;
      margin: 0 auto;
      border-bottom: 1px solid #3c444d;
      margin-top: 28px;
      height: 85px;
      line-height: 85px;
      position: relative;
      padding-left: 60px;
      .icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        color: #D7A82B;
        font-size: 40px;
        &.number {
          font-size: 28px;
        }
      }
      .input {
        background: none;
        color: rgb(104,107,111);
        font-size: 28px;
         color:#fff;
        &.number {
          border-left: 1px solid #fff;
          padding-left: 16px;
        }
      }
   ::-webkit-input-placeholder { /* WebKit browsers */
     color:    #999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #999;
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
      .yzmBox{
      	float: right;
      	display: inline-block;
      	width: 180px;
      	height: 60px;
      	position:absolute;
      	top: 12px;
      	right:10px;
      }
      .hqyzm{
      	color: #D7A82B;
      	float: right;
      }
    }
    .option {
      color: #fff;
      width: 530px;
      margin: 30px auto;
      display: flex;
      justify-content: space-between;
      font-size: 28px;
    }
    .submit {
      @include submitButton;
      width: 530px;
      color: #000;
    }
  }
</style>
