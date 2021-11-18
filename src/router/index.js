/*
 * @Author: 41
 * @Date: 2021-11-13 20:05:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 22:03:51
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import test from '@/components/Sun/sun'
import cloud from '@/components/Cloud/cloud'
import snow from '@/components/snow/snow'

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
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: cloud
    },
    {
      path: '/snow',
      name: 'snow',
      component: snow
    }
  ]
})
