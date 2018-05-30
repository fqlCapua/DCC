<template>
  <div class="alert" v-show="show">
    <div class="showBox">
      <!--<h4 class="title">{{ title }}</h4>-->
      <p class="msg" :class="{'center': msg.length < 18}">{{ msg }}</p>
      <!--<button class="ok">{{ btn }}</button>-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'alertCer',
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
    this.$bus.$on('alertCer', this.openAlert)
  },
  methods: {
    openAlert (data) {
      if (typeof data === 'string') data = {msg: data};
      this.show = true;
      this.title = data.title || '提示';
      this.msg = data.msg;
      this.btn = data.btn || '确定';
      this.callback = this.isShow()
    },
//    close () {
//      this.show = false;
//      if (this.callback) this.callback()
//    },
     isShow (){
       let vm = this
      setTimeout(function () {
         vm.show = false;
      },2000)

     }

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    background:rgba(0,0,0,0);
    .showBox {
      padding: 40px;
      background: #000;
      box-sizing: border-box;
      width: 300px;
      border-radius:20px;
      margin: 500px auto;
      color:#000;
      background: rgba(255,255,255,255);
      .title {
        text-align: center;
        font-size: 30px;
        font-weight: normal;
        line-height: 50px;
        padding-bottom: 30px;
      }
      .msg {
        font-size: 20px;
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
        background: #2d8afd;
      }
    }
  }
</style>
