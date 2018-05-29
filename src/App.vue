<template>
  <div id="app">
    <pageHead></pageHead>
    <router-view/>
    <alertPage></alertPage>
    <footerNav></footerNav>
  </div>
</template>

<script>
import alertPage from './components/alert'
import footerNav from './components/footer'
import pageHead from './components/page_head'
export default {
  name: 'App',
  components: {
    alertPage,
    footerNav,
    pageHead
  }
}
</script>

<style lang="scss">
  @import url('//at.alicdn.com/t/font_640247_uf8t4gbnjsgu8fr.css');
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
