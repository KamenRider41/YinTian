<!--
 * @Author: 41
 * @Date: 2021-11-15 09:14:59
 * @LastEditors: 41
 * @LastEditTime: 2021-11-17 09:13:07
 * @Description:
-->
<template>
  <div class="background" @click="changeSousuoFlag" >
    <div class='container'>
      <div class="header">
        <!-- 简简单单的标题组件 -->
        <div class="flex-left">
           <Title v-if="dev" class="title"></Title>
           <h3>{{this.city}}</h3>
           <h3>{{this.weather}}</h3>
           <h3>{{this.date}}</h3>
        </div>

        <div class="flex-right">
          <!-- switch切换框 -->
          <Switchs class='myswitch' @toggleChange="changeView($event)"></Switchs>
          <!-- 搜索框 -->
          <Sousuo v-if="dev&this.viewFlag!==3" v-model="city" @getSearch="getSearch($event)" :flag='sousuoFlag' @sousuoFlag="backSousuo($event)">{{city}}</Sousuo>
        </div>
      </div>
      <div class="subject">
        <!-- 将天气信息传给组件显示！ -->
        <Tqyb v-if="dev&this.viewFlag!==3" class="echarts_tyqb" :weatherList="weatherList" @changeDate="updateDate($event)" @changeWeather="updateWeather($event)"></Tqyb>
        <div class="subcontainer">
          <!-- 低温高温的echarts表格！让人切身感受温差！ -->
          <Echarts v-if="dev&this.viewFlag!==2&this.viewFlag!==3" :options="options" :width='echartsWidth' :height='echartsheight' :Echarts_date="Echarts_date" :Echarts_low="Echarts_low" :Echarts_high="Echarts_high"></Echarts>
        </div>
        <!-- <Canvas v-if='dev' :width='canvas_width' :height='canvas_height' :speed='canvas_speed'></Canvas> -->
        <!-- <button @click='addSize'>增大大小</button>
        <button @click='subSize'>增大大小</button> -->
      </div>

    </div>

  </div>

</template>

<script>
import Title from '@/components/title.vue'
import Tqyb from '@/components/tyqb.vue'
import Echarts from '@/components/echarts.vue'
import Sousuo from '@/components/sousuo.vue'
import Switchs from '@/components/switch.vue'
import Canvas from '@/components/canvasStudy.vue'
import {option} from '@/assets/options/options'
export default {
  components: {
    Title,
    Tqyb,
    Echarts,
    Sousuo,
    Switchs,
    Canvas
  },
  data () {
    return {
      dev: true, // 控制测试
      city: '长沙',
      tempcity: '', // 如果没有查询到结果就还原city提示错误
      weather: '',
      date: '',
      weatherList: [],
      options: option,
      echartsWidth: '600px',
      echartsheight: '400px',
      Echarts_date: [],
      Echarts_low: [],
      Echarts_high: [],
      viewFlag: 1,
      sousuoFlag: false,
      canvas_width: '50px',
      canvas_height: '50px',
      canvas_speed: 10
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
    updateDate (date) {
      this.date = date
    },
    getSearch (city) {
      if (city) {
        this.tempcity = this.city
        this.city = city
        this.searchWeather()
      }
    },
    changeView (flag) {
      this.viewFlag = flag
      console.log(this.viewFlag)
    },
    changeSousuoFlag () {
      console.log('触发背景点击之前' + this.sousuoFlag)
      this.sousuoFlag = true
      console.log('触发背景点击之后' + this.sousuoFlag)
    },
    backSousuo (flag) {
      this.sousuoFlag = flag
      console.log('回调变为' + this.sousuoFlag)
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
    // const oScript = document.createElement('script')
    // oScript.type = 'text/javascript'
    // oScript.src = '../assets/js/Sakura.js'
    // document.body.appendChild(oScript)
  }
}
</script>

<style scoped>
button{
  width: 100px;
  height: 50px;
  background-color: bisque;
}
.background{
  width: 100vw;
  height: 100vh;
  background-image: url('https://api.ixiaowai.cn/gqapi/gqapi.php');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.container{
    opacity: 0.9;
    width: 1200px;
    left: 50%;
    transform: translateX(-600px);
    height: 100vh;
    background-color: var(--background-color);
    position: absolute;
    margin-top: 0;
    font-family: 'Montserrat', sans-serif, Arial, 'Microsoft Yahei';
}
.header{
    position:sticky;
    position:-wekbit-sticky;
    top:10px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:40px;
}
.flex-left{
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.title{
  margin-right: 20px;
}
.flex-left h3{
  margin-left: 20px;
}
.flex-right{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}
.myswitch{
  margin-right: 30px;
}
.echarts_tyqb{
  transition: 0.5s;
}
.subcontainer{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

</style>
