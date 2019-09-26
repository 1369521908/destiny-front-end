<template>
  <!--原生element-ui表格控件示例-->
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
      <el-button @click="() => { $vm.showId = !showId}">显示官方id</el-button>
      <el-table
        v-loading="listLoading"
        empty-text="没有数据啊~"
        :data="list"
        style="width: 100%"
        row-key="id"
        size="small"
        fit
        border
      >
        <el-table-column align="center" label="id" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column v-if="showId" label="heroId(官方id)">
          <template slot-scope="scope">
            {{ scope.row.heroId }}
          </template>
        </el-table-column>
        <el-table-column label="avatar">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.avatar" width="45%" height="45%" alt>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="alias">
          <template slot-scope="scope">
            {{ scope.row.alias }}
          </template>
        </el-table-column>
        <el-table-column label="英雄名称" title="name-title">
          <template slot-scope="scope">
            {{ scope.row.name }} - {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="role">
          <template slot-scope="scope">
            <el-popover v-for="(role , i) in calRole(scope.row.role)" :key="i" trigger="hover" placement="top">
              <p>推荐: {{ scope.row.role }}</p>
              <div slot="reference" class="name-wrapper">
                <!--<el-tag size="medium">{{ i }}</el-tag>-->
                <el-tag size="medium">{{ role }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!--六芒星-->
        <el-table-column label="attribute倾向(伪六芒星)">
          <template slot-scope="scope">
            attack(攻击):<el-progress :width="100" :stroke-width="15" :text-inside="true" :percentage="(scope.row.attack) * 10" type="line" />
            defense(防御):<el-progress :width="100" :stroke-width="15" :text-inside="true" :percentage="(scope.row.defense) * 10" type="line" status="success" />
            magic(魔法):<el-progress :width="100" :stroke-width="15" :text-inside="true" :percentage="(scope.row.magic) * 10" type="line" status="exception" />
            difficulty(难度):<el-progress :width="100" :stroke-width="15" :text-inside="true" :percentage="(scope.row.difficulty) * 10" type="line" status="warning" />
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
          :page-sizes="[10, 20, 30, 40, 50, 60]"
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
import { getList } from '@/api/lol'

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
      size: 10,
      showId: false
    }
  },
  computed: {
    params: function() {
      return {
        'currentPage': this.current,
        'pageSize': this.size
      }
    }
  },
  mounted() {
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
    },
    calRole(role) {
      const roles = []
      for (const r of role.replace('[', '').replace(']', '').replace(' ', '').trim().split(',')) {
        roles.push(r)
      }
      console.log(roles)
      return roles
    }
  }
}
</script>

<style scoped>

</style>
