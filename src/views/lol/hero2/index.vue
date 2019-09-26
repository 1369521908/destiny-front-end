<template>
  <!--Avue 表格控件示例-->
  <div class="app-container">
    <avue-crud
      :data="data"
      :option="option"
      :page="page"
      :table-loading="loading"
      @on-load="fetchData"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>

import { getList } from '@/api/lol'

export default {
  data() {
    return {
      obj: {},
      loading: false,
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      data: [],
      option: {
        title: '英雄(Avue)',
        rowKey: 'id',
        tip: true,
        index: true,
        selection: true,
        border: true,
        headerAlign: 'center',
        align: 'center',
        menu: true,
        menuAlign: 'center',
        menuType: 'button',
        column: [
          {
            label: 'id',
            prop: 'id',
            type: 'number',
            filter: true,
            dataType: 'number',
            readonly: true
          },
          {
            label: '英雄id(官方)',
            prop: 'heroId',
            type: 'number',
            filter: true,
            search: true,
            dataType: 'number',
            readonly: true
          },
          {
            label: '英雄名称',
            prop: 'name',
            type: 'input',
            search: true,
            dataType: 'string',
            readonly: true
          },
          {
            label: '别名',
            prop: 'alias',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'string'
          },
          {
            label: '标题',
            prop: 'title',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'string'
          },
          {
            label: '位置',
            prop: 'roles',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'string'
          },
          {
            label: '是否周免',
            prop: 'isWeekFree',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'string'
          },
          {
            label: '攻击(六芒星)',
            prop: 'attack',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'number'
          },
          {
            label: '防御(六芒星)',
            prop: 'defense',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'number'
          },
          {
            label: '魔法(六芒星)',
            prop: 'magic',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'number'
          },
          {
            label: '上手难度(六芒星)',
            prop: 'difficulty',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'number'
          },
          /* {
            label: '选择音效',
            prop: 'selectAudio',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'number'
          },
          {
            label: '被禁音效',
            prop: 'banAudio',
            type: 'input',
            filter: true,
            search: true,
            dataType: 'number'
          },*/
          {
            label: '英雄图标',
            prop: 'avatar',
            type: 'input',
            filter: true,
            search: true,
            remote: true,
            dataType: 'string'
          }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    fetchData() {
      this.loading = true
      getList(this.page).then(response => {
        this.data = response.data.records
        this.page.total = response.data.total
        // this.option.column = JSON.parse(response.header)
        this.loading = false
      }).catch(e => {
        this.loading = false
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

