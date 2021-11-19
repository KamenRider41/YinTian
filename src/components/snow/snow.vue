<!--
 * @Author: 41
 * @Date: 2021-11-19 09:30:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 12:53:17
 * @Description:
-->
<template>
  <div class="snow">
    <div class="box" />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    analyser: null,
    state:Number
  },
  data() {
    return {
      canvasElement: null,
      dataArray: Array,
    };
  },
  mounted() {
    this.draw();
    if (this.analyser !== null) {
      this.initAudio();
    }
  },

  methods: {
    //  初始化
    initAudio() {
      // 创建频率数组
      this.analyser.fftSize = 64;
      let bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
    },

    draw() {
      let that = this;
      let box = document.querySelector(".box");
      // 最大宽度
      let maxWidth = box.offsetWidth;
      // 最大高度
      let maxHeight = box.offsetHeight;

      setInterval(() => {
        snowMove();
      }, 200);

      function snowMove() {
        // 1.js 创建 img
        let snowImg = document.createElement("img");
        snowImg.className = "snow";
        // 2.图片大小 随机
        snowImg.style.width = parseInt(Math.random() * 25 + 5) + "px";
        // 3.图片位置 随机
        snowImg.style.left = parseInt(Math.random() * maxWidth) + "px";
        snowImg.src = "../../../static/img/xuehua.webp";
        box.appendChild(snowImg);
        // 4.下落速度 随机
        let speed = parseInt(Math.random() * 35 + 5);
        let initWidth = parseInt(Math.random() * 25 + 5) + "px";

        let tid = setInterval(() => {
          // 修改高度
          let top = snowImg.offsetTop;
          if (top > maxHeight || that.state != 5) {
            box.removeChild(snowImg);
            clearInterval(tid);
          } else {
            top += speed;
            snowImg.style.top = top + "px";
          }

          // 音频分析，修改大小
          let lastDataArray = [...that.dataArray];
          that.analyser.getByteFrequencyData(that.dataArray);
          let ratio = 0;
          for (let i = 0; i < that.dataArray.length; i++) {
            ratio += that.dataArray[i] / (lastDataArray[i] + 1);
          }
          ratio = ratio / that.dataArray.length;

          if (ratio > 0.6 && Math.random() > ratio) {
            let lastWidth = parseInt(snowImg.style.width);
            snowImg.style.width = lastWidth + parseInt(ratio * 30) + "px";
          } else {
            snowImg.style.width = initWidth;
          }
        }, 100);
      }
    },
  },
  watch: {
    analyser() {
      this.initAudio();
    },
  },
};
</script>

<style>
.box {
  overflow: hidden;
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.box .snow {
  /* background-color: blue; */
  position: absolute;
  left: 0px;
  top: 50px;
  transition: all 0.5s ease-out;
  animation: rotate 6s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
