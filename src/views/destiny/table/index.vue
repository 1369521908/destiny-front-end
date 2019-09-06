<template>
  <div class="app-container">
    <el-button type="primary" :loading="loading" @click="handleClick">主要按钮</el-button>
  </div>
</template>

<script>
import { getList } from '@/api/destiny'

export default {
  data() {
    return {
      loading: false,
      list: null
    }
  },
  mounted() {
    this.loading = false
  },
  methods: {
    handleClick() {
      this.loading = true
      getList().then(response => {
        this.list = response.data.items
        console.log(response)
        this.loading = false
      }).catch(e => {
        console.log(e)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
