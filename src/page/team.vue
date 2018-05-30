<template>

 <div class="head">
     <div class="back iconfont icon-fanhuijiantou" @click="back"></div>
     <div class="codeTab">
      <span class="option" @click="toggleTabs(0)" :class="{option_active:1!=selectTab}">我的团队</span>
      <span class="option" @click="toggleTabs(1)" :class="{option_active:0!=selectTab}">我的分享</span>
     </div>
 </div>
    <!-- <div class="team_body">

   
   
  <div class="tab_list">
    	<div class="tab" v-for="(item,index) in tab" @click="toggle (index)" :class="{ active_tab : active === index}" :key="index">{{item.title}}</div>
    </div>

 
       <router-view></router-view>

  </div> -->
</template>

<script>
export default {
  name: 'team',
  data () {
    return {
      selectTab: 0,
      selectTabIng: false,
      activeRouter: '',
      active:0,
      tab: [
        {
          title:'我的團隊',
          router:'team/myTeam'
        },
        {
          title: '我的分享',
          router:'team/myShare'
        }
      ]
    }
  },
  beforeMount () {
 
  },
  mounted () {

  },
  methods: {
    getRoute(){

  },
   toggleTabs:function(id){
        this.selectTab=id;
       // console.log(this.selectTab);
     if (this.selectTabIng || this.selectTab === id) return false
        this.selectTabIng = true;
        this.selectTab = id;
     
        // setTimeout(() => {
        //   this.selectTabIng = false
        // }, 500)
    },
   toggle(index){
        console.log(index);
       // this.active =index;
       // console.log(this.active);
       // this.$router.push({path:this.tab[index].router});
       // console.log(this.tab[index].router)
    }, 
   back(){
    	 this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
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
  .codeTab{
     font-family:"微软雅黑";
    border:1px solid #CFA12A;
    border-radius:6px;
    width:60%;
    margin:0 auto;
     .option{
        display:inline-block;
        line-height:60px;
        font-size:30px;
        color:#AD8621;
        height:60px;
        line-hight:60px; 
        width:49.1%;
        text-align:center;
     }
     .option_active{
       background-color:$mainColor;
       color:#000;
     }
     .option_normal{
       background-color:none;
       color:#AD8621;
     }
    }
</style>
