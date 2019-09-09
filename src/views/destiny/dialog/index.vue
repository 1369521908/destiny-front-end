<template>
  <div class="app-container">
    <avue-crud
      :data="data"
      :option="option"
      :page="page"
      @on-load="fetchData"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>

import { getList } from '@/api/destiny'

export default {
  data() {
    return {
      obj: {},
      page: {
        // pageSizes: [10, 20, 30, 40],默认
        currentPage: 1,
        total: 10,
        pageSize: 10
      },
      data: [],
      option: {
        title: '用户',
        page: true,
        align: 'center',
        menuAlign: 'center',
        border: true,
        dialogDrag: true,
        dialogModal: false,
        column: [
          {
            label: '姓名',
            prop: 'username'
          },
          {
            label: '性别',
            prop: 'sex',
            type: 'string'
          }, {
            label: '日期',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss'
          }
        ]
      }
    }
  },
  methods: {
    fetchData() {
      getList(this.page).then(response => {
        this.data = response.data.records
        this.page.total = response.data.total
      }).catch(e => {
        console.log(e)
      })
    },
    sizeChange(val) {
      this.page.pageSize = val
      this.fetchData()
    },
    currentChange(val) {
      this.page.currentPage = val
      this.fetchData()
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

