<template>
  <div id="assertReward" class="pad_top">
    <picker></picker>
    <div class="top_inner">
      <div class="top_type">
        <p class="top_title">纍計總獎勵</p>
        <h3 class="top_money">{{money.all }}<span class="unit">USDT</span></h3>
        <p class="top_to">縂指標：{{needTo.all }}</p>
      </div>
      <div class="top_type">
        <p class="top_title">{{month}}月總獎勵</p>
        <h3 class="top_money">{{money.month}}<span class="unit">USDT</span></h3>
        <p class="top_to">{{month}}月縂指標：{{needTo.month}}</p>
      </div>
      <div class="iconfont icon-kongtiaoguankong- change_day" @click="getTime"></div>
    </div>
    <div class="info">
      <p class="month_reward">本月業績：{{ list.money }}</p>
    </div>
    <div class="data">
      <div class="list">
        <dl class="every" v-for="(item, index) in list.data" :key="index">
          <dt class="pic"><img :src="item.head" :alt="item.name + '的頭像'" class="head_img"></dt>
          <dd class="more">
            <div class="no_money">
              <p class="name">{{ item.name }}</p>
              <p class="time">{{ item.created }}</p>
            </div>
            <p class="money">{{ item.reward }}</p>
          </dd>
        </dl>
      </div>
      <!--<div class="add_more" @click="addMore">查看更多</div>-->
    </div>
  </div>
</template>
<script>
  import picker from '../components/picker.vue'
  export default {
    name: 'assertReward',
    data () {
      return {
        month: '',
        token:"",
        money: {
          all: '',
          month: ''
        },
        needTo: {
          all: '',
          month:''
        },
        list: {
          money: '8,000.00',
          data: []
        }
      }
    },
    mounted () {
      this.$bus.$emit('pageHead', '考核獎勵');
      this.init()
      let $that = this;
      this.appraisalsReward();
      if(!this.getCookie('token') || this.getCookie('token') === "null" ){
        this.$bus.$emit('alertCer', {
          msg:"請重新登錄"
        });
        setTimeout(function () {
          $that.$router.push('/login')
        },2000)
      }
    },
    beforeDestroy () {
      this.$bus.$emit('pageHead')
    },
    methods: {
      init () {
        let theTime = new Date()
        this.month = theTime.getMonth() + 1;
        this.token = this.getCookie("token")
      },
//    addMore () {
//      this.list.data.push(this.list.data[0])
//    },
      appraisalsReward (time){
	      this.axios.post('appraisalsReward',{
	      	token:this.token,
	      	month:time||""
	      }).then(({data}) => {
	          this.list.data = data.data.items

	          this.money.all = data.data.total
	          this.money.month = data.data.total_month

	          this.needTo.all = data.data.goal
	          this.needTo.month = data.data.goal_month

	          var ary = [];
            for(var  x in data.data.items){
            	  ary.push(data.data.items[x].amount)
            }
            this.list.money =   eval(ary.join("+"))

	      })
      },
      // 触发时间选择器
      getTime () {
        this.$bus.$emit('timerShow', {
          flag: true,
          callBack: this.haveTimeBack,
          type: 'month'
        })
      },
      // 获取时间
      haveTimeBack (data) {
          this.month = Number(data.substring(5, 7))
          let time = data.substr(0, 7).replace(/-/g,'')
          this.appraisalsReward (time)
      }
    },
    components: {
      picker
    }
  }
</script>
<style lang="scss">
  @import '../assets/scss/style.scss';
  #assertReward {
    .top_inner {
      background: $mainColor;
      width: 710px;
      height: 260px;
      padding: 60px 30px 0;
      margin: 0 auto;
      border-radius: 20px;
      color: #fff;
      position: relative;
      .top_type {
        float: left;
        width: 50%;
        .top_title {
          font-size: 28px;
          line-height: 30px;
        }
        .top_money {
          font-size: 34px;
          line-height: 90px;
          .unit {
            font-size: 20px;
            font-style: italic;
          }
          border-bottom: 1px solid #fff;
        }
        .top_to {
          line-height: 74px;
          font-size: 22px;
          color: #040301;
        }
      }
      .change_day {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 40px;
        color: #222;
        font-weight: 700;
      }
    }
    .info {
      width: 690px;
      margin: 0 auto;
      height: 70px;
      line-height: 70px;
      .month_reward {
        color: $mainColor;
        float: left;
        font-size: 26px;
        padding-left: 10px;
      }
      .calendar {
        color: #fff;
        float: right;
        font-size: 28px;
        .icon-kongtiaoguankong- {
          padding: 0 10px;
        }
      }
    }
    .data {
      padding: 0 20px;
      &.select_ing {
        animation: listChange .5s ease-in-out;
      }
      .list {
        background: #3f3c3c;
        padding: 0 22px;
        border-bottom: 1px solid #989898;
        .every {
          border-bottom: 1px solid #989898;
          padding: 20px 0;
          height: 125px;
          &:nth-last-child(1) {
            border-bottom: none;
          }
          .pic {
            float: left;
            height: 85px;
            width: 85px;
            .head_img {
              width: 100%;
              height: 100%;
              display: block;
              border-radius: 50%;
            }
          }
          .more {
            padding-left: 20px;
            float: left;
            width: 580px;
            .no_money {
              float: left;
              .name {
                font-size: 28px;
                color: #fff;
                padding-bottom: 15px;
              }
              .time {
                font-size: 24px;
                color: $mainColor;
              }
            }
            .money {
              float: right;
              font-size: 28px;
              line-height: 85px;
              color: $mainColor;
            }
          }
        }
      }
      .add_more {
        line-height: 92px;
        color: $mainColor;
        background: #3f3c3c;
        text-align: center;
        font-size: 28px;
      }
    }
  }
</style>
