<!-- src/App.vue 的模板部分 -->
<template>
  <div class="app-wrapper">
    <!-- 顶部导航栏包裹层 -->
    <header class="header-bar">
      <!-- 🌟 新增：限宽容器，让内容不再“贴边” -->
      <div class="header-container">
        <!-- 重新设计的 Logo 区域 -->
        <div class="nav-brand" @click="$router.push('/')">
          THREEZ<span>.GARDEN</span>
        </div>
        
        <!-- 导航菜单 -->
        <el-menu
          :default-active="$route.path"
          class="menu-custom"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/notes">碎片</el-menu-item>
          <el-menu-item index="/projects">项目</el-menu-item>
          <el-menu-item index="/lab">实验室</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
        </el-menu>
      </div>
    </header>

    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<style>
/* 1. 导航栏外层：负责背景和阴影 */
.header-bar {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #f1f5f9;
}

/* 2. 🌟 核心：限宽容器，与下方内容对齐 */
.header-container {
  max-width: 1200px;
  margin: 0 auto;     /* 居中 */
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Logo 在左，菜单在右 */
  height: 64px;       /* 稍微加高一点，更有呼吸感 */
}

/* 3. 重新设计的 Logo：不再“丑”的秘诀 */
.nav-brand {
  font-family: 'Inter', sans-serif; /* 使用我们在 style.css 里的 Inter 字体 */
  font-size: 20px;
  font-weight: 900;       /* 特粗，才有品牌感 */
  letter-spacing: 1px;    /* 稍微拉开字间距 */
  color: #0f172a;
  cursor: pointer;
  user-select: none;
}

.nav-brand span {
  color: #6366f1;         /* 后半段用主题蓝 */
  font-weight: 400;       /* 粗细对比，是现代 UI 的常用套路 */
}

/* 4. 菜单样式微调：去掉 Element Plus 默认的边框和底色 */
.menu-custom {
  border-bottom: none !important;
  background: transparent !important;
  flex-grow: 0; /* 不要撑满 */
}

.menu-custom .el-menu-item {
  font-size: 15px;
  font-weight: 500;
  color: #475569 !important;
}

.menu-custom .el-menu-item.is-active {
  color: #6366f1 !important;
  font-weight: 700;
}

/* 页面主体 */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
}
</style>