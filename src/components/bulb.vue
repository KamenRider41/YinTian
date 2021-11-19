<!--
 * @Author: 41
 * @Date: 2021-11-17 15:25:38
 * @LastEditors: 41
 * @LastEditTime: 2021-11-19 10:10:54
 * @Description:
-->
<template>
    <div class="light">
        <div class="wire"></div>
        <div class="bulb" @mybuttonFlag='changBulb($event)'>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
import Button from '@/components/button.vue'
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    flag () {
      console.log('bulb get button message')
      let bulb = document.querySelector('.bulb')
      if (this.flag === true) {
        bulb.classList.add('on')
      } else {
        bulb.classList.remove('on')
      }
    }
  },
  data () {
    return {

    }
  },
  components: {
    Button
  },
  methods: {
    upBulb () {
      let bulb = document.querySelector('.bulb')
      bulb.classList.add('on')
    },
    downBulb () {
      let bulb = document.querySelector('.bulb')
      bulb.classList.add('remove')
    }
  }
}
</script>

<style scoped>
.light{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.bulb{
    position: absolute;
    top: 55%;
    width: 80px;
    height: 80px;
    background: #444;
    border-radius: 50%;
    z-index: 2;
}
.on{
    background: #fff;
    box-shadow: 0 0 50px #fff,
    0 0 100px #fff,
    0 0 150px #fff,
    0 0 200px #fff,
    0 0 250px #fff,
    0 0 300px #fff,
    0 0 350px #fff;
}
.bulb::before{
    content: '';
    position: absolute;
    top: -50px;
    left:22.5px;
    width: 35px;
    height: 80px;
    background: #444;
    border-top: 30px solid #000;
    border-radius: 10px;
}
.on::before{
    background: #fff;
}
.on::after{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 120px;
    height: 120px;
    background: #fff;
    border-radius: 50%;
    filter: blur(40px);
}
.on::after{
    background: #fff;
}
.bulb span:nth-child(1){
    position: absolute;
    display: block;
    top: -16px;
    left: -4px;
    width: 30px;
    height: 30px;
    background: transparent;
    transform: rotate(342deg);
    border-bottom-right-radius: 40px;
    box-shadow: 20px 20px 0 10px #444;
}
.on span:nth-child(1){
    box-shadow: 20px 20px 0 10px #fff;
}
.bulb span:nth-child(2){
    position: absolute;
    display: block;
    top: -16px;
    right: -4px;
    width: 30px;
    height: 30px;
    background:transparent;
    transform: rotate(17deg);
    border-bottom-left-radius: 40px;
    box-shadow: -20px 20px 0 10px #444;
}
.on span:nth-child(2){
    box-shadow: -20px 20px 0 10px #fff;
}
.wire{
    position: absolute;
    bottom:50%;
    left: calc(50% - 2px);
    width: 4px;
    height: 60vh;
    background: #000;
    z-index: 1;
}
</style>
