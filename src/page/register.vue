<template>
  <div class="register">
    <areaPage></areaPage>
    <!-- 頭部 -->
    <div class="head">
      <i class=" iconfont icon-fanhuijiantou" @click="bock"></i>
      <h2 class="title">註冊</h2>
      <!--<router-link tag="span" class="change_language" to="changeLanguage">切換語言<span class="iconfont icon-jinrujiantou"></span></router-link>-->
    </div>
    <!-- logo -->
    <img class="logo" src="../assets/images/logo.png" alt="">
    <label class="label" for="phone">
      <span class="icon iconfont icon-shouji"></span>
      <input class="input number" id="phone" type="number" v-model="phone" placeholder="請輸入手機號碼">
    </label>
    <label class="label" for="area">
      <span class="icon iconfont icon-theearth2diqiu"></span>
      <input class="input" id="area" type="text" v-model="captCha" placeholder="请输入验证码">
      <span class="more" @click="tab"><img :src="img" alt="" width="100%" height="100%"></span>
    </label>
    <label class="label" for="code">
      <span class="icon iconfont icon-navicon-dxmbwh"></span>
      <input class="input" id="code" type="text" v-model="code" placeholder="請輸入驗證碼">
      <button class="code_button" @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : codeTime+'s後重試'}}</button>
    </label>
    <!--验证码和登录密码-->
    <label class="label">
      <span class="icon iconfont icon-yaoqingma"></span>
      <input class="input specialWidth" type="text" v-model="yqm" placeholder="請輸入邀请碼(选填)">
      <span class="iconr iconfont icon-richscan_icon"></span>
      <input type="file" class="file" @change="onFileChange">
    </label>
    <label class="label" for="password">
      <span class="icon iconfont icon-mima54"></span>
      <input class="input specialWidth" id="password" v-model="psd" type="password" placeholder="請設置您的登錄密碼">
    </label>
    <p class="toLoginBox">
      已有賬號
      <router-link to="/login" class="toLogin">去登陸</router-link>
    </p>
    <button class="submit" @click="submit">注冊</button>
  </div>
</template>
<script>
import areaPage from '../components/area_select.vue'
export default {
  name: 'register',
  data() {
    return {
      img: '',
      phone: '',
      psd: '',
      code: '',
      codeTime: 61,
      imgData: '',
      yqm: '',
      captCha: '',
    }
  },
  mounted() {
    let $that = this;
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
    // 判断是否是微信
     if(this.isWeixn()) {
     	    $that.yqm = this.getQueryString(id)
     }
  },
  methods: {
  	
  	isWeixn(){
		    var ua = navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i)=="micromessenger") {
		        return true;
		    } else {
		        return false;
		    }
		},
		getQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
			return(r[2]);
			}
			return null;
		},
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
				    	let  code = imgMsg.split("/")
				       $that.yqm = code[code.length-1]
				       console.log($that.yqm)
				    }
				} 
    },
//  createImage(file) {
//    var image = new Image();
//    var reader = new FileReader();
//    var vm = this;
//    reader.onload = (e) => {
//    	console.log(e)
//      let image = e.target.result;
//      this.upLoad(image)
//    };
//    reader.readAsDataURL(file);
//  },
//  upLoad(image) {
//    this.axios.post('qrcodeUpload', {
//      img:image
//    }).then(({ data }) => {
//    	console.log(data);
//      if (!data.data.text) return this.$bus.$emit('alert', "二维码无效");
//      this.yqm = data.data.text
//    })
//
//  },
    // 獲取驗證碼
    getCode() {
      this.checkoutCaptcha()
    },

    // 註冊提交
    submit() {
      this.colo()
    },
    colo() {
      this.axios.post('userCount', {
        phone: this.phone,
      }).then(({
        data
      }) => {
        console.log(data)
        if (data.data == 1) {
          return this.$bus.$emit('alertCer', data.msg);
        } else {

          if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '請輸入手機號碼');
          if (this.code === '') return this.$bus.$emit('alert', '請輸入手機驗證碼');
          this.axios.post('userRegister', {
            username: this.phone,
            password: this.psd,
            captcha: this.captCha,
            cap: this.imgData,
            code: this.code,
            fid:this.yqm
          }).then(({
            data
          }) => {
            if (data.ret === 0) {
              let token = data.data.token;
              let $that = this;
              if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                localStorage.setItem('token',token)
              } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
                this.setCookie('token',token)
              }
              this.$bus.$emit('alertCer', {
                msg: '恭喜您登錄成功',
              });
              setTimeout(function() {
                $that.$router.push('/index');
              }, 2000)
            } else {
              if (data.msg == '图片验证码不匹配') {
                this.imgCaptcha();
                this.captCha = '';
                this.$bus.$emit('alertCer', '驗證碼不匹配');
              }
              this.$bus.$emit('alertCer', data.msg);
            }
          })
        }
      })

    },
    bock() {
      this.$router.go(-1)
    },
    tab() {
      this.imgCaptcha();
    },
    //校验图片验证
    imgCaptcha() {
      this.axios.post('captchaInfo').then(({
        data
      }) => {
        this.img = data.data.img;
        this.imgData = data.data.str;

      })
    },
    checkoutCaptcha() {
      let $that = this;
      this.axios.post('checkCaptcha', {
        cap: $that.imgData,
        captcha: $that.captCha
      }).then(({
        data
      }) => {
        if (data.ret == 1) {
          return this.$bus.$emit('alertCer', '驗證碼不匹配');
        } else {
          if (this.codeTime !== 61) return false;
          if (this.phone === '') return this.$bus.$emit('alert', '請輸入手機號碼')
          this.codeTime = 60;
          let timer = setInterval(() => {
            if (--this.codeTime === 0) {
              this.codeTime = 61;
              clearInterval(timer)
            }
          }, 1000);
          this.axios.post('sms', {
            phoneNo: this.phone
          }).then(({
            data
          }) => {})
        }
      })
    },
  },
  mounted() {
    this.imgCaptcha()
  },
  components: {
    areaPage
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/scss/style.scss';
.register {
  padding-top: 90px;
  .head {
    @include headBlack;
    i {
      font-size: 45px;
      top: 2px;
      padding-left: 35px;
    }
    h2 {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);
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
    width: 470px;
    margin: 0 auto;
    border-bottom: 1px solid #3c444d;
    margin-top: 28px;
    height: 85px;
    line-height: 85px;
    position: relative;
    padding-left: 80px;
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      color: #D7A82B;
      font-size: 40px;
      &.number {
        font-size: 28px;
      }
    }
    .iconr {
      position: absolute;
      top: 0;
      right: 0;
      width: 80px;
      color: $mainColor;
      font-size: 2em;
    }
    .input {
      background: none;
      color: #fff;
      font-size: 28px;
      width: 60%;
      &.number {
        /*border-left: 1px solid #fff;*/
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
    .more {

      float: right;
      width: 150px;
      height: 60px;
    }
    .specialWidth {
      width: 66%;
    }
  }
  .submit {
    @include submitButton;
    width: 80%;
    color: #000;
  }
  .toLoginBox {
    width: 470px;
    margin: 10px auto;
    font-size: 26px;
    color: rgb(123, 96, 24);
    .toLogin {
      color: #D7A82B;
    }
  }
}

.file {
  border: 1px solid red;
  outline: none;
  opacity: 0;


  width: 100px;
  height: 100%;
  position: relative;
}

</style>
