<template>
  <ul class="partnerRecord">
      <li class="list" :for="index" v-for="(item, index) in list" :key="index">
      	 <img v-if="item.grade === 3 " :src="imgList.high"/>
      	 <img v-if="item.grade === 2 " :src="imgList.middle"/>
      	 <img v-if="item.grade === 1 " :src="imgList.low"/>
      	 <div class="rank">
      	 	   <div class="rank_title">
      	 	   	  <span>{{item.title}}</span>
      	 	   	  <span :class="{'achieve': item.status === 1 }" v-if="item.status === 1">已完成</span>
      	 	   	  <span :class="{'audit': item.status === 2 }" v-if="item.status === 2">審核中</span>
      	 	   	  <span :class="{'reject': item.status === 3 }" v-if="item.status === 3">已駁回</span>
      	 	   </div>
      	 	   <div class="rank_sum">售賣: {{item.sum}}  USDT</div>
      	 </div>
      	 <div class="_time">{{item.time}}</div>
      </li>
  </ul>
</template>

<script>
export default {
  name: 'partnerRecord',
  data () {
    return {
       imgList:{
       	 token:"",
       	  high: require('../assets/images/mills_pic0.png'),
       	  middle:require('../assets/images/mills_pic1.png'),
       	  low:require('../assets/images/mills_pic2.png')
       },
       list:[
         {
         	title:"決策合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:3,
         	status:1
         },
         {
         	title:"核心合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:2,
         	status:2
         },
         {
         	title:"一般合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:1,
         	status:3
         },
         {
         	title:"一般合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:2,
         	status:1
         }
       ]
           
       
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '合夥人記錄')
    this.init()
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    init () {
    	 this.token = localStorage.getItem("token")
      this.axios.post('coparntnerBuyList',{
      	 token:this.token
      }).then(({data}) => {
         console.log(data)
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
