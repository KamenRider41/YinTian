<template>
  <div class="cloud">
    <div class="container">
      <canvas id="canvas"></canvas>
      <!-- <div class="controller">
        <button id="music-btn" @click="togglePlay">
          <span>Play/Pause</span>
        </button>
      </div> -->
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
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const analyser = audioCtx.createAnalyser()

export default {
  data () {
    return {
      speed: Number,
      audioElement: null,
      canvasElement: null,
      dataArray: Array,
      bufferLength: 0
    }
  },

  mounted   () {
    this.audioElement = document.getElementById('audio')
    this.canvasElement = document.getElementById('canvas')
    this.init()
  },

  methods: {
    //  初始化
    init () {
      let source = audioCtx.createMediaElementSource(this.audioElement)
      source.connect(analyser)
      analyser.connect(audioCtx.destination)

      // 创建频率数组
      analyser.fftSize = 128
      this.bufferLength = analyser.frequencyBinCount
      this.dataArray = new Uint8Array(this.bufferLength)
    },

    // 绘图
    draw () {
      let { canvasElement: canvas } = this
      console.log(canvas.clientWidth, canvas.clientHeight)
      if (canvas.getContext) {
        this.ctx = canvas.getContext('2d')
        canvas.width = 1200
        canvas.height = window.innerHeight
        console.log(this.ctx)
      } else {
        alert("Your Browser can't support the canvas")
      }

      this.WIDTH = canvas.width
      this.HEIGHT = canvas.height

      this.barWidth = this.WIDTH / this.bufferLength
      this.renderFrame()
    },
    renderFrame () {
      let barHeight
      requestAnimationFrame(this.renderFrame)

      analyser.getByteFrequencyData(this.dataArray)

      this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)

      for (var i = 0, x = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i]

        // var r = barHeight + 25 * (i / this.bufferLength)
        // var g = 250 * (i / this.bufferLength)
        // var b = 50
        var r = 230
        var g = 230
        var b = 250

        this.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        this.ctx.fillRect(x, this.HEIGHT - barHeight, this.barWidth, barHeight)
        // this.ctx.fillRect(-x, this.HEIGHT - barHeight, this.barWidth, barHeight)

        x += this.barWidth + 2
      }
    },

    // 转换播放状态
    togglePlay () {
      //
      console.log('test')
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      if (this.isplay) {
        this.audioElement.pause()
      } else {
        this.audioElement.play()
        this.draw()
        console.log(this.dataArray)
      }
      this.isplay = !this.isplay
    },

    // 处理播放结束
    handleEnded () {
      this.isplay = false
    }
  }
}
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
  .controller{
    position: absolute;
    z-index: 9999;
    bottom: 40px;
    left: 50%;
    width: 120px;
    height: 40px;
    text-align: center;
  }
  #music-btn{
    width: 120px;
    height: 40px;
    cursor: pointer;
    background-color: #9890e3;
    border-radius: 10px;
  }
  #canvas {
    /* border: 1px solid black; */
    width: 1200px;
    height: 100%;
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
