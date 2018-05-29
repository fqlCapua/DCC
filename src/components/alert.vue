<template>
  <div class="alert" v-show="show" @click="close">
    <div class="showBox">
      <h4 class="title">{{ title }}</h4>
      <p class="msg" :class="{'center': msg.length < 18}">{{ msg }}</p>
      <button class="ok">{{ btn }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data () {
    return {
      show: false,
      title: '',
      msg: '',
      btn: '',
      callback: ''
    }
  },
  mounted () {
    this.$bus.$on('alert', this.openAlert)
  },
  methods: {
    openAlert (data) {
      if (typeof data === 'string') data = {msg: data}
      this.show = true
      this.title = data.title || '提示'
      this.msg = data.msg
      this.btn = data.btn || '確定'
      this.callback = data.cb || ''
    },
    close () {
      this.show = false
      if (this.callback) this.callback()
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
    .showBox {
      padding: 40px;
      background: #fff;
      box-sizing: border-box;
      width: 590px;
      border-radius: 30px;
      margin: 350px auto;
      .title {
        text-align: center;
        font-size: 30px;
        font-weight: normal;
        line-height: 50px;
        padding-bottom: 30px;
      }
      .msg {
        font-size: 28px;
        text-align: justify;
        line-height: 42px;
        &.center {
          text-align: center;
        }
      }
      .ok {
        @include submitButton;
        margin-top: 40px;
        width: 300px;
      }
    }
  }
</style>
