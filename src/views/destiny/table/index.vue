<template>
  <!--外层-->
  <div class="app-container">
    <!--头-->
    <div class="el-header">
      <el-button @click="fetchData">查询</el-button>
      <el-button class="el-button--danger" @click="handleDeleteAll">删除</el-button>
    </div>
    <el-divider />
    <!--内容主体-->
    <div class="el-main">
      <el-table
        v-loading="listLoading"
        empty-text="没有数据啊~"
        :data="list"
        style="width: 100%"
        row-key="id"
        fit
        border
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
              <img :src="scope.row.avatar" width="45%" height="45%" alt>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.date | dateFormat('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="其他信息" type="expand" width="100px">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="联系人(列表)">
                <div>
                  <el-button v-for="(val, index) in JSON.parse(props.row.contactIdList)" :key="index">
                    {{ val }}
                  </el-button>
                </div>
              </el-form-item><br>
              <el-form-item label="照片(列表)">
                <div>
                  <p v-for="(val, index) in JSON.parse(props.row.pictureList)" :key="index">
                    <img :src="val" alt width="45%" height="45%">
                  </p>
                </div>
              </el-form-item><br>
            </el-form>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id, scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--脚 分页-->
    <!-- 分页居中放置-->
    <nav style="text-align: center">
      <div id="callBackPager">
        <el-pagination
          v-if="list.length > 0"
          :current-page="current"
          :page-sizes="[50, 100, 200, 300, 400, 1000]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </nav>
    <!--表单-->
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
      list: [],
      listLoading: true,
      total: 0,
      current: 1,
      size: 50
    }
  },
  computed: {
    params: function() {
      return {
        'current': this.current,
        'size': this.size
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      console.log(this.params)
      getList(this.params).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    handleDelete(index, row) {
      console.log(index)
      console.log(row)
    },
    handleEdit(index, row) {
      console.log(index)
      console.log(row)
    },
    handleDeleteAll(e) {
      this.list = []
    },
    handleSizeChange(e) {
      this.size = e
      this.fetchData()
    },
    handleCurrentChange(e) {
      this.current = e
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
