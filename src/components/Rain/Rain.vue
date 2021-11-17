<template>
  <div class="container">
    <!-- <button id="music-btn" @click="togglePlay">
      <span>Play/Pause</span>
    </button> -->
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "rain",
  props: {
    scale: {
      default: 1,
      type: Number,
    },
    analyser: {
      type: null,
    },
  },
  data() {
    return {
      speed: Number,
      canvasElement: null,
      dataArray: Array,
    };
  },

  mounted() {
    // 不能立即执行，需要获取到父组件传来的audio才能，在watch中进行首次监听
    this.canvasElement = document.getElementById("canvas");
    this.initCanvas();
    if (this.analyser !== null) {
      this.initAudio();
    }
  },

  methods: {
    //  初始化
    initAudio() {
      // 创建频率数组
      this.analyser.fftSize = 256;
      let bufferLength = this.analyser.frequencyBinCount; //128
      this.dataArray = new Uint8Array(bufferLength);

      // 测试生成数据
      // setInterval(() => {
      //   analyser.getByteFrequencyData(this.dataArray);
      //   console.log(this.dataArray);
      // }, 1000);
    },

    // 绘图
    initCanvas() {
      let { canvasElement: canvas } = this;
      if (canvas.getContext) {
        // 自适应屏幕大小
        // 可认为 window.innerWidth = document.documentElement.clientWidth
        // canvas.height = window.innerHeight - canvas.offsetTop;
        // canvas.width = window.innerWidth;
        let container = document.querySelector(".container");
        canvas.height = container.clientHeight - canvas.offsetTop;
        canvas.width = container.clientWidth;
        window.onresize = () => {
          canvas.height = container.clientHeight - canvas.offsetTop;
          canvas.width = container.clientWidth;
        };

        let ctx = canvas.getContext("2d");
        this.drawRain(ctx);
      } else {
        alert("Your Browser can't support the canvas");
      }
    },

    drawRain(ctx) {
      let that = this;
      let { canvasElement: canvas } = this;
      // 偏角 / 加速度
      let angle = 0;
      let gravity = this.scale * 0.25;

      const lineList = [],
        lineNum = 2 + 2 * that.scale;

      function createLine() {
        // x坐标保证全屏覆盖
        lineList.push({
          x: canvas.width * Math.random() - 0.5 * canvas.width * Math.random(),
          y: -100,
          width: 2 * Math.random(),
          len: 20 + 20 * Math.random(),
          speed: 0,
          color: "#fff",
          die: false,
        });
      }
      // 鼠标引导雨点移动
      window.onmousemove = (e) => {
        // 减少横向的灵敏度
        let offsetX =
          (2 * e.clientX - window.innerWidth) / (window.innerWidth * 2);
        // 增加纵向的抗性/灵敏度
        let offsetY =
          (window.innerHeight + 500 - e.clientY) / (window.innerHeight + 500);
        // 获取偏角
        angle = Math.atan2(offsetY, offsetX);
      };
      window.requestAnimationFrame(draw);
      function draw() {
        // 清空
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lineList.forEach((e) => {
          // 风向影响
          e.x += (e.speed + 10 * Math.random()) * Math.cos(angle);
          e.y += e.speed * Math.sin(angle);
          let nextX = e.x + e.len * Math.cos(angle);
          let nextY = e.y + e.len * Math.sin(angle);

          ctx.beginPath();
          ctx.lineWidth = e.width;
          ctx.lineCap = "round";
          ctx.moveTo(e.x, e.y);
          ctx.lineTo(nextX, nextY);
          ctx.strokeStyle = e.color;
          ctx.stroke();

          // 重力影响增加速度
          e.speed += gravity;
          if (e.y > canvas.height) e.die = true;
        });
        // 创建雨点
        for (let i = 0; i < lineNum; i++) {
          createLine();
        }
        // 删除die的雨点
        for (let i = 0; i < lineList.length; i++) {
          if (lineList[i].die) lineList.splice(i, 1);
        }

        window.requestAnimationFrame(draw);
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

<style lang="less" scoped>
// cnpm install less@3.9.0 less-loader@5.0.0 -s
.container {
  position: absolute;

  z-index: 1;
  #audio {
    position: absolute;
  }
  #music-btn {
    position: absolute;
    left: 300px;
  }
  #canvas {
    display: block;
  }
}
</style>