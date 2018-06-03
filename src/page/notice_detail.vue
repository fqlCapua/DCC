<template>
  <div id="noticeDetail" class="pad_top">
    <div class="info">
      <p class="title">{{ title }}</p>
      <p class="time">{{ time }}</p>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'noticeDetail',
    detailId:'',
    data () {
      return {
        title: '系統陞級',
        time: '2018-04-14 17:58',
        content: '<p style="color: #fff; font-size: 12px;">系統將於今晚十二點進行維護更新，預計更新時間7個小時更新完畢。給大家帶來的不便，望大家體諒。</p>'
      }
    },
    mounted () {
      this.$bus.$emit('pageHead', '公告詳情')
      this.detailId = this.$route.query.id;

        if(!this.getCookie('token') || this.getCookie('token') === "null" ){
          this.$bus.$emit('alertCer', {
            msg:"請重新登錄"
          });
          setTimeout(function () {
            this.$router.push('/login')
          },2000)
        }
    },
    beforeDestroy () {
      this.$bus.$emit('pageHead')
    },
    methods:{
      sub(){
        let  $that = this;
        this.axios.post('newMsgDetail', {
          token:this.getCookie('token'),
          id:this.this.detailId
        }).then(({data}) =>{
          $that.list =data.data;
          //console.log($that.list)
        })
      }

    }
  }
</script>
<style lang="scss">
  #noticeDetail {
    .info {
      padding: 20px 30px 100px;
      background: #3f3c3c;
      .title {
        font-size: 30px;
        color: #fff;
        line-height: 60px;
      }
      .time {
        color: #a59569;
        padding-bottom: 20px;
      }
    }
  }
</style>
