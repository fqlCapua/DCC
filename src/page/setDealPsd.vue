<template>

  <div class="setDealPsd_order">
    <div class="form">
      <label class="label" :for="index" v-for="(item, index) in form" :key="index">
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index !== 'newsCode' && index !== 'phone' " oninput="if(value.length>6)value=value.slice(0,6)" :placeholder="item.placeholder"  v-model="item.num" :readonly="item.readOnly">
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index == 'phone'" :placeholder="item.placeholder"  v-model="showPhone" :readonly="item.readOnly">
        <button class="input_button" v-if="index === 'newsCode'" @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : codeTime + 's后重試' }}</button>
        <input class="input_code" :id="index" type="text" v-if="index === 'newsCode'" v-model="item.num"  :placeholder="item.placeholder">
      </label>
    </div>
    <button class="submit" @click="submit">確定</button>
  </div>
</template>

<script>
export default {
  name: 'setDealPsd',
  data () {
    return {
      form: {
      	phone: {
          placeholder: '我的手機號',
          num: '',
          readOnly: true
        },
        newsCode: {
          placeholder: '驗證碼',
          num: ''
        },
        newsPsd: {
          placeholder: '設置新的交易密碼（6位數字）',
          num: '',
          type: 'password',
          readOnly: false
        },
        confirmPsd: {
          placeholder: '確認交易密碼',
          num: '',
          type: 'password',
          readOnly: false
        }
      },
      codeTime: 61
    }
  },
  mounted () {
    let $that = this;
    this.$bus.$emit('pageHead', '修改交易密碼')
    this.form.phone.num = localStorage.getItem("phone");

      if(!this.getCookie('token') || this.getCookie('token') === "null" ){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          $that.$router.push('/login')
        },2000)
      }
    if(!localStorage.getItem('token') || localStorage.getItem('token') === "null" ){
      this.$bus.$emit('alertCer', {
        msg:"請重新登錄"
      });
      setTimeout(function () {
        $that.$router.push('/login')
      },2000)
    }
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  computed: {
//     let token=this.getCookie('token')
    showPhone () {
      let phoneStr
      if (typeof (this.form.phone.num) !== 'string') {
        phoneStr = this.form.phone.num.toString()
      } else {
        phoneStr = this.form.phone.num
      }
      return phoneStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
   }
  },
  methods: {
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
        phoneNo: this.form.phone.num
      }).then(({
                 data
               }) => {

      })
    },
    submit () {
      if (this.form.newsCode.num === '') return this.$bus.$emit('alert', '請輸入驗證碼')
      if (this.form.newsPsd.num === '') return this.$bus.$emit('alert', '請輸入密碼')
      if (this.form.confirmPsd.num.length !== 6) return this.$bus.$emit('alert', '交易密碼為6位數字')
      if (this.form.confirmPsd.num != this.form.newsPsd.num) return this.$bus.$emit('alert', '兩次輸入的密碼不一致')
      this.axios.post('setPayPassword', {
        token:this.getCookie("token"),
        pay_password: this.form.newsPsd.num,
        code: this.form.newsCode.num
      }).then(({data}) => {
        //console.log(data)
        if(data.msg = '操作成功'){
          this.$bus.$emit('alertCer', {
            msg: data.msg
          });
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .setDealPsd_order {
    .head {
      @include headBlack;
    }
    padding-top:100px;
    .form {
      padding: 0 45px;
      .label {
        height:96px;
        display: block;
        border-radius:48px;
        background: #3f3c3c;
        margin-top: 40px;
        background: transparent;
        .name {
          float: left;
          color: #d1cece;
          font-size: 28px;
        }
        .input, .input_code {
          background: #3f3c3c;
          color: #fff;
          padding-right: 10px;
          height: 100%;
          font-size: 30px;
          width: 100%;
          border-radius:48px;
          padding-left:50px;
          box-sizing: border-box;
        }
        .input_code{
        	width:67%;
        }
        .input_button {
          float: right;
          padding: 0 10px;
          background: none;
          color: #111111;
          font-size: 28px;
          height: 100%;
          width:30%;
          border-radius:48px;
          background: #d7a82b;
        }
      }
    }
    .submit {
      @include submitButton;
      width: 80%;
      color: #111111;
    }
  }
</style>
