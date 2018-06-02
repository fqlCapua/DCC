<template>
  <div id="picker" v-show="show">
    <div class="picker_bg" @click="closeBox"></div>
    <div class="picker_inner">
      <h3 class="picker_title">{{ title }}<button class="submit" @click="submit">确认</button></h3>
      <div class="picker_list_box" v-for="(item, index) in data" :key="index">
        <dl class="picker_list">
          <dt class="picker_select_title">{{ item.name }}</dt>
          <dd class="picker_data" @scroll="listScroll" :data-index="index" :ref="index">
            <p class="picker_info" v-for="(it, i) in item.data" :key="i">{{ it }}</p>
          </dd>
        </dl>
        <div class="picker_change"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'picker',
    data () {
      return {
        // 是否显示
        show: false,
        // 选择后的回调函数
        callBack: () => {},
        // 标题
        title: '獎勵時間篩選',
        // 选择日期
        type: 'day',
        // 数据
        data: {
          year: {
            name: '年',
            data: []
          },
          month: {
            name: '月',
            data: []
          },
          day: {
            name: '日',
            data: []
          }
        },
        // 设置全局倒计时，方便清除
        setTime: {
          year: null,
          month: null,
          day: null
        },
        // 设置全局默认滚动计时，方便滚动
        setInter: {
          year: null,
          month: null,
          day: null
        },
        // 全局提供时间
        getData: {
          year: null,
          month: null,
          day: null
        },
        // 全局默认时间,只读
        defaultData: {
          year: (new Date()).getFullYear(),
          month: (new Date()).getMonth(),
          day: (new Date()).getDate()
        }
      }
    },
    mounted () {
      this.$bus.$on('timerShow', data => {
        this.show = data.flag
        this.callBack = data.callBack
        this.type = data.type || 'day'
        this.init()
      })
    },
    methods: {
      // 初始化
      init () {
        if (this.getData.day === null) {
          this.getData.year = this.defaultData.year
          this.getData.month = this.defaultData.month
          this.getData.day = this.defaultData.day
        }
        // 产生年份
        this.data.year.data = []
        for (let i = 0; i < 20; i++) {
          this.data.year.data.push(this.defaultData.year - i)
        }
        this.data.year.data.reverse()
        this.$nextTick(() => {
          if (!this.$refs.year[0]) return false
          this.$refs.year[0].scrollTop = parseInt(getComputedStyle(this.$refs.year[0].childNodes[0], null)['line-height']) * 19
          if (this.type !== 'year') this.changeMonths(this.getData.year)
        })
      },
      // 更改月份
      changeMonths (year) {
        // 清空后赋值
        this.data.month.data = []
        for (let i = 0; i < 12; i++) {
          this.data.month.data.push(i + 1)
        }
        this.$nextTick(() => {
          // 判断是否需要更改滚动条
          if (year === this.defaultData.year) {
            this.$refs.month[0].scrollTop = parseInt(getComputedStyle(this.$refs.month[0].childNodes[0], null)['line-height']) * this.getData.month
          } else {
            this.$refs.month[0].scrollTop = 0
          }
          if (this.type === 'day') this.changeDays(year, this.getData.month)
        })
      },
      // 获取更改
      changeDays (year, month) {
        let theYear = year
        let theMonth = month
        // 判断是否是最后一月
        if (month === 11) {
          theYear++
          theMonth = 0
        }
        // 获取当前月最后一秒时间
        let nextMonthTime = (new Date(theYear, theMonth + 1, 1)).getTime() - 1
        // 获取当前月最后一天
        let theMonthLast = (new Date(nextMonthTime)).getDate()
        // 清空后赋值
        this.data.day.data = []
        for (let i = 0; i < theMonthLast; i++) {
          this.data.day.data.push(i + 1)
        }
        this.$nextTick(() => {
          // 判断是否需要更改滚动条
          if (year === this.defaultData.year && month === this.defaultData.month) {
            this.$refs.day[0].scrollTop = parseInt(getComputedStyle(this.$refs.day[0].childNodes[0], null)['line-height']) * (this.getData.day - 1)
          } else {
            this.$refs.day[0].scrollTop = 0
          }
        })
      },
      // 滚动事件
      listScroll (e) {
        // 获取第几个
        let doNode = e.target.getAttribute('data-index')
        this.getSelectData(doNode)
      },
      // 返回当前选择的值
      getSelectData (doNode) {
        clearTimeout(this.setTime[doNode])
        this.setTime[doNode] = setTimeout(() => {
          // 获取滚动条高度
          let boxScrTop = this.$refs[doNode][0].scrollTop
          // 获取顶部高度
          let padTop = parseFloat(getComputedStyle(this.$refs[doNode][0], null)['padding-top'])
          // 获取行高
          let lineHeight = parseInt(getComputedStyle(this.$refs[doNode][0].childNodes[0], null)['line-height'])
          // 返回值
          if (boxScrTop % lineHeight === 0) return this.getData[doNode] = this.data[doNode].data[boxScrTop / lineHeight]
          // 将要前往的位置
          let toTop = Math.floor(boxScrTop / lineHeight) * lineHeight
          // 位置差
          let goTop = toTop - boxScrTop
          // 每次滚动距离
          let everyHeight = goTop / 10
          // 清除上次的定时
          clearInterval(this.setInter[doNode])
          // 定时
          let timeNum = 0
          this.setInter[doNode] = setInterval(() => {
            if (++timeNum !== 10) {
              this.$refs[doNode][0].scrollTop = boxScrTop + everyHeight * timeNum
            } else {
              this.$refs[doNode][0].scrollTop = toTop
              clearInterval(this.setInter[doNode])
              // 滚动后赋值
              if (doNode === 'month') {
                this.getData[doNode] = this.$refs[doNode][0].scrollTop / lineHeight
              } else {
                this.getData[doNode] = this.data[doNode].data[this.$refs[doNode][0].scrollTop / lineHeight]
              }
              this.dataRefresh(doNode)
            }
          }, 20)
        }, 300)
      },
      // 触发数据更新事件
      dataRefresh (doNode) {
        if (doNode === 'year' && this.type !== 'year') {
          this.changeMonths(this.getData.year)
        } else if (doNode === 'month' && this.type === 'day') {
          this.changeDays(this.getData.year, this.getData.month)
        }
      },
      // 提交
      submit () {
        this.callBack(this.getData.year + '-' 
                      + (this.getData.month >= 10 ? this.getData.month : '0' + this.getData.month) + '-'
                      + (this.getData.day >= 10 ? this.getData.day : '0' + this.getData.day))
        this.closeBox()
      },
      // 关闭
      closeBox () {
        this.show = false
      }
    }
  }
