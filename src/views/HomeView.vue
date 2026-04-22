<!-- src/views/HomeView.vue -->
<template>
  <el-row :gutter="24">
    <!-- 左侧边栏：占 6/24（25%），小屏幕时自动堆到上方 -->
    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
      <aside class="sidebar">
        <!-- 个人资料卡片 -->
        <el-card shadow="hover" class="profile-card">
          <div class="profile-header">
            <el-avatar :size="90" :src="webfavicon" />
            <h3 class="profile-name">threez</h3>
            <p class="profile-bio slogan">
            " 思考，不思考，这是一个问题。"
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

        <!-- 🌟 新增：每日回顾 (Flomo Style) -->
        <el-card v-if="randomFragment" shadow="hover" class="sidebar-section daily-review-card">
          <template #header>
            <div class="review-header">
              <span class="section-title">💡 每日回顾</span>
              <!-- 这个小巧的日期标签会显得很有设计感 -->
              <el-tag size="small" type="info" effect="plain">{{ randomFragment.date }}</el-tag>
            </div>
          </template>
          <div class="review-content">
            <h4 class="review-title">{{ randomFragment.title }}</h4>
            <!-- 这里简单地把 markdown 正文当作纯文本显示，如果想做得更好看，以后可以接一个极简的解析器 -->
            <p class="review-text">{{ randomFragment.body }}</p>
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
        <!-- 如果没有文章，显示空状态 -->
        <el-empty v-if="posts.length === 0" description="暂无文章，请在 content/notes 目录下添加 .md 文件" />
        
        <el-card
          v-else
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
                :style="{ backgroundImage: `url(${post.cover || 'https://picsum.photos/seed/default/600/400'})` }"
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
                  {{ post.author || '佚名' }}
                </span>
                <span class="meta-item">
                  <el-icon><Calendar /></el-icon>
                  {{ post.date }}
                </span>
                <el-tag v-if="post.category" size="small" effect="plain">{{ post.category }}</el-tag>
                
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
import fm from 'front-matter'
// 1. 显式导入图片资源，Vite 会在打包时自动处理它的最终哈希路径和基础路径(base)
import webfavicon from '../assets/favicon.ico'

// ==========================================
// 自动读取 Markdown 文件构建文章列表
// ==========================================

// 使用 eager: true 模式，在 Vite 启动/打包时一次性获取所有文件的纯文本内容
// 注意：路径别忘了根据你实际的目录结构调整，这里假设存放于 src/content/notes/
const mdFiles = import.meta.glob('../content/notes/*.md', { query: '?raw', import: 'default', eager: true })

const loadedPosts = Object.keys(mdFiles).map(filePath => {
  const rawContent = mdFiles[filePath]
  const parsed = fm(rawContent)
  const slug = filePath.match(/\/([^/]+)\.md$/)[1]
  
  return {
    id: slug,
    path: `/post/${slug}`,
    // 如果你在 md 里没写 type，为了兼容，默认给它一个 'article' 标记
    type: parsed.attributes.type || 'article', 
    body: parsed.body, // 把正文也拿出来，因为每日回顾需要显示正文内容
    ...parsed.attributes
  }
})

// 降序排序
loadedPosts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))

// 🎯 【魔法在这里】数据分流！
// 1. 过滤出真正的长文章（用来在右边列表显示）
const articlePosts = loadedPosts.filter(post => post.type === 'article')
const posts = ref(articlePosts) 

// 2. 过滤出所有的“碎碎念”，做成一个池子
const fragmentPosts = loadedPosts.filter(post => post.type === 'fragment')

// 3. 实现“随机漫步/每日回顾”功能
const randomFragment = ref(null) // 用来装抽中的那条数据

if (fragmentPosts.length > 0) {
  // 生成一个从 0 到 数组长度-1 的随机整数
  const randomIndex = Math.floor(Math.random() * fragmentPosts.length)
  // 把抽中的这条碎碎念塞给变量
  randomFragment.value = fragmentPosts[randomIndex]
}


// 精选文章：这里演示动态获取前 3 篇文章。
// 后续如果你的 md 文件头部有类似 `featured: true` 的标识，可以改为：
// const featuredPosts = ref(loadedPosts.filter(p => p.featured).slice(0, 3).map(...))
const featuredPosts = ref(articlePosts.slice(0, 3).map(p => ({
  title: p.title,
  // 截取日期字符串，如果是 "YYYY-MM-DD" 格式，取 "MM-DD" 部分
  date: p.date ? p.date.substring(5) : '', 
  path: p.path
})))

// 友情链接（保持你原有的硬编码数据）
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

.slogan {
  font-style: italic; /* 斜体字，更像名言警句 */
  color: #909399; /* 高级的灰色 */
  font-weight: 500;
  letter-spacing: 1px; /* 稍微增加字间距，更有呼吸感 */
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

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.daily-review-card {
  background-color: #fafbfc; /* 稍微给它一个浅浅的底色，以示区别 */
  border-left: 4px solid #409EFF; /* 加一个左侧高亮条，类似引用的感觉 */
}

.review-title {
  margin: 0 0 8px 0;
  font-size: 15px;
  color: #303133;
}

.review-text {
  margin: 0;
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  /* 如果文字太长，让它最多显示 4 行 */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
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