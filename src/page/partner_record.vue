<template>
  <ul class="partnerRecord">
      <li class="list" :for="index" v-for="(item, index) in list" :key="index">
      	 <img  :src="isHttp+'//'+item.logo"/>
      	 
      	 <div class="rank">
      	 	   <div class="rank_title">
      	 	   	  <span>{{item.trans_type_name}}</span>
      	 	   	  <span class="audit">{{item.status}}</span>
      	 	   	  <!--<span :class="{'audit': item.status === 2 }" v-if="item.status === 2">審核中</span>
      	 	   	  <span :class="{'reject': item.status === 3 }" v-if="item.status === 3">已駁回</span>-->
      	 	   </div>
      	 	   <div class="rank_sum">售賣: {{item.trans_amount}}  USDT</div>
      	 </div>
      	 <div class="_time">{{item.created}}</div>
      </li>
      <li v-show="!list.length" style="line-height: 50px;color: #fff;text-align: center;font-size: 16px;">暂无记录</li>
  </ul>
</template>

<script>
export default {
  name: 'partnerRecord',
  data () {
    return {
    	isShow:false,
    	token:"",
    	isHttp:document.location.protocol,
       imgList:{
       	  high: require('../assets/images/mills_pic0.png'),
       	  middle:require('../assets/images/mills_pic1.png'),
       	  low:require('../assets/images/mills_pic2.png')
       },
       list:[]

    }
  },
  mounted () {
    let $that =this;
    this.$bus.$emit('pageHead', '合夥人記錄')
    this.init();
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
    init () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token=localStorage.getItem('token')
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
      }
      this.axios.post('coparntnerBuyList',{
      	 token:this.token
      }).then(({data}) => {
         if(data.data.length == 0){
         	 this.isShow = true
         }
         this.list = data.data
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .partnerRecord {
  	padding-top:100px;
    .head {
      @include headBlack;
    }
    .list{
    	height:178px;
    	background:#3f3c3c;
    	margin-bottom:15px;
    	padding: 40px  20px 46px 20px;
    	box-sizing:border-box;
    	display: flex;
    	justify-content: space-between;
    	.rank{
    		width:50%;
    		display: flex;
    		flex-direction: column;
        justify-content: space-around;
    		.rank_title{
    			font-size:28px;
    			color:#fff;
    			display: flex;
    			justify-content: space-between;
    			.achieve{
    				color:#4793f1;
    				margin-right:30px;
    			}
    			.audit{
    				color:#ff8631;
    				margin-right:30px;
    			}
    			.reject{
    				color:#fc6e89;
    				margin-right:30px;
    			}
    		}
    		.rank_sum{
    			font-size:24px;
    			color:#b7b7b7;
    		}
    	}
    	._time{
    		font-size:24px;
    		color:#b7b7b7;
    	}
    	img{
    		height:100%;
    		border-radius: 10px;
    	}
    }
  }
</style>
