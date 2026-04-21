<!-- src/views/HomeView.vue -->
<template>
  <el-row :gutter="24">
    <!-- 左侧边栏：占 6/24（25%），小屏幕时自动堆到上方 -->
    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
      <aside class="sidebar">
        <!-- 个人资料卡片 -->
        <el-card shadow="hover" class="profile-card">
          <div class="profile-header">
            <el-avatar :size="90" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <h3 class="profile-name">赵哲</h3>
            <p class="profile-bio">
              正在学习 Vue 3 与前端开发，<br />
              记录技术成长与踩坑日常。
            </p>
          </div>
          
          <el-divider />
          
          <div class="profile-stats">
            <div class="stat-item">
              <div class="stat-num">{{ posts.length }}</div>
              <div class="stat-label">文章</div>
            </div>
            <div class="stat-item">
              <div class="stat-num">3</div>
              <div class="stat-label">项目</div>
            </div>
            <div class="stat-item">
              <div class="stat-num">7</div>
              <div class="stat-label">标签</div>
            </div>
          </div>
        </el-card>

        <!-- 精选文章 -->
        <el-card shadow="hover" class="sidebar-section">
          <template #header>
            <span class="section-title">🔥 精选文章</span>
          </template>
          <ul class="featured-list">
            <li v-for="(item, idx) in featuredPosts" :key="idx">
              <router-link :to="item.path" class="featured-link">
                {{ item.title }}
              </router-link>
              <span class="featured-date">{{ item.date }}</span>
            </li>
          </ul>
        </el-card>

        <!-- 友情链接 -->
        <el-card shadow="hover" class="sidebar-section">
          <template #header>
            <span class="section-title">🤝 友情链接</span>
          </template>
          <ul class="friend-list">
            <li v-for="(link, idx) in friendLinks" :key="idx">
              <a :href="link.url" target="_blank" class="friend-name">{{ link.name }}</a>
              <p class="friend-desc">{{ link.desc }}</p>
            </li>
          </ul>
        </el-card>
      </aside>
    </el-col>

    <!-- 右侧主内容：文章卡片流，占 18/24（75%） -->
    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
      <div class="post-list">
        <el-card
          v-for="post in posts"
          :key="post.id"
          shadow="hover"
          class="post-card"
          :body-style="{ padding: '0px' }"
        >
          <el-row :gutter="0">
            <!-- 封面图：中等屏幕以上占 1/3，小屏幕占整行 -->
            <el-col :xs="24" :sm="24" :md="10" :lg="9" class="post-cover-wrap">
              <div
                class="post-cover"
                :style="{ backgroundImage: `url(${post.cover})` }"
              />
            </el-col>
            
            <!-- 文字内容 -->
            <el-col :xs="24" :sm="24" :md="14" :lg="15" class="post-body">
              <h3 class="post-title">
                <router-link :to="post.path">{{ post.title }}</router-link>
              </h3>
              <p class="post-summary">{{ post.summary }}</p>
              
              <div class="post-meta">
                <span class="meta-item">
                  <el-icon><User /></el-icon>
                  {{ post.author }}
                </span>
                <span class="meta-item">
                  <el-icon><Calendar /></el-icon>
                  {{ post.date }}
                </span>
                <el-tag size="small" effect="plain">{{ post.category }}</el-tag>
                
                <router-link :to="post.path" class="read-more">
                  阅读全文 <el-icon><ArrowRight /></el-icon>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { User, Calendar, ArrowRight } from '@element-plus/icons-vue'

