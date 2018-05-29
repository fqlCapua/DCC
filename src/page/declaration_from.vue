<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="swiper_box">
      <swiper :options="swiperBannerCoing.swiperOption" ref="mySwiper" class="swiper_banner">
        <!-- slides -->
        <swiperSlide v-for="item in swiperBannerCoing.swiperImg" :key="item.id">
          <img class="swiper-slid_img" :src="item" alt="轮播" />
        </swiperSlide>
      </swiper>
      <!-- Optional controls -->
      <div class="swiper-pagination"></div>
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
    <!-- 操作列表 -->
    <div class="nav">
      <router-link class="nav_list" tag="div" :to="{path: 'waitOpen', query: { title: '商家聯盟' }}">
        <img class="icon" src="../assets/images/index_icon1.png" alt="">
        商家聯盟
      </router-link>
      <router-link class="nav_list" tag="div" :to="{path: 'waitOpen', query: { title: '生活繳費' }}">
        <img class="icon" src="../assets/images/index_icon2.png" alt="">
        生活繳費
      </router-link>
      <router-link class="nav_list" tag="div" :to="{path: 'waitOpen', query: { title: '生活繳費' }}">
        <img class="icon" src="../assets/images/index_icon3.png" alt="">
        話費充值
      </router-link>
      <router-link class="nav_list" tag="div" :to="{path: 'waitOpen', query: { title: '景區門票' }}">
        <img class="icon" src="../assets/images/index_icon4.png" alt="">
        景區門票
      </router-link>
    </div>
    <!-- 礦區專區 -->
    <div class="shop">
      <h4 class="title">
        <span class="left_point point"><i></i><i></i><i></i></span>
        合夥人套餐
        <span class="right_point point"><i></i><i></i><i></i></span>
      </h4>
      <dl class="mac" v-for="(item, index) in macInner" :key="item.id">
        <dt class="pic">
          <img class="photo" :src="item.pic" alt="">
        </dt>
        <dd class="info">
          <h3 class="name">{{ item.name }}</h3>
          <!--<p class="number">庫存：{{ item.number }}</p>-->
          <p class="price">售價：{{ item.price }} USDT</p>
          <button class="details" @click="showInfo(item.id, index)">詳情</button>
        </dd>
      </dl>
    </div>
    <indexDetails :content="indexDetails"></indexDetails>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import indexDetails from '../page/index_details'
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
            text: '關於商家聯盟入會條件最新活',
            id: 3
          }
        ]
      },
      // 礦區內容
      macInner: {
        one: {
          name: '决策合夥人',
          // 庫存
          number: 999,
          // 價格
          price: '20,000.0000',
          // 圖片
          pic: require('../assets/images/mills_pic0.png'),
          // 總時長
          forzen: '',
          // 分享獎勵
          direct: '', // 直接獎勵
          indirect: '', // 間接獎勵
          id: 1
        },
        two: {
          name: '核心合夥人',
          number: 999,
          price: '6,000.0000',
          pic: require('../assets/images/mills_pic1.png'),
          forzen: '',
          // 分享獎勵
          direct: '', // 直接獎勵
          indirect: '', // 間接獎勵
          id: 2
        },
        three: {
          name: '一般合夥人',
          number: 999,
          price: '1,000.0000',
          pic: require('../assets/images/mills_pic2.png'),
          forzen: '',
          // 分享獎勵
          direct: '', // 直接獎勵
          indirect: '', // 間接獎勵
          id: 3
        }
      },
      indexDetails: {
        show: false,
        name: '',
        pic: '',
        price: '',
        everyHourMin: '',
        allTime: '',
        number: '',
        id: 1
      }
    }
  },
  beforeMount () {
    this.declFromPage()
  },
  mounted () {
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
    // 監聽關閉事件
    this.$bus.$on('closeIndexDetails', this.closeDetails)
  },
  destroyed () {
    this.$bus.$off('closeIndexDetails')
    this.$bus.$emit('footer')
  },
  methods: {
    // 跳轉詳情頁
    showInfo (id, index) {
      this.indexDetails = this.macInner[index]
      this.indexDetails.show = true
    },
    // 關閉詳情事件
    closeDetails () {
      this.indexDetails = {
        show: false,
        name: '',
        pic: '',
        price: '',
        everyHourMin: '',
        allTime: '',
        number: '',
        id: 1
      }
    },
    declFromPage () {
      this.axios.post('quotation/decl_from_page').then(({data}) => {
        for (var item in this.macInner) {
          this.macInner[item].direct = data.data.direct
          this.macInner[item].indirect = data.data.indirect
          this.macInner[item].forzen = data.data.forzen
        }
      })
    }
  },
  components: {
    swiper,
    swiperSlide,
    indexDetails
  }
}
</script>

