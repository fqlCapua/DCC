<template>
  <div class="index_wrap">
    <header>
      <div class="logo">
        <img :src="logo" alt="">
        <span>DCC</span>
      </div>
      <router-link tag="span" to="noticeList" class="header_right" :class="{'has_msg': hasMessage}">
        <i class="iconfont icon-gonggao " ></i>
      </router-link>
    </header>
    <!--<div class="circle"></div>-->
    <div class="bearing">
    	<div>
          <div class="total-title">總市值(CNY)</div>
    		<div class="total-value" id="box">{{totalAmount}}</div>
      
    	</div>

    </div>
  <div class="bearing2">
    <div class="clear">
      <div class="total-title">凍結額度</div>
      <div class="total-value" id="box1">{{totalFrost}}</div>&nbsp;(CNY)
    </div>
  </div>
   <!-- 公告 -->
    <router-link tag="div" :to="{path: 'waitOpen', query: { title: '系統公告' }}" class="notice">
      <swiper :options="swiperNoticeCoing.swiperOption" ref="mySwiper" class="swiper_notice">
        <!-- slides -->
        <swiperSlide v-for="item in swiperNoticeCoing.swiperNotice" :key="item.id">
          <p class="notice-detial">{{ item.text }}</p>
        </swiperSlide>
      </swiper>
    </router-link>
    <!--<img :src="circle" alt="" class="circle">-->
    <!--<div class="btns">
      <button class="in" @click="seeDetails">買入</button>
      <button class="out" @click="seeDetails">賣出</button>
    </div>-->
    <ul class="list_wrap">
      <li class="item" v-for="(item, index) in list" :key="index">
        <i class="iconfont" :class="item.icon"></i>
        <div class="right"> 
          <span class="name">{{item.name}}</span>  
          <span class="num" :class="item.num.length>13 ? isTrue:''">{{item.num}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
import indexDetails from '../page/index_details'
import CountUp from 'CountUp'
export default {
  name: 'index',
  data () {
    return {
       // 轮播图配置
      swiperBannerCoing: {
        swiperOption: {
          notNextTick: true,
          autoplay: {
            delay: 3000
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        // 轮播图信息
        swiperImg: [
          require('../assets/images/banner_1.png'),
          require('../assets/images/banner_1.png'),
          require('../assets/images/banner_1.png')
        ]
      },
      swiperNoticeCoing: {
        swiperOption: {
          autoplay: {
            delay: 1500
          },
          direction: 'vertical',
          loop: true,
          allowTouchMove: false
        },
        swiperNotice: [
          {
            text: '關於商家聯盟入會條件最新活動通知及注意事項關於商家聯盟入會條件最新活動通知及注意事項',
            id: 1
          },
          {
            text: '關於商家聯盟入會',
            id: 2
          },
          {
            text: '關於商家聯盟入會條件最新活動',
            id: 3
          }
        ]
      },
      logo: require('../assets/images/logo.png'),
      circle: require('../assets/images/bearing.png'),
      hasMessage: '',
      totalAmount: '', // 總市值
      totalFrost: '', // 凍結額度(CNY)
      token:'',
      isTrue:'aaa',
      list: [
        {
          icon: 'icon-jiangli',
          name: '今日新增獎勵 (USDT)',
          num: '--'
        },
        {
          icon: 'icon-jiedong',
          name: '今日解凍DCC',
          num: '--'
        },
        {
          icon: 'icon-tixianedu0101',
          name: '可用DCC',
          num: '--'
        },
        {
          icon: 'icon-kedanjia',
          name: 'DCC單價 (CNY)',
          num: '0.00'
        },
        {
          icon: 'icon-USDT',
          name: '可用USDT',
          num: '0.00'
        },
        {
          icon: 'icon-kedanjia',
          name: 'USDT單價 (CNY)',
          num: '0.00'
        },
        {
          icon: 'icon-zuigao',
          name: '最高價 (CNY)',
          num: '1.0'
        },
        {
          icon: 'icon-zuidi',
          name: '最低價 (CNY)',
          num: '0.7'
        }
      ]
    }
  },
  beforeMount () {
    this.getInfo();
  },
  mounted () {
    let $that =this;
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    });
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
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
    this.ures()
  },
  beforeDestroy () {
    this.$bus.$emit('footer', false)
  },
  methods: {
    seeDetails () {
//    this.$bus.$emit('alert', {
//      title: '测试中',
//      msg: '正在测试中，敬请期待。',
//      btn: '知道了'
//    })
      //公告
      this.$router.push('message')

    },
    ures(){
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token=localStorage.getItem('token')
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
      }
      this.axios.post('/userHomePage',{
        token:this.token
      }).then(({data}) => {
        this.hasMessage =data.data.new_msg
      })
    },

    getInfo () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token=localStorage.getItem('token')
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
      }
      this.axios.post('/home',{
      	token:this.token
      }).then(({data}) => {
          this.totalAmount = this.formatNum(data.data.total) //總市值
          this.totalFrost = this.formatNum(data.data.freeze_dcc,2) // 冻结额度
          this.list = this.list.map((item, index) => {
          if (index === 1){
            item.num = this.formatNum(data.data.freeze_dcc, 4)
          }
          if (index === 0) item.num = this.formatNum(data.data.today_profit,4)
          if (index === 2) item.num = this.formatNum(data.data.avaliable_dcc,4)
          if (index === 3) item.num = data.data.today_dcc_price
          if (index === 4) item.num = this.formatNum(data.data.total_usdt,4)
          if (index === 5) item.num = data.data.price_usdt
          if (index === 6) item.num = data.data.max_dcc_price
          if (index === 7) item.num = data.data.min_dcc_price

          return item

        })
      })
    },

    // 数字格式化
    formatNum (s, n) {
    /*
     * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + '';
      let l = s.split('.')[0].split('').reverse();
      let r = s.split('.')[1];
      let t = '';
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      return t.split('').reverse().join('') + '.' + r
    },

  },
   components: {
    swiper,
    swiperSlide,
    indexDetails
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
    /*padding: 150px 0 90px;*/
    height: 100vh;
    overflow: auto;
    background-image: url(../assets/images/banner.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position-y: -120px;
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
      /*background-color: #040301;*/
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

    .bearing{
      width:100%;
      height:300px;
      max-height: 75vh;
      max-width: 75vh;
      /*background-image: url(../assets/images/banner.png);*/
      /*background-size: 50%;
      background-repeat: no-repeat;
      background-position: 50%;*/
      display: flex;
      justify-content:space-around;
      padding-top:160px;
      .total-value{
        text-align: center;
        font-size:60px;
        color:#fff;
        margin-bottom: 20px;
        font-weight: 600;
        font-style: italic;
      }
      .total-title{
        text-align: center;
        font-size:38px;
        color:#fff;
      }
    }
    .bearing2{
       width:90%;
        padding-bottom: 150px;
      margin: 0 auto;
      border-radius: 40px 40px;
      height: 80px;
      line-height: 80px;
      padding-left: 30px;
      padding-right: 30px;
      overflow: hidden;
      text-align: center;
       .clear{

         width: 100%;
         color: #fff;
         div{
          display: inline-block;
         }
         div:nth-child(1){
           
         }
         div:nth-child(2){
         
           font-size: 30px;
           font-style: italic;
           font-weight: 600;
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
      margin: 13px 30px;
      border-radius: 16px;
      background-color: #16191E;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 50%;
        border-bottom: 1px solid #424652;
        display: flex;
        align-items: center;
        padding:50px 0 40px 25px;
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
          .aaa{
            font-size:26px;
          }
        }
      }
    }
  }
      .swiper-pagination {
        position: absolute;
        bottom: 70px;
        left: 50%;
        margin-left: -48px;
        .swiper-pagination-bullet {
          background: #fff;
          opacity: 1;
          width: 12px;
          height: 12px;
          margin: 0 5px;
          border-radius: 6px;
          transition: .4s all;
        }
        .swiper-pagination-bullet-active {
          background: #fff;
          width: 27px;
        }
      }
      .notice {
      overflow:hidden;
      width:92%;
      margin: 0 auto;
     /*box-shadow: 0 2px 30px 0 rgba(71, 147, 241, 0.4);*/
      border-radius: 5px;
      z-index: 6;
      background: #20232C;
      opacity:0.9;
      background-image: url(../assets/images/scroll_icon.png);
      background-repeat: no-repeat;
      background-size:43px 43px;
      background-position:20px 26px;
      padding-left: 90px;
      .swiper_notice {
       
        width: 100%;
        height: 88px;
        .notice-detial {
          width: 100%;
          line-height: 88px;
          font-size: 24px;
          color: $mainColor;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          
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
