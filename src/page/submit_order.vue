<template>
  <div class="submit_order">
    <div class="form">
      <label class="label" :for="index" v-for="(item, index) in form" :key="index">
        <span class="name">{{ item.name }}</span>
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index !== 'newsCode'" :placeholder="item.placeholder"  v-model="item.num" :readonly="item.readOnly">
        <button class="input_button" v-if="index === 'newsCode'" @click="getCode">{{ codeTime === 61 ? '獲取' : codeTime + 's后重試' }}</button>
        <input class="input_code" :id="index" type="text" v-if="index === 'newsCode'" v-model="item.num" :placeholder="item.placeholder">
      </label>
    </div>
    <button class="submit" @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: 'submitOrder',
  data () {
    return {
      form: {
        usdt: {
          name: '售價USDT',
          placeholder: '請輸入購幣數量',
          num: '',
//        type: 'number',
          readOnly: true
        },
        //      exchange: {
        //        name: '可兌換',
        //        placeholder: '',
        //        num: '0.0000 DCC',
        //        readOnly: true
        //      },
        backCode: {
          name: 'USDT提款碼',
          placeholder: '請輸入提款碼',
          num: ''
        },
        phone: {
          name: '手機號碼',
          placeholder: '我的手機號',
          num: '',
          readOnly: true
        },
        newsCode: {
          name: '短信驗證碼',
          placeholder: '請輸入驗證碼',
          num: ''
        }
      },
      codeTime: 61
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '支付頁面')
    this.init()
    this.form.usdt.num = this.$route.query.money
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    init () {
      this.axios.post('quotation/decl_from_page').then(({data}) => {
        this.form.phone.num = data.data.mobile
        //      this.form.exchange.num = (this.form.usdt.num * data.data.rmb_dcc * data.data.usdt_rmb) + ' DCC'
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
        type: 3,
        phone: '18337131078'
        //      phone: "this.form.phone.num"
      }).then(({data}) => {
        if (data.status !== 200) this.$bus.$emit('alert', data.message)
      })
    },
    submit () {
      if (this.form.usdt.num === '') return this.$bus.$emit('alert', '請輸入購買USDT數量')
      if (this.form.backCode.num === '') return this.$bus.$emit('alert', '請輸入USDT提款碼')
      if (this.form.newsCode.num === '') return this.$bus.$emit('alert', '請輸入驗證碼')
      this.axios.post('quotation/decl_from', {
        usdt: this.form.usdt.num,
        carry_usdt: this.form.backCode.num,
        code: this.form.newsCode.num,
        type: 1
      }).then(({data}) => {
        this.$bus.$emit('alert', data.message)
        if (data.status === 200) this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .submit_order {
    .head {
      @include headBlack;
    }
    padding-top:100px;
    .form {
      padding: 0 45px;
      .label {
        height: 128px;
        display: block;
        border-bottom: 1px solid #424652;
        padding-top: 50px;
        .name {
          float: left;
          color: #d1cece;
          font-size: 28px;
        }
        .input, .input_code {
          float: right;
          background: none;
          color: #d7a72e;
          text-align: right;
          padding-right: 10px;
          height: 50px;
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
    }
    .submit {
      @include submitButton;
      width: 80%;
    }
  }
</style>
