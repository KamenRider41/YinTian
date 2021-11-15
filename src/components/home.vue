<!--
 * @Author: 41
 * @Date: 2021-11-15 09:14:59
 * @LastEditors: 41
 * @LastEditTime: 2021-11-15 10:46:49
 * @Description:
-->
<template>
    <div>
        <!-- 简简单单的标题组件 -->
        <Title></Title>
        <!-- 将天气信息传给组件显示！ -->
        <Tqyb :weatherList="weatherList" @changeWeather="updateWeather($event)"></Tqyb>
        <h1>{{this.weather}}</h1>
    </div>
</template>

<script>
import Title from '@/components/title.vue'
import Tqyb from '@/components/tyqb.vue'
export default {
  components: {
    Title,
    Tqyb
  },
  data () {
    return {
      city: '长沙',
      weather: '123',
      weatherList: []
    }
  },
  methods: {
    searchWeather () {
      // 调用接口
      var that = this
      this.$axios.get('/weather_mini?city=' + this.city)
        .then(function (response) {
        //   console.log(response.data.data.forecast)
          that.weatherList = response.data.data.forecast
        })
    },
    updateWeather (weather) {
      console.log('get' + weather)
      this.weather = weather
    }
  },
  mounted () {
    this.searchWeather() // 初始化的时候调用一次接口
  }
}
</script>

<style scoped>

</style>
