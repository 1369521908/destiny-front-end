<template>
  <div class="app-container">
    <el-button @click="fetchData">开始</el-button>
    <el-button class="el-button--danger" @click="deleteData">删除数据</el-button>
    <el-table
      v-loading="listLoading"
      empty-text="没有数据"
      :data="list"
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column label="密码">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          {{ scope.row.tag }}
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.head" width="45%" height="45%" alt>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="联系人(列表)">
        <template slot-scope="scope">
          {{ scope.row.contactIdList }}
        </template>
      </el-table-column>
      <el-table-column label="照片(列表)">
        <template slot-scope="scope">
          {{ scope.row.pictureList }}
        </template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.date | dateFormat('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/destiny'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.records
        this.listLoading = false
      })
    },
    deleteData() {
      this.list = null
    }
  }
}
</script>

<style scoped>

</style>
