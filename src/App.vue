<!--
 * @Author: 41
 * @Date: 2021-11-13 21:07:25
 * @LastEditors: 41
 * @LastEditTime: 2021-11-17 10:37:13
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
  height: 1000px;
  /* margin-top: 60px; */
}
.fly {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
}
.bg-fly-circle1 {
  left: 13%;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.07) 0%, rgba(48, 33, 236, 0.04) 100%);
  /* background:red; */
  animation: move 2.5s linear infinite;
}
.bg-fly-circle2 {
  left: 15%;
  top: 60%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(241, 31, 49, 0.08) 0%, rgba(241, 6, 6, 0.04) 100%);
  /* background:red; */
  animation: move 3s linear infinite;
}
.bg-fly-circle3 {
  right: 10%;
  top: 140px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(169, 32, 233, 0.1) 0%, rgba(174, 9, 240, 0.04) 100%);
  /* background:red; */
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  right: 17%;
  top: 60%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(230, 18, 117, 0.1) 0%, rgba(241, 7, 116, 0.04) 100%);
  /* background:red; */
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
