<template>
  <div id="app">
    <pageHead></pageHead>
    <router-view/>
    <alertPage></alertPage>
    <alertCer></alertCer>
    <footerNav></footerNav>
  </div>
</template>

<script>
import alertPage from './components/alert'
import footerNav from './components/footer'
import pageHead from './components/page_head'
import alertCer from './components/alert-cer'
export default {
  name: 'App',
  components: {
    alertPage,
    footerNav,
    pageHead,
    alertCer
  }
}
</script>

<style lang="scss">
<<<<<<< .mine
  @import url('//at.alicdn.com/t/font_685934_9mvrgohdqqnz5mi.css');
  @import './assets/scss/reset.scss';
  @import './assets/scss/style.scss';
  #app {
    min-height: 100vh;
    min-width: 100vw;
    background: #040301;
    .pad_top {
      padding-top: 100px;
    }
  }
</style>
