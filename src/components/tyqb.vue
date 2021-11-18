<!--
 * @Author: 41
 * @Date: 2021-11-15 09:30:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 15:55:48
 * @Description:
-->
<template>
    <div class="week-container">
        <ul class="week-list" >
            <li id="day1" v-for="(item,index) in weatherList"
                :key="index"
                @click.stop="get_weather(index)">
                <span :class="iconObj[item.type]"></span>
                <span class="day-name">{{item.type}}</span>
                <span class="day-name">{{item.date}}</span>
                <span class="day-temp">{{item.low}}</span>
                <span class="day-temp">{{item.high}}</span>
            </li>
        </ul>
        <audio :src="require('../assets/mp3/yu.mp3')" id="tyqb_audio_yu" ></audio>
        <audio :src="require('../assets/mp3/yin.mp3')" id="tyqb_audio_yin" ></audio>
        <audio :src="require('../assets/mp3/qing.mp3')" id="tyqb_audio_qing" ></audio>
        <audio  id="tyqb_audio_mai" ></audio>
        <audio :src="require('../assets/mp3/notfind_DLAM.mp3')" id="tyqb_audio_other" ></audio>
        <audio :src="require('../assets/mp3/xue2.mp3')" id="tyqb_audio_xue" ></audio>
    </div>
</template>

<script>
export default {
  name: 'tqyb',
  props: {
    weatherList: {
      type: Array,
      default: null
    }
  },
  watch: {
    // 监听天气信息的变化
    weatherList () {
      this.get_weather(0)
    }
  },
  data () {
    return {
      city: '',
      iconObj: {
        霾: 'iconfont icon-321tianqi_mai',
        强沙尘暴: 'iconfont icon-319tianqi_qiangshachenbao',
        暴雪: 'iconfont icon-baoxue',
        阵雪: 'iconfont icon-zhenxue',
        大暴雨: 'iconfont icon-tianqi-dabaoyu',
        暴雨: 'iconfont icon-tianqi-baoyu',
        大雪: 'iconfont icon-tianqi-daxue',
        大雨: 'iconfont icon-tianqi-dayu',
        冻雨: 'iconfont icon-tianqi-dongyu',
        浮尘: 'iconfont icon-tianqi-fuchen',
        雷阵雨: 'iconfont icon-tianqi-leizhenyu',
        晴: 'iconfont icon-tianqi-qing',
        特大暴雨: 'iconfont icon-tianqi-tedabaoyu',
        沙尘暴: 'iconfont icon-tianqi-shachenbao',
        小雨: 'iconfont icon-tianqi-xiaoyu',
        阴: 'iconfont icon-tianqi-yin',
        小雪: 'iconfont icon-tianqi-xiaoxue',
        扬沙: 'iconfont icon-tianqi-yangsha',
        雨夹雪: 'iconfont icon-tianqi-yujiaxue',
        中雪: 'iconfont icon-tianqi-zhongxue',
        中雨: 'iconfont icon-tianqi-zhongyu',
        多云: 'iconfont icon-tianqi-duoyun',
        雷阵雨伴有冰雹: 'iconfont icon-tianqi-leizhenyubanyoubingbao',
        雾: 'iconfont icon-tianqiwu',
        阵雨: 'iconfont icon-tianqi-zhenyu'
      }
    }
  },
  methods: {
    get_weather (index) {
      let checkFlag = 0 // 查询标志位
      console.log(this.weatherList[index].type) // 需要把这个传递给父组件
      let temp = this.weatherList[index].type
      let list = document.querySelector('.week-list')
      let weatherType = 0 // 0表示不属于五种常见天气类型
      if (temp.indexOf('雨') !== -1) {
        checkFlag = 1
        console.log('发现雨')
        let tyqbAudioYu = document.querySelector('#tyqb_audio_yu')
        tyqbAudioYu.load()
        tyqbAudioYu.play()
        list.classList.add('yu')
        weatherType = 1
      } else {
        list.classList.remove('yu')
      }
      if (temp.indexOf('晴') !== -1) {
        checkFlag = 2
        console.log('发现晴')
        let tyqbAudioQing = document.querySelector('#tyqb_audio_qing')
        tyqbAudioQing.load()
        tyqbAudioQing.play()
        list.classList.add('qing')
        weatherType = 2
      } else {
        list.classList.remove('qing')
      }
      if (temp.indexOf('云') !== -1) {
        let tyqbAudioOther = document.querySelector('#tyqb_audio_other')
        tyqbAudioOther.load()
        tyqbAudioOther.play()
        checkFlag = 3
        console.log('发现云')
        list.classList.add('cloud')
        weatherType = 3
      } else {
        list.classList.remove('cloud')
      }
      if (temp.indexOf('阴') !== -1) {
        checkFlag = 4
        console.log('发现阴')
        let tyqbAudioYin = document.querySelector('#tyqb_audio_yin')
        tyqbAudioYin.load()
        tyqbAudioYin.play()
        list.classList.add('yin')
        weatherType = 4
      } else {
        list.classList.remove('yin')
      }
      if (temp.indexOf('雪') !== -1) {
        checkFlag = 5
        console.log('发现雪')
        let tyqbAudioXue = document.querySelector('#tyqb_audio_xue')
        tyqbAudioXue.load()
        tyqbAudioXue.play()
        list.classList.add('xue')
        weatherType = 5
      } else {
        list.classList.remove('xue')
      }
      if (temp.indexOf('霾') !== -1) {
        checkFlag = 6
        console.log('霾')
        let tyqbAudioMai = document.querySelector('#tyqb_audio_mai')
        tyqbAudioMai.load()
        tyqbAudioMai.play()
      }
      if (checkFlag === 0) { // 其他情况
        let tyqbAudioOther = document.querySelector('#tyqb_audio_other')
        tyqbAudioOther.load()
        tyqbAudioOther.play()
      }
      this.$emit('changeWeather', this.weatherList[index].type)
      this.$emit('changeDate', this.weatherList[index].date)
      this.$emit('backWeatherType', weatherType)
    }

  }
}
</script>

