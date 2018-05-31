<template>
  <div class="index_details" v-if="content.show === true">
    <div class="show_box">
      <p class="iconfont icon-guanbijiantou" @click="close"></p>
      <img class="shop_pic" :src="content.logo" />
      <p class="name pad_l">{{ content.name }}</p>
      <p class="price pad_l">售價：{{ content.amount }}</p>
      <p class="small pad_l">分享獎勵：{{content.comment}}</p>
      <!--<p class="small pad_l">靜態收益：{{ content.forzen }}</p>-->
      <!--<p class="small pad_l">庫存：{{ content.number }}</p>-->
      <button class="pay" @click="pay">立即購買</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexDetails',
  data () {
    return {}
  },
  methods: {
    close () {
      this.$bus.$emit('closeIndexDetails')
    },
    pay () {
      this.close()
//    if (this.content.id !== 1) return this.$bus.$emit('alert', '暫無法報單該套餐')
      this.$router.push({path: 'submitOrder', query: { money: this.content.price }})
    }
  },
  props: {
    content: {
      show: false,
      amount: '',
      pic: '',
      price: '',
      everyHourMin: '',
      allTime: '',
      number: '',
      id: '',
      forzen: '',
      comment:''
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .index_details {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    background: rgba(0, 0, 0, 0.4);
    .show_box {
      position: absolute;
      left: 75px;
      top: 10vh;
      background: #fff;
      width: 600px;
      height: 930px;
      border-radius: 10px;
      overflow: hidden;
      z-index: 10;
      .icon-guanbijiantou {
        position: absolute;
        top: 20px;
        right: 20px;
        color: #666;
        font-size: 40px;
      }
      .shop_pic {
        width: 600px;
        height: 570px;
        display: block;
      }
      .pad_l {
        padding-left: 30px;
      }
      .name {
        padding-top: 20px;
        font-size: 28px;
        color: #282828;
        line-height: 40px;
      }
      .price {
        line-height: 60px;
        font-size: 28px;
        color: #ff4c18;
      }
      .small {
        color: #666;
        line-height: 40px;
      }
      .pay {
        width: 240px;
        height: 64px;
        border-radius: 32px;
        font-size: 28px;
        color: #111111;
        display: block;
        margin: 50px auto 0;
        background: $mainColor;
      }
    }
  }
</style>
