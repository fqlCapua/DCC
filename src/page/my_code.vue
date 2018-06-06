<template>

  <div class="my_code">
     <div class="back iconfont icon-fanhuijiantou" @click="back"></div>
     <div class="codeTab">
      <span class="option" @click="toggleTabs(0)" :class="{option_active:1!=selectTab}">个人二维码</span>
      <span class="option" @click="toggleTabs(1)" :class="{option_active:0!=selectTab}">团队二维码</span>
    </div>
   
    <div class="data" v-show="selectTab === 0">
      <div class="extend_code qrcode">
        <div class="img_box">
          <img :src="myCodeImg" alt="推广下级二维码" />
        </div>
        <div class="img_tips">推广下级二维码</div>
        <div class=" img_extend_code">
          <span>您的推广码：</span>
          <span>{{myCode}}</span>
        </div>
      </div>
     
    </div>
    <div class="data" v-show="selectTab === 1">
       <div class="vip_code qrcode">
        <div class="img_box">
          <img :src="TeamCodeImg" alt="会员二维码" />
        </div>
        <div class="img_tips">团队二维码</div>
        <div class=" img_extend_code">
          <span>您的推广码：</span>
          <span>{{TeamCode}}</span>
        </div>
      </div>
     <!--  <div class="real-name">
        <div class="cert">
          <div class="tips1">
            <span class="iconfont icon-shangchuan1"></span>
            <span class="attention_tips">{{formTitle2}}</span>
          </div>
          <div>
            <div class="center_box">
             
              <div class="identity alipayCode">
                <img alt="" :src="card" width="100%" height="100%">
                <input type="file" class="file" @change="fileImage">
              </div>
              <p class="code_tips">支付寶收款碼</p>
            </div>
            <div class="center_box">
              <div class="identity wechatCode">
                <img alt="" :src="card" width="100%" height="100%">
                <input type="file" class="file" @change="fileImage">
              </div>
              <p class="code_tips">微信收款碼</p>
            </div>
          </div>
        </div>
        <div style="background: #3F3C3C;">
          <div class="tip2">
            <span class="iconfont icon-zhifuxinxi"></span>
            <span class="attention_tips">{{formTitle3}}</span>
          </div>
          <div class="label" v-for="(item, index) in form" :key="index">
            <span class="name">{{item.name}}</span>
            <input class="input" type="text" v-model="item.value">
          </div>
        </div>
        <button class="submit">保存</button>
      </div> -->
    </div>
  </div>
