<template>
  <div class="page_head" :class="headData.titleClass" v-show="headShow">
    <div class="back iconfont icon-fanhuijiantou" v-show="headData.leftShow" @click="headData.leftBack"></div>
    <h2 class="title">{{ headData.title }}</h2>
    <p class="more" @click="headData.rightBack">{{ headData.rightText }}</p>
  </div>
</template>

<script>
export default {
  // 頭部標籤
  name: 'pageHead',
  data () {
    return {
      // 是否显示头部
      headShow: false,
      headData: {
        // 标题
        title: '',
        // 头部class
        titleClass: '',
        // 左侧是否显示
        leftShow: true,
        // 左侧事件
        leftBack: () => {},
        // 右侧是否显示
        rightShow: false,
        // 右侧文字
        rightText: '',
        // 右侧事件
        rightBack: () => {}
      }
    }
  },
  created () {
    // 监听头部变化
    this.$bus.$on('pageHead', this.onHeadChange)
  },
  methods: {
    // 监听头部显示更改
    onHeadChange (data = '') {
      if (!data) return (this.headShow = false)
      this.headShow = true
      if (typeof data === 'string') data = {title: data}
      data.leftShow === false ? data.leftShow = false : data.leftShow = true
      this.headData = {
        title: data.title || '',
        titleClass: data.titleClass || '',
        leftShow: data.leftShow,
        leftBack: data.leftBack || this.goBackPage,
        rightShow: data.rightShow || false,
        rightText: data.rightText || '',
        rightBack: data.rightBack || function () {}
      }
    },
    // 返回上一级
    goBackPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .page_head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: #000;
    color: #fff;
    text-align: center;
    z-index: 10;
    border-bottom:1px solid #D7A82B;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 14%;
      height: 100px;
      line-height: 100px;
      font-size: 40px;
    }
    .title {
      font-size: 34px;
      font-weight: 400;
      line-height: 100px;
    }
    .more {
      position: absolute;
      right: 0;
      top: 0;
      height: 100px;
      line-height: 100px;
      padding: 0 3%;
      font-size: 30px;
    }
  }
</style>
