<template>
  <el-container>
    <el-header>
      <el-button>点击</el-button>
    </el-header>
    <el-main>
      <div id="main" style="width: 600px;height:400px;" />
    </el-main>
  </el-container>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->

</template>

<script>
import { getDetailList } from '@/api/lol'

export default {
  data() {
    return {
      data: {},
      page: {}
    }
  },
  computed: {
    option: function() {
      return {
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: [],
          type: 'line'
        }]
      }
    }
  },
  mounted() {
    this.eChart()
  },
  methods: {
    // 初始化 echart
    eChart() {
      const eChart = this.$echarts.init(document.getElementById('main'))
      getDetailList(this.data, this.page).then(response => {
        this.data = response.data.records
        this.page.total = response.data.total
        // this.option.column = JSON.parse(response.header)
        const heroName = []
        const attackRange = []
        for (const d in response.data.records) {
          const hero = response.data.records[d]
          heroName.push(hero.alias)
          attackRange.push(hero.attackrange)
        }
        this.option.xAxis.data = heroName
        this.option.series[0].data = attackRange
        eChart.setOption(this.option)
        console.log(this.option.xAxis.data)
        console.log(this.option.series[0].data)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>

</style>
