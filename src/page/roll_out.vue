<template>
  <div class="rollOut">
    <div class="form">
      <label class="label" :for="index" v-for="(item, index) in form" :key="index">
        <span class="name">{{ item.name }}</span>
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index !== 'newsCode'&& index !== 'phone' && index !== 'dccNum' " :placeholder="item.placeholder"  v-model="item.num" :readonly="item.readOnly">
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index == 'phone'" :placeholder="item.placeholder"  v-model="showPhone" :readonly="item.readOnly">
        <button class="input_button" v-if="index === 'newsCode'" @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : codeTime + 's后重試' }}</button>
        <input class="input_code" :id="index" :type="item.type || 'text'" v-if="index === 'newsCode'" v-model="item.num" :placeholder="item.placeholder">
        <input class="input_code" :id="index" :type="item.type || 'text'" v-if="index === 'dccNum'" v-model="item.num" :placeholder="item.placeholder">
        <span class="dcc" v-if="index === 'dccNum'" >DCC</span>
      </label>
    </div>
    <button class="submit" @click="submit">確定</button>
  </div>
</template>

<script>
export default {
  name: 'rollOut',
  data () {
    return {
      form: {
        DCC: {
          name: '擁有DCC',
          placeholder: '請輸入數量',
          num: '5252.255',
          type: 'number',
          readOnly: true
        },
        dccNum: {
          name: '轉出數量',
          placeholder: '請輸入轉出數量',
          type: 'number',
          num: ''
        },
         wallet: {
          name: '錢包地址',
          placeholder: '請輸入錢包地址',
          num: ''
        },
        phone: {
          name: '手機號碼',
          placeholder: '我的手機號',
          num: '18888888888',
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
  	  let $that = this
    this.$bus.$emit('pageHead',{
    	title:"轉出至錢包",
    	rightShow: true,
    	rightText: '轉出記錄',
    	rightBack:function(){
    		  $that.$router.push('walletList')
    	}
    }),
    this.init()
  },
  destroyed () {
    this.$bus.$emit('pageHead')
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
      if (this.form.dccNum.num === '') return this.$bus.$emit('alert', '請輸入轉出數量')
      if (this.form.wallet.num === '') return this.$bus.$emit('alert', '請輸入錢包地址')
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
  .rollOut {
    .head {
      @include headBlack;
    }
    padding-top:100px;
    .form {
      .label {
        height: 100px;
        display: block;
        margin-bottom:22px;
        background:#3f3c3c;
        padding:0 42px;
        box-sizing:border-box;
        @include clearFloat;
        .name {
          float: left;
          color: #d1cece;
          font-size: 28px;
          display: block;
          height: 100%;
          line-height: 100px;
        }
        .dcc{
        	float: right;
        	line-height: 100px;
        	font-size:28px;
        	color: #fff;
        }
        .input, .input_code {
          float: left;
          background: none;
          color: #fff;
          /*text-align: right;*/
          padding-right: 10px;
          height: 100%;
          line-height: 100px;
          width: 60%;
          padding-left:25px;
          font-size: 28px;
        }
        .input_code{
        	width: 40%;
        }
        .input_button {
          float: right;
          padding: 0 10px;
          background: none;
          color: #d7a72e;
          font-size: 28px;
          height: 100%;
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
