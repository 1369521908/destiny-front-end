<template>
  <el-main class="el-container">
    <div style="width: 50%;">
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="uploadUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="handleBefore"
        :file-list="fileList"
        :auto-upload="false"
        accept="wad,client"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传*.wad文件</div>
      </el-upload>
    </div>
    <div>
      <!--预留选项框-->
      <!--<avue-form v-model="form" :option="option" @submit="handleSubmit">
        <template slot="provinceType" slot-scope="{item,value,label}">
          <span />
        </template>
      </avue-form>-->
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="hash"
          label="Hash"
          width="auto"
        />
        <el-table-column
          prop="name"
          label="Name"
        />
        <el-table-column
          prop="name"
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
    </div>
  </el-main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      uploadUrl: '/lol/obsidian/wad/convert',
      fileList: [],
      tableData: []
    }
  },
  methods: {
    submitUpload() {
      console.log('上传文件')
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleBefore(file) {
      // 上传表单
      const formData = new FormData()
      formData.append('file', file)
      axios.post('/api/lol/obsidian/wad/convert', formData).then(res => {
        this.tableData = res.data.data
      }).catch(response => {
        console.log(response)
      })
      // 屏蔽了action的默认上传
      return false
    },
    tip() {

    }
  }
}
</script>

<style scoped>

</style>
