<template>
  <div id="shareReward" class="pad_top">
    <rewardTop :money="allMoney"></rewardTop>
    <picker></picker>
    <div class="info">
      <p class="month_reward">本月獎勵：{{ info.moneyReward }}</p>
      <p class="calendar" @click="getTime">{{ info.calendar }}<span class="iconfont icon-kongtiaoguankong-"></span></p>
    </div>
    <div class="data">
      <div class="list">
        <dl class="every" v-for="(item, index) in userList" :key="index">
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
  import rewardTop from '../components/reward_top.vue'
  import picker from '../components/picker.vue'
  export default {
    name: 'shareReward',
    data () {
      return {
      	token:"",
        // 总金额
        allMoney: '',
        // 切换列表
        selectTab: 0,
        // 是否在切换中
        selectTabIng: false,
        // 奖励和时间
        info: {
          moneyReward: '',
          calendar: ''
        },
        // 列表
        userList: []
      }
    },
    mounted () {
      this.init()
      this.$bus.$emit('pageHead', '特別獎勵')
      this.token = localStorage.getItem("token")
      this.specialReward ()
    },
    beforeDestroy () {
      this.$bus.$emit('pageHead')
    },
    methods: {
      init () {
        // 更改时间
        let theTime = new Date()
        this.info.calendar = theTime.getFullYear() + '-' 
                              + (theTime.getMonth() >= 9 ? theTime.getMonth() + 1 : '0' + (theTime.getMonth() + 1))
      },
      specialReward (time){
      	 this.axios.post('specialReward',{
	      	token:this.token,
	      	month:time||""
	      }).then(({data}) => {
	          this.userList = data.data.items 
	          this.allMoney = data.data.total    
	          var ary1 = [];
            for(var  x in data.data.items){
            	  ary1.push(data.data.items[x].reward)
            }
            this.info.moneyReward =   eval(ary1.join("+"))
	          
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
        this.info.calendar = data.substr(0, 7)
        let time1 = data.substr(0, 7).replace(/-/g,'')
        this.specialReward (time1)
      },
      // 查看更多
//    addMore () {
//      this.userList.push(this.userList[0])
//    }
    },
    components: {
      rewardTop,
      picker
    }
  }
</script>
<style lang="scss">
  @import '../assets/scss/style.scss';
  #shareReward {
    .select {
      color: $mainColor;
      width: 465px;
      margin: 28px auto;
      background: $bgColorLow;
      line-height: 62px;
      height: 62px;
      border-radius: 31px;
      text-align: center;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: 4em;
        height: 4px;
        background: $mainColor;
        bottom: 0;
        left: 25%;
        margin-left: -2em;
        border-radius: 2px;
        transition: all 0.5s;
      }
      &.changeLeft:after{
        animation: goLeft .5s linear forwards;
      }
      &.changeRight:after{
        animation: goRight .5s linear forwards;
      }
      .option {
        float: left;
        width: 50%;
      }
    }
    .info {
      width: 690px;
      margin: 0 auto;
      height: 58px;
      line-height: 58px;
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
    @keyframes goRight {
      0% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(1)
      }
      30% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(0)
      }
      70% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(0)
      }
      100% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(1)
      }
    }
    @keyframes goLeft {
      0% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(1)
      }
      30% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(0)
      }
      70% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(0)
      }
      100% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(1)
      }
    }
    @keyframes listChange {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
</style>