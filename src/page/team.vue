<template>
  <div class="head1">
    <div class="back iconfont icon-fanhuijiantou" @click="back"></div>
    <div class="codeTab">
      <span class="option" @click="toggleTabs(0)" :class="{option_active:1!=selectTab}">我的團隊</span>
      <span class="option" @click="toggleTabs(1)" :class="{option_active:0!=selectTab}">我的分享</span>
    </div>
    <div class="data1" v-show="selectTab === 0">
      <div >
        <div>
          <div class="inner">
            <h3 class="teamNumber">{{ teamNumber }} </h3>
            <p class="teamtitle">團隊總數</p>
          </div>
        </div>
        <div class="select tabChild1"  >
          <div class="select_content1">
            <p class="option" @click="selectTabFun(0)" :class="{option_child_active:selectTabChild==0}">下級</p>
            <p class="option" @click="selectTabFun(1)" :class="{option_child_active:selectTabChild==1}">會員</p>
          </div>
        </div>
        <div class="data" :class="{dataChild:selectTabChild ===0}" v-show="selectTabChild === 0">
          <div class="eleBox">
            <div class="dataChild_ele" v-for="(item,index) in userList1" :key="index">
              <div>{{item.name}}<span class="usertype">({{item.position}})</span></div>
              <div>{{item.phone}}</div>
              <div>{{item.last_login_time}}</div>
              <section style="clear:both;"></section>
            </div>
            <div class="add_more" v-show="!userList1.length">暫無獎勵 </div>
          </div>
        </div>
        <div class="data1" :class="{dataChild:selectTabChild === 1}" v-show="selectTabChild === 1">
          <div class="eleBox">
            <div class="dataChild_ele" v-for="(item,index) in userList2" :key="index">
              <div>{{item.name}}<span class="usertype">({{item.position}})</span></div>
              <div>{{item.phone}}</div>
              <div>{{item.last_login_time}}</div>
              <section style="clear:both;"></section>
            </div>
            <div class="add_more" v-show="!userList2.length">暫無獎勵</div>
          </div>
        </div>
      </div>
    </div>
    <div class="data1" v-show="selectTab === 1">
      <div>
        <div>
          <div class="inner">
            <h3 class="teamNumber">{{ shareNumber }} </h3>
            <p class="teamtitle">{{shareText}}</p>
          </div>
        </div>
        <div class="select tab_child2"  >
          <div class="select_content1">
            <p class="option1" @click="selectTabFun1(0)" :class="{option_child_active:selectTabChild2==0}">直接分享</p>
            <p class="option1" @click="selectTabFun1(1)" :class="{option_child_active:selectTabChild2==1}">間接分享</p>
          </div>
        </div>
        <div class="data1" :class="{dataChild:selectTabChild2 ===0}" v-show="selectTabChild2 === 0">
          <div class="eleBox">
            <div class="dataChild_ele" v-for="(item,index) in userList3" :key="index">
              <div>{{item.name}}<span class="usertype">({{item.position}})</span></div>
              <div>{{item.phone}}</div>
              <div>{{item.last_login_time}}</div>
              <section style="clear:both;"></section>
            </div>
            <div class="add_more" v-show="!userList3.length">暫無獎勵</div>
          </div>
        </div>
        <div class="data1" :class="{dataChild:selectTabChild2 === 1}" v-show="selectTabChild2 === 1">
          <div class="eleBox">
            <div class="dataChild_ele" v-for="(item,index) in userList4" :key="index">
              <div>{{item.name}}<span class="usertype">({{item.position}})</span></div>
              <div>{{item.phone}}</div>
              <div>{{item.last_login_time}}</div>
              <section style="clear:both;"></section>
            </div>
            <div class="add_more" v-show="!userList4.length">暫無獎勵</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'team',
  data() {
    return {
      selectTabChild: 0,
      selectTabChild2: 0,
      selectTab: 0,
      activeRouter: '',
      active: 0,
      token:'',
      teamNumber: "112",
      teamText: "團隊總數",
      shareNumber: "113",
      shareText: "分享總數",
      // 切换列表

      // 是否在切换中
      selectTabIng: false,
      // 列表
      userList1: [
        {
        nickname: 'Tom',
        usertype:"领士",
        Num: '13527845511',
        time: '2018-05-20'

      },
        {
        nickname: 'Tom',
        usertype:"领士",
        Num: '13527845511',
        time: '2018-05-21'

      }],
      userList2: [],
      userList3: [],
      userList4: [],
    }
  },
  beforeMount() {

  },
  mounted() {
    this.vipSub();
    this.indirect();
    let $that =this;


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
  methods: {
    getRoute() {

    },

    toggleTabs: function(id) {
      this.selectTab = id;
      if (this.selectTabIng || this.selectTab === id) return false
      this.selectTabIng = true;
      this.selectTab = id;
      setTimeout(() => {
        this.selectTabIng = false
      }, 500)

    },
    // 我的團隊二級切换
    selectTabFun(id) {
      if (this.selectTabChild == id) return false
      this.selectTabIng = true;
      this.selectTabChild = id;
      this.vipSub()

    },
    // 我的分享 二級切换
    selectTabFun1(id) {
      if (this.selectTabChild2 == id) return false
      this.selectTabIng = true;
      this.selectTabChild2 = id;
        this.indirect()

    },
    back() {
      this.$router.go(-1)
    },
//    会员
    vipSub(){

      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token=localStorage.getItem('token')
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
      }
      let $that = this;
      this.axios.post('myTuanDui', {
      token:this.token
      }).then(({data}) => {
     $that.userList2 =data.data.member;
        $that.userList1 =data.data.employee
     this.teamNumber = data.data.employee_count + data.data.member_count;
      })
    },
//     我的分享
    indirect(){
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.token=localStorage.getItem('token')
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.token = this.getCookie('token')
      }
     this.axios.post('myShareMembers', {
       token:this.token
     }).then(({data}) => {
       this.userList3 =data.data.direct;
       this.userList4=data.data.relative;
       this.shareNumber =data.data.direct_count+data.data.relative_count
     })
    },

  }
}

