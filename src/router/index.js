/*
 * @Author: 41
 * @Date: 2021-11-13 20:05:27
 * @LastEditors: 41
 * @LastEditTime: 2021-11-13 20:12:28
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
import temp from '@/components/temp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: temp
    }
  ]
})
