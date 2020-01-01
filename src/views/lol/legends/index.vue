<template>
  <el-main class="el-container">
    <div>
      <!--搜索-->
      <el-row>
        <!--搜索框-->
        <el-col :span="8">
          <div>
            <el-input v-model="form.heroName" placeholder="亚索/疾风剑豪/YaSuo → 回车走起" @keyup.enter.native="fetchData(form)" />
          </div>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <!--搜索按钮-->
        <el-col :span="8">
          <el-button @click="fetchData(form)">走起</el-button>
          <el-button @click="resetData">重置</el-button>
        </el-col>
      </el-row>
      <!--分类搜索-->
      <el-row>
        <avue-search v-model="form" :option="option" @change="handleChange">
          <!--<template slot="zdy" slot-scope="">
              <el-tag>自定义</el-tag>
            </template>-->
        </avue-search>
      </el-row>
      <el-row>
        <el-alert
          title="搜索完成"
          type="success"
          :scope="dataCard"
          :closable="false"
        >
          <p>结果数量: {{ dataCard.length }}</p>
        </el-alert>
      </el-row>
      <!--分割线-->
      <el-divider />
      <!--结果表格-->
      <el-row>
        <avue-card :option="optionCard" :data="dataCard">
          <template slot="menu" slot-scope="scope">
            <span @click.stop="model(scope.row,scope.index)">模型</span>
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.shortBio.toString() }}</div>
            </el-tooltip>
            <span @click.stop="detail(scope.row,scope.index)">详情</span>
          </template>
        </avue-card>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import { getDetailList } from '@/api/lol'
import { heroRole } from '@/enum/heroEnums'

export default {
  data() {
    return {
      optionCard: {
        addBtn: false,
        props: {
          alias: 'alias',
          img: 'avatar',
          title: 'name',
          info: 'shortBio',
          id: 'heroId'
        }
      },
      dataCard: [],
      form: {
        heroName: '',
        heroRole: []
      },
      option: {
        column: [{
          label: '英雄定位',
          prop: 'heroRole',
          dicData: heroRole
        }]
      }
    }
  },
  computed: {
    params: function() {
      return {
        roles: this.form.heroRole.length === 0 ? [] : this.form.heroRole,
        name: this.form.heroName.trim() === '' ? null : this.form.heroName,
        title: this.form.heroName.trim() === '' ? null : this.form.heroName,
        alias: this.form.heroName.trim() === '' ? null : this.form.heroName
      }
    }
  },
  mounted() {
    this.fetchData(this.params)
  },
  methods: {
    model(row, index) {
      this.$message.success('跳转模型查看页面...')
      console.log(row, index)
    },
    detail(row, index) {
      this.$message.success('查看控制台')
      console.log(row, index)
      // 导航到详情页面
      this.$router.push({
        path: './HeroDetail',
        query: {
          heroId: index
        }
      })
    },
    handleChange(form) {
      // console.log('筛选搜索', form)
      /* this.$message.success({
        message: JSON.stringify(this.params),
        duration: 1000
      })*/
      this.fetchData(this.params)
    },
    fetchData(form) {
      // loading
      const loading = this.$loading({
        lock: true,
        text: '正在请求数据,请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      })

      this.dataCard = []

      getDetailList(this.params).then(response => {
        this.dataCard = response.data
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        loading.close()
      })
    },
    resetData() {
      this.form.heroName = ''
      this.form.heroRole = []
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
