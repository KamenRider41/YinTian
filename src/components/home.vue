<!--
 * @Author: 41
 * @Date: 2021-11-15 09:14:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 19:58:03
 * @Description:
-->
<template>
  <div class="background" @click="changeSousuoFlag">
    <audiobox
      style="position: absolute; left: -1000px"
      ref="audiobox"
      :src="music.src"
      :musicName="music.name"
      v-model="music.isPlay"
    ></audiobox>
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
    <div class="container">
      <div class="header">
        <!-- 简简单单的标题组件 -->
        <div class="flex-left">
          <Title v-if="dev" class="title"></Title>
          <h3 v-if="sousuoFlag">{{ this.city }}</h3>
          <h3 v-if="sousuoFlag">{{ this.weather }}</h3>
          <h3 v-if="sousuoFlag">{{ this.date }}</h3>
        </div>
        <div class="flex-right">
          <Submit
            class="mysubmit"
            v-if="sousuoFlag"
            @getAudioFlag="updateMusicPlay($event)"
          ></Submit>
          <!-- 搜索框 -->
          <Sousuo
            v-if="dev & (this.viewFlag !== 3)"
            v-model="city"
            @getSearch="getSearch($event)"
            :flag="sousuoFlag"
            @sousuoFlag="backSousuo($event)"
            >{{ city }}</Sousuo
          >
          <!-- 有声音的按钮 -->
          <Button
            class="mybutton"
            v-if="this.viewFlag === 3 || this.weaState === 4"
            @mybuttonFlag="changeBulb($event)"
          ></Button>
          <!-- switch切换框 -->
          <Switchs
            class="myswitch"
            @toggleChange="changeView($event)"
          ></Switchs>
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
          @backWeatherType="updateWeatherType($event)"
        ></Tqyb>
        <div class="subcontainer">
          <!-- 低温高温的echarts表格！让人切身感受温差！ -->
          <Echarts
            v-if="
              dev &
              (this.viewFlag !== 2) &
              (this.viewFlag !== 3) &
              (this.weaState !== 2 | this.music.isPlay !==true) &
              (this.weaState !== 4)
            "
            :options="options"
            :width="echartsWidth"
            :height="echartsheight"
            :Echarts_date="Echarts_date"
            :Echarts_low="Echarts_low"
            :Echarts_high="Echarts_high"
          ></Echarts>
        </div>
      </div>

      <Timer class="mytimer" v-if="this.viewFlag === 3"></Timer>
      <BreathLight v-if="this.viewFlag === 3" class="breath"></BreathLight>
      <Bulb
        class="myBulb"
        v-if="this.viewFlag === 3 || this.weaState === 4"
        :flag="bulbFlag"
      ></Bulb>
    </div>
    <Rain
      v-if="weaState === 1"
      :scale="scale"
      :analyser="music.analyser"
      :state="weaState"
    ></Rain>
    <Sun
      v-else-if="weaState === 2"
      :analyser="music.analyser"
      :state="weaState"
    ></Sun>
    <Cloud
      v-else-if="weaState === 3"
      :analyser="music.analyser"
      :state="weaState"
    ></Cloud>
    <Yin
      v-else-if="weaState === 4"
      :analyser="music.analyser"
      :state="weaState"
    ></Yin>
    <Snow
      v-else-if="weaState === 5"
      :analyser="music.analyser"
      :state="weaState"
    ></Snow>

    <!-- <rain v-else-if="weaState === 2"></rain>
    <rain v-else-if="weaState === 3"></rain>
    <rain v-else-if="weaState === 4"></rain>
    <rain v-else-if="weaState === 5"></rain> -->
  </div>
</template>

