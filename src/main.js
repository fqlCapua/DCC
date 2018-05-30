// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
let protocolStr = document.location.protocol
console.log(protocolStr)
Vue.prototype.axios = axios.create({
  baseURL: protocolStr=== 'https:'? 'https://api.zhongguozhaishi.com/': 'http://api.zhongguozhaishi.com/',
  timeout: 10000,
  withCredentials: false,
  // 这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
     data  =  JSON.stringify(data)
    return data
  }],

  // 设置Content-Type
headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
//Vue.prototype.axios.interceptors.response.use(res => {
//if (res.data.ret === 401) {
//  router.push('login')
//  Vue.prototype.$bus.$emit('alert', '请重新登录')
//}
//return res
//}, err => {
//console.log(err)
//})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})