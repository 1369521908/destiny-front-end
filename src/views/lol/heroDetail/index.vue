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
