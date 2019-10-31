<template>
  <el-main class="el-container">
    <!--上传控件-->
    <el-row>
      <el-col :span="6">
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="handleBefore"
          :on-change="changeFile"
          :file-list="fileList"
          :auto-upload="false"
          accept="wad/client"
        >
          <el-button slot="trigger" size="small" type="primary">wad</el-button>
          <el-button style="margin-left: 10px;" size="small" @click="submitUpload">解析</el-button>
          <el-button style="margin-left: 10px;" size="small" disabled="export">导出</el-button>
          <div slot="tip" class="el-upload__tip">{{ msg }}</div>
        </el-upload>
        <!--预留选项框-->
        <!--<el-select v-model="value" placeholder="请选择/搜索英雄">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>-->
      </el-col>
    </el-row>
    <el-divider />
    <!--过滤器-->
    <el-row>
      <el-col :span="6">
        <el-input v-model="filter" placeholder="filter" />
      </el-col>
    </el-row>
    <el-divider />
    <!--解析表格-->
    <el-row>
      <el-col :span="24">
        <vxe-table
          ref="xTable"
          border
          stripe
          resizable
          show-overflow
          height="680"
        >
          <vxe-table-column type="index" width="100" />
          <vxe-table-column title="hash" field="hash" sortable>
            <template slot-scope="scope">
              <el-input v-text="scope.row.hash" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="hex" title="hex" sortable>
            <template slot-scope="scope">
              <el-button class="hex" @click="copyHex(scope.row)">{{ scope.row.hex }}</el-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="name" sortable width="50%" />
          <vxe-table-column field="type" title="type" sortable />
          <vxe-table-column field="size" title="size" sortable />
          <vxe-table-column field="fileRedirection" title="fileRedirection" sortable />
        </vxe-table>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import axios from 'axios'
import ClipboardJs from 'clipboard'
export default {
  data() {
    return {
      uploadUrl: '/lol/obsidian/wad/convert',
      fileList: [],
      data: [],
      msg: '',
      filter: '',
      copyBtn: null,
      export: false
    }
  },
  mounted() {
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    changeFile() {
      this.msg = null
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleBefore(file) {
      // loading
      const loading = this.$loading({
        lock: true,
        text: '正在解析wad文件,解析时间与文件大小成正比,请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      })

      // 上传表单
      const formData = new FormData()
      formData.append('file', file)
      axios.post('/api/lol/obsidian/wad/convert', formData).then(response => {
        // 大数组
        this.$refs.xTable.reloadData(response.data.data)
        this.msg = '文件:' + file.name + ',解析文件数:' + response.data.data.length
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        loading.close()
      })

      // 屏蔽了action的默认上传
      return false
    },
    copyHex(row) {
      const clipboard = new ClipboardJs('.hex', {
        text: function() {
          return row.hex.replace(/-/g, '')
        }
      })
      clipboard.on('success', e => {
        this.$message.success({ message: '复制成功:' + e.text, showClose: true })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message.error({ message: '复制失败', showClose: true })
        clipboard.destroy()
      })
    }
  }
}
</script>

<style scoped>

</style>
