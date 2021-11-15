<!--
 * @Author: 41
 * @Date: 2021-11-15 10:48:28
 * @LastEditors: 41
 * @LastEditTime: 2021-11-15 14:12:29
 * @Description:
-->
<template>
    <div :id="uuid" :style="style" ></div>
</template>

<script>
import * as echarts from 'echarts'
const idGen = () => {
  return new Date().getTime()
}
export default {
  props: {
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '600px'
    },
    options: {
      type: Object,
      default: null
    },
    Echarts_date: {
      type: Array,
      default: null
    },
    Echarts_low: {
      type: Array,
      default: null
    },
    Echarts_high: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      uuid: null,
      myChart: null
    }
  },
  watch: {
    width () {
      if (this.myChart) {
        this.myChart.resize({
          animation: {
            duration: 300
          }
        })
      }
    },
    options () {
      if (this.myChart) {
        this.myChart.setOption(this.options, {
          notMerge: true
        })
      }
    },
    Echarts_date () {
      if (this.myChart) {
        this.options.xAxis[0].data = this.Echarts_date
        this.myChart.setOption(this.options, {
          notMerge: true
        })
      }
    },
    Echarts_low () {
      if (this.myChart) {
        this.options.series[0].data = this.Echarts_low
        this.myChart.setOption(this.options, {
          notMerge: true
        })
      }
    },
    Echarts_high () {
      if (this.myChart) {
        this.options.series[1].data = this.Echarts_high
        this.myChart.setOption(this.options, {
          notMerge: true
        })
      }
    }
  },
  computed: {
    style () {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  created () {
    this.uuid = idGen()
  },
  mounted () {
    // 官方流程
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById(this.uuid))
    // 指定图表的配置项和数据
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.options)
    console.log(this.Echarts_date)
    console.log(this.Echarts_low)
    console.log(this.Echarts_high)
  }
}
</script>

<style>
</style>
