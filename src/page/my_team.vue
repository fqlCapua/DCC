<template>
<div class="my_team">
  <div class="team_body">
  <div class="head">
    <div class="back iconfont icon-fanhuijiantou" @click="back"></div>
    <div class="tab_list">
      <div class="tab" v-for="(item,index) in tab" @click="toggle (index)" :class="{ active_tab : active === index}" :key="index">{{item.title}}</div>
    </div>
  </div>
  </div>

  <div class="content"></div>


</div>

</template>

<script>
export default {
  name: 'myTeam',
  data () {
    return {
      activeRouter: '',
      active: 0,
      tab: [
        {
          title: '我的團隊',
        },
        {
          title: '我的分享',
        }
      ]
    }
  },
  mounted () {

  },
  destroyed () {

  },
  methods:{
    toggle(index){
      this.active =index;
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
 .my_team{
  .team_body {
    padding-top:100px;
  .head {
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
  .tab_list {
    height:60px;
    width: 324px;
    margin: 0 auto;
    margin-top: 20px;
    border:1px solid #fff;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
  .tab{
    width: 50%;
    height: 100%;
    line-height: 58px;
    font-size:28px;
    text-align: center;
    color:#d7a82b;
  &.active_tab{
     background: #fff;
   }
  }
  }
  }
  }
 }
</style>
