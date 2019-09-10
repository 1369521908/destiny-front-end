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
        // pageSizes: [10, 20, 30, 40, 50, 100, 200], // 默认
        currentPage: 1,
        total: 10,
        pageSize: 10
      },
      data: [],
      option: {
        title: '用户',
        align: 'center',
        menuAlign: 'center',
        border: true,
        dialogDrag: true,
        dialogModal: false,
        column: []
      }
    }
  },
  methods: {
    fetchData() {
      console.log(this.page)
      getList(this.page).then(response => {
        this.data = response.data.records
        this.page.total = response.data.total
        this.option.column = JSON.parse(response.data.column)
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

