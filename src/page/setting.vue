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
    	if (index === 3) {
    		 this.logOut() // 退出登录
    	} else {
    		this.$router.push({path: this.list[index].router})
    	}
    },
    logOut () {
    	// 退出登录
    	this.axios.get('/auth/unlogin').then(({data}) => {
        if (data.status === 200) {
           	    this.$router.push('login')
        }
      })
    }
  }
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
