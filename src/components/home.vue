<!--
 * @Author: 41
 * @Date: 2021-11-15 09:14:59
 * @LastEditors: 41
 * @LastEditTime: 2021-11-15 14:13:11
 * @Description:
-->
<template>
    <div>
        <!-- 简简单单的标题组件 -->
        <Title></Title>
        <!-- 将天气信息传给组件显示！ -->
        <Tqyb :weatherList="weatherList" @changeWeather="updateWeather($event)"></Tqyb>
        <!-- 低温高温的echarts表格！让人切身感受温差！ -->
        <Echarts :options="options" :width='echartsWidth' :Echarts_date="Echarts_date" :Echarts_low="Echarts_low" :Echarts_high="Echarts_high"></Echarts>
        <h1>{{this.weather}}</h1>
    </div>
</template>

<script>
import Title from '@/components/title.vue'
import Tqyb from '@/components/tyqb.vue'
import Echarts from '@/components/echarts.vue'
import {option} from '@/assets/options/options'
export default {
  components: {
    Title,
    Tqyb,
    Echarts
  },
  data () {
    return {
      city: '长沙',
      weather: '',
      weatherList: [],
      options: option,
      echartsWidth: '600px',
      Echarts_date: [],
      Echarts_low: [],
      Echarts_high: []
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
    check_data () {
      console.log(this.weatherList)
      console.log(this.Echarts_date)
    }
  },
  created () {
    this.searchWeather() // 初始化的时候调用一次接口
  },
  mounted () {
    this.check_data()
  }
}
</script>

<style scoped>

</style>
