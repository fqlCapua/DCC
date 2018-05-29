<template>
  <div class="index_wrap">
    <header>
      <div class="logo">
        <img :src="logo" alt="">
        <span>DCC</span>
      </div>
      <span class="header_right" :class="{'has_msg': hasMessage}">
        <i class="iconfont icon-xiaoxixinfengnews2" @click="seeDetails"></i>
      </span>
    </header>
    <div class="circle"></div>
    <!-- <img :src="circle" alt="" class="circle"> -->
    <div class="btns">
      <button class="in" @click="seeDetails">買入</button>
      <button class="out" @click="seeDetails">賣出</button>
    </div>
    <ul class="list_wrap">
      <li class="item" v-for="(item, index) in list" :key="index">
        <i class="iconfont" :class="item.icon"></i>
        <div class="right">
          <span class="name">{{item.name}}</span>
          <span class="num">{{item.num}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      logo: require('../assets/images/logo.png'),
      circle: require('../assets/images/circle.png'),
      hasMessage: true,
      list: [
        {
          icon: 'icon-touzi1',
          name: '我的DCC',
          num: ''
        },
        {
          icon: 'icon-touzi2',
          name: '當前實價(CNY)',
          num: ''
        },
        {
          icon: 'icon-duihuan',
          name: '活動DCC',
          num: ''
        },
        {
          icon: 'icon-goumai',
          name: '縂獎勵(CNY)',
          num: ''
        }
      ]
    }
  },
  beforeMount () {
    this.getInfo()
  },
  mounted () {
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
  },
  beforeDestroy () {
    this.$bus.$emit('footer', false)
  },
  methods: {
    seeDetails () {
      this.$bus.$emit('alert', {
        title: '测试中',
        msg: '正在测试中，敬请期待。',
        btn: '知道了'
      })
    },
    getInfo () {
      this.axios.get('Quotation/index').then(({data}) => {
        this.list = this.list.map((item, index) => {
          if (index === 0) item.num = (data.data.userinfo.active_pool - 0) + (data.data.userinfo.pool - 0)
          if (index === 1) item.num = ((data.data.userinfo.active_pool - 0) + (data.data.userinfo.pool - 0)) * data.data.info.value
          if (index === 2) item.num = data.data.userinfo.active_pool
          if (index === 3) item.num = data.data.userinfo.total_bonus
          return item
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  $green: $mainColor;
  $black: #000000;
  $gray:  #eee;

  $grid-opacity: 0.15;
  .index_wrap{
    padding: 90px 0 90px;
    height: 100vh;
    overflow: auto;
    header{
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px 40px 0;
      background-color: #040301;
      z-index: 10;
      .logo{
        font-size: 30px;
        font-weight: 600;
        color: #fff;
        display: flex;
        align-items: center;
        img{
          height: 54px;
          margin-right: 20px;
        }
      }
      .header_right{
        display: block;
        width: 44px;
        height: 44px;
        position: relative;
        top: -6px;
        &.has_msg{
          &:before{
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 6px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #FE3333;
          }
        }
        i.iconfont{
          font-size: 42px;
          color: #E5E5E5;
          z-index: 11;
        }
      }
    }
    .circle{
      margin: 40px 0;
      background:
        radial-gradient(center, rgba($green, 0.3) 0%, rgba($green, 0) 75%), // background glow
        repeating-radial-gradient(rgba($green, 0) 5.8%, rgba($green, 0) 18%, rgba($green, 1) 18.6%, rgba($green, 0) 18.9%), // concentric circles
        linear-gradient(90deg, rgba($green, 0) 49.5%, rgba($green, 1) 50%, rgba($green, 1) 50%, rgba($green, 0) 50.2%), // center line - vertical
        linear-gradient(0deg, rgba($green, 0) 49.5%, rgba($green, 1) 50%, rgba($green, 1) 50%, rgba($green, 0) 50.2%); // center line - horizontal
      background:
        -webkit-radial-gradient(center, rgba($green, 0.3) 0%, rgba($green, 0) 75%), // background glow
        -webkit-repeating-radial-gradient(rgba($green, 0) 5.8%, rgba($green, 0) 18%, rgba($green, 1) 18.6%, rgba($green, 0) 18.9%), // concentric circles
        -webkit-linear-gradient(90deg, rgba($green, 0) 49.5%, rgba($green, 1) 50%, rgba($green, 1) 50%, rgba($green, 0) 50.2%), // center line - vertical
        -webkit-linear-gradient(0deg, rgba($green, 0) 49.5%, rgba($green, 1) 50%, rgba($green, 1) 50%, rgba($green, 0) 50.2%);
      width: 400px;
      height: 400px;
      max-height: 75vh;
      max-width: 75vh;
      position: relative;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 0.2rem solid $green;
      overflow: hidden;

      &:before {
        content: ' ';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: blips 5s infinite;
        animation-timing-function: linear;
        animation-delay: 1.4s;
      }

      &:after {
        content: ' ';
        display: block;
        background-image: linear-gradient( 44deg, rgba(0215, 168, 43, 0) 50%, rgba(0215, 168, 43, 1) 100%);
        width: 50%;
        height: 50%;
        position: absolute;
        top: 0;
        left: 0;
        animation: radar-beam 5s infinite;
        animation-timing-function: linear;
        transform-origin: bottom right;
        border-radius: 100% 0 0 0;
      }
    }
    .btns{
      display: flex;
      justify-content: center;
      button{
        font-size: 28px;
        height: 80%;
        line-height: 80px;
        border-radius: 40px;
        width: 278px;
        &.in{
          color: #333;
          background-color: $mainColor;
          margin-right: 56px;
        }
        &.out{
          color: #fff;
          background-color: #377CD1;
        }
      }
    }
    .list_wrap{
      margin: 34px 30px;
      border-radius: 16px;
      background-color: #16191E;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 50%;
        border-bottom: 1px solid #424652;
        display: flex;
        align-items: center;
        padding: 50px 0 40px 54px;
        &:nth-last-child(1),&:nth-last-child(2){
          border: none;
        }
        >i.iconfont{
          font-size: 46px;
          color: #377CD1;
          margin-right: 20px;
        }
        .right{
          display: flex;
          flex-direction: column;
          .name{
            color: #CCCCCC;
            margin-bottom: 12px;
            font-size: 26px;
          }
          .num{
            color: #fff;
            font-size: 30px;
            font-weight: 600;
            font-style: italic;
          }
        }
      }
    }
  }
  @keyframes radar-beam {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }

  @keyframes blips {
    14% {
      background:
        radial-gradient(2vmin circle at 75% 70%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%);
    }
    14.0002% {
      background:
        radial-gradient(2vmin circle at 75% 70%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%),
        radial-gradient(2vmin circle at 63% 72%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%);
    }
    25% {
        background:
            radial-gradient(2vmin circle at 75% 70%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%),
            radial-gradient(2vmin circle at 63% 72%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%),
            radial-gradient(2vmin circle at 56% 86%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%);
    }
    26% {
        background:
            radial-gradient(2vmin circle at 75% 70%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%),
            radial-gradient(2vmin circle at 63% 72%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%),
            radial-gradient(2vmin circle at 56% 86%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%);
        opacity: 1;
    }
    100% {
        background:
            radial-gradient(2vmin circle at 75% 70%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%),
            radial-gradient(2vmin circle at 63% 72%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%),
            radial-gradient(2vmin circle at 56% 86%, rgba(#fff, 1) 10%, rgba($green, 1) 30%, rgba(#fff, 0) 100%);
        opacity: 0;
    }
  }
</style>