// ==========================================
// 模拟数据：下一步会替换为读取 Markdown 文件
// ==========================================
const posts = ref([
  {
    id: 1,
    title: '关于本站',
    summary: '欢迎光临！这是我的个人网站，用来存放学习笔记、技术博客和项目记录。网站基于 Vue 3 + Vite + Element Plus 构建，托管于 GitHub Pages，完全零成本。',
    cover: 'https://picsum.photos/seed/site/600/400',
    date: '2025-04-20',
    author: '赵哲',
    category: '关于',
    path: '/notes'
  },
  {
    id: 2,
    title: 'Vue 3 组合式 API 入门心得',
    summary: '从 Options API 切换到 Composition API 的思考过程。ref 和 reactive 到底用哪个？computed 和 watch 的使用场景有什么区别？本文记录了我的学习路线。',
    cover: 'https://picsum.photos/seed/vue/600/400',
    date: '2025-04-18',
    author: '赵哲',
    category: '前端',
    path: '/notes'
  },
  {
    id: 3,
    title: 'GitHub Actions 自动化部署踩坑记',
    summary: '从零开始配置 GitHub Actions，实现每次 push 到 main 分支后自动构建并部署到 gh-pages。记录了 base 路径配置、分支权限、构建缓存等踩坑点。',
    cover: 'https://picsum.photos/seed/github/600/400',
    date: '2025-04-15',
    author: '赵哲',
    category: '工具',
    path: '/notes'
  },
  {
    id: 4,
    title: 'Element Plus 栅格与卡片布局实践',
    summary: '如何使用 el-row / el-col 实现响应式侧边栏布局，以及 el-card 的 shadow、body-style 等属性的灵活运用。',
    cover: 'https://picsum.photos/seed/ui/600/400',
    date: '2025-04-12',
    author: '赵哲',
    category: '前端',
    path: '/notes'
  }
])

const featuredPosts = ref([
  { title: '关于本站', date: '04-20', path: '/notes' },
  { title: 'Vue 3 组合式 API 入门心得', date: '04-18', path: '/notes' },
  { title: 'GitHub Actions 自动化部署踩坑记', date: '04-15', path: '/notes' }
])

const friendLinks = ref([
  { name: 'Vue.js 官方文档', url: 'https://cn.vuejs.org', desc: '渐进式 JavaScript 框架' },
  { name: 'Element Plus', url: 'https://element-plus.org', desc: '基于 Vue 3 的组件库' },
  { name: 'Vite 官方文档', url: 'https://cn.vitejs.dev', desc: '下一代前端构建工具' }
])
</script>

<style scoped>
/* ========== 左侧边栏 ========== */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card {
  text-align: center;
}

.profile-header {
  padding-top: 10px;
}

.profile-name {
  margin: 12px 0 8px;
  font-size: 18px;
  color: #303133;
}

.profile-bio {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  margin: 0;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  text-align: center;
}

.stat-num {
  font-size: 22px;
  font-weight: bold;
  color: #409EFF;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: #909399;
  margin-top: 6px;
}

.sidebar-section {
  font-size: 14px;
}

.section-title {
  font-weight: 600;
  color: #303133;
}

/* 列表通用 */
.featured-list,
.friend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.featured-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #ebeef5;
}

.featured-list li:last-child {
  border-bottom: none;
}

.featured-link {
  color: #606266;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.featured-link:hover {
  color: #409EFF;
}

.featured-date {
  font-size: 12px;
  color: #c0c4cc;
  white-space: nowrap;
  margin-left: 8px;
}

.friend-list li {
  padding: 10px 0;
  border-bottom: 1px dashed #ebeef5;
}

.friend-list li:last-child {
  border-bottom: none;
}

.friend-name {
  color: #409EFF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.friend-name:hover {
  text-decoration: underline;
}

.friend-desc {
  font-size: 12px;
  color: #909399;
  margin: 4px 0 0;
}

/* ========== 右侧文章卡片 ========== */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  transition: all 0.3s ease;
  border: none;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

.post-cover-wrap {
  height: 200px;
  overflow: hidden;
}

.post-cover {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;
}

.post-card:hover .post-cover {
  transform: scale(1.03);
}

.post-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
}

.post-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.post-title a {
  color: #303133;
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: #409EFF;
}

.post-summary {
  color: #606266;
  font-size: 14px;
  line-height: 1.8;
  margin: 0 0 16px;
  /* 限制显示 3 行，超出省略 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #909399;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.read-more {
  margin-left: auto;
  color: #409EFF;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  transition: gap 0.2s;
}

.read-more:hover {
  gap: 8px;
}

/* ========== 响应式适配 ========== */
@media (max-width: 992px) {
  .post-cover-wrap {
    height: 180px;
  }
  
  .post-body {
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    margin-bottom: 24px;
  }
  
  .post-cover-wrap {
    height: 200px;
  }
}
</style>