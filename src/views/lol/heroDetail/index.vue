<template>
  <el-container>
    <el-header />
    <el-main>
      <el-row>
        <el-alert>{{ JSON.stringify(heroDetail) }}</el-alert>
      </el-row>
      <el-row>
        <el-alert>{{ JSON.stringify(heroSpell) }}</el-alert>
      </el-row>
      <el-row>
        <el-alert>{{ JSON.stringify(heroSkin) }}</el-alert>
      </el-row>
      <!--渲染-->
      <el-row>
        <el-container>
          <div id="hexagram" style="width: 600px; height:400px;" />
        </el-container>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getDetail } from '@/api/lol'
import { getSpell } from '@/api/lol'
import { getSkin } from '@/api/lol'
import G2 from '@antv/g2'

export default {
  data() {
    return {
      id: 429,
      max: 10,
      hexagram: {},
      avatar: '',
      heroDetail: {},
      heroSpell: [],
      heroSkin: []
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
    getDetail(this.id).then(response => {
      this.heroDetail = response.data
    })
    getSpell(this.id).then(response => {
      console.log(response)
      this.heroSpell = response.data
    })
    getSkin(this.id).then(response => {
      console.log(response)
      this.heroSkin = response.data
    })
    // 属性
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
    }
  }
}
</script>

<style scoped>

</style>
