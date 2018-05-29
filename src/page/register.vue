<template>
  <div class="login">
    <areaPage></areaPage>
    <!-- 頭部 -->
    <div class="head">
      <h2 class="title">注册</h2>
      <router-link tag="span" class="change_language" to="changeLanguage">切換語言<span class="iconfont icon-jinrujiantou"></span></router-link>
    </div>
    <!-- logo -->
    <img class="logo" src="../assets/images/logo.png" alt="">
    <label class="label" for="area">
      <span class="icon iconfont icon-theearth2diqiu"></span>
      <input class="input" id="area" type="text" readonly="true" :value="`${area}(${areaChinese})`" placeholder="請選擇國家或地區" @click="selectArea">
      <span class="more iconfont icon-jinrujiantou"></span>
    </label>
    <label class="label" for="phone">
      <span class="icon number">+{{ phoneAdd }}</span>
      <input class="input number" id="phone" type="number" v-model="phone" placeholder="請輸入手機號碼">
    </label>
    <label class="label" for="code">
      <span class="icon iconfont icon-navicon-dxmbwh"></span>
      <input class="input" id="code" type="text" v-model="code" placeholder="請輸入驗證碼">
      <button class="code_button" @click="getCode">{{ codeTime === 61 ? '獲取驗證碼' : `${codeTime}s後重試`}}</button>
    </label>
    <button class="submit" @click="submit">登錄</button>
  </div>
</template>

<script>
import areaPage from '../components/area_select.vue'
export default {
  name: 'login',
  data () {
    return {
      areaChinese: '中国',
      areaIndex: '36',
      area: 'China',
      phoneAdd: '86',
      phone: '',
      code: '',
      codeTime: 61
    }
  },
  beforeDestroy () {
    this.$bus.$off('areaBoxSelect')
  },
  methods: {
    // 獲取驗證碼
    getCode () {
      if (this.phone === '') return this.$bus.$emit('alert', '請輸入手機號碼')
      if (this.codeTime !== 61) return false
      this.codeTime = 60
      let timer = setInterval(() => {
        if (--this.codeTime === 0) {
          this.codeTime = 61
          clearInterval(timer)
        }
      }, 1000)
    },
    // 選擇國家地區
    selectArea () {
      this.$bus.$emit('areaBoxShow', {
        areaChinese: this.areaChinese,
        area: this.area,
        tel: this.phoneAdd,
        index: this.areaIndex
      })
      this.$bus.$on('areaBoxSelect', this.areaChange)
    },
    // 更改國家地區
    areaChange (data) {
      this.$bus.$off('areaBoxSelect')
      this.areaChinese = data.areaChinese
      this.area = data.area
      this.phoneAdd = data.tel
      this.areaIndex = data.index
    },
    // 登錄提交
    submit () {
      if (this.phone === '') return this.$bus.$emit('alert', '請輸入手機號碼')
      if (this.code === '') return this.$bus.$emit('alert', '請輸入手機驗證碼')
      this.$bus.$emit('alert', {
        title: '登錄成功',
        msg: '恭喜您登錄成功，您的登錄密碼與交易密碼將以短信的方式發送至您的手機，請注意查收。',
        btn: '知道了'
      })
    }
  },
  components: {
    areaPage
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .login {
    padding-top: 90px;
    .head {
      @include headBlack;
      .change_language{
        .iconfont{
          font-size: 30px;
          top: 2px;
        }
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
    .submit {
      @include submitButton;
      width: 80%;
    }
  }
</style>
