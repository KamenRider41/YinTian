<!--
 * @Author: 41
 * @Date: 2021-11-16 08:46:19
 * @LastEditors: 41
 * @LastEditTime: 2021-11-16 10:04:39
 * @Description:
-->

<template>
    <div class="container">
        <canvas id="tutorial" :style="style"></canvas>
        <div class="temp" :style="style"></div>
        <img src="https://mdn.mozillademos.org/files/1456/Canvas_sun.png" alt="">
    </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '600px'
    },
    speed: {
      type: Number,
      default: 5
    }
  },
  watch: {

  },
  computed: {
    style () {
      return {
        height: this.height,
        width: this.width,
        animation: 'turn ' + this.speed + 's linear infinite'
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    init () {
    //   var canvas = document.getElementById('tutorial')
    //   if (canvas.getContext) {
    //     var ctx = canvas.getContext('2d')
    //     // drawing code here
    //   } else {
    //     // canvas-unsupported code here
    //   }
    }
  }
}
</script>

<style scoped>
/* canvas{border:1px solid black } */
.container{
    background-color: blueviolet;
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.temp{
    border:1px solid pink;
    background-color: pink;
}
.tutorial,.temp,img{
    animation:turn 4s linear infinite
}
@keyframes turn{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
}
</style>
