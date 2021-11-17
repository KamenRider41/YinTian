<!--
 * @Author: 41
 * @Date: 2021-11-15 09:14:59
 * @LastEditors: 41
 * @LastEditTime: 2021-11-17 20:53:15
 * @Description:
-->
<template>
  <div class="background" @click="changeSousuoFlag">
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
    <div class="container">
      <div class="header">
        <!-- 简简单单的标题组件 -->
        <div class="flex-left">
          <Title v-if="dev" class="title"></Title>
          <h3>{{ this.city }}</h3>
          <h3>{{ this.weather }}</h3>
          <h3>{{ this.date }}</h3>
        </div>
        <div class="flex-right">
          <!-- 有声音的按钮 -->
          <Button class='mybutton' v-if="this.viewFlag===3" @mybuttonFlag="changeBulb($event)"></Button>
          <!-- switch切换框 -->
          <Switchs
            class="myswitch"
            @toggleChange="changeView($event)"
          ></Switchs>
          <!-- 搜索框 -->
          <Sousuo
            v-if="dev & (this.viewFlag !== 3)"
            v-model="city"
            @getSearch="getSearch($event)"
            :flag="sousuoFlag"
            @sousuoFlag="backSousuo($event)"
            >{{ city }}</Sousuo
          >
        </div>
      </div>
      <div class="subject">
        <!-- 将天气信息传给组件显示！ -->
        <Tqyb
          v-if="dev & (this.viewFlag !== 3)"
          class="echarts_tyqb"
          :weatherList="weatherList"
          @changeDate="updateDate($event)"
          @changeWeather="updateWeather($event)"
        ></Tqyb>
        <div class="subcontainer">
          <!-- 低温高温的echarts表格！让人切身感受温差！ -->
          <Echarts
            v-if="dev & (this.viewFlag !== 2) & (this.viewFlag !== 3)"
            :options="options"
            :width="echartsWidth"
            :height="echartsheight"
            :Echarts_date="Echarts_date"
            :Echarts_low="Echarts_low"
            :Echarts_high="Echarts_high"
          ></Echarts>
        </div>
      </div>
      <BreathLight v-if="this.viewFlag===3" class="breath"></BreathLight>
      <Bulb class='myBulb' v-if="this.viewFlag===3" :flag="bulbFlag"></Bulb>
    </div>
  </div>
</template>

<script>
import Title from '@/components/title.vue'
import Tqyb from '@/components/tyqb.vue'
import Echarts from '@/components/echarts.vue'
import Sousuo from '@/components/sousuo.vue'
import Switchs from '@/components/switch.vue'
import BreathLight from '@/components/breathLight.vue'
import Bulb from '@/components/bulb.vue'
import Button from '@/components/button.vue'

import {option} from '@/assets/options/options'
export default {
  components: {
    Title,
    Tqyb,
    Echarts,
    Sousuo,
    Switchs,
    BreathLight,
    Bulb,
    Button
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

      bulbFlag: false,

      isPlay: true,
      music: {
        src: require('@/assets/My Spanish Guitar Gently Weeps.mp3'),
        name: 'My Spanish Guitar Gently Weeps'
      }
    }
  },
  methods: {
    async searchWeather () {
      // 调用接口
      var that = this

      this.$axios
        .get('/weather_mini?city=' + this.city)
        .then(function (response) {
          console.log(response.data.data.forecast)
          that.weatherList = response.data.data.forecast // 获得天气列表的信息
          that.weather = response.data.data.forecast[0].type // 当前天气默认为今天的天气
          // 获得天气列表的日期信息
          that.Echarts_date = []
          that.Echarts_low = []
          that.Echarts_high = []
          response.data.data.forecast.forEach((item) => {
            that.Echarts_date.push(item.date)
            that.Echarts_low.push(parseInt(item.low.substring(2)))
            that.Echarts_high.push(
              parseInt(item.high.substring(2)) - parseInt(item.low.substring(2))
            )
            // console.log(parseInt(item.high.substring(2)))
          })
        })
        .catch(function (err) {
          console.log('接口查询错误:' + err)
          console.log(that.tempcity, that.city)
          that.city = that.tempcity
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
        console.log(this.city, this.city)
        this.searchWeather()
      }
    },
    changeView (flag) {
      this.viewFlag = flag
      console.log(this.viewFlag)
      let contain = document.querySelector('.container')
      if (this.viewFlag === 3) {
        contain.classList.add('black')
      } else {
        contain.classList.remove('black')
      }
    },
    changeSousuoFlag () {
      console.log('触发背景点击之前' + this.sousuoFlag)
      this.sousuoFlag = true
      console.log('触发背景点击之后' + this.sousuoFlag)
    },
    backSousuo (flag) {
      let temp = this.sousuoFlag
      this.sousuoFlag = flag
      if (temp !== flag) {
        console.log('回调变为' + this.sousuoFlag)
      } // 防抖！
    },
    check_data () {
      console.log(this.weatherList)
      console.log(this.Echarts_date)
    },
    changeBulb (flag) {
      console.log('Bulb get' + flag)
      this.bulbFlag = flag
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
.background {
  width: 100%;
  height: 100%;
  background-image: url("https://api.ixiaowai.cn/gqapi/gqapi.php");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.container {
  z-index: 99;
  position: absolute;
  height: 1000px;
  opacity: 0.9;
  width: 1200px;
  left: 50%;
  transform: translateX(-600px);
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 0;
  font-family: "Montserrat", sans-serif, Arial, "Microsoft Yahei";
}
.header {
  position: sticky;
  position: -wekbit-sticky;
  top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.flex-left {
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.title {
  margin-right: 20px;
}
.flex-left h3 {
  margin-left: 20px;
}
.flex-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}
.myswitch {
  margin-right: 30px;
}
.mybutton{
  margin-right:70px;
}
.echarts_tyqb{
  transition: 0.5s;
}
.subcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.breath {
  margin-left: 55px;
}
.myBulb{
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%,0);
}
.black{
  background-color: var(--background-color);
}
</style>
