<!--
 * @Author: 41
 * @Date: 2021-11-15 09:14:59
 * @LastEditors: 41
 * @LastEditTime: 2021-11-16 09:37:26
 * @Description:
-->
<template>
    <div class='container'>
        <!-- 简简单单的标题组件 -->
        <Title v-if="dev"></Title>
        <!-- 将天气信息传给组件显示！ -->
        <Tqyb v-if="dev" :weatherList="weatherList" @changeWeather="updateWeather($event)"></Tqyb>
        <div class="subcontainer">
          <!-- 低温高温的echarts表格！让人切身感受温差！ -->
          <Echarts v-if="dev" :options="options" :width='echartsWidth' :Echarts_date="Echarts_date" :Echarts_low="Echarts_low" :Echarts_high="Echarts_high"></Echarts>
        </div>
        <!-- 搜索框 -->
        <div class="subcontainer2">
          <Sousuo v-if="dev" v-model="city" @getSearch="getSearch($event)">{{city}}</Sousuo>
          <!-- <h1>{{this.weather}}</h1>
          <h1>{{this.city}}</h1> -->
        </div>
        <Canvas v-if='dev' :width='canvas_width' :height='canvas_height' :speed='canvas_speed'></Canvas>
        <!-- <button @click='addSize'>增大大小</button>
        <button @click='subSize'>增大大小</button> -->
    </div>
</template>

<script>
import Title from '@/components/title.vue'
import Tqyb from '@/components/tyqb.vue'
import Echarts from '@/components/echarts.vue'
import Sousuo from '@/components/sousuo.vue'
import Canvas from '@/components/canvasStudy.vue'
import {option} from '@/assets/options/options'
export default {
  components: {
    Title,
    Tqyb,
    Echarts,
    Sousuo,
    Canvas
  },
  data () {
    return {
      dev: true, // 控制测试
      city: '长沙',
      tempcity: '', // 如果没有查询到结果就还原city提示错误
      weather: '',
      weatherList: [],
      options: option,
      echartsWidth: '600px',
      Echarts_date: [],
      Echarts_low: [],
      Echarts_high: [],
      canvas_width: '50px',
      canvas_height: '50px'
    }
  },
  methods: {
    async searchWeather () {
      // 调用接口
      var that = this
      this.$axios.get('/weather_mini?city=' + this.city)
        .then(function (response) {
          console.log(response.data.data.forecast)
          that.weatherList = response.data.data.forecast // 获得天气列表的信息
          that.weather = response.data.data.forecast[0].type // 当前天气默认为今天的天气
          // 获得天气列表的日期信息
          that.Echarts_date = []
          that.Echarts_low = []
          that.Echarts_high = []
          response.data.data.forecast.forEach(item => {
            that.Echarts_date.push(item.date)
            that.Echarts_low.push(parseInt(item.low.substring(2)))
            that.Echarts_high.push(parseInt(item.high.substring(2)) - parseInt(item.low.substring(2)))
            // console.log(parseInt(item.high.substring(2)))
          })
        })
    },
    updateWeather (weather) {
      console.log('get' + weather)
      this.weather = weather
    },
    getSearch (city) {
      if (city) {
        this.tempcity = this.city
        this.city = city
        this.searchWeather()
      }
    },
    addSize () {
      this.canvas_width = parseInt(this.canvas_width) + 10 + 'px'
      this.canvas_height = parseInt(this.canvas_height) + 10 + 'px'
    },
    subSize () {
      this.canvas_width = parseInt(this.canvas_width) - 10 + 'px'
      this.canvas_height = parseInt(this.canvas_height) - 10 + 'px'
    },
    check_data () {
      console.log(this.weatherList)
      console.log(this.Echarts_date)
    }
  },
  created () {
    this.searchWeather() // 初始化的时候调用一次接口
  },
  mounted () {
    // this.check_data()
  }
}
</script>

<style scoped>
button{
  width: 100px;
  height: 50px;
  background-color: bisque;
}
.container{
    width: 100vw;
    height: 100vh;
    background-color: var(--background-color);
    position: absolute;
    margin-top: 0;
    font-family: 'Montserrat', sans-serif, Arial, 'Microsoft Yahei';
}
.subcontainer{
  display: flex;
  justify-content: center;
  align-items: center;
}
.subcontainer2{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
