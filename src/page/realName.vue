<template>
<div class="real-name">
<div class="cert">
   <!--實名認證-->
     <div class="identity">
         <img  alt="" :src="card" width="100%" height="100%">
       <input type="file" class="file"  @change="fileImage">
     </div>
  <p>點擊開始認證 <span>人相面</span></p>
</div>
    <label class="label" v-for="(item, index) in form" :key="index">
      <span class="name">{{item.name}}</span>
      <input class="input" type="text" v-model="item.value">
    </label>
</div>
</template>
<script>
  export default {
    name: 'realName',
    data () {
      return {
      	card: require('../assets/images/file.png'),
        form: {
          name: {
            name: '姓名',
            value: "凉哈哈"
          },
          identity: {
            name: "身份證號",
            value: "41022119950216XXXX"
          },
        },

      }
    },
    mounted (){
      this.$bus.$emit('pageHead', '實名認證')

    },
    destroyed () {
      this.$bus.$emit('pageHead')
    },
    methods: {
      fileImage:function(e){
      	let $that = this
        var file = e.target.files[0];
        var reader = new FileReader();
          reader.readAsDataURL(file); // 读出 base64
          reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            var dataURL = reader.result;
            console.log(dataURL)
            $that.card = dataURL
          };
      }
       }

  }
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .real-name{
    padding-top:100px;
  .cert{
    background: #3f3c3c;
    width: 100%;
    height:515px;
    padding-top:20px;
    margin-bottom:20px;
    .identity{
      width:565px;
      height: 359px;
      margin: 0 auto;
      /*border:1px solid #fff;*/
      position: relative;
      .file{
        outline: none;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
      img{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      color:#fff;
      font-size: 28px;
      margin-top: 22px;
      span{
         color:#d7a82b;
        margin-left: 35px;

      }
    }
  }
      .label {
        height: 128px;
        display: block;
        border-bottom: 1px solid #424652;
        padding-top: 50px;
        background: #3f3c3c;
        .name {
          float: left;
          color: #fff;
          font-size: 30px;
          width: 218px;
          padding-left:30px;
          box-sizing: border-box;
          margin-top:5px;
        }
        .input, .input_code {
          float: left;
          background: none;
          color: #fff;
          padding-right: 10px;
          height: 50px;
          font-size:30px;
        }
        .input_button {
          float: right;
          padding: 0 10px;
          background: none;
          color: #d7a72e;
          font-size: 28px;
          height: 50px;
        }
      }
    .label:last-child{
       border-bottom:none
    }
    }
</style>
