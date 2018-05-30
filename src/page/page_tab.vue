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
