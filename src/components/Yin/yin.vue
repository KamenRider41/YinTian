<template>
  <div class="yin">
    <div class="container">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  props: {
    analyser: null,
  },
  data() {
    return {
      canvasElement: null,
      canvasCtx: null,
      dataArray: Array,
      bufferLength: 0,
      myContainer: [],
      colorList: [
        "#00000000",
        "#55555555",
        "#88888888",
        "#eeeeeeee",
        "#ffffffff",
      ],
    };
  },

  mounted() {
    this.canvasElement = document.getElementById("canvas");

    if (this.analyser !== null) {
      this.initAudio();
      this.draw();
    }
  },

  methods: {
    //  初始化
    initAudio() {
      // 创建频率数组
      this.analyser.fftSize = 64;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
    },

    // 绘图
    draw() {
      let { canvasElement: canvas } = this;
      if (canvas.getContext) {
        this.canvasCtx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 创建气泡，渲染时重复构建气泡样式

        this.createBubble();
        this.renderFrame();
      } else {
        alert("Your Browser can't support the canvas");
      }
    },

    // 创建气泡
    createBubble() {
      for (let i = 0; i < this.bufferLength; i++) {
        let x = 0.7025* canvas.width;
        let y = 0.6* canvas.height;
        let speedX = (Math.random() - 0.5) * 0.01;
        let speedY = (Math.random() - 0.5) * 0.01;
        let color =
          this.colorList[Math.floor(Math.random() * this.colorList.length)];
        let radius = 0;
        this.myContainer.push({ x, y, speedX, speedY, radius, color });
      }
    },

    // 渲染
    renderFrame() {
      let { canvasCtx, canvasElement: canvas } = this;

      // 清空
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(this.renderFrame);
      this.analyser.getByteFrequencyData(this.dataArray);

      // 更新绘制
      this.myContainer.forEach((ball, index) => {
        let { x, y, speedX, speedY, radius, color } = ball;
        // console.log(ball.x);
        let frequencyVolume = this.dataArray[index];

        canvasCtx.beginPath();
        canvasCtx.arc(x, y, radius, 0, Math.PI * 2, false);
        canvasCtx.fillStyle = color;
        canvasCtx.fill();

        if (x + radius > canvas.width || x - radius < 0) {
          speedX = -speedX;
          x = x + speedX;
        }
        if (y + radius > canvas.height || y - radius < 0) {
          speedY = -speedY;
          y = y + speedY;
        }
        x = x + speedX;
        y = y + speedY;
        radius = frequencyVolume - 90 > 0 ? (frequencyVolume - 90) * 1.5 : 0;

        ball.x = x;
        ball.y = y;
        ball.speedX = speedX;
        ball.speedY = speedY;
        ball.radius = radius;
        ball.color = color;
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.cloud {
  /* position: fixed; */
  /* position: relative; */
  top: 0;
  left: 0;
  /* width: 100vw;
    height: 100vh; */
  z-index: -10;
  /* background-image: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%); */
}
#canvas {
  /* border: 1px solid black; */
  display: block;
}
</style>
