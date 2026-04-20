<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="activeIndex"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>我的项目</template>
      <el-menu-item index="2-1">项目 A</el-menu-item>
      <el-menu-item index="2-2">项目 B</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">关于我</el-menu-item>
  </el-menu>

  <el-row :gutter="20" style="margin: 20px 20px 40px 20px;">
  <el-col :span="8">
    <el-card shadow="hover">
      <h3>关于我</h3>
      <p>这里可以放你的个人简介或头像。</p>
    </el-card>
  </el-col>

  <el-col :span="16">
    <el-card shadow="hover">
      <h3>最新作品</h3>
      <p>这里展示你的 Vue 项目成果。</p>
      <el-button type="info" plain>查看详情</el-button>
    </el-card>
  </el-col>
</el-row>

  <div style="text-align: center; padding: 100px;">
    <h1>{{ mainTitle }}</h1>
    <p>欢迎来到我的个人空间，这里未来会放更多好玩的东西。</p>
    <el-button type="primary" @click="handleClick">点我试试</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeIndex = ref('1')
const mainTitle = ref('我的自主设计网站')

const handleClick = () => {
  ElMessage.success('恭喜！你已经学会使用 Element Plus 的反馈组件了！')
}
</script>

<style>
body {
  margin: 0; /* 清除浏览器默认的外边距，让导航栏贴顶 */
}
</style>