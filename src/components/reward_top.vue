<template>
  <div id="rewardTop">
    <div class="inner">
      <p class="title">纍計總金額</p>
      <h3 class="money">{{ money }}<span class="unit">USDT</span></h3>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'rewardTop',
    data () {
      return {
      }
    },
    props: {
      money: ''
    }
  }
</script>
<style lang="scss">
  @import '../assets/scss/style.scss';
  #rewardTop {
    margin-top: 15px;
    .inner {
      background: $mainColor;
      width: 710px;
      height: 260px;
      padding: 60px 30px 75px;
      margin: 0 auto;
      border-radius: 20px;
      color: #fff;
      .title {
        font-size: 28px;
        line-height: 30px;
      }
      .money {
        font-size: 50px;
        line-height: 90px;
        .unit {
          font-size: 26px;
          font-style: italic;
        }
        border-bottom: 1px solid #fff;
      }
    }
  }
</style>