<template>
  <div class="friend_list">
  	<picker></picker>
	  <div class="head">
		    <div class="back iconfont icon-fanhuijiantou" @click="back"></div>
		    <div class="tab_list">
		    	<div class="tab" v-for="(item,index) in tab" @click="toggle (index)" :class="{ active_tab : active === index}" :key="index">{{item.title}}</div>
		    </div>
	  </div>
	  <div class="shift_to" v-show="isShow">
		  	<div class="date_time">
		  		<div>
		  			<span class="DCC_title">{{shiftTo.sumUp.DCC_title}}：</span>
		  		  <span class="total_sum">+{{shiftTo.sumUp.total_sum}}</span>
		  		</div>
		  		<div>
		  			<span class="sp" @click="getTime">
		  				<span class="_time">{{shiftTo.sumUp.date_time}}</span>
	      	  <span class="iconfont" :class="timeIcon"></span>
		  			</span>
		  		</div>
	      </div>
	      <ul>
		  	   <li class="_list" v-for="(item, index) in shiftTo.shiftToList" :key="index">
	      		<div class="out_box">
	      			<div class="out_title">{{formatting(item.account)}}</div>
	      			<!--<div class="out_type" :class="'active'+item.type">{{item.state}}</div>-->
	      			<div class="out_sum">+{{item.sum}}</div>
	      		</div>
	      		<div class="out_time">{{item.time}}</div>
	      	</li>
      	</ul>
	  </div>
	  <div class="roll_out" v-show="!isShow">
		  	<div class="date_time">
		  		<div>
		  			<span class="DCC_title">{{rollOut.sumUp.DCC_title}}：</span>
		  		  <span class="total_sum">-{{rollOut.sumUp.total_sum}}</span>
		  		</div>
		  		<div>
		  			<span class="sp" @click="getTime">
		  				<span class="_time">{{rollOut.sumUp.date_time}}</span>
	      	    <span class="iconfont" :class="timeIcon"></span>
		  			</span>
		  			
		  		</div>
	      	
	      </div>
	      <ul>
	  	  <li class="_list" v-for="(item, index) in rollOut.rollOutList" :key="index">
      		<div class="out_box">
      			<div class="out_title">{{formatting(item.account)}}</div>
      			<!--<div class="out_type" :class="'active'+item.type">{{item.state}}</div>-->
      			<div class="out_sum">-{{item.sum}}</div>
      		</div>
      		<div class="out_time">{{item.time}}</div>
      	</li>
      	</ul>
	  </div>
  </div>
</template>

<script>
	import picker from '../components/picker.vue'
export default {
  name: 'team',
  data () {
    return {
      active: 0, 
      isShow:true,
      timeIcon:"icon-kongtiaoguankong-",
      tab: [
        {
          title: '轉入',
        },
        {
          title: '轉出',
        }
      ],
      //轉入
      shiftTo:{
      	  sumUp:{
      	  	 DCC_title:"轉入DCC",
      	  	 total_sum:"1,2000,000.0000",
      	  	 date_time:"2018-04"
      	  },
	      	shiftToList:[
	         {
	         	account:"18888888888",
	         	sum:"1,000.0000",
	         	time:"2018-02-20 12:45:45"
	         },
	         {
	         	account:"18396958488",
	         	sum:"1,000.0000",
	         	time:"2018-02-20 12:45:45"
	         	},
	         {
	         	account:"17798989887",
	         	sum:"1,000.0000",
	         	time:"2018-02-20 12:45:45"
	         },
	         {
	         	account:"18969586547",
	         	sum:"1,000.0000",
	         	time:"2018-02-20 12:45:45"
	         	}
	      	]
      	},
      //轉出
      rollOut:{
		      sumUp:{
		      	  	 DCC_title:"轉出DCC",
		      	  	 total_sum:"1,2000,000.0000",
		      	  	 date_time:"2018-04"
		      	  },
		      rollOutList:[
			         {
			         	account:"18845426958",
			         	sum:"1,000.0000",
			         	time:"2018-02-20 12:45:45"
			         },
			         {
			         	account:"18830713071",
			         	sum:"1,000.0000",
			         	time:"2018-02-20 12:45:45"
			         },
			         {
			         	account:"18888812621",
			         	sum:"1,000.0000",
			         	time:"2018-02-20 12:45:45"
			         }
         ]
      },
    }
  },
  beforeMount () {
  	
  },
  methods: {
    toggle (index) {
    	this.active = index
    	this.isShow =  !this.isShow
    },
    // 格式話賬號
    formatting (val) {
      let valStr
      if (typeof (val) !== 'string') {
        phoneStr = value.toString()
      } else {
        valStr = val
      }
      return valStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    // 触发时间选择器
	  getTime () {
	    this.$bus.$emit('timerShow', {
	      flag: true,
	      callBack: this.haveTimeBack,
	      type: 'month'
	    })
	  },
	  haveTimeBack (data) {
	  	if(this.isShow){
	  		this.shiftTo.sumUp.date_time = data.substr(0, 7)
        console.log(data)
	  	}else{
	  		this.rollOut.sumUp.date_time = data.substr(0, 7)
        console.log(data)
	  	}
        
   },
    back(){
    	 this.$router.go(-1)
    }
  },
  components:{
  	picker
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .friend_list {
    padding:0 30px;
    padding-top:100px;
    box-sizing:border-box;
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
	      border:1px solid #d7a82b;
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
	      		 background: #d7a82b;
	      		 color:#000;
	      		 
	      	}
	      }
    	}
		}
		.date_time{
    	font-size:28px;
    	color:#fff;
    	line-height:80px;
    	display: flex;
    	justify-content: space-between;
    	.sp{
    		margin-right: 50px;
    		.iconfont{
	    		margin-left: 18px;
	    		font-size: 36px;
    	  }
    	}
    	
    	div{
    		&:first-child{
    			color: #d1b56a;
    			font-size: 24px;
    			margin-left: 10px;
    		}
    	}
    }
    ul{
    	height:84vh;
    	overflow-y: scroll;
    	._list{
    		height:150px;
    		background: #3f3c3c;
    		border-radius: 15px;
    		margin-bottom:15px;
    		padding:20px 30px;
    		box-sizing: border-box;
    		.out_box{
    			display: flex;
    			justify-content: space-between;
    			div{
    				font-size: 28px;
    			}
    			.out_title{
    				color: #fff;
    			}
    			.out_sum{
    				font-size:28px;
    				color:#d7a82b;
    			}
    			
    		}
    		.out_time{
				color:#d1b56a;
				font-size:24px;
				line-height: 90px;
    		}
    	}
    }
  }
</style>
