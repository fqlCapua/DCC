<template>
  <div class="user_wrap">
    <div class="top">
      <i class="iconfont  icon-shezhishedingpeizhichilun" @click="setting"></i>
      <div class="logo">
      	<img alt="" :src="img" width="100%" height="100%" style="border-radius:50%;">
				<input type="file" class="file" @change="onFileChange">
      </div>
      <span class="name">
        <p style="text-align: center;margin-bottom: 5px">{{name}}</p>
        <p class="phone" style="text-align: center">{{phone}}</p>
      </span>
    </div>
    <div class="section">
      <span class="name">USDT</span>
      <span class="num">{{allNum || '0.00'}}</span>
    </div>
    <div class="section">
      <span class="name">凍結DCC</span>
      <span class="num">{{dccNum || '0.00'}}</span>
    </div>
    <div class="section">
      <span class="name">可用DCC</span>
      <span class="num">{{ activeNum || '0.00'}}</span>
    </div>
    <div class="section">
      <span class="name">今日收益USDT</span>
      <span class="num">{{ todayNum }}</span>
    </div>
    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index" @click="seeDetails(index)">
        <!--<img :src="imgArr[index]" alt="">-->
        <span class="iconfont" :class="item.icon"></span>
        <span class="name">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'userCenter',
  data () {
    return {
      phone: '',
      linkUrl: '',
      allNum: '',
      dccNum: '',
      activeNum: '',
      todayNum: '',
      name:'',
      image:'', //64
      img:'',
      list:[
        {
        	name:"轉出至錢包",
        	icon:"icon-qianbao",
        	router:"rollOut"
        },
        {
        	name:"用戶轉賬",
        	icon:"icon-zhuanzhang",
        	router:"accounts"
        },
        {
        	name:"團隊列表",
        	icon:"icon-tuandui1",
        	router:"team"
        },
        {
        	name:"我的二維碼",
        	icon:"icon-erweima",
        	router:"myCode"
        },
        {
          name:"等级兑换",
          icon:"icon-dengji",
          router:"levelChange"
        },
//      {
//        name:"钱包二维码",
//        icon:"icon-erweima",
//        router:"walletEwm"
//      },
        {
        	name:"合夥人記錄",
        	icon:"icon-jilu2",
        	router:"partnerRecord"
        },

      ]
    }
  },
  beforeMount () {
    this.getInfo()
  },
  mounted () {
    this.copyBtn = new Clipboard('.btn')
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    });
    if(!this.getCookie('token')){
      this.$router.push('/login')
    }
    this.userHomePage()
  },
  beforeDestroy () {
    this.$bus.$emit('footer', false)
  },
  computed: {
    showPhone () {
      let phoneStr
      if (typeof (this.phone) !== 'string') {
        phoneStr = this.phone.toString()
      } else {
        phoneStr = this.phone
      }
      return phoneStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  methods: {
    copyLink () {
      this.$bus.$emit('alert', {
        title: '復製成功',
        msg: '已復製成功！如果沒有復製成功，請手動複製！',
        btn: '知道了'
      })
    },
    seeDetails (index) {
    		this.$router.push({path: this.list[index].router})
    },
    getInfo () {
      let token = this.getCookie('token')
      this.axios.post('userHomePage', {
       token:token
      }).then(({data}) => {
        window.localStorage.setItem('phone',data.data.phone);
        this.name = data.data.name;
        this.phone = data.data.phone;
        this.allNum = this.formatNum(data.data.price_usdt,4);
        this.todayNum =this.formatNum(data.data.usdt_today_profit,4);
        this.dccNum =this.formatNum(data.data.freeze_dcc,4);
        this.activeNum=this.formatNum(data.data.avaliable_dcc,4);
      })
    },
    setting () {
    	//設置
      this.$router.push('setting')
    },
    onFileChange(e){
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file){
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
        this.upLoad()
      };
      reader.readAsDataURL(file);
    },
//			上傳
    upLoad(){
      this.axios.post('userUpload', {
        token:this.getCookie("token"),
        img:this.image
      }).then(({data})=>{
        this.img=data.data.server_url;
        localStorage.setItem("imgUrl",this.img);
        this.postUserInfo();
        if(data.ret === 401) this.$router.push('login')
      })

    },
//    保存接口
    postUserInfo (){
      this.axios.post('postUserInfo', {
        token:this.getCookie("token"),
        phone:this.phone,
        head:this.img
      }).then(({data}) => {
        if(data.ret === 401) this.$router.push('login')
      })
    },
//    獲取頭像
    userHomePage (){
      this.axios.post('userHomePage', {
        token:this.getCookie("token"),
      }).then(({data}) => {
        this.img = data.data.head
        console.log(this.img)
      })
    },
    // 数字格式化
    formatNum (s, n) {
      /*
       * 参数说明：
       * s：要格式化的数字
       * n：保留几位小数
       * */
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
      let l = s.split('.')[0].split('').reverse()
      let r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      return t.split('').reverse().join('') + '.' + r
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .user_wrap{
    padding-bottom: 140px;
    height: 100vh;
    overflow: auto;
    .top{
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      color: #fff;
      font-size: 28px;
      margin-bottom: 60px;
      .logo{
        width: 150px;
        height: 150px;
        margin: 60px auto 40px;
        display: block;
        background-image: url(../assets/images/logo.png);
        background-size: 100% 100%;
        border-radius: 50%;
        image{
        	border-radius: 50%;
        }
        .file {
					outline: none;
					opacity: 0;
					width: 100%;
					height: 100%;
					position: relative;
					top: -108px;
				}
      }
      .iconfont{
        position: absolute;
        right: 30px;
        top: 14px;
        font-size: 42px;
      }
    }
    .section{
      height: 110px;
      line-height: 110px;
      border-top: 1px solid $mainColor;
      background-color: #131210;
      margin: 0 40px 24px;
      font-size: 30px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      padding: 0 40px;
      .num{
        font-size: 32px;
        font-weight: 600;
        font-style: italic;
      }
    }
    .link{
      display: flex;
      flex-direction: column;
      .link_top{
        height: 80px;
        line-height: 80px;
        border-top: 1px solid $mainColor;
        background-color: #131210;
        margin: 0 40px;
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        padding: 0 40px;
        border-bottom: 1px solid #040301;
        .copy{
          color: $mainColor;
          font-size: 32px;
          width: max-content;
          height: 80px;
          background-color: transparent;
        }
      }
      .show_link{
        display: flex;
        font-size: 26px;
        padding: 10px 40px;
        line-height: 48px;
        color: #fff;
        background-color: #131210;
        margin: 0 40px;
        word-break: break-all;
      }
    }
    ul.list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 50%;
        margin: 70px 0 0;
        height: 40px;
        color: #fff;
        font-size: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 64px;
        &:nth-child(2n+1){
          border-right: 3px solid #1E1D1B;
        }
        img{
          width: 32px;
          height: 32px;
          margin-right: 16px;
        }
        .iconfont{
        	color:#D7A82B;
        	font-size:52px;
        	margin-right: 10px;
        }
      }
    }
  }
</style>