</template>
<script>
//import QRCode from 'qrcode'
export default {
  name: 'myCode',
  data() {
    return {
      token: "",
      zhanwei: require('../assets/images/zwimg.png'),
      code: '',
      myCodeImg: "",
      myCode: "",
      TeamCodeImg: "",
      TeamCode: "",
      card: "",
      // 切换列表
      selectTab: 0,
      formTitle2: '上傳二維碼',
      formTitle3: '填寫你的賬號信息',
      // 是否在切换中
      selectTabIng: false,
      form: {

        name: {
          name: '支付寶賬戶名',
          value: "Cap"
        },
        identity: {
          name: "微信賬戶名",
          value: "410221199"
        },

      },
    }
  },
  beforeMount() {
    this.init()
  },
  mounted() {
    // this.$bus.$emit('pageHead', '推广二维码')
    let $that = this;
    if (!this.getCookie('token') || this.getCookie('token') === "null") {
      this.$bus.$emit('alertCer', {
        msg: "請重新登錄"
      });
      setTimeout(function() {
        $that.$router.push('/login')
      }, 2000)
    }

  },
  destroyed() {
    this.$bus.$emit('pageHead')
  },

  methods: {
    init() {
      let $that = this;
      this.token = this.getCookie("token")
      this.axios.post("myShareCode", {
        token: this.token
      }).then(({ data }) => {
        let base64Data = "data:image/png;base64,";
        this.myCode = data.data.ShareCode.r_code
        this.myCodeImg = base64Data + data.data.ShareCode.img

        this.TeamCode = data.data.TeamCode.com_code
        this.TeamCodeImg = base64Data + data.data.TeamCode.img

      });
    },

    back() {
      this.$router.go(-1)
    },
    // 生成二维码
    //  toQrCode(dataUrl){
    //     let CodeUrl;
    //    QRCode.toDataURL(dataUrl, function (err, url) {
    //          CodeUrl = url;
    //      })
    //    return CodeUrl;
    //  },
    fileImage: function(e) {
      let $that = this
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = function() {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        var dataURL = reader.result;
        $that.card = dataURL;
      };
    },
    fileImage2: function(e) {
      let $that = this
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = function() {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        var dataURL = reader.result;
        $that.card = dataURL;
      };
    },
    toggleTabs: function(id) {
      this.selectTab = id;
      // //console.log(this.selectTab);
      if (this.selectTabIng || this.selectTab === id) return false
      this.selectTabIng = true;
      this.selectTab = id;

      // setTimeout(() => {
      //   this.selectTabIng = false
      // }, 500)
    },
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.my_code {
   padding-top:18px;
  .icon-fanhuijiantou {
    position: absolute;
    top: 10px;
    left: 0;
    color: #fff;
    width: 100px;
    text-align: center;
    line-height: 80px;
    font-size: 40px;
  }
  .header_top {

    padding: 20px 0 16px 0;
  }
  .data {

    color: #fff;
    .extend_code {
   /* border-bottom: 1px solid #454544; */
    }
    .img_tips {
      margin-top:50px;
      font-size: 1.5em;
      line-height:75px;
    }
    .qrcode {
      padding:100px 0 25px 0;
      text-align: center;
      .img_box {
       
        width:80vw;
        height:80vw;
        margin:0 auto;
        
        background-image: url(../assets/images/zwimg.png);
       
        background-size: 100%;
        background-repeat: no-repeat;
        overflow: hidden;
        img {
          width:100%;
          height:100%;
           
          display: block;
        }
      }
    }
    .img_extend_code {
      font-size: 1.4em;
      color: $mainColor;
      font-weight: 600;
    }
    .text_title label {
      display: inline_block;
      color: $mainColor;
      font-size: 3em;
    }
    .text_title span {
      display: inline_block;
      font-size: 1.3em;
    }
  }

}

.real-name {
  padding-top: 20px;
  .tip2 {
   /* border-bottom: 1px solid #8D8B8B;*/
    padding-left: 20px;
  }
  .tip2 span {
    vertical-align: top;
    display: inline-block;
    line-height: 80px;
  }
  .tip2 span:nth-child(1) {
    font-size: 2.3em;
    letter-spacing: 2px;
    color: $mainColor;
  }
  .tip2 span:nth-child(2) {
    font-size: 1.2em;
    letter-spacing: 1px;
  }

  .cert {
    background: #3f3c3c;
    width: 100%;
    height: 40vh;
    margin-bottom: 20px;
    .code_tips {
      font-size: 1.3em;
      text-align: center;
      line-height: 100px;
    }
    .tips1 {
      /*border-bottom: 1px solid #8D8B8B;*/
      padding-left: 20px;
    }
    .tips1 span {
      vertical-align: top;
      display: inline-block;
      line-height: 80px;
    }
    .tips1 span:nth-child(1) {
      font-size: 2.3em;
      letter-spacing: 2px;
      color: $mainColor;
    }
    .tips1 span:nth-child(2) {
      font-size: 1.2em;
      letter-spacing: 1px;
    }

    .center_box {
      padding: 50px;
      display: inline-block;
      width: 49%;
    }
    .b_part {
      border: 1px solid #fff;
      background-color: #3F3C3C;
    }
    .identity {
      display: inline-block;
      width: 270px;
      height: 270px;
      margin: 0 auto;
      position: relative;
      .file {
        outline: none;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .label {
    height: 128px;
    /*border-bottom: 1px solid #A7A6A6;*/
    padding-top: 50px;

    .name {
      float: left;
      color: #fff;
      font-size: 30px;
      width: 250px;
      padding-left: 30px;
      box-sizing: border-box;
      margin-top: 5px;
    }
    .input,
    .input_code {
      float: left;
      background: none;
      color: #fff;
      padding-right: 10px;
      height: 50px;
      font-size: 30px;
    }
    .input_button {
      float: right;
      padding: 0 10px;
      background: none;
      color: #d7a72e;
      font-size: 28px;
      height: 50px;
    }
  }
  .label:last-child {
    border-bottom: none
  }
  .submit {
    @include submitButton;
    width: 80%;
    color: #111111;
  }
}
.codeTab {
  
  font-family: "微软雅黑";
  border: 1px solid #CFA12A;
  border-radius: 6px;
  width: 60%;
  margin:0 auto;
  .option {
    display: inline-block;
    line-height: 60px;
    font-size: 30px;
    color: #AD8621;
    height: 60px;
    line-hight: 60px;
    width: 49.1%;
    text-align: center;
  }
  .option_active {
    background-color: $mainColor;
    color: #000;
  }
  .option_normal {
    background-color: none;
    color: #AD8621;
  }
}
</style>
