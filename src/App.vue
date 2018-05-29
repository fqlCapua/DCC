<template>
  <div id="app">
    <router-view/>
    <alertPage></alertPage>
    <footerNav></footerNav>
  </div>
</template>

<script>
import alertPage from './components/alert'
import footerNav from './components/footer'
export default {
  name: 'App',
  components: {
    alertPage,
    footerNav
  }
}
</script>

<style>
@import url('//at.alicdn.com/t/font_640247_32mgeebvk2kmlsor.css');
@import './assets/scss/reset.scss';
@import './assets/scss/style.scss';
#app {
  min-height: 100vh;
  min-width: 100vw;
  background: #040301;
}
</style>
