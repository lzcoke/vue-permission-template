<template>
  <el-row class="echarts-group">
    <el-col :span="24" class="card-echarts-col">
      <div id="main" class="card-echarts"/>
    </el-col>
  </el-row>
</template>

<script>
import { getSevenData } from '@/api/table'

export default {
  name: 'Echarts',
  data() {
    return {
      dataItem: [],
      userItem: [],
      orderItem: []
    }
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    myOrdersEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'))
      const options = {
        title: {
          textStyle: {
            fontSize: 15,
            color: 'rgba(0, 0, 0, 0.45)'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['近七天新增用户', '近七天新增订单']
        },
        color: ['#40c9c6', '#36a3f7'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: this.dateItem
        },
        grid: {
          'right': '30',
          'top': '50',
          'left': '50',
          'bottom': '30'
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '近七天新增用户',
          type: 'line',
          stack: '总量',
          data: this.userItem
        },
          {
            name: '近七天新增订单',
            type: 'line',
            stack: '总量',
            data: this.orderItem
          }]
      }
      // 指定图表的配置项和数据

      myChart.setOption(options)
    },
    getData() {
      const that = this
      getSevenData().then(response => {
        console.log(response)
        that.dateItem = response.data.dateItem
        that.userItem = response.data.userItem
        that.orderItem = response.data.orderItem
        this.myOrdersEcharts()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.echarts-group {
  margin-top: 18px;
  margin: 0px -20px;

  .card-echarts-col {
    margin-bottom: 32px;
    padding: 0px 20px;
  }

  .card-echarts {
    padding: 20px;
    box-sizing: border-box;
    height: 450px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }
}
</style>

