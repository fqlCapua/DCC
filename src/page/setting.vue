<template>
  <ul class="setting_body">
        <li class="set-list" v-for="(item,index) in list" @click="toggle(index)" :key="index">
        	<span class="name">{{item.title}}</span>
            <span class="iconfont" :class="item.icon"></span>
        </li>
  </ul>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      list: [
        {
          	title: '修改登录密碼',
          	icon: 'icon-jinrujiantou',
          	router: 'setLoginPsd'
        },
        {
          	title: '修改交易密碼',
          	icon: 'icon-jinrujiantou',
          	router: 'setDealPsd'
        },
        {
          	title: '實名認證',
          	icon: 'icon-jinrujiantou',
          	router: 'realName'
        },
        {
          	title: '退出登录',
          	icon: 'icon-jinrujiantou',
          	router: ''
        }
      ]

    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '設置')
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    toggle (index) {
      console.log(index)
    	if (index === 3) {
    		 this.logOut() // 退出登录
    	} else {
    		this.$router.push({path: this.list[index].router})
    	}
    },
    logOut () {
    	// 退出登录
        window.localStorage.removeItem('token')
       if(!localStorage.getItem('token')){
          let $that =this;
         this.$bus.$emit('alertCer',{
           msg:'退出成功'
         })
          setTimeout(function(){
            $that.$router.push('login')
          },2000)
       }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .setting_body {
      padding-top:100px;
    .set-list{
      height: 110px;
      line-height: 110px;
      /*border-top: 1px solid $mainColor;*/
      background-color: #3f3c3c;
      /*margin: 0 40px 24px;*/
      margin-top:1px;
      font-size: 30px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      padding: 0 40px;
      &:nth-last-child(1){
          margin-top:22px;
        }
      .iconfont{
        font-size: 40px;
        /*font-weight: 600;*/
      }
    }
  }
</style>