<style lang="scss">
  @import url(../assets/scss/swiper-3.4.0.min.css);
  @import '../assets/scss/style.scss';
  .index {
    background: $bgColor;
    min-height: 100vh;
    overflow: hidden;
    padding-bottom: 100px;
    .swiper_box {
      position: relative;
      overflow: hidden;
      .swiper_banner {
        width: 750px;
        height: 410px;
        .swiper-slid_img {
          display: block;
          width: 750px;
          height: 410px;
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
    }
    .notice {
      width: 600px;
      margin: 0 auto;
      position: relative;
      top: -44px;
      height: 88px;
      box-shadow: 0 2px 30px 0 rgba(71, 147, 241, 0.4);
      border-radius: 5px;
      z-index: 6;
      background: #3f3c3c;
      background-image: url(../assets/images/index_out.png);
      background-repeat: no-repeat;
      background-size: 50px 60px;
      background-position: 20px 14px;
      padding-left: 90px;
      .swiper_notice {
        width: 100%;
        height: 88px;
        .notice-detial {
          line-height: 88px;
          font-size: 24px;
          color: $mainColor;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
    .nav {
      display: flex;
      justify-content: space-around;
      height: 160px;
      width: 690px;
      margin: 0 auto;
      border-bottom: 1px solid $grayColor;
      .nav_list {
        text-align: center;
        color: $mainColor;
        font-size: 22px;
        .icon {
          display: block;
          margin: 0 auto;
          width: 64px;
          height: 72px;
          margin-bottom: 20px;
        }
      }
    }
    .shop {
      width: 690px;
      margin: 0 auto;
      .title {
        font-size: 32px;
        font-weight: normal;
        text-align: center;
        line-height: 115px;
        color: #fff;
        .point {
          display: inline-block;
          vertical-align: middle;
          i {
            background: $grayColor;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
            margin: -6px 10px 0;
          }
          &.left_point i:nth-child(1), &.right_point i:nth-child(3) {
            width: 8px;
            height: 8px;
          }
          &.left_point i:nth-child(2), &.right_point i:nth-child(2) {
            width: 12px;
            height: 12px;
          }
          &.left_point i:nth-child(3), &.right_point i:nth-child(1) {
            width: 16px;
            height: 16px;
          }
        }
      }
      .mac {
        margin-bottom: 30px;
        width: 100%;
        height: 220px;
        overflow: hidden;
        background: #3f3c3c;
        box-shadow: 0 0 20px 2px rgba(71, 147, 241, 0.4);
        border-radius: 10px;
        .pic {
          float: left;
          width: 220px;
          height: 220px;
          .photo {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .info {
          float: left;
          padding: 20px;
          position: relative;
          width: 470px;
          box-sizing: border-box;
          height: 220px;
          .name {
            color: #fff;
            font-size: 32px;
            font-weight: normal;
            line-height: 60px;
          }
          .number {
            color: #b8b8b8;
            font-size: 24px;
            padding-bottom: 40px;
          }
          .price {
            color: #ff4c18;
            font-size: 28px;
          }
          .details {
            position: absolute;
            bottom: 25px;
            right: 30px;
            width: 120px;
            height: 58px;
            background: #d7a82b;
            color: #040301;
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>