<script>
/* eslint-disable */
import Title from "@/components/title.vue";
import Tqyb from "@/components/tyqb.vue";
import Echarts from "@/components/echarts.vue";
import Sousuo from "@/components/sousuo.vue";
import Switchs from "@/components/switch.vue";
import BreathLight from "@/components/breathLight.vue";
import Bulb from "@/components/bulb.vue";
import Rain from "@/components/Rain/Rain.vue";
import Button from "@/components/button.vue";
import Cloud from "@/components/Cloud/cloud.vue";
import Sun from "@/components/Sun/sun.vue";
import Snow from "@/components/snow/snow.vue";
import Submit from "@/components/submit.vue";
import Timer from "@/components/timer.vue";
import Yin from "@/components/Yin/yin.vue";
import { option } from "@/assets/options/options";
export default {
  components: {
    Title,
    Tqyb,
    Echarts,
    Sousuo,
    Switchs,
    BreathLight,
    Bulb,
    Rain,
    Button,
    Cloud,
    Sun,
    Snow,
    Submit,
    Timer,
    Yin,
  },
  data() {
    return {
      dev: true, // 控制测试
      city: "长沙",
      tempcity: "", // 如果没有查询到结果就还原city提示错误
      weather: "",
      date: "",
      weatherList: [],
      options: option,
      echartsWidth: "600px",
      echartsheight: "400px",
      Echarts_date: [],
      Echarts_low: [],
      Echarts_high: [],
      viewFlag: 1,
      bulbFlag: false,
      sousuoFlag: true,
      music: {
        analyser: null,
        isPlay: true,
        src: require("@/assets/My Spanish Guitar Gently Weeps.mp3"),
        name: "My Spanish Guitar Gently Weeps",
      },
      weaState: 1,
      scale: 1,
    };
  },
  methods: {
    searchWeather() {
      // 调用接口
      var that = this;
      this.$axios
        .get("/weather_mini?city=" + this.city)
        .then(function (response) {
          console.log(response.data.data.forecast, "aaa");
          that.weatherList = response.data.data.forecast; // 获得天气列表的信息
          that.weather = response.data.data.forecast[0].type; // 当前天气默认为今天的天气
          console.log(response.data.data.forecast[0].type, "qq");
          // 获得天气列表的日期信息
          that.Echarts_date = [];
          that.Echarts_low = [];
          that.Echarts_high = [];
          response.data.data.forecast.forEach((item) => {
            that.Echarts_date.push(item.date);
            that.Echarts_low.push(parseInt(item.low.substring(2)));
            that.Echarts_high.push(
              parseInt(item.high.substring(2)) - parseInt(item.low.substring(2))
            );
            // console.log(parseInt(item.high.substring(2)))
          });
        })
        .catch(function (err) {
          console.log("接口查询错误:" + err);
          console.log(that.tempcity, that.city);
          that.city = that.tempcity;
        });
    },
    updateWeather(weather) {
      console.log("get" + weather);
      this.weather = weather;
    },
    updateDate(date) {
      this.date = date;
    },
    updateMusicPlay(flag) {
      console.log("回调得到submit传值" + flag);
      this.music.isPlay = flag;
    },
    updateWeatherType(type) {
      console.log(type);
      this.weaState = type;
      // console.log('123'+type);
      let contain = document.querySelector(".container");
      if (this.weaState === 4) {
        contain.classList.add("black");
      } else {
        contain.classList.remove("black");
      }
    },
    getSearch(city) {
      if (city) {
        this.tempcity = this.city;
        this.city = city;
        console.log(this.city, this.city);
        this.searchWeather();
      }
    },
    changeView(flag) {
      this.viewFlag = flag;
      console.log(this.viewFlag);
      let contain = document.querySelector(".container");
      if (this.viewFlag === 3 || (this.viewFlag === 2 && this.weaState === 4)) {
        contain.classList.add("black");
      } else if (this.weaState !== 4) {
        contain.classList.remove("black");
      }
    },
    changeSousuoFlag() {
      console.log("触发背景点击之前" + this.sousuoFlag);
      this.sousuoFlag = true;
      console.log("触发背景点击之后" + this.sousuoFlag);
    },
    backSousuo(flag) {
      let temp = this.sousuoFlag;
      this.sousuoFlag = flag;
      if (temp !== flag) {
        console.log("回调变为" + this.sousuoFlag);
      } // 防抖！
    },
    check_data() {
      console.log(this.weatherList);
      console.log(this.Echarts_date);
    },
    changeBulb(flag) {
      console.log("Bulb get" + flag);
      this.bulbFlag = flag;
    },
  },
  created() {
    this.searchWeather(); // 初始化的时候调用一次接口
  },
  mounted() {
    this.check_data();
    this.music.analyser = this.$refs.audiobox.getAudioAnalyser();
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  /* background-image: url("https://api.ixiaowai.cn/gqapi/gqapi.php");
  background-repeat: no-repeat;
  background-size: 100% 100%; */
  background-image: linear-gradient(
    45deg,
    rgb(238, 172, 172),
    rgb(245, 226, 191),
    rgb(236, 236, 186),
    rgb(176, 231, 176),
    rgb(173, 231, 231),
    rgb(164, 164, 231),
    rgb(230, 167, 230)
  );
  overflow: hidden;
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
.mysubmit {
  margin-right: 10px;
}
.myswitch {
  margin-right: 30px;
}
.mybutton {
  margin-right: 20px;
}
.mytimer {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translateX(-50%);
}
.echarts_tyqb {
  transition: 0.5s;
}
.subcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.breath {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
}
.myBulb {
  position: fixed;
  top: 0;
  left: 80%;
  transform: translate(-50%, 0);
}
.black {
  background-color: var(--background-color);
}
h3:hover {
  animation: animate 1s linear infinite;
}
/* 原理：
通过逐帧动画，不同的时间点形状发生变化，原教程中使用scale3D，不如分开写好理解
scaleX：横向缩放比例
scaleY：纵向缩放比例 */

@keyframes animate {
  0% {
    transform: scaleX(1) scaleY(1);
  }
  35% {
    transform: scaleX(1.2) scaleY(0.75);
  }
  45% {
    transform: scaleX(0.75) scaleY(1);
  }
  60% {
    transform: scaleX(1.2) scaleY(0.8);
  }
  75% {
    transform: scaleX(1.05) scaleY(0.9);
  }
  100% {
    transform: scaleX(1) scaleY(1);
  }
}
</style>
