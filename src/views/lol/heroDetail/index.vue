<template>
  <el-container>
    <el-header>
      <div>
        <el-input v-model="id"/>
        <el-button @click="hexagramSimple">点击</el-button>
      </div>
    </el-header>
    <el-main>
      <div id="hexagramSimple" style="width: 600px;height:400px;" />
    </el-main>
  </el-container>
</template>

<script>
import { getDetail } from '@/api/lol'

export default {
  data() {
    return {
      id: 429,
      max: 10,
      
    }
  },
  computed: {
    option: function() {
      return {
    title: {
        text: '英雄六芒星'
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
           { name: '攻击力(attack)', max: this.max},
           { name: '防御(defense)', max: this.max},
           { name: '魔法(magic)', max: this.max},
           { name: '上手难度(difficulty)', max: this.max}
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
        data : [
            {
                value : this.hexagramVal,
                name : '英雄属性'
            }
        ]
    }]
}
    },
    hero: function() {
      return {}
    },
    hexagramVal: function() {
      return []
    }
  },
  mounted() {
    this.hexagramSimple()
  },
  methods: {
    // 初始化 echart
    hexagramSimple() {
      // 初始化echart控件
      const hexagramSimple = this.$echarts.init(document.getElementById('hexagramSimple'))
      // 后台请求数据
      getDetail(this.id).then(response => {
        for(const k in response.data) {
          // 动态构造对象
          this.hero[k] = response.data[k]
        }
        this.hexagramVal.push(this.hero.attack)
        this.hexagramVal.push(this.hero.defense)
        this.hexagramVal.push(this.hero.magic)
        this.hexagramVal.push(this.hero.difficulty)

        // 设置echart控件
        hexagramSimple.setOption(this.option)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>

</style>
