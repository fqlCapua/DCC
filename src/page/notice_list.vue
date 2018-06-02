<template>
  <div id="noticeList" class="pad_top">
    <router-link tag="div" :to="{path: 'noticeDetail', query: {id: item.id}}" class="notice" v-for="(item, index) in list" :key="index">
      <p class="title">{{ item.title }}</p>
      <!--<p class="time">{{ item.time }}</p>-->
      <p class="iconfont icon-jinrujiantou"></p>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: 'noticeList',
    data () {
      return {
        list: [
          {
            title: '重要！系統陞級提示，平臺于明日凌晨進行系統維護，給大家帶來的不便敬請見諒',
//            time: '2018-04-14 15:23',
            id: '1'
          },
          {
            title: '重要！系統陞級提示，平臺于明日凌晨進行系統維護，給大家帶來的不便敬請見諒',
//            time: '2018-04-14 15:23',
            id: '2'
          }
        ]
      }
    },
    mounted () {
      this.$bus.$emit('pageHead', '公告')
      this.sub()
    },
    beforeDestroy () {
      this.$bus.$emit('pageHead')
    },
    methods:{

      sub(){
        let  $that = this;
        this.axios.post('newMsgList', {
          token:localStorage.getItem('token')
        }).then(({data}) =>{
          $that.list =data.data;
          console.log($that.list)
        })
      }

    }
  }
</script>
<style lang="scss" scoped>
  #noticeList {
    .notice {
      background: #3f3c3c;
      padding: 30px;
      border-bottom: 1px solid #aaa;
      position: relative;
      .title {
        color: #fff;
        font-size: 26px;
        width: 588px;
        line-height: 50px;
        text-align: justify;
      }
      .time {
        color: #a59569;
        font-size: 24px;
      }
      .icon-jinrujiantou {
        color: #fff;
        line-height: 50px;
        line-height: 50px;
        font-size: 40px;
        position: absolute;
        top: 50%;
        right: 30px;
        margin-top: -25px;
      }
    }
  }
</style>
