<template>
  <div id="app">
    <pageHead></pageHead>
    <router-view/>
    <alertPage></alertPage>
    <alertCer></alertCer>
    <!--<orderSuccess></orderSuccess>-->
    <footerNav></footerNav>
  </div>
</template>

<script>
import alertPage from './components/alert'
import footerNav from './components/footer'
import pageHead from './components/page_head'
import alertCer from './components/alert-cer'
//import orderSuccess from './components/success'
export default {
  name: 'App',
  components: {
    alertPage,
    footerNav,
    pageHead,
    alertCer,
//    orderSuccess
  }
}
</script>

<style lang="scss">
  @import url('//at.alicdn.com/t/font_685934_3s60bp6lnlsdcxr.css');
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
