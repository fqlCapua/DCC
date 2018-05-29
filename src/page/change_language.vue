<template>
  <div class="change_language">
    <div class="head">
      <span class="back iconfont icon-fanhuijiantou"></span>
      <h2 class="title">切換語言</h2>
      <span class="select" @click="finish">完成</span>
    </div>
    <ul class="select_lang">
      <li @click="activeNum = 1">
        <span>中文繁體</span>
        <i class="iconfont icon-xuanze" v-if="activeNum === 1"></i>
      </li>
      <li @click="activeNum = 2">
        <span>English</span>
        <i class="iconfont icon-xuanze" v-if="activeNum === 2"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'changeLanguage',
  data () {
    return {
      activeNum: 1
    }
  },
  methods: {
    finish () {
      if (this.activeNum === 2) {
        this.$bus.$emit('alert', {
          title: '测试中',
          msg: '正在测试中，敬请期待。',
          btn: '知道了'
        })
      } else {
        this.$bus.$emit('alert', {
          msg: '切换成功',
          cb: () => {
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .change_language {
    min-height: 100vh;
    background: $bgColor;
    padding-top: 90px;
    background-color: #040301;
    .head {
      @include headBlack;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .back{
        z-index: -1;
        opacity: 0;
      }
      .select{
        margin-right: 30px;
        font-size: 28px;
      }
    }
    .select_lang{
      margin-top: 20px;
      background-color: #3F3C3C;
      padding: 0 30px;
      li{
        height: 90px;
        line-height: 90px;
        font-size: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        &:nth-child(1){
          border-bottom: 1px solid #e6e6e6;
        }
        i.iconfont{
          font-size: 42px;
          color: $mainColor;
          font-weight: 600;
        }
      }
    }
  }
</style>
