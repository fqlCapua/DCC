<template>
  <div class="area_select" v-if="show" @touchstart="clearTimer">
    <div class="show_box">
      <h4 class="title">地區選擇<span class="fristCode">({{ fristCode }})</span></h4>
      <div class="area" ref="area" @scroll="scrollCode">
        <div class="eve" ref="eve" :class="{'select': selectIndex === index}" v-for="(item, index) in areaData" :key="index" @click="selectArea(index)">
          <p class="frist">地區: {{ item.name }}</p>
          <p class="two">Area: {{ item.en }}</p>
          <p class="three">國家代碼: +{{ item.tel }}</p>
        </div>
      </div>
      <div class="btn">
        <button class="button no" @click="close">取消</button>
        <button class="button" @click="select">選擇</button>
      </div>
    </div>
  </div>
</template>

<script>
import areaJson from '../assets/area/area_new.json'
export default {
  name: 'areaSelect',
  data () {
    return {
      fristCode: 'A',
      show: false,
      areaData: areaJson,
      selectIndex: '',
      timer: ''
    }
  },
  mounted () {
    this.$bus.$on('areaBoxShow', this.showBox)
  },
  beforeDestroy () {
    this.$bus.$off('areaBoxShow')
  },
  methods: {
    showBox (data) {
      this.selectIndex = data.index
      this.show = true
      let index = 0
      let addFlag = true
      for (let i in areaJson) {
        if (areaJson[i].en === data.area) addFlag = false
        if (addFlag) index++
      }
      this.$nextTick(() => {
        let scrollTop = this.$refs.eve[0].clientHeight * index
        let everySec = scrollTop / 3000 * 60
        this.timer = setInterval(() => {
          this.$refs.area.scrollTop = this.$refs.area.scrollTop + everySec
          if (this.$refs.area.scrollTop >= scrollTop) {
            clearInterval(this.timer)
            this.$refs.area.scrollTop = scrollTop
          }
        }, 1000 / 60)
      })
    },
    selectArea (index) {
      this.selectIndex = index
    },
    close () {
      this.show = false
    },
    select () {
      this.close()
      this.$bus.$emit('areaBoxSelect', {
        areaChinese: areaJson[this.selectIndex].name,
        area: areaJson[this.selectIndex].en,
        tel: areaJson[this.selectIndex].tel,
        index: this.selectIndex
      })
    },
    clearTimer () {
      if (this.timer) clearInterval(this.timer)
    },
    scrollCode () {
      let num = Math.ceil(this.$refs.area.scrollTop / this.$refs.eve[0].clientHeight) + ''
      this.fristCode = this.areaData[num].en.substr(0, 1)
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .area_select {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: none;
    .show_box {
      background: #000;
      position: absolute;
      top: 200px;
      left: 100px;
      width: 550px;
      height: 800px;
      border: 1px solid #f1c835;
      z-index: 5;
      border-radius: 40px;
      .title {
        color: #fff;
        text-align: center;
        font-size: 30px;
        line-height: 80px;
      }
      .area {
        width: 80%;
        height: 600px;
        margin: 0 auto;
        border: 1px solid #999;
        overflow: auto;
        color: #fff;
        font-size: 28px;
        line-height: 40px;
        .eve {
          padding: 10px 30px;
          border-bottom: 1px solid #999;
          &.select {
            color: $mainColor;
          }
        }
      }
      .btn {
        width: 80%;
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        .button {
          @include submitButton;
          margin: 0;
          height: 60px;
          width: 40%;
          margin-top: 20px;
          &.no {
            background: #999;
          }
        }
      }
    }
  }
</style>
