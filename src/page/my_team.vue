<template>
  <ul class="myTeam">
	    <li class="msg_list" @click="toDetails(2)">
	    	  <div class="msg_list_title">
	    	  	 <p>重要！系統升級提示，平台于明日凌晨進行系統維 護，給大家帶來的不便敬請見諒</p>
	    	  	 <div class="time">2018-04-14 15:23</div>
	    	  </div>
	    	  <div class="iconfont" :class="icon"></div>
	    </li>
  </ul>
</template>

<script>
export default {
  name: 'myTeam',
  data () {
    return {
    	icon:"icon-jinrujiantou",
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '公告')
   let $that=this;
      if(!this.getCookie('token') || this.getCookie('token') === "null" ){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          $that.$router.push('/login')
        },2000)
      }
    if(!localStorage.getItem('token') || localStorage.getItem('token') === "null" ){
      this.$bus.$emit('alertCer', {
        msg:"請重新登錄"
      });
      setTimeout(function () {
        $that.$router.push('/login')
      },2000)
    }
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    //	this.$router.push('login')
    toDetails (id){
    	 this.$router.push({path: 'messageDetail', query: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .myTeam {
      padding-top:100px;
    .msg_list{
         height:186px;
         padding:0 26px;
         box-sizing: border-box;
         border-bottom:1px solid #757575;
         background:#3f3c3c;
        @include clearFloat;
         .msg_list_title{
         	  float: left;
         	  height: 100%;
         	  width: 84.44%;
         	  padding-top: 24px;
         	  p{
         	  	color:#fff;
         	  	font-size: 28px;
         	  	overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							line-height: 48px;
         	  }
         	  .time{
         	  	 color:#a59569;
         	  	 margin-top: 10px;
         	  	 font-size: 24px;
         	  }
         }
			  .iconfont{
			    font-size: 50px;
			    /*font-weight: 500;*/
			   float:right;
			   line-height: 184px;
			   color:#fff;
			  }
    }
  }
</style>
