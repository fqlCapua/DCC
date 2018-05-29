<template>
  <div class="submit_order">
    <!-- 頭部 -->
    <div class="head">
      <h2 class="title">報單</h2>
    </div>
    <div class="form">
      <label class="label" :for="index" v-for="(item, index) in form" :key="index">
        <span class="name">{{ item.name }}</span>
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index !== 'newsCode'" :placeholder="item.placeholder" v-model="item.num" :readonly="item.readOnly">
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
          name: '購買USDT',
          placeholder: '請輸入夠幣數量',
          num: '',
          type: 'number'
        },
        exchange: {
          name: '可兌換',
          placeholder: '',
          num: '0.0000 DCC',
          readOnly: true
        },
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
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
  },
  methods: {
    getCode () {
      this.$bus.$emit('alert', '該功能暫未開放，敬請期待')
      // if (this.codeTime !== 61) return false
      // this.codeTime = 60
      // let timer = setInterval(() => {
      //   if (--this.codeTime === 0) clearInterval(timer)
      // }, 1000)
    },
    submit () {
      this.$bus.$emit('alert', '該功能暫未開放，敬請期待')
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
        }
        .input_button {
          float: right;
          padding: 0 10px;
          background: none;
          color: #d7a72e;
          font-size: 28px;
        }
      }
    }
    .submit {
      @include submitButton;
      width: 80%;
    }
  }
</style>
