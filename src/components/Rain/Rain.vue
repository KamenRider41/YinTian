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
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

export default {
  props: {
    scale: {
      default: 1,
      type: Number,
    },
    togglePlay: {
      type: Function,
    },
    handleEnded: {
      type: Function,
    },
  },
  data() {
    return {
      speed: Number,
      audioElement: null,
      canvasElement: null,
      dataArray: Array,
    };
  },

  mounted() {
    // this.audioElement = document.getElementById("audio");
    this.audioElement = this.$refs.a
    this.canvasElement = document.getElementById("canvas");
    this.initAudio();
    this.initCanvas();
  },

  methods: {
    //  初始化
    initAudio() {
      let source = audioCtx.createMediaElementSource(this.audioElement);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      // 创建频率数组
      analyser.fftSize = 256;
      let bufferLength = analyser.frequencyBinCount; //128
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
        // draw here

        // 可认为 window.innerWidth = document.documentElement.clientWidth
        // canvas.height = window.innerHeight - canvas.offsetTop;
        // canvas.width = window.innerWidth;
        // 自适应屏幕大小
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
      let gravity = this.scale * 0.5;

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
          color: "#aaa",
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

    // 转换播放状态
    // togglePlay() {
    //   // 恢复在音频上下文暂停的音频
    //   if (audioCtx.state === "suspended") {
    //     audioCtx.resume();
    //   }
    //   if (this.isplay) {
    //     this.audioElement.pause();
    //   } else {
    //     this.audioElement.play();
    //   }
    //   this.isplay = !this.isplay;
    // },

    // 处理播放结束
    // handleEnded() {
    //   this.isplay = false;
    // },
  },
};
</script>

<style lang="less" scoped>
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