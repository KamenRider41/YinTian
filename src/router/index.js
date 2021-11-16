/*
 * @Author: 41
 * @Date: 2021-11-13 20:05:27
 * @LastEditors: 41
 * @LastEditTime: 2021-11-16 16:19:36
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import test from '@/components/switch'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
