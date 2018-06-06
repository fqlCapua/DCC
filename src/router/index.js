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

import levelChange from '@/page/levelChange'
import subSuccess from '@/page/subSuccess'


import myTeam from '@/page/my_team'
import myShare from '@/page/my_share'
import teamReward from '@/page/team_reward'
import specialReward from '@/page/special_reward'
import assertReward from '@/page/assert_reward'
import accounts from '@/page/accounts'
import team from '@/page/team'
import rollOut from '@/page/roll_out'
import exchange from '@/page/exchange'
import walletList from '@/page/wallet_list'
import accountsList from '@/page/accounts_list'
import friendList from '@/page/friend_list'
import pageTab from '@/page/page_tab'
import forgetPassword from '@/page/forgetPassword'
import partnerRecord from '@/page/partner_record'
import c2cTradeDcc from '@/page/c2ctrade_dcc'
import c2cTradeUsdt from '@/page/c2ctrade_usdt'
import c2cTradeBuyOrder from '@/page/c2ctrade_buyOrder'
import c2cTradeOfftakeOrder from '@/page/c2ctrade_offtakeOrder'
import orderSuccess from '@/page/orderSuccess'
import c2cTradeBuy from '@/page/c2ctrade_buy'
import walletEwm from '@/page/wallet_ewm'
import c2ctradeOrderCompletion from '@/page/c2ctrade_orderCompletion'
import submitSuccess from '@/page/submitSuccess'
import authentication from '@/page/authentication'
Vue.use(Router)
export default new Router({
//	mode: 'history',
	routes: [{
			path: '/register',
			name: 'register',
			component: register
		},
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {

      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
		{
			path: '/c2cTradeUsdt',
			name: 'c2cTradeUsdt',
			component: c2cTradeUsdt
		},
		{
			path: '/orderSuccess',
			name: 'orderSuccess',
			component: orderSuccess
		},
		{
			path: '/c2cTradeBuyOrder',
			name: 'c2cTradeBuyOrder',
			component: c2cTradeBuyOrder
		},
		{
			path: '/c2cTradeOfftakeOrder',
			name: 'c2cTradeOfftakeOrder',
			component: c2cTradeOfftakeOrder
		},
		{
			path: '/c2cTradeDcc',
			name: 'c2cTradeDcc',
			component: c2cTradeDcc
		},
		{
			path: '/c2cTradeBuy',
			name: 'c2cTradeBuy',
			component: c2cTradeBuy
		},
			{
			path: '/c2ctradeOrderCompletion',
			name: '	c2ctradeOrderCompletion',
			component: c2ctradeOrderCompletion
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
			path: '/',   //主页
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
			path: '/levelChange',
			name: 'levelChange',
			component: levelChange
		},
		{
			path: '/subSuccess',
			name: 'subSuccess',
			component: subSuccess
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
			path: '/accounts',
			name: 'accounts',
			component: accounts
		},
		{
			path: '/team',
			name: 'team',
			component: team,
			children: [{
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
			path: '/accountsList',
			name: 'accountsList',
			component: accountsList
		},
		{
			path: '/friendList',
			name: 'friendList',
			component: friendList
		},
			{
			path: '/walletEwm',
			name: '	walletEwm',
			component: walletEwm
		},
			{
			path: '/submitSuccess',
			name: '	submitSuccess',
			component: submitSuccess
		},


	]
})
