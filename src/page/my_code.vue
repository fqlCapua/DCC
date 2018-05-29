<template>
  <div class="my_code">
    <p class="iconfont icon-fanhuijiantou" @click="back"></p>
    <img class="code_img" :src="code" alt="用戶二維碼">
  </div>
</template>

<script>
export default {
  name: 'myCode',
  data () {
    return {
      code: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('Users/mine_qrocde').then(({data}) => {
        this.code = data.data
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  .my_code {
    position: relative;
    .icon-fanhuijiantou {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100px;
      text-align: center;
      line-height: 80px;
      font-size: 40px;
    }
    .code_img {
      width: 100vw;
      height: 100vh;
      display: block;
    }
  }
</style>
