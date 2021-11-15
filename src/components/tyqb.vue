<!--
 * @Author: 41
 * @Date: 2021-11-15 09:30:46
 * @LastEditors: 41
 * @LastEditTime: 2021-11-15 10:17:19
 * @Description:
-->
<template>
    <div class="week-container">
        <ul class="week-list" >
            <li id="day1" v-for="(item,index) in weatherList" :key="index">
                <span :class="iconObj[item.type]"></span>
                <span class="day-name">{{item.type}}</span>
                <span class="day-name">{{item.date}}</span>
                <span class="day-temp">{{item.low}}</span>
                <span class="day-temp">{{item.high}}</span>
            </li>
        </ul>
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

    }
  },
  data () {
    return {
      city: '长沙',
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

  }
}
</script>

<style scoped>
.week-container{
    background-color: rgb(158, 157, 155);
    color:#ffffff;
}
.week-list {
    margin: 10px 35px;
    border-radius: 10px;
    box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}
.week-list ul{
    /* list-style: none; */
    /* margin-left: 50px; */
}
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
