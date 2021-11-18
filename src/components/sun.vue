<template>
  <div class="cloud">
    <div class="container">
      <audio
        id="audio"
        :src="require('@/assets/fenghuanghuakaidelukou.mp3')"
      ></audio>
      <canvas id="canvas"></canvas>
      <div class="controller">
        <button id="music-btn" @click="togglePlay">
          <span>Play/Pause</span>
        </button>
      </div>
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
      if (canvas.getContext) {
        this.ctx = canvas.getContext('2d')
        canvas.width = 1200
        canvas.height = window.innerHeight
      } else {
        alert("Your Browser can't support the canvas")
      }

      this.WIDTH = canvas.width
      this.HEIGHT = canvas.height
      this.ctx.translate(canvas.width / 2, canvas.height / 2)
      this.barWidth = this.WIDTH / this.bufferLength
      this.renderFrame()
    },
    renderFrame () {
      requestAnimationFrame(this.renderFrame)
      analyser.getByteFrequencyData(this.dataArray)
      this.ctx.clearRect(
        -this.WIDTH,
        -this.HEIGHT,
        2 * this.WIDTH,
        2 * this.HEIGHT
      )
      const barW = this.WIDTH / this.bufferLength
      for (let i = 0; i < this.bufferLength; i++) {
        this.ctx.rotate(Math.PI / (this.bufferLength / 2))
        let barX = 0
        let barH = ((this.dataArray[i] / 255) * this.HEIGHT) / 2
        let barY = -60 - barH
        this.ctx.fillStyle = `rgba(255, 215, 0, ${i / 100 + 0.3})`
        this.ctx.fillRect(barX, barY, barW, barH)
      }
    },

    // 转换播放状态
    togglePlay () {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      if (this.isplay) {
        this.audioElement.pause()
      } else {
        this.audioElement.play()
        this.draw()
      }
      this.isplay = !this.isplay
    }
  }
}
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
</style>
