<template>
  <div class="app-container">
    <el-button type="primary" :loading="loading" @click="handleClick">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.loading = false
  },
  methods: {
    handleClick(done) {
      this.loading = true

      this.$confirm('确认关闭？')
        .then(_ => {
          this.loading = false
          done()
        })
        .catch(e => {
        })
    }
  }
}
</script>

<style scoped>

</style>
