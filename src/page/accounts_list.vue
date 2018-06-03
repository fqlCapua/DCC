<template>
  <div class="c2c_list">
  	  <picker></picker>
      <div class="date_time">
      	<span class="sp" @click="getTime">
      		<span class="_time">{{time}}</span>
      	  <span class="iconfont" :class="timeIcon"></span>
      	</span>
      </div>
      <ul class="wallet_ul">
      	<li class="wallet_li" v-for="(item, index) in list" :key="index">
      		<div class="out_box">
      			<div class="out_title">{{item.title}}</div>
      			<div class="out_type" :class="'active'+item.type">{{item.state}}</div>
      			<div class="out_sum">{{item.sum}}</div>
      		</div>
      		<div class="out_time">{{item.time}}</div>
      	</li>
      </ul>
  </div>
</template>

<script>
	import picker from '../components/picker.vue'
export default {
  name: 'c2cList',
  data () {
    return {
       time:'',
       timeIcon:"icon-kongtiaoguankong-",
       list:[
	          {
		          title:"轉出",
		          time:"2018-02-20 12:45:45",
		          state:"已完成",
		          sum:"1,000.0000",
		          type:0
	          },
	          {
		          title:"轉出",
		          time:"2018-02-20 12:45:45",
		          state:"審核中",
		          sum:"1,000.0000",
		          type:1
	          },
	          {
		          title:"轉出",
		          time:"2018-02-20 12:45:45",
		          state:"已駁回",
		          sum:"1,000.0000",
		          type:2
	          },
	          {
		          title:"轉出",
		          time:"2018-02-20 12:45:45",
		          state:"已完成",
		          sum:"1,000.0000",
		          type:0
	          }
       ]
    }
  },
  mounted () {
    this.$bus.$emit('pageHead','轉出記錄'),
    this.init();
    if(!this.getCookie('token') || this.getCookie('token') === "null" ){
      this.$bus.$emit('alertCer', {
        msg:"請重新登錄"
      });
      setTimeout(function () {
        this.$router.push('/login')
      },2000)
    }
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },

  methods: {
    init () {
        // 更改时间
        let theTime = new Date()
        this.time = theTime.getFullYear() + '-'
                              + (theTime.getMonth() >= 9 ? theTime.getMonth() + 1 : '0' + (theTime.getMonth() + 1))
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
        this.time = data.substr(0, 7)
        //console.log(data)
    }
  },
  components:{
  	picker
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .c2c_list {
    padding:0 30px;
    padding-top:100px;
    box-sizing:border-box;
    .date_time{
    	font-size:28px;
    	text-align:right;
    	color:#fff;
    	line-height:80px;
    	.sp{
    		margin-right: 50px;
	    		.iconfont{
	    		  margin-left: 18px;
	    		  font-size: 36px;
	    	  }
    	}

    }
    .wallet_ul{

    	.wallet_li{
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
    			.out_type{
    				font-size:24px;
    				&.active0{
    					color:#4793f1;
    				}
    				&.active1{
    					color:#ff8631;
    				}
    				&.active2{
    					color:#fc6e89;
    				}

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
