<template>
  <div id="picker" v-show="show">
    <div class="picker_bg" @click="closeBox"></div>
    <div class="picker_inner">
      <h3 class="picker_title">{{ title }}<button class="submit" @click="submit">确认</button></h3>
         <div class="address">
         	    <div class="address_title" v-for="(item,index) in addressTitle" :key="index" @click="resetAddress(item)">{{item.title}}</div>
         </div>
         <ul class="address_content">
         	   <li class="address_list" v-for="(item,index) in address" :key="index" @click="selectA(item)">
         	   	 <span>{{item.name}}</span>
         	   	 <span class="iconfont" :class="{ 'icon-duihao' : addClass === item.code || provinceC === item.code || cityC === item.code  || countyC == item.code}"></span>
         	   </li>
         </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'picker',
    data () {
      return {
      	code:"",
      	addClass:"",
      	provinceC:"",
      	cityC:"",
      	countyC:"",
        // 是否显示
        show: false,
        // 选择后的回调函数
        callBack: () => {},
        // 标题
        title: '選擇地區',
        // 选择地区
        address:[],
        addressTitle:{
        	//省
        	  province:{
        	  	title:"請選擇",
        	  	code:"",
        	  	level:1
        	  }, 
        	  //市
        	  city:{
        	  	title:"請選擇",
        	  	code:"",
        	  	level:2
        	  },  
        	  //县
        	  county:{
        	  	title:"請選擇",
        	  	code:"",
        	  	level:3
        	  }  
        }
        
      }
    },
    mounted () {
      this.$bus.$on('myAddress', data => {
        this.show = data.flag
        this.callBack = data.callBack
        this.init()
      })
    },
    methods: {
      // 初始化
      init () {
      	  this.getAddress(0)
      },
      // 提交
      submit () {
      	  let dataObj = {}
      	  dataObj.addressStr = this.addressTitle.province.title +"-"+ this.addressTitle.city.title +"-"+ this.addressTitle.county.title;
      	if(dataObj.addressStr.indexOf("請選擇")!== -1) return this.$bus.$emit('alert', '請選擇地區(省/市/縣)')
      	
      	dataObj.code =  this.addressTitle.county.code
        this.callBack(dataObj) //
        this.closeBox()
      },
      // 关闭
      closeBox () {
        this.show = false
      },
      getAddress(pid) {
      	  this.axios.post('citydata', {
          pid:pid
        }).then(({data}) => {
            this.address = data.data
        })
      },
      selectA (item){
      	 this.addClass = item.code
      	 if(item.level == 1){
      	 	  this.addressTitle.province.title = item.name
      	 	  this.addressTitle.city.title = "請選擇"
      	 	  this.addressTitle.county.title = "請選擇"
      	 	  
      	 	  this.addressTitle.province.code = item.code
      	 	  this.provinceC = item.code
      	 	  this.getAddress(item.code)
      	 }else if(item.level == 2){
      	 	   this.addressTitle.city.title = item.name
      	 	   this.addressTitle.city.code = item.code
      	 	   this.addressTitle.county.title = "請選擇"
      	 	  
      	 	  this.cityC = item.code
      	 	   this.getAddress(item.code)
      	 }else if(item.level == 3){
      	 	  this.addressTitle.county.title = item.name 
      	 	  this.addressTitle.county.code = item.code
      	 	  this.countyC = item.code
      	 }
      },
      resetAddress (item){
      	  if(item.level == 1){
      	    	this.getAddress(0)
      	  }else if(item.level == 2){
      	  	let code =  this.addressTitle.province.code
      	  	 this.getAddress(code)
      	  }else if(item.level == 3){
      	  	let code =  this.addressTitle.city.code
      	  	 this.getAddress(code)
      	  }
      	  
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  $pickerBgColor: #fff;
  #picker {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    .picker_bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: -1;
    }
    z-index: 11;
    .picker_inner {
      width: 100vw;
      height: 400px;
      background: $pickerBgColor;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      padding-top: 60px;
      .picker_title {
        font-size: 34px;
        color: #4a66c2;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #4a66c2;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: $pickerBgColor;
        .submit {
          position: absolute;
          top: 0;
          right: 0;
          height: 60px;
          color: #4a66c2;
          font-size: 28px;
          width: 80px;
          background: none;
        }
      }
      .address{
      	width: 100%;
      	height: 50px;
      	display: flex;
      	justify-content:space-between;
      	.address_title{
      		width: 33.333%;
      		  color:#444;
      		  font-size:28px;
      		  line-height: 50px;
      		  text-align: center;
      	}
      }
      .address_content{
      	width: 100%;
      	height: 280px;
      	overflow-y: scroll;
      	.address_list{
      		width: 33.333%;
      		color: #555;
      		line-height: 50px;
      		height: 50px;
      		text-align: center;
      		.iconfont{
      			color: #007AFF;
      			float: right;
      			display: inline-block;
      			width: 30px;
      			height: 20px;
      		}
      	}
      }
    }
  }
</style>