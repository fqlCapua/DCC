<template>

  <div class="setLoginPsd_order">
    <div class="form">
      <label class="label" :for="index" v-for="(item, index) in form" :key="index">
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index !== 'newsCode'&& index !== 'phone'" :placeholder="item.placeholder"  v-model="item.num" :readonly="item.readOnly">
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index == 'phone'" :placeholder="item.placeholder"  v-model="showPhone" :readonly="item.readOnly">
        <button class="input_button" v-if="index === 'newsCode'" @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : codeTime + 's后重試' }}</button>
        <input class="input_code" :id="index" type="text" v-if="index === 'newsCode'" v-model="item.num" :placeholder="item.placeholder">
      </label>
    </div>
    <button class="submit" @click="submit">確定</button>
  </div>
</template>

<script>
export default {
  name: 'setLoginPsd',
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
          placeholder: '設置新密碼',
          num: '',
          type: 'password',
          readOnly: false
        },
        confirmPsd: {
          placeholder: '確認密碼',
          num: '',
          type: 'password',
          readOnly: false
        }
      },
      codeTime: 61
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '修改登录密碼')
    this.init()
  },
   computed: {
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
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    init () {
      this.axios.post('users/login_pass').then(({data}) => {
        this.form.phone.num = data.phone
      })
    },
    getCode () {
      if (this.codeTime !== 61) return false
      if (this.form.phone.num === '') return this.$bus.$emit('alert', '請輸入手機號碼')
      this.codeTime = 60
      let timer = setInterval(() => {
        if (--this.codeTime === 0) {
          clearInterval(timer)
          this.codeTime = 61
        }
      }, 1000)
      this.axios.post('Sms/send', {
        type: 2,
        phone: this.form.phone.num
      }).then(({data}) => {
        if (data.status !== 200) {
          clearInterval(timer)
          this.codeTime = 61
          this.$bus.$emit('alert', data.message)
        }
      })
    },
    submit () {
      if (this.form.newsCode.num === '') return this.$bus.$emit('alert', '請輸入驗證碼')
      if (this.form.newsPsd.num === '') return this.$bus.$emit('alert', '請輸入密碼')
      if (this.form.confirmPsd.num != this.form.newsPsd.num) return this.$bus.$emit('alert', '兩次輸入的密碼不一致')
      this.axios.post('users/loginReset', {
        pass: this.form.newsPsd.num,
        repass: this.form.confirmPsd.num,
        code: this.form.newsCode.num
      }).then(({data}) => {
        if (data.status === 200) {
          this.axios.get('/auth/unlogin').then(({data}) => {
            if (data.status === 200) {
              this.$bus.$emit('alert', {
                title: '修改成功',
                msg: '恭喜您修改成功，請重新登錄',
                btn: '知道了',
                cb:function(){
                  this.$router.push('login')
                }
              })
            }
          })
        } else {
          this.$bus.$emit('alert', data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .setLoginPsd_order {
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
