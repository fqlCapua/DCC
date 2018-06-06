<template>
	 <div class="myShare">
	 	  <div class="content">
		 	    <div  class="title">系統將於今晚十二點進行維護更新</div>
		 	    <div class="time">2018-04-14 17:58</div>
		 	    <p>
		 	    	系統將於今晚十二點進行維護更新，預計更新時間7個小時更新完畢。給大家帶來的不便，望大家體諒。
		 	    </p>
		 	    <p>
		               系統將於今晚十二點進行維護更新，預計更新時間7個小時更新完畢。系統將於今晚十二點進行維護更新，預計更新時間7個小時更新完畢。系統將於今晚十二點進行維護更新，預計更新時間7個小時更新完畢。
		 	    </p>
		 	    <p>
		 	    	系統將於今晚十二點進行維護更新，預計更新時間7個小時更新完畢。預計更新時間7個小時更新完畢。
		 	    </p>
	 	  </div>
	 </div>
</template>

<script>
export default {
  name: 'myShare',
  data () {
    return {
    	icon:"icon-jinrujiantou",
    	detailId:""
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '公告詳情')
      let $that = this;
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
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
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
     //
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .myShare {
      padding-top:130px;
      .content{
      	background:#3f3c3c;
      	padding:40px 28px 60px 28px;
      	box-sizing:border-box;
      	color:#fff;
      	.title{
      		font-size:33px;
      		color:#fff;
      		line-height: 48px;
      	}
      	.time{
      		font-size: 24px;
      		color:#a59569;
      		line-height: 50px;
      	}
      	 p{
      		font-size:28px;
      		line-height: 42px;
      		letter-spacing:2px;
      		margin-top: 24px;
      		text-indent:1em;
      	}
      }


  }
</style>
