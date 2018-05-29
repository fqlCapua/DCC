import Vue from 'vue'
import Router from 'vue-router'

import register from '@/page/register'
import login from '@/page/login'
import changeLanguage from '@/page/change_language'
import index from '@/page/index'
import buy from '@/page/buy'
import userCenter from '@/page/user-center'
import market from '@/page/market'
import submitOrder from '@/page/submit_order'
import myCode from '@/page/my_code'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/changeLanguage',
      name: 'changeLanguage',
      component: changeLanguage
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index1',
      component: index
    },
    {
      path: '/buy',
      name: 'buy',
      component: buy
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/market',
      name: 'market',
      component: market
    },
    {
      path: '/submitOrder',
      name: 'submitOrder',
      component: submitOrder
    },
    {
      path: '/myCode',
      name: 'myCode',
      component: myCode
    }
  ]
})