</script>
<style lang="scss">
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
      display: flex;
      justify-content: space-around;
      padding-top: 60px;
      .picker_title {
        font-size: 34px;
        color: $mainColor;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid $mainColor;
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
          color: $mainColor;
          font-size: 28px;
          width: 80px;
          background: none;
        }
      }
      .picker_list_box{
        flex-grow: 2;
        position: relative;
        .picker_list {
          .picker_select_title {
            padding-top: 10px;
            line-height: 50px;
            font-size: 34px;
            font-weight: 900;
            background: $pickerBgColor;
            z-index: 2;
            position: relative;
          }
          .picker_data {
            height: 260px;
            overflow: scroll;
            line-height: 60px;
            font-size: 28px;
            color: #666;
            padding: 100px 0;
            position: relative;
            &:-webkit-scrollbar {
              display: none;
            }
          }
        }
        .picker_change {
          position: absolute;
          width: 120px;
          height: 1px;
          background: $mainColor;
          top: 215px;
          left: 50%;
          margin-left: -60px;
        }
        &:before {
          content: '';
          position: absolute;
          top: 50px;
          left: 0;
          width: 100%;
          height: 1px;
          background: $pickerBgColor;
          box-shadow: 0 25px 60px 40px $pickerBgColor;
          z-index: 2;
        }
        &:after {
          content: '';
          position: absolute;
          bottom: 50px;
          left: 0;
          width: 100%;
          height: 1px;
          background: $pickerBgColor;
          box-shadow: 0 25px 60px 40px $pickerBgColor;
          z-index: 2;
        }
      }
    }
  }
</style>