<template>
  <div class="wait_open pad_top">
    <img class="wait" src="../assets/images/wait_page.png" />
    <p class="prompt">努力研發中，敬請期待<span class="points">{{ pDo.map(() => {return '.'}).join('') }}</span></p>
  </div>
</template>

<script>
export default {
  name: 'waitOpen',
  data () {
    return {
      pDo: ['']
    }
  },
  mounted () {
    let $that =this;
    this.$bus.$emit('pageHead', this.$route.query.title)
    this.imgAnimate();
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      if(!localStorage.getItem('token')){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          $that.$router.push('/login')
        },2000)
      }
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      if(!$that.getCookie('token')){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          $that.$router.push('/login')
        },2000)
      }
    }
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    imgAnimate () {
      setTimeout(() => {
        this.pDo.length > 5 ? this.pDo = [''] : this.pDo.push('')
        this.imgAnimate()
      }, 500)
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  @keyframes picDo {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
      opacity: 0.4;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .wait_open {
    text-align: center;
    .wait {
      width: 500px;
      padding-top: 200px;
      animation: picDo 3s ease-in infinite;
    }
    .prompt {
      font-size: 28px;
      padding-top: 30px;
      color: $mainColor;
      .points {
        display: inline-block;
        width: 3em;
        text-align: left;
      }
    }
  }
</style>
