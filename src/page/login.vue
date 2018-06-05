<template>
  <div class="login">
    <!-- 頭部 -->
    <div class="head">
      <h2 class="title">登錄</h2>
    </div>
    <!-- logo -->
    <img class="logo" src="../assets/images/logo.png" alt="">
    <label class="label" for="phone">
      <span class="icon iconfont icon-shouji"></span>
      <input class="input" id="phone" type="number" v-model="phone" placeholder="請輸入手機號">
    </label>
    <label class="label" for="pass">
      <span class="icon iconfont icon-mima54"></span>
      <input class="input" id="pass" type="password" v-model="pass" placeholder="請輸入登錄密碼">
    </label>
    <label class="label" for="yzm">
     <span class="icon iconfont icon-theearth2diqiu"></span>
      <input class="input" id="yzm" type="text" v-model="captCha" placeholder="请输入验证码">
      <span class="yzmBox" @click="tab"><img :src="img" alt="" width="100%" height="100%"></span>
    </label>
    <div class="option">
      <router-link to="forgetPassword" tag="span" class="route">忘記密碼?</router-link>
      <router-link to="register" tag="span" class="route">快速注冊</router-link>
    </div>
    <button class="submit" @click="submit">登錄</button>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      phone: '',
      pass: '',
      show:0,
      captCha:'',
      img:'',
    }
  },
  mounted () {
    this.imgCaptcha();
    // this.a()
  },
  methods: {
     // a(){
     //   let ua = navigator.userAgent.toLowerCase();
     //   if (/iphone|ipad|ipod/.test(ua)) {
     //      // console.log(111);
     //     alert("phone")
     //   } else if (/android/.test(ua)){
     //     // window.localStorage.setItem('token',token)
     //     console.log(222)
     //   }
     // },
    submit () {
      if (this.phone === '') return this.$bus.$emit('alert', '请输入手机号');
      if (this.pass === '') return this.$bus.$emit('alert', '请输入登录密码');
      this.doLogin()
    },
    say(){
      this.show = !this.show;
    },

    doLogin() {
      let $that=this;
      this.axios.post('userLogin', {
        username: this.phone,
        password: this.pass,
        captcha:this.captCha,
        cap:this.cap
      }).then(({data}) => {
        if (data.ret === 0){
          let token=data.data.token;
          // let ua = navigator.userAgent.toLowerCase();
          // if (/iphone|ipad|ipod/.test(ua)) {
          //   this.setCookie('token',token);
          // } else if (/android/.test(ua)){
          //   window.localStorage.setItem('token',token)
          // }
          window.localStorage.setItem('token',token)
          this.$bus.$emit('alertCer',{
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
        if(data.msg === '验证码已过期'){
          this.$bus.$emit('alertCer', {
            msg:"验证码已过期"
          });
        }
        if(data.ret === 1){
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

  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .login {
    padding-top: 160px;
    .head {
      @include headBlack;
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
        color: #fff;
        font-size: 40px;
        &.number {
          font-size: 28px;
        }
      }
      .input {
        background: none;
        color: #fff;
        font-size: 28px;
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
      .yzmBox{
      	float: right;
      	display: inline-block;
      	width: 180px;
      	height: 60px;
      	position:absolute;
      	top: 12px;
      	right:10px;
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
    }
  }
</style>