<style scoped>
.week-container{
    /* background-color: rgb(158, 157, 155); */
    background:rgba(85, 83, 83, 0.1);
    color:#9e9a9a;
}
.week-list {
    margin: 10px 35px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow: 10px 10px 80px -5px rgba(0, 0, 0, 0.4); */
        box-shadow: inset 0 8px 60px rgba(0, 0, 0, 0.4),
                inset 0 8px 8px rgba(0, 0, 0, 0.4),
                inset 0 -4px 4px rgba(0, 0, 0, 0.4);
}
.yu{
  /* box-shadow: 10px 10px 80px -5px rgba(196, 58, 134, 0.4); */
    box-shadow: inset 0 8px 60px rgba(196, 58, 134, 0.4),
                inset 0 8px 8px rgba(196, 58, 134, 0.4),
                inset 0 -4px 4px rgba(196, 58, 134, 0.4);
}
.qing{
  /* box-shadow: 10px 10px 80px -5px rgba(223, 177, 25, 0.4); */
      box-shadow: inset 0 8px 60px rgba(223, 177, 25, 0.4),
                inset 0 8px 8px rgba(223, 177, 25, 0.4),
                inset 0 -4px 4px rgba(223, 177, 25, 0.4);
}
.cloud{
  /* box-shadow: 10px 10px 80px -5px rgba(136, 119, 212, 0.4); */
        box-shadow: inset 0 8px 60px rgba(136, 119, 212, 0.4),
                inset 0 8px 8px rgba(136, 119, 212, 0.4),
                inset 0 -4px 4px rgba(136, 119, 212, 0.4);
}
.yin{
  /* box-shadow: 10px 10px 80px -5px rgba(77, 74, 74, 0.4); */
         box-shadow: inset 0 8px 60px rgba(77, 74, 74, 0.4),
                inset 0 8px 8px rgba(77, 74, 74, 0.4),
                inset 0 -4px 4px rgba(77, 74, 74, 0.4);
}
.xue{
  /* box-shadow: 10px 10px 80px -5px rgba(16, 64, 194, 0.4); */
           box-shadow: inset 0 8px 60px rgba(16, 64, 194, 0.4),
                inset 0 8px 8px rgba(16, 64, 194, 0.4),
                inset 0 -4px 4px rgba(16, 64, 194, 0.4);
}
.other{
  /* box-shadow: 10px 10px 80px -5px rgba(0, 0, 0, 0.4); */
            box-shadow: inset 0 8px 60px rgba(0, 0, 0, 0.4),
                inset 0 8px 8px rgba(0, 0, 0, 0.4),
                inset 0 -4px 4px rgba(0, 0, 0, 0.4);
}
/* .week-list ul{
     list-style: none;
     margin-left: 50px;
} */
.week-list li {
    /* background-color: red; */

    display: inline;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    text-align: center;
    transition: 200ms;
    float: left;
    z-index: 100;
    position: relative;
}

.week-list li span {

    display: block;
}

.week-list .iconfont{
    font-size: 36px;
}
.week-list li:hover {
    transform: scale(1.1);
    background-color: #ffffff;
    color: #222831;
}
.yu li:hover{
  background:rgba(196, 58, 134, 0.4);
}
.qing li:hover{
  background:rgba(223, 177, 25, 0.4);
}
.cloud li:hover{
  background: rgba(136, 119, 212, 0.4);
}
.yin li:hover{
  background:rgba(77, 74, 74, 0.4);
}
.xue li:hover{
  background:rgba(16, 64, 194, 0.4);
}
.other li:hover{
  background:rgba(0, 0, 0, 0.4);
}
.week-list .day-name {
    margin-top: 10px;
    text-align: center;
}

.week-list .day-temp {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
}
</style>
