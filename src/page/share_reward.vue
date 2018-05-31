<template>
  <div id="shareReward" class="pad_top">
    <rewardTop :money="allMoney"> </rewardTop>
    <picker> </picker>
    <div class="select" :class="[selectTab === 0 ? 'changeLeft': 'changeRight']">
      <p class="option" @click="selectTabFun(0)">直接分享</p>
      <p class="option" @click="selectTabFun(1)">間接分享</p>
    </div>
    <div class="info">
      <p class="month_reward">本月獎勵：{{ selectTab === 0 ? info1.moneyReward : info2.moneyReward }}</p>
      <p class="calendar" @click="getTime">{{ selectTab === 0 ? info1.calendar : info2.calendar }}<span class="iconfont icon-kongtiaoguankong-"></span></p>
    </div>

    <div class="data" :class="{'select_ing': selectTabIng}" v-show="selectTab === 0">
      <div class="list" v-show="userList1.length">
        <dl class="every" v-for="(item, index) in userList1" :key="index">
          <dt class="pic">
          	<img v-if="item.head" :src="item.head" :alt="item.name + '的頭像'" class="head_img">
          	<img v-else :src="logo" class="head_img"/>
          </dt>
          <dd class="more">
            <div class="no_money">
              <p class="name">{{item.name}}</p>
              <p class="time">{{item.created}}</p>
            </div>
            <p class="money">{{item.reward}}</p>
          </dd>
        </dl>
      </div>
      <div class="add_more" v-show="!userList1.length">暫無獎勵</div>
    </div>
    <div class="data" :class="{'select_ing': selectTabIng}" v-show="selectTab === 1">
      <div class="list" v-show="userList2.length">
        <dl class="every" v-for="(item, index) in userList2" :key="index">
          <dt class="pic">
          	<img v-if="item.head" :src="item.head" :alt="item.name + '的頭像'" class="head_img">
          	<img v-else :src="logo" class="head_img"/>
          </dt>
          <dd class="more">
            <div class="no_money">
              <p class="name">{{ item.name}}</p>
              <p class="time">{{ item.created}}</p>
            </div>
            <p class="money">{{ item.reward}}</p>
          </dd>
        </dl>
      </div>
      <div class="add_more" v-show="!userList2.length">暫無獎勵</div>
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
      	logo: require('../assets/images/logo.png'),
      	newmonth:"",
      	token:"",
        // 总金额
        allMoney: '100.00',
        allRelative: '',  //间接
        allDirect: '',  //直接
        // 切换列表
        selectTab: 0,
        // 是否在切换中
        selectTabIng: false,
        // 奖励和时间
        info1: {
          moneyReward: '1.00',
          calendar: ''
        },
        info2: {
          moneyReward: '2.00',
          calendar: ''
        },
        // 列表
        userList1: [
          {
            pic: require('../assets/images/logo.png'),
            name: 'good',
            time: '05-20 12:45:45',
            price: '4,000.00'
          }],
        userList2: [
          {
            pic: require('../assets/images/logo.png'),
            name: 'good',
            time: '05-20 12:45:45',
            price: '5,000.00'
          }
        ]
      }
    },
    mounted () {
      this.init()
      this.directReward()
      this.relativeReward()
      this.$bus.$emit('pageHead', '分享獎勵')
    },
    beforeDestroy () {
      this.$bus.$emit('pageHead')
    },
    methods: {
      init () {
      	 
      	 this.token = localStorage.getItem("token")
        // 更改时间
        let theTime = new Date()
        this.info2.calendar = this.info1.calendar = this.newmonth =  theTime.getFullYear() + '-' 
                              + (theTime.getMonth() >= 9 ? theTime.getMonth() + 1 : '0' + (theTime.getMonth() + 1))
//      this.getDirectData(this.info1.calendar)
//      this.getIndirectData(this.info2.calendar)
      },
        // 直接分享
      directReward (time){
      	  this.axios.post('directReward',{
          token:this.token,
          month:time||""
        }).then(({data}) => {
            this.allMoney = data.data.total;
            this.allDirect = data.data.total;
            this.userList1 = data.data.items;
            var aa = [];
            for(var  x in data.data.items){
            	  aa.push(data.data.items[x].reward)
            }
            this.info1.moneyReward =   eval(aa.join("+"))
        })
      },
       //间接分享
      relativeReward (time){
      	  this.axios.post('relativeReward',{
          token:this.token,
          month:time||""
        }).then(({data}) => {
            this.allRelative = data.data.total;
            this.userList2 = data.data.items;
            var bb = [];
            for(var  x in data.data.items){
            	  bb.push(data.data.items[x].reward)
            }
            this.info2.moneyReward =   eval(bb.join("+"))
        })
      },
      // 分享切换
      selectTabFun (id) {
        if (this.selectTabIng || this.selectTab === id) return false
        this.selectTabIng = true
        this.selectTab = id
<<<<<<< .mine

||||||| .r19
       
=======
        if(id === 0){
        	 this.allMoney = this.allDirect
        }else{
        	 this.allMoney = this.allRelative
        }
>>>>>>> .r42
        setTimeout(() => {
          this.selectTabIng = false
        }, 500)
      },
      // 触发时间选择器
      getTime () {
        this.$bus.$emit('timerShow', {
          flag: true,
          type: 'month',
          callBack: this.haveTimeBack
        })
      },
      // 获取时间
      haveTimeBack (data) {
      	  
        if (this.selectTab === 0) {
          this.info1.calendar = data.substr(0, 7)
          this.directReward(this.info1.calendar.replace(/-/g,''))
        } else {
          this.info2.calendar = data.substr(0, 7)
          this.relativeReward(this.info2.calendar.replace(/-/g,''))
        }
      },
      // 查看更多
      addMore () {
        if (this.selectTab === 0) {
          this.userList1.push(this.userList1[0])
        } else {
          this.userList2.push(this.userList2[0])
        }
      }
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
      overflow: hidden;
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
        transform-origin:left top;
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