</script>
<style lang="scss" scoped>
@import '../assets/scss/style.scss';
.head1 {
  padding-top: 20px;
  position: relative;
}

.back {
  position: absolute;
  top: 10px;
  left: 0;
  color: #fff;
  width: 100px;
  text-align: center;
  line-height: 80px;
  font-size: 40px;
}

.codeTab {}

.team_body {
  padding-top: 100px;
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
    border-bottom: 1px solid #D7A82B;
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
      height: 60px;
      width: 324px;
      margin: 0 auto;
      margin-top: 20px;
      border: 1px solid #fff;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      .tab {
        width: 50%;
        height: 100%;
        line-height: 58px;
        font-size: 28px;
        text-align: center;
        color: #d7a82b;
        &.active_tab {
          background: #fff;
        }
      }
    }
  }
}

.codeTab {
  font-family: "微软雅黑";
  border: 1px solid #CFA12A;
  border-radius: 6px;
  width: 60%;
  margin: 0 auto;
  .option {
    display: inline-block;
    line-height: 60px;
    font-size: 30px;
    color: #AD8621;
    height: 60px;
    line-hight: 60px;
    width: 49.1%;
    text-align: center;
  }
  .option_active {
    background-color: $mainColor;
    color: #000;
  }
  .option_normal {
    background-color: none;
    color: #AD8621;
  }
}

.data1 {
  padding: 25px 0;
  .add_more {
    color: #fff;
  }
  .option_child_active {
    border-bottom: 1px solid $mainColor;
  }
  #rewardTop1 {
    width: 100vw;
  }
  .inner {
    background: url('../assets/images/rewardBg.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 80%;
    height: 230px;
    margin: 25px auto;
    .teamNumber {
      text-align: center;
      color: #fff;
      font-size: 3.4em;
      font-weight: 500;
      line-height: 120px;
      padding-top: 30px;
    }
    .teamtitle {
      text-align: center;
      color: #fff;
      font-size: 1.4em;
      letter-spacing: 3px;
    }
  }
}

.select {
  color: $mainColor;
  margin: 35px auto;
  background: $bgColorLow;
  line-height: 63px;
  height: 63px;
  border-radius: 31px;
  position: relative;
  .select_content1 {
    width: 80%;
    margin: 0 auto;
  }

  .option {
    text-align: center;
    float: left;
    width: 49.5%;
  }
  .option1 {
    text-align:center;
    float: left;
    width: 49.5%;
  }
}

.dataChild_ele {}

.eleBox {
  width: 100%;
}

.dataChild {
  width: 90%;
  padding: 0;
  margin: 0 auto;
  animation: listChange .5s ease-in-out;
  .dataChild_ele {
    margin: 14px auto;
    font-size:1.3em;
    border-radius: 10px;
    background-color: #3F3C3C;
    &>div {

          padding: 10px 0;
    }

    div:nth-child(1) {
      line-height:70px;
      width: 49%;
      padding-left:15px;
      color: #fff;
      float: left;
    }
    div:nth-child(2) {
      line-height:70px;
      font-size:1.2em;
      padding-right:10px;
      width: 49%;
      color: #fff;
      float: left;
      text-align: right;
    }
    div:nth-child(3) {
      width:99%;
      padding-bottom:20px;
      line-height:40px;
      padding-left:15px;
      font-size:15px;
      color:$mainColor;
      float: left;

    }
    .usertype{
    	font-size:14px;
    	color:$mainColor;
    }
  }
  .add_more {
    margin: 14px auto;
    font-size: 1.3em;
    line-height: 100px;
    text-align: center;
    border-radius: 10px;
    background-color: #3F3C3C;
  }
}

.tabChild1 {
  width: 65%;
}

.tab_child2 {
  width: 65%;
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

</style>
