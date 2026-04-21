<!-- src/App.vue -->
<template>
  <div class="app-wrapper">
    <!-- 顶部导航栏：sticky 让它滚动时吸顶 -->
    <el-menu
      :default-active="$route.path"
      class="top-nav"
      mode="horizontal"
      :router="true"
      background-color="#ffffff"
      text-color="#333333"
      active-text-color="#409EFF"
    >
      <div class="nav-brand">我的个人网站</div>
      
      <el-menu-item index="/">🏠 首页</el-menu-item>
      <el-menu-item index="/notes">📝 学习笔记</el-menu-item>
      <el-menu-item index="/projects">🚀 项目展示</el-menu-item>
      <el-menu-item index="/about">👤 关于</el-menu-item>
    </el-menu>

    <!-- 路由页面会在这里渲染 -->
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// $route 是全局可用的，用来高亮当前导航项
</script>

<style>
/* 全局基础样式，让页面背景干净一些 */
body {
  margin: 0;
  background-color: #f5f7fa;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
}

.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.nav-brand {
  font-size: 20px;
  font-weight: bold;
  margin-right: 48px;
  color: #409EFF;
  white-space: nowrap;
}

.main-container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 20px;
}
</style>