<template>
  <div class="market">
    <div class="top">
      <h3 class="all_money">{{ allMoney }}<span class="small">USDT</span></h3>
      <p class="info">獎勵總金額</p>
    </div>
    <div class="select">
      <router-link tag="div" class="route_box" v-for="(item, index) in list" :key="index" :to="item.route" >
        <img class="icon" :src="item.pic" :alt="item.name">
        <p class="title">{{ item.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import CountUp from 'CountUp'
export default {
  name: 'market',
  data () {
    return {
      allMoney: '0.0000',
      token:'',
      list: [
        {
          pic: require('../assets//images/reward_list1.png'),
          name: '分享獎',
          route: 'shareReward'
        },
        {
          pic: require('../assets//images/reward_list2.png'),
          name: '團隊獎',
          route: 'teamReward'
        },
        {
          pic: require('../assets//images/reward_list3.png'),
          name: '考核獎',
          route: 'assertReward'
        },
        {
          pic: require('../assets//images/reward_list4.png'),
          name: '特別獎',
          route: 'specialReward'
        }
      ]
    }
  },
  mounted () {

    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
    this.init()
         let $that=this;
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
  beforeDestroy () {
    this.$bus.$emit('footer')
  },
  methods: {
    init () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token=localStorage.getItem('token')
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
      }
      this.axios.post('rewardIndex',{
      	token:this.token
      }).then(({data}) => {
        this.allMoney = this.formatNum(data.data.total,4)
      })
    },
    // 数字格式化
    formatNum (s, n) {
      /*
       * 参数说明：
       * s：要格式化的数字
       * n：保留几位小数
       * */
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
      let l = s.split('.')[0].split('').reverse()
      let r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      return t.split('').reverse().join('') + '.' + r
    },
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .market {
    .top {
      background-image: url(../assets/images/market_top_bg.png);
      background-size: 100% 100%;
      width: 100vw;
      height: 390px;
      text-align: center;
      .all_money {
        padding-top: 150px;
        font-size: 62px;
        font-style: italic;
        .small {
          font-size: 24px;
        }
      }
      .info {
        font-size: 28px;
        font-weight: 700;
      }
    }
    .select {
      padding: 65px 30px 100px;
      overflow: hidden;
      .route_box {
        float: left;
        width: 300px;
        background: #1b1e24;
        margin: 0 22px 44px;
        border-radius: 20px;
        text-align: center;
        padding-top: 75px;
        .icon {
          height: 80px;
        }
        .title {
          color: #fff;
          line-height: 88px;
          font-size: 30px;
          padding-bottom: 20px;
        }
      }
    }
  }
</style>
