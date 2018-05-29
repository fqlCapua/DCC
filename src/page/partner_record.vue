<template>
  <ul class="partnerRecord">
      <li class="list" :for="index" v-for="(item, index) in list" :key="index">
      	 <img v-if="item.grade === 3 " :src="imgList.high"/>
      	 <img v-if="item.grade === 2 " :src="imgList.middle"/>
      	 <img v-if="item.grade === 1 " :src="imgList.low"/>
      	 <div class="rank">
      	 	   <div class="rank_title">{{item.title}}</div>
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
       	  high: require('../assets/images/mills_pic0.png'),
       	  middle:require('../assets/images/mills_pic1.png'),
       	  low:require('../assets/images/mills_pic2.png')
       },
       list:[
         {
         	title:"決策合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:3
         },
         {
         	title:"核心合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:2
         },
         {
         	title:"一般合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:1
         },
         {
         	title:"一般合夥人",
         	sum:"20,000.0000",
         	time:"2018-4-16  10:20",
         	grade:2
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
      this.axios.post('quotation/decl_from_page').then(({data}) => {
        this.form.phone.num = data.data.mobile
        //      this.form.exchange.num = (this.form.usdt.num * data.data.rmb_dcc * data.data.usdt_rmb) + ' DCC'
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
