<!--
 * @Author: 41
 * @Date: 2021-11-13 21:07:25
 * @LastEditors: 41
 * @LastEditTime: 2021-11-15 09:29:46
 * @Description:
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
