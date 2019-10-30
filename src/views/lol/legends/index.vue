<template>
  <el-main class="el-container">
    <div>
      <avue-search v-model="form" :option="option" @change="handleChange">
        <template slot="zdy" slot-scope="">
          <el-tag>自定义</el-tag>
        </template>
      </avue-search>
      <avue-card :option="optionCard" :data="dataCard">
        <template slot="menu" slot-scope="scope">
          <span @click.stop="model(scope.row,scope.index)">模型</span>
          <el-tooltip placement="top">
            <div slot="content">{{ scope.row.shortBio.toString() }}</div>
            <span @click.stop="detail(scope.row,scope.index)">详情</span>
          </el-tooltip>
        </template>
      </avue-card>
    </div>
  </el-main>
</template>

<script>
import { getDetailList } from '@/api/lol'
export default {
  data() {
    return {
      optionCard: {
        addBtn: false,
        props: {
          alias: '',
          img: 'avatar',
          title: 'name',
          info: 'shortBio',
          id: 'heroId'
        }
      },
      dataCard: [],
      form: {
        zt: ['370000', '620000', '610000', '110000', '410000'],
        checkbox: 0,
        jtgj: [0, 1, 2, 3, 4]
      },
      option: {
        column: [{
          label: '定位',
          prop: 'role',
          dicData: [{
            label: '法师',
            value: 0
          }, {
            label: '坦克',
            value: 1
          }, {
            label: '刺客',
            value: 2
          }, {
            label: '射手',
            value: 3
          }]
        }]
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    model(row, index) {
      this.$message.success('model')
      console.log(row, index)
    },
    detail(row, index) {
      this.$message.success('查看控制台')
      console.log(row, index)
      // this.$router.addRoutes()
    },
    handleChange(form) {
      console.log('筛选搜索')
      this.$message.success(JSON.stringify(form))
    },
    fetchData() {
      this.dataCard = []
      getDetailList({ currentPage: 0, pageSize: 999 }).then(response => {
        this.dataCard = response.data.records
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>

</style>
