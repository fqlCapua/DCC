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
      <span class="more iconfont icon-jinrujiantou"></span>
    </label>
    <label class="label" for="pass">
      <span class="icon iconfont icon-mima54"></span>
      <input class="input" id="pass" type="password" v-model="pass" placeholder="請輸入登錄密碼">
      <span class="more iconfont icon-jinrujiantou"></span>
    </label>
    <div class="option">
      <!-- <router-link to="" tag="span" class="route">忘記密碼?</router-link>
      <router-link to="register" tag="span" class="route">快速注冊</router-link> -->
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
      pass: ''
    }
  },
  methods: {
    submit () {
      if (this.phone === '') return this.$bus.$emit('alert', '請輸入手機號碼')
      if (this.pass === '') return this.$bus.$emit('alert', '請輸入登錄密碼')
      this.doLogin()
    },
    doLogin () {
      this.axios.post('/Auth/login', {
        phone: this.phone,
        password: this.pass
      }).then(({data}) => {
        if (data.status === 200) {
          this.$router.push('/')
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
      width: 470px;
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
