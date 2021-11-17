/*
 * @Author: 41
 * @Date: 2021-11-13 21:07:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-17 15:51:01
 * @Description:
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import audiobox from 'vue-audiobox'
import './assets/css/iconfont.css'
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://wthrcdn.etouch.cn'
/* eslint-disable no-new */
Vue.use(audiobox)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
