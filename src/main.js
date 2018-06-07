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
  baseURL: protocolStr=== 'https:'? 'https://dcc.dahebo.com/': 'http://dcc.dahebo.com/',
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

Vue.prototype.axios.interceptors.response.use(res => {
  if (res.data.ret == 401) {
     router.push('/login')
    // Vue.prototype.$bus.$emit('alert', '請登錄')
  }
  return res
}, err => {
  console.log(err)
})

//设置cookie
Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};

//获取cookie
Vue.prototype.getCookie=function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
      var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};
  Vue.prototype.delCookie=function (c_name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = this.getCookie(c_name);
  if (cval != null)
    document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
};
//  数字格式化
 Vue.prototype.formatNum = function (s, n) {
    /*
     * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + '';
    let l = s.split('.')[0].split('').reverse();
    let r = s.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    return t.split('').reverse().join('') + '.' + r
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
