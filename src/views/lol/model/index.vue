<template>
  <el-main class="el-container">
    <!--选择器-->
    <el-row>
      <el-col>
        <el-button>选择英雄</el-button>
      </el-col>
    </el-row>
    <!--分割线-->
    <el-divider />
    <!--模型视图-->
    <el-row>
      <el-col>
        <div>
          <div id="container" />
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import * as Three from 'three'
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    // 初始化
    init() {
      // 获取容器
      const container = document.getElementById('container')
      // 创建和设置摄像机
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 1
      // 创建场景
      this.scene = new Three.Scene()

      // 几何体模型
      const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      // 赋予材质
      const material = new Three.MeshNormalMaterial()
      // 几何体和材质组合成网格
      this.mesh = new Three.Mesh(geometry, material)

      // 场景添加网格
      this.scene.add(this.mesh)

      // webgl渲染
      this.renderer = new Three.WebGLRenderer({ antialias: true })
      // 设置大小
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      // 在容器中添加渲染子节点
      container.appendChild(this.renderer.domElement)
    },
    // 动画
    animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
  #container {
    height: 400px;
  }
</style>
