<template>
  <div class="footer_wrap" v-if="isShow">
    <!-- 底部导航 -->
    <div v-if="navShow" class="footer_tab">
      <div class="tab_list animated" v-for="(item,index) in nav" @click="toggle(index)" :class="{ 'active_nav' : item.router === activeRouter}" :key="index">
        <span v-if="index == 2" class="iconfont award" :class="item.baseClass"></span>
        <span v-else class="iconfont" :class="item.baseClass"></span>
        <span class="nav_title">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'footerBox',
  data () {
    return {
      type: null,
      isShow: false,
      navShow: false,
      activeRouter: '',
      button: [
        {
          inner: '',
          class: '',
          isShow: true,
          state: true,
          callback: () => {}
        }
      ],
      nav: [
        {
          baseClass: 'dcc',
          title: 'DCC',
          router: 'index'
        },
        {
          baseClass: 'icon-baodan',
          title: '報單',
          router: 'declarationFrom'
        },
//      {
//        baseClass: 'icon-jiaoyidating-xuanzhong',
//        title: 'C2C交易',
//        router: 'c2cTradeDcc'
//      },
        {
          baseClass: 'icon-jianglijin',
          title: '獎勵',
          router: 'market'
        },
        {
          baseClass: 'icon-accountbox',
          title: '我的',
          router: 'userCenter'
        }
      ]
    }
  },
  beforeMount () {
    this.getEvent()
    this.getRoute()
  },
  watch: {
    $route (to, from) {
      if (to.name === 'index1') {
        this.activeRouter = 'index'
        this.$router.push('/')
      } else {
        this.activeRouter = to.name
      }
    }
  },
  methods: {
    // 监听事件函数
    getEvent () {
      this.$bus.$on('footer', (data) => {
        if (!data) {
          this.isShow = false
        } else {
          this.isShow = true
          this.navShow = data.navShow
          this.button = data.button
          this.type = data.type
          this.price = data.price
        }
      })
    },
    getRoute () {
      this.activeRouter = (this.$route.name === 'index1' ? 'index' : this.$route.name)
    },
    toggle (index) {
      this.$router.push({path: this.nav[index].router})
    }
  }
}
</script>
<style lang="scss">
.footer_wrap{
  position: fixed;
  bottom: 0;
  width: 100%;
  // 底部导航
  .footer_tab{
    background-color:#3F3C3C;
    height:100px;
    display: flex;
    text-align:center;
    .tab_list{
      height:100px;
      flex-grow: 1;
      color:#666;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation-duration: .7s;
      color: #806419;
      .nav_title{
        font-size:26px;
      }
      .iconfont{
        font-size: 44px;
        line-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #806419;
      }
      .award{
        font-size: 55px;
      }
      .dcc{
        height: 44px;
        width: 44px;
        background: url(../assets/images/footer_1.png) no-repeat center center;
        background-size: 96%;
      }
      &.active_nav{
        color: #D7A82B;
        .dcc{
          height: 44px;
          width: 44px;
          background: url(../assets/images/footer_1_active.png) no-repeat center center;
          background-size: 96%;
        }
        .iconfont{
          color: #D7A82B;
        }
      }
    }
  }
}
</style>
