<template>
  <div class="market">
    <!-- 頭部 -->
    <div class="head">
      <h2 class="title">行情</h2>
    </div>
    <div class="section" v-for="(item, index) in info" :key="index">
      <span class="name">{{ index }}</span>
      <span class="num">{{item.value || '0.00'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'market',
  data () {
    return {
      info: {
        交易總額: {
          value: ''
        },
        當前價格: {
          value: ''
        },
        今日最高: {
          value: ''
        },
        今日最低: {
          value: ''
        },
        今日求購: {
          value: ''
        },
        今日出售: {
          value: ''
        }
      }
    }
  },
  mounted () {
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.axios.get('/Quotation/pick_info').then(({data}) => {
        data.data.map((item, index) => {
          this.info[['交易總額', '當前價格', '今日最高', '今日最低', '今日求購', '今日出售'][index]].value = item.value
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .market {
    padding-top: 100px;
    .head {
      @include headBlack;
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
  }
</style>
