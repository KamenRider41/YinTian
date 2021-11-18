<!--
 * @Author: 41
 * @Date: 2021-11-18 22:49:45
 * @LastEditors: 41
 * @LastEditTime: 2021-11-18 23:02:20
 * @Description:
-->
<template>
    <div class="clock_box">
        <div class="clock">
            <p id="time"></p>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    up (timeEl) {
      // 获取当前时间
      let date = new Date()
      // 获取时分秒
      let h = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      // 上午与下午
      let dayNight = 'AM'
      // 计算上午与下午
      if (h > 12) {
        h = h - 12
        dayNight = 'PM'
      }
      // 如果时间小于10则前面补充0
      if (h < 10) { h = '0' + h }
      if (m < 10) { m = '0' + m }
      if (s < 10) { s = '0' + s }
      // 拼接时间并且赋值给time元素的文本中，从而显示
      timeEl.textContent = h + ':' + m + ':' + s + ' ' + dayNight
    }
  },
  mounted () {
    let time = document.querySelector('#time')
    setInterval(() => {
      this.up(time)
    }, 1000)
  }
}
</script>

<style scoped>
.clock_box {
    position: relative;
    width: 380px;
    height: 80px;
    border-radius: 10px;
    background-image: linear-gradient(135deg, var(--color2), var(--color4), var(--color6));
    /* 居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    animation: animate 4s linear infinite;
}

.clock_box::after, .clock_box::before {
    position: absolute;
    content: "";
    background-image: inherit;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 10px;
    filter: blur(15px);
}

.clock_box::before {
    filter: blur(100px);
}

.clock {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    background-color: #2b2a2a;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.clock p {
    font-size: 50px;
    font-weight: bold;
    color: transparent;
    letter-spacing: 2px;
    background-image: linear-gradient(135deg, var(--color2), var(--color4), var(--color6));
    background-clip: text;
    -webkit-background-clip: text;
}

@keyframes animate {
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
