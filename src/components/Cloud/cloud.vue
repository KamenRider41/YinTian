<template>
  <div class="cloud">
    <div class="container">
      <canvas id="canvas"></canvas>
    </div>
    <div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
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
        "#F7B2B78a",
        "#F7717D8a",
        "#DE639A8a",
        "#7F29828a",
        "#16001E8a",
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
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 1;
        let speedY = (Math.random() - 0.5) * 1;
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
        console.log(ball.x);
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
.bubble {
  position: absolute;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: inset 0 0 8px #fff;
  animation: flutter 10s infinite;
  opacity: 0;
}

@keyframes flutter {
  0% {
    transform: translateX(0);
    bottom: -100px;
    opacity: 1;
  }

  50% {
    transform: translateX(100px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0px);
    bottom: 100%;
    opacity: 0;
  }
}

.bubble:nth-child(1) {
  left: -10%;
  width: 50px;
  height: 50px;
  animation-duration: 9s;
  animation-delay: 0.1s;
}

.bubble:nth-child(2) {
  left: 15%;
  width: 50px;
  height: 50px;
  animation-duration: 6s;
  animation-delay: 1.5s;
}

.bubble:nth-child(3) {
  left: 20%;
  width: 60px;
  height: 60px;
  animation-duration: 10s;
}

.bubble:nth-child(4) {
  left: 30%;
  width: 30px;
  height: 30px;
  animation-duration: 5.5s;
  animation-delay: 1.5s;
}

.bubble:nth-child(5) {
  left: 40%x;
  width: 50px;
  height: 50px;
  animation-duration: 12s;
}

.bubble:nth-child(6) {
  left: 50%;
  width: 20px;
  height: 20px;
  animation-duration: 6s;
  animation-delay: 1s;
}

.bubble:nth-child(7) {
  left: 60%;
  width: 40px;
  height: 40px;
  animation-duration: 8s;
  animation-delay: 1s;
}

.bubble:nth-child(8) {
  left: 65%;
  width: 60px;
  height: 60px;
  animation-duration: 15s;
}

.bubble:nth-child(9) {
  left: 80%;
  width: 55px;
  height: 55px;
  animation-duration: 9s;
  animation-delay: 0.5s;
}

.bubble:nth-child(10) {
  left: 100%;
  width: 40px;
  height: 40px;
  animation-duration: 12s;
}
</style>
