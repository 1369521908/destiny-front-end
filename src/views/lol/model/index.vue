<template>
  <el-main class="el-container">
    <!--选择器-->
    <el-row>
      <el-col>
        <el-button>选择英雄</el-button>
      </el-col>
    </el-row>
    <!--参数滑动条-->
    <el-row>
      <el-col :span="6">
        <p>camera</p>
        <el-slider :value="position" :format-tooltip="formatTooltip" @input="changeCamera" />
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
import * as THREE from 'three'
export default {
  data() {
    return {
      // 摄像机
      camera: null,
      // 场景
      scene: null,
      // 网格
      mesh: null,
      // 几何体
      geometry: null,
      // 材质
      material: null,
      // 摄像机z初始位置
      position: 100
    }
  },
  computed: {
  },
  mounted() {
    this.init()
    this.animate()
    // this.glft()
  },
  methods: {
    // 格式化滑块数值输出大小
    formatTooltip(val) {
      return val / 100
    },
    // 初始化
    init() {
      // 获取容器
      const container = document.getElementById('container')
      // 创建和设置摄像机
      this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = this.formatTooltip(this.position)
      // 创建场景
      this.scene = new THREE.Scene()

      // 几何体模型
      this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)

      // 赋予材质
      this.material = new THREE.MeshNormalMaterial()

      // 几何体和材质组合成网格
      this.mesh = new THREE.Mesh(this.geometry, this.material)

      // 场景添加网格
      this.scene.add(this.mesh)

      // webgl渲染
      this.renderer = new THREE.WebGLRenderer({ antialias: true })

      // 设置渲染大小
      this.renderer.setSize(container.clientWidth, container.clientHeight)

      // 在容器中添加渲染子节点
      container.appendChild(this.renderer.domElement)
    },
    changeCamera(position) {
      // 摄像机重新赋值
      this.camera.position.z = parseFloat(position / 100)
      // 变换赋值
      this.position = position
    },
    // 动画
    animate() {
      requestAnimationFrame(this.animate)
      // 网格变换
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.mesh.rotation.z += 0.03

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
