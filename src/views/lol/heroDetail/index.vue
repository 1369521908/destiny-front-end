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
import G2 from '@antv/g2'

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
    hexagramSimple() {
      const chart = new G2.Chart({
        container: 'hexagram',
        forceFit: true,
        height: window.innerHeight
      })
      chart.source(this.hexagram)
      console.log('初始化UI控件', chart)
      // 后台请求数据
      get(this.id).then(response => {
        console.log(response)
      }).catch(e => {
        console.log(e)
      })
      console.log()
    }
  }
}
</script>

<style scoped>

</style>
