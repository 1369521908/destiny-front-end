<template>
  <el-container>
    <el-header />
    <el-main>
      <el-container>
        <el-col :span="6">
          <img :src="avatar">
          <el-input v-model="id" />
          <el-button @click="hexagramSimple">点击</el-button>
        </el-col>
      </el-container>
      <el-container>
        <div id="hexagram" style="width: 600px; height:400px;" />
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import { get } from '@/api/lol'

export default {
  data() {
    return {
      id: 429,
      max: 10,
      hexagram: {},
      avatar: ''
    }
  },
  computed: {
    hero: function() {
      return {}
    },
    option: function() {
      return {}
    }
  },
  watch: {
  },
  mounted() {
    this.hexagramSimple()
  },
  methods: {
    // 初始化 echart
    hexagramSimple() {
      // 初始化echart控件
      this.hexagram = this.$echarts.init(document.getElementById('hexagram'))
      // 后台请求数据
      get(this.id).then(response => {
        for (const k in response.data) {
          this.hero[k] = response.data[k]
        }
        this.avatar = response.data.avatar
        const option = {
          title: {
            text: this.hero.name
          },
          tooltip: {},
          legend: {
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#ddd',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '攻击力(attack)', max: this.max },
              { name: '防御(defense)', max: this.max },
              { name: '魔法(magic)', max: this.max },
              { name: '上手难度(difficulty)', max: this.max }
            ],
            splitArea: {
              areaStyle: {
                color: [
                  'rgba(114, 172, 209, 0.2)',
                  'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                  'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'
                ],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 10
              }
            }
          },
          series: [{
            name: '',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [],
                name: ''
              }
            ]
          }]
        }
        const val = option.series[0].data[0].value
        val.push(response.data.attack)
        val.push(response.data.defense)
        val.push(response.data.magic)
        val.push(response.data.difficulty)

        // 设置option
        this.hexagram.setOption(option)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>

</style>
