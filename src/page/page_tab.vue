<template>
  <div class="page_tab">
    <headTab :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab"></headTab>
 <div class="content">

 </div>
  </div>
</template>
<script>
  import headTab from '../components/head_tab.vue'
  export default {
    name: 'pageTab',
    data () {
      return{
        tabIndex: 0,
        tabList: [
          {
            index: 0,
            name: '我的团队',
            router:'myTeam'
          },
          {
            index: 1,
            name: '我的分享',
            router:''
          }
        ]
      }
    },
    components: {
      headTab,
    },
    mounted () {
    let $that=this;
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
    methods:{
      // 切换选项卡
      changeTab: function (tab) {
        this.tabIndex = tab.index
        this.currentContent = tab.component
        if(this.tabIndex === 0){
          this.$router.push('myTeam')
        }
      },
      tab(index) {
       this.$router.push({path:this.tabList[index].router})
        alert(index)
      },

    },

  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style.scss';

</style>
