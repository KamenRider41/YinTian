/*
 * @Author: 41
 * @Date: 2021-11-08 18:09:35
 * @LastEditors: 41
 * @LastEditTime: 2021-11-15 14:12:04
 * @Description:
 */
import * as echarts from 'echarts'

export const option = {
  color: ['#00DDFF', '#FF0087'],
  title: {
    text: '天气之子哇！'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['低温', '高温']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '5%',
    right: '6%',
    bottom: '2%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '低温',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgba(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [20, 8, 11, 34, 20, 34, 31]
    },
    {
      name: '高温',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgba(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [22, 42, 31, 34, 19, 23, 12]
    }
  ]
}
