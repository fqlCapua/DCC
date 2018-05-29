<template>
  <div class="user_wrap">
    <div class="top">
      <i class="iconfont  icon-shezhishedingpeizhichilun" @click="seeDetails"></i>
      <img :src="img" alt="">
      <span class="name">
        <span>賬號</span>
        <span class="phone">{{showPhone}}</span>
      </span>
    </div>
    <div class="section">
      <span class="name">礦池總量</span>
      <span class="num">{{allNum || '0.00'}}</span>
    </div>
    <div class="section">
      <span class="name">活動賬戶</span>
      <span class="num">{{activeNum || '0.00'}}</span>
    </div>
    <div class="section">
      <span class="name">今日收益</span>
      <span class="num">{{todayNum}}</span>
    </div>
    <div class="link">
      <div class="link_top">
        <span class="name">錢包地址</span>
        <button class="copy btn" :data-clipboard-text="linkUrl" ref="copy" @click="copyLink">複製地址</button>
      </div>
      <span class="show_link">{{linkUrl}}</span>
    </div>
    <ul class="list">
      <li class="item" v-for="(item, index) in nameArr" :key="index" @click="seeDetails(index)">
        <img :src="imgArr[index]" alt="">
        <span class="name">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'userCenter',
  data () {
    return {
      img: require('../assets/images/logo.png'),
      phone: '',
      linkUrl: '',
      allNum: '',
      activeNum: '',
      todayNum: '0.00',
      imgArr: [require('../assets/images/icon3.png'), require('../assets/images/icon4.png')],
      nameArr: ['礦工列表', '我的二維碼']
    }
  },
  beforeMount () {
    this.getInfo()
  },
  mounted () {
    this.copyBtn = new Clipboard('.btn')
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
  },
  beforeDestroy () {
    this.$bus.$emit('footer', false)
  },
  computed: {
    showPhone () {
      let phoneStr
      if (typeof (this.phone) !== 'string') {
        phoneStr = this.phone.toString()
      } else {
        phoneStr = this.phone
      }
      return phoneStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  methods: {
    copyLink () {
      this.$bus.$emit('alert', {
        title: '復製成功',
        msg: '已復製成功！如果沒有復製成功，請手動複製！',
        btn: '知道了'
      })
    },
    seeDetails (index) {
      if (index === 0) {
        this.$bus.$emit('alert', {
          title: '測試中',
          msg: '正在測試中，敬請期待',
          btn: '知道了'
        })
      } else if (index === 1) {
        this.$router.push('myCode')
      }
    },
    getInfo () {
      this.axios.get('/Users/index').then(({data}) => {
        if (data.status === 200) {
          this.activeNum = data.data.active_pool
          this.phone = data.data.mobile
          this.allNum = data.data.pool
          this.linkUrl = data.data.token_address
        } else if (data.status === 2000) {
          this.$router.push('login')
        } else {
          this.$bus.$emit('alert', data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .user_wrap{
    padding-bottom: 110px;
    height: 100vh;
    overflow: auto;
    .top{
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      color: #fff;
      font-size: 28px;
      margin-bottom: 60px;
      img{
        width: 82px;
        margin: 60px 0 40px;
      }
      .iconfont{
        position: absolute;
        right: 30px;
        top: 14px;
        font-size: 42px;
      }
    }
    .section{
      height: 110px;
      line-height: 110px;
      border-top: 1px solid $mainColor;
      background-color: #131210;
      margin: 0 40px 24px;
      font-size: 30px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      padding: 0 40px;
      .num{
        font-size: 32px;
        font-weight: 600;
        font-style: italic;
      }
    }
    .link{
      display: flex;
      flex-direction: column;
      .link_top{
        height: 80px;
        line-height: 80px;
        border-top: 1px solid $mainColor;
        background-color: #131210;
        margin: 0 40px;
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        padding: 0 40px;
        border-bottom: 1px solid #040301;
        .copy{
          color: $mainColor;
          font-size: 32px;
          width: max-content;
          height: 80px;
          background-color: transparent;
        }
      }
      >.show_link{
        display: flex;
        font-size: 26px;
        padding: 10px 40px;
        line-height: 48px;
        color: #fff;
        background-color: #131210;
        margin: 0 40px;
        word-break: break-all;
      }
    }
    ul.list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 50%;
        margin: 84px 0 0;
        height: 40px;
        color: #fff;
        font-size: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 64px;
        &:nth-child(2n+1){
          border-right: 2px solid #1E1D1B;
        }
        img{
          width: 32px;
          height: 32px;
          margin-right: 16px;
        }
      }
    }
  }
</style>
