<template>
  <div id="teamReward" class="pad_top">
    <rewardTop :money="allMoney"></rewardTop>
    <picker></picker>
    <div class="type">
      <div class="info">
        <p class="month_reward"><span class="timer">本月</span>獎勵：{{ info.self }}</p>
        <p class="calendar" @click="getTime">{{ time }}<span class="iconfont icon-kongtiaoguankong-"></span></p>
      </div>
      <div class="data">
        <div class="list">
          <dl class="every" v-for="(item, index) in nowList" :key="index">
            <dt class="pic"><img :src="item.head" :alt="item.name + '的頭像'" class="head_img"></dt>
            <dd class="more">
              <div class="no_money">
                <p class="name">{{ item.name }}<span class="name_type">{{ item.type }}</span></p>
                <p class="time">{{ item.created}}</p>
              </div>
              <p class="money">{{item.reward}}</p>
            </dd>
          </dl>
        </div>
        <!--<div class="add_more" @click="addMore('self')">查看更多</div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import rewardTop from '../components/reward_top.vue'
  import picker from '../components/picker.vue'
  export default {
    name: 'teamReward',
    data () {
      return {
      	token:"",
        allMoney:'',
        info: {
          self: '4,000.00'
        },
        time: '',
        nowList: [],
      }
    },
    mounted () {
      this.$bus.$emit('pageHead', '團隊獎勵')
      this.init()
      this.token =this.getCookie("token")
      this.teamReward();
      let $that =this;
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
        this.teamReward(this.time.replace(/-/g,''))
      },
      teamReward (time){
      	  this.axios.post('myTeamReward',{
          token:this.token,
          month:time||""
        }).then(({data}) => {
            //console.log(data)
            this.allMoney = data.data.total
            this.nowList =  data.data.items
            let aa = [];
            for(var  x in data.data.items){
            	  aa.push(data.data.items[x].reward)
            }
            this.info.self =   eval(aa.join("+"))
        })
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
  #teamReward {
    .info {
      width: 690px;
      margin: 0 auto;
      height: 68px;
      line-height: 68px;
      .month_reward {
        color: $mainColor;
        float: left;
        font-size: 26px;
        padding-left: 10px;
        .timer {
          color: #fff;
          font-size: 28px;
          display: inline-block;
          width: 3.4em;
        }
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
                .name_type {
                  color: $mainColor;
                  padding-left: 10px;
                  font-size: 26px;
                }
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
