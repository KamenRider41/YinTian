<template>
  <div class="cloud">
    <div class="container">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      ctx: null,
      canvasElement: null,
      dataArray: Array,
      analyser: null,
    };
  },

  mounted() {
    this.canvasElement = document.getElementById("canvas");
    console.log("analyser", this.analyser);
    this.initAudio();
  },

  methods: {
    //  初始化
    initAudio() {
      // 创建频率数组
      this.analyser.fftSize = 128;
      let bufferLength = analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
    },

    // 绘图
    draw() {
      let { canvasElement: canvas } = this;
      if (canvas.getContext) {
        this.ctx = canvas.getContext("2d");
        canvas.width = 1200;
        canvas.height = window.innerHeight;
      } else {
        alert("Your Browser can't support the canvas");
      }

      this.WIDTH = canvas.width;
      this.HEIGHT = canvas.height;
      this.ctx.translate(canvas.width / 2, canvas.height / 2);
      this.barWidth = this.WIDTH / this.bufferLength;
      this.renderFrame();
    },
    renderFrame() {
      requestAnimationFrame(this.renderFrame);
      this.analyser.getByteFrequencyData(this.dataArray);
      this.ctx.clearRect(
        this.WIDTH,
        this.HEIGHT,
        2 * this.WIDTH,
        2 * this.HEIGHT
      );
      const barW = this.WIDTH / this.bufferLength;
      for (let i = 0; i < this.bufferLength; i++) {
        this.ctx.rotate(Math.PI / (this.bufferLength / 2));
        let barX = 0;
        let barH = ((this.dataArray[i] / 255) * this.HEIGHT) / 2;
        let barY = -60 - barH;
        this.ctx.fillStyle = `rgba(255, 215, 0, ${i / 100 + 0.3})`;
        this.ctx.fillRect(barX, barY, barW, barH);
      }
    },

    // 转换播放状态
    togglePlay() {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      if (this.isplay) {
        this.audioElement.pause();
      } else {
        this.audioElement.play();
        this.draw();
      }
      this.isplay = !this.isplay;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.cloud {
  top: 0;
  left: 0;
  z-index: -10;
}
#canvas {
  /* border: 1px solid black; */
  width: 1200px;
  height: 100%;
}
</style>
