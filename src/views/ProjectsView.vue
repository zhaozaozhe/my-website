<!-- src/views/ProjectsView.vue -->
<template>
  <div class="projects-container">
    <!-- 头部介绍区 -->
    <div class="page-header">
      <h1 class="page-title">🚀 项目展示</h1>
      <p class="page-desc">
        这里是我造过的一些轮子，以及正在折腾的业余项目。<br>
        Talk is cheap, show me the code.
      </p>
    </div>

    <!-- 核心：Grid 网格容器 -->
    <div class="project-grid">
      
      <!-- 循环渲染项目卡片 -->
      <el-card v-for="proj in projects" :key="proj.id" class="project-card" shadow="hover">
        <!-- 卡片顶部：图标 + 链接 -->
        <div class="proj-header">
          <div class="proj-icon">{{ proj.icon }}</div>
          <div class="proj-links">
            <a v-if="proj.github" :href="proj.github" target="_blank" class="link-btn">
              源码
            </a>
            <a v-if="proj.demo" :href="proj.demo" target="_blank" class="link-btn primary-link">
              预览
            </a>
          </div>
        </div>
        
        <!-- 卡片主体：标题 + 描述 -->
        <h3 class="proj-title">{{ proj.name }}</h3>
        <p class="proj-desc">{{ proj.desc }}</p>
        
        <!-- 卡片底部：技术栈标签 -->
        <div class="proj-tags">
          <el-tag 
            v-for="tag in proj.tags" 
            :key="tag" 
            size="small" 
            effect="plain" 
            class="tech-tag"
            round
          >
            {{ tag }}
          </el-tag>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟的项目数据 (未来你也可以像文章一样把它们抽离到单独的 JSON 或 Markdown 里)
const projects = ref([
  {
    id: 1,
    name: 'Threez Digital Garden',
    desc: '基于 Vue 3 + Vite 构建的纯前端极简个人博客系统。零成本托管，支持 Markdown 自动解析与 Flomo 风格碎片回顾。',
    icon: '🌱',
    tags: ['Vue 3', 'Vite', 'Element Plus'],
    github: 'https://github.com/zhaozaozhe/my-website',
    demo: 'https://zhaozaozhe.github.io/my-website/'
  },
  {
    id: 2,
    name: 'Vue Todo MVC',
    desc: '用来练手 Composition API 和响应式原理的经典任务管理应用。包含增删改查、状态过滤、本地存储持久化。',
    icon: '✅',
    tags:['Vue 3', 'JavaScript', 'CSS'],
    github: '#' // 填入你的真实地址，如果没有暂时用 #
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    desc: '调用第三方天气 API 的实时数据看板，练习 Axios 请求封装与异步数据流处理。支持城市搜索与缓存。',
    icon: '🌤️',
    tags: ['API', 'Axios', 'Promise'],
    github: '#'
  },
  {
    id: 4,
    name: 'CSS 动画实验室',
    desc: '收集和复刻看到的炫酷 CSS 交互动画，比如按钮悬停光效、卡片 3D 翻转等。纯 CSS 实现。',
    icon: '✨',
    tags: ['CSS3', 'Animation', 'Flexbox'],
    demo: '#'
  }
])
</script>

<style scoped>
.projects-container {
  max-width: 1000px; /* 项目页不需要太宽，保持聚光灯效应 */
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 32px;
  color: #0f172a;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.page-desc {
  font-size: 16px;
  color: #64748b;
  line-height: 1.8;
}

/* 🌟 魔法开始：CSS Grid 网格布局 */
.project-grid {
  display: grid;
  /* 这是一句神仙代码：
     auto-fill: 自动填满空间
     minmax(300px, 1fr): 卡片最小 300px 宽，如果空间有多余，就按 1 份比例均分拉伸 */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px; /* 卡片之间的横向和纵向间距 */
}

/* 独立的卡片设计 */
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%; /* 让同一行的卡片等高 */
}

/* Element Plus 的 card body 穿透设置 */
.project-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
}

.proj-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.proj-icon {
  font-size: 32px;
  line-height: 1;
}

.proj-links {
  display: flex;
  gap: 12px;
}

.link-btn {
  font-size: 13px;
  font-weight: 600;
  color: #64748b !important;
  background-color: #f1f5f9;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.link-btn:hover {
  background-color: #e2e8f0;
  color: #0f172a !important;
}

.primary-link {
  color: #6366f1 !important;
  background-color: #e0e7ff;
}

.primary-link:hover {
  background-color: #c7d2fe;
  color: #4f46e5 !important;
}

.proj-title {
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #0f172a;
  font-weight: 700;
}

.proj-desc {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
  flex-grow: 1; /* 神仙属性：如果上面和下面内容不多，这个元素自动把剩余空间撑开，把 tag 挤到底部 */
  margin: 0 0 20px 0;
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background-color: #f8fafc;
  border-color: #e2e8f0;
  color: #64748b;
}
</style>