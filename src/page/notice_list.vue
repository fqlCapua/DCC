<template>
  <div id="noticeList" class="pad_top">
    <router-link tag="div" :to="{path: 'noticeDetail', query: {id: item.id}}" class="notice" v-for="(item, index) in list" :key="index">
      <p class="title">{{ item.title }}</p>
      <p class="iconfont icon-jinrujiantou"></p>
    </router-link>
    <div  v-show="!list.length" style="color: #fff;font-size:15px;text-align: center;margin:20px 0 0 0; ">暫無公告</div>
  </div>
</template>
<script>
  export default {
    name: 'noticeList',
    data () {
      return {
        token:'',
        list: [
        ]
      }
    },
    mounted () {
      let $that=this;
      this.$bus.$emit('pageHead', '公告')
      this.sub();
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
    beforeDestroy () {
      this.$bus.$emit('pageHead')
    },
    methods:{

      sub(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.token=localStorage.getItem('token')
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
          this.token = this.getCookie('token')
        }
        let  $that = this;
        this.axios.post('newMsgList', {
          token:this.token
        }).then(({data}) =>{
          $that.list =data.data;
          //console.log($that.list)
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
