<template>
  <div class="declaration">
    <div action="" class="declaration-form">
      <label for="" class="amount">
        <div>擁有DCC</div>
        <input type="text" name="" v-model="zNum" readonly value="" placeholder="DCC數量" />
      </label>
      <label for="" class="amount">
        <div>轉出数量</div>
        <input type="text" name="" v-model="zcNum" value="" placeholder="請輸入轉出數量" /><span>DCC</span></label>
      <label class="amount">
        <div>對方帳號</div>
        <input type="text" name="" value=""  v-model="address" placeholder="請輸入對方帳號/手機號" />
        <div class="sm">
          <i class="iconfont icon-richscan_icon"></i>
          <input type="file" class="file" @change="onFileChange">
        </div>
      </label>
      <label for="" class="code">
        <div>验证码</div>
        <input type="text" name="" value="" v-model="code" placeholder="請輸入手機驗證碼" /><span @click="getCode">{{ codeTime == 61 ? '获取验证码' : codeTime+'s后重试'}}</span></label>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>
<script>
export default {
  name: 'C2C',
  data() {
    return {
      phone: '',
      code: '',
      codeTime: 61,
      address: '',
      zNum: '',
      zcNum: "",
      name: '',
      token: ''
    }
  },
  mounted() {
    this.phone = this.getCookie("phone");
    let vm = this;
    this.$bus.$emit('pageHead', {
      title: "用戶轉賬",
      rightShow: true,
      rightText: '轉出記錄',
      rightColor: '#2d8afd',
      rightBack: function() {
        vm.$router.push({
          path: 'accountsList'
        })
      }
    });
    this.num();
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      if (!localStorage.getItem('token')) {
        this.$bus.$emit('alertCer', {
          msg: "請重新登錄"
        });
        setTimeout(function() {
          vm.$router.push('/login')
        }, 2000)
      }
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      if (!vm.getCookie('token')) {
        this.$bus.$emit('alertCer', {
          msg: "請重新登錄"
        });
        setTimeout(function() {
          vm.$router.push('/login')
        }, 2000)
      }
    }
  },
  destroyed() {
    this.$bus.$emit('pageHead');
  },
  methods: {

    num() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token = localStorage.getItem('token')
        this.phone = localStorage.getItem('phone')
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
        this.phone =  this.getCookie('phone')
      }
      this.axios.post('userHomePage', {
        token: this.token
      }).then(({
        data
      }) => {
        this.zNum = this.formatNum(data.data.DCC_total, 4)
      })
    },
    getCode() {
      if (this.codeTime !== 61) return false;
      this.codeTime = 60;
      let timer = setInterval(() => {
        if (--this.codeTime === 0) {
          this.codeTime = 61;
          clearInterval(timer)
        }
      }, 1000)
      this.axios.post('sms', {
        phoneNo:this.phone
      }).then(({
        data
      }) => {})
    },
    submit() {
      //console.log(this.name)
      let $that = this;
      if (this.zNum.replace(/,/ig, '') < this.zcNum) {
        this.$bus.$emit('alert', '数量不能大于可用dcc的数值')
        return false;
      } else {
        if (this.code === '') return this.$bus.$emit('alert', '请输入手机验证码');
        if (this.name === undefined) {
          this.$bus.$emit('alert', '没有此账户');
          return false;
        } else {
          this.axios.post('withDrawDcc', {
            token: this.token,
            amount: this.zcNum,
            code: this.code,
            uid_to: this.address
          }).then(({ data}) => {
            if (data.ret === 0) {
              this.$bus.$emit('alertCer', data.msg)
              setTimeout(function() {
                $that.$router.go(-1)
              }, 2000)

            } else {
              this.$bus.$emit('alert', data.msg);

            }
          })
        }
      }

    },
    //    扫描二维码
    onFileChange(e) {
      let $that = this
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      //    this.createImage(files[0]);
      var fileUrl = this.getObjectURL(files[0]);
      qrcode.decode(fileUrl);
      qrcode.callback = function(imgMsg) {
        if (imgMsg.indexOf("error") > -1) {
          return $that.$bus.$emit('alert', "二维码无效")
        } else {
          $that.address = imgMsg
        }
      }

    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        let image = e.target.result;
        this.upLoad(image)
      };
      reader.readAsDataURL(file);
    },
    upLoad(image) {
      this.axios.post('qrcodeUpload', {
        img: image
      }).then(({ data }) => {
        if (!data.data.text) return this.$bus.$emit('alert', "二维码无效");
        this.address = data.data.text
      })

    },



  },
}

</script>
<style lang="scss" scoped>
@import '../assets/scss/style.scss';
.declaration {
  padding-top: 100px;
  .declaration-form {
    margin-top: 12px;
    height: auto;
    margin-bottom: 335px;
    label {
      height: 93px;
      width: 100%;
      line-height: 93px;
      margin-top: 30px;
      padding-left: 18px;
      display: flex;
      background: #3f3c3c; //justify-content: space-between;
      div {
        font-size: 28px;
        color: #fff;
        width: 176px;
      }
      input {
        font-size: 26px;
        background: none;
        color: #fff;
        width: 70%;
      }
      .sm {
        width: 150px;
        height: 93px;
        display: block;
        background-image: url();
        background-size: 100% 100%;
        border-radius: 50%;
        text-align: center;
        i {
          color: #D7A82B;
          font-size: 36px;
          position:absolute;
          right:20px;
        }
        .file {
          outline: none;
          opacity: 0;
          width: 100%;
          height:100%;
          position: relative;
          left:160px;
        }
      }
    }
    .amount {
      line-height: 108px;
      input {
        width: 30%;
      }
      span {
        color: #fff;
        position: absolute;
        right: 40px;
        font-size: 27px;
      }
    }
    .code {
      input {
        width: 50%;
      }
      span {
        color: #D7A82B;
        font-size: 26px;
        text-align: right;
      }
    }
  }
  .submit {
    width: 590px;
    height: 87px;
    line-height: 87px;
    background: #D7A82B;
    color: #fff;
    font-size: 34px;
    text-align: center;
    margin: 0 auto;
    border-radius: 70px 70px;
  }
}

.icon-richscan_icon {
  font-size: 2em;
  padding-right: 40px;
  color: $mainColor;
}

</style>
