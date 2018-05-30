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
    <label class="label" for="pass">
      <span class="icon iconfont icon-navicon-dxmbwh"></span>
      <input class="input" id="pass" type="password" v-model="pass" placeholder="請輸入验证码">
      <span class="hqyzm">獲取驗證碼</span>
    </label>
    <label class="label" for="yzm">
     <span class="icon iconfont icon-AAICon-"></span>
      <input class="input" id="yzm" type="password"  placeholder="請設置新的登錄密碼">
    </label>
     <label class="label" for="yzm">
     <span class="icon iconfont icon-AAICon-"></span>
      <input class="input" id="yzm" type="password"  placeholder="再次確認新密碼">
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
      show:0,
      captCha:'',
      img:'',
    }
  },
  mounted () {
    this.imgCaptcha();
    this.getCookie();
  },
  methods: {

    submit () {
      if (this.phone === '') return this.$bus.$emit('alert', '请输入手机号');
      if (this.pass === '') return this.$bus.$emit('alert', '请输入登录密码');
      //保存的账号
      let name=this.phone;
      //保存的密码
      let pass=this.pass;
      if(this.show===0){
        //传入账号名，密码，和保存天数3个参数
//        this.setCookie(name,pass,7);
      }
      this.doLogin()
    },
    say(){
      this.show = !this.show;
    },

    doLogin() {
      let $that=this;
      this.axios.post('resetMobilePassword', {
        token:localStorage.getItem('token'),
        phone:this.phone,
        password:this.pass,
        code:this.code,
        captcha:this.captCha,
        cap:this.cap
      }).then(({data}) => {
        if (data.ret === 0){
          let token=data.data.token;
          window.localStorage.setItem('token',token);
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
        console.log(data)
      })
    },
    tab(){
      this.imgCaptcha();
    },
    bock(){
      this.$router.go(-1)
    },
    //设置cookie
    setCookie(c_name,c_pwd,exdays) {
      var exdate=new Date();//获取时间
      exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
      //字符串拼接cookie
      window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
      window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
    },
    //读取cookie
    getCookie:function () {
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');//再次切割
          //判断查找相对应的值
          if(arr2[0]=='userName'){
            this.phone=arr2[1];//保存到保存数据的地方
          }else if(arr2[0]=='userPwd'){
            this.pass=arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie:function () {
      this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
    }
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
