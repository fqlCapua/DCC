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
        certification:'',
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
              title: '退出登錄',
  //          	icon: 'icon-jinrujiantou',
              router: ''
          }
        ]

      }
    },
    mounted () {
      let $that = this;
      this.$bus.$emit('pageHead', '設置')
      this.home()
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

    destroyed () {
      this.$bus.$emit('pageHead')
    },
    methods: {
      toggle (index) {
        //console.log(index)
        if (index === 3) {
           this.logOut() // 退出登录
        } else {
          this.$router.push({path: this.list[index].router})
        }
        if(index === 2){
          if(this.certification == 1){
            this.$router.push('/authentication')
          }
        }
      },
      logOut () {
        // 退出登录
         this.setCookie('token',"");
         if(!this.getCookie('token')){
            let $that =this;
           this.$bus.$emit('alertCer',{
             msg:'退出成功'
           })
            setTimeout(function(){
              $that.$router.push('login')
            },1000)
         }
      },
      home(){
        this.axios.post('userHomePage', {
          token: this.getCookie("token"),
        }).then(({ data }) => {
          this.certification =data.data.certification
          console.log(this.certification)
        })
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
