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
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">解析</el-button>
          <div slot="tip" class="el-upload__tip">{{ msg }}</div>
        </el-upload>
      </el-col>
    </el-row>
    <!--预留的选项框-->
    <el-row>
      <el-col :span="6">
        <!--预留选项框-->
        <!--<avue-form v-model="form" :option="option" @submit="handleSubmit">
          <template slot="provinceType" slot-scope="{item,value,label}">
            <span />
          </template>
        </avue-form>-->
      </el-col>
    </el-row>
    <!--解析表格-->
    <el-divider />
    <el-row>
      <el-col :spam="24">
        <el-table
          :data="tableData"
          border
          stripe
        >
          <el-table-column
            prop="hash"
            label="Hash"
          />
          <el-table-column
            label="Hex"
          >
            <template slot-scope="scope">
              <el-row>
                <el-button @click="copyHex">{{ scope.row.hex }}</el-button>
              </el-row>
              <el-row>
                <el-button @click="copyHex">{{ scope.row.hex.replace(/-/g, '') }}</el-button>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
          />
          <el-table-column
            prop="type"
            label="Type"
          />
          <el-table-column
            prop="size"
            label="Size(KB)"
          />
          <el-table-column
            prop="fileRedirection"
            label="File Redirection"
          />
        </el-table>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      uploadUrl: '/lol/obsidian/wad/convert',
      fileList: [],
      tableData: [],
      msg: ''
    }
  },
  methods: {
    submitUpload() {
      console.log('上传文件')
      this.$refs.upload.submit()
    },
    changeFile() {
      this.msg = null
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleBefore(file) {
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
        this.tableData = response.data.data
        this.msg = '文件:' + file.name + ',解析后文件数:' + response.data.data.length
        console.log(response)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        loading.close()
      })
      // 屏蔽了action的默认上传
      return false
    },
    copyHex(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
