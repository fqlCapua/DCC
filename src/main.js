// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.prototype.axios = axios.create({
  baseURL: 'http://121.42.251.110:18888/index/',
  timeout: 10000,
  withCredentials: true,
  // 这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  // 设置Content-Type
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

Vue.prototype.axios.interceptors.response.use(res => {
  if (res.data.status === 2000) {
    router.push('login')
    Vue.prototype.$bus.$emit('alert', '請登錄')
  }
  return res
}, err => {
  console.log(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
