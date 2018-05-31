<template>
  <div class="my-tabs">
    <i class="back iconfont icon-fanhuijiantou" @click="goBackPage"></i>
    <div class="tabs-bar">
      <div class="tabs-bar-nav cleafix">
        <div class="tabs-tab" v-for="tab in tabList"
             :class="[tabIndex == tab.index ? 'tabs-active' : '']"
             @click=" changeTab(tab)" >
          {{tab.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MyTabs',
    props:
      {
        tabList: Array,
        tabIndex: Number
      },
    data () {
      return {
      }
    },
    methods: {
      changeTab: function (tab) {
        this.$emit('changeTab', tab)
      },
      // 返回上一级
      goBackPage () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .my-tabs {
    height: 100px;
    position: relative;
    width: 100%;
  .back{
    position: absolute;
    top:50%;
    color: #fff;
    font-size:45px;
    left:35px;
    transform: translate(0,-50%);
  }
  .tabs-bar {
    border:1px solid #fff;
    width:322px;
    height:60px;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border-radius:10px;
  .tabs-bar-nav {
    color: #d7a82b;
    height: 100%;
  .tabs-tab {
    text-align: center;
    line-height:60px;
    width:50%;
    float: left;
  }
  }
  }
  }
  .tabs-active {
    background: #fff;
    border-radius: 5px 0 0 5px;
    color:#d7a82b;
    height: 100%;
  }
  .cleafix:after{
    content: '';
    display: block;
    clear: both;
  }
</style>
