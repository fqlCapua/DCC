import Vue from 'vue'
import Router from 'vue-router'

import register from '@/page/register'
import login from '@/page/login'
import changeLanguage from '@/page/change_language'
import index from '@/page/index'
import noticeList from '@/page/notice_list'
import noticeDetail from '@/page/notice_detail'
import buy from '@/page/buy'
import userCenter from '@/page/user-center'
import market from '@/page/market'
import submitOrder from '@/page/submit_order'
import myCode from '@/page/my_code'
import declarationFrom from '@/page/declaration_from'
import waitOpen from '@/page/wait_open'
import setting from '@/page/setting'
import setLoginPsd from '@/page/setLoginPsd'
import setDealPsd from '@/page/setDealPsd'
import realName from '@/page/realName'
import shareReward from '@/page/share_reward'

import myTeam from '@/page/my_team'
import myShare from '@/page/my_share'

import teamReward from '@/page/team_reward'
import specialReward from '@/page/special_reward'
import assertReward from '@/page/assert_reward'

import c2c from '@/page/c2c'
import team from '@/page/team'
import rollOut from '@/page/roll_out'
import exchange from '@/page/exchange'
import partnerRecord from '@/page/partner_record'

import walletList from '@/page/wallet_list'
import c2cList from '@/page/c2c_list'
import friendList from '@/page/friend_list'

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
    },
    {
      path: '/declarationFrom',
      name: 'declarationFrom',
      component: declarationFrom
    },
    {
      path: '/waitOpen',
      name: 'waitOpen',
      component: waitOpen
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/setLoginPsd',
      name: 'setLoginPsd',
      component: setLoginPsd
    },
    {
      path: '/setDealPsd',
      name: 'setDealPsd',
      component: setDealPsd
    },
    {
      path: '/realName',
      name: 'realName',
      component: realName
    },
    {
      path: '/shareReward',
      name: 'shareReward',
      component: shareReward
    },
    {
      path: '/c2c',
      name: 'c2c',
      component: c2c
    },
    {
      path: '/team',
      name: 'team',
      component: team,
      children: [
		      {
		        path: 'myTeam',
		        name: 'myTeam',
		        component: myTeam
		      },
		      {
		        path: 'myShare',
		        name: 'myShare',
		        component: myShare
		      } 
      ]
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: exchange
    },
    {
      path: '/partnerRecord',
      name: 'partnerRecord',
      component: partnerRecord
    },
    {
      path: '/rollOut',
      name: 'rollOut',
      component: rollOut
    },
    {
      path: '/teamReward',
      name: 'teamReward',
      component: teamReward
    },
    {
      path: '/specialReward',
      name: 'specialReward',
      component: specialReward
    },
    {
      path: '/assertReward',
      name: 'assertReward',
      component: assertReward
    },
    {
      path: '/noticeList',
      name: 'noticeList',
      component: noticeList
    },
    {
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: noticeDetail
    },
    {
      path: '/walletList',
      name: 'walletList',
      component: walletList
    },
    {
      path: '/c2cList',
      name: 'c2cList',
      component: c2cList   
    },
    {
      path: '/friendList',
      name: 'friendList',
      component: friendList 
    }
  ]
})