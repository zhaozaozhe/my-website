<template>
  <div class="home-wrapper">
    <header class="hero-section">
      <h1 class="hero-title">Threez's Digital Garden</h1>
      <p class="hero-subtitle">思考，不思考，这是一个问题。</p>
    </header>

    <el-row :gutter="40">
      <!-- 左侧边栏 -->
      <el-col :xs="24" :md="6">
        <aside class="sidebar">
          <div class="profile-mini-card">
            <el-avatar :size="80" :src="webfavicon" class="avatar-shadow" />
            <h2 class="user-name">threez</h2>
            <div class="stats-row">
              <div class="stat-box"><strong>{{ posts.length }}</strong><span>文章</span></div>
              <div class="stat-box"><strong>3</strong><span>项目</span></div>
            </div>
          </div>

          <div v-if="randomFragment" class="review-box">
            <div class="box-tag">💡 随机漫步</div>
            <h4 class="box-title">{{ randomFragment.title }}</h4>
            <p class="box-content">{{ randomFragment.body }}</p>
          </div>

          <nav class="nav-section">
            <h3 class="nav-title">🔥 精选文章</h3>
            <router-link v-for="p in featuredPosts" :key="p.path" :to="p.path" class="nav-item">
              {{ p.title }}
            </router-link>
          </nav>
        </aside>
      </el-col>

      <!-- 右侧文章列表 -->
      <el-col :xs="24" :md="18">
        <div class="post-feed">
          <el-card 
            v-for="post in posts" 
            :key="post.id" 
            class="feed-card"
            :body-style="{ padding: '0px', display: 'flex', height: '100%' }"
          >
            <div class="feed-cover" :style="{ backgroundImage: `url(${post.cover || 'https://picsum.photos/seed/default/600/400'})` }"></div>
            
            <div class="feed-body">
              <div>
                <el-tag size="small" effect="plain" class="category-tag">{{ post.category }}</el-tag>
                <h2 class="feed-title">
                  <router-link :to="post.path">{{ post.title }}</router-link>
                </h2>
                <p class="feed-summary">{{ post.summary }}</p>
              </div>
              <div class="feed-footer">
                <span>📅 {{ post.date }}</span>
                <router-link :to="post.path" class="read-btn">阅读全文 →</router-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import fm from 'front-matter'
import webfavicon from '../assets/favicon.ico'

const mdFiles = import.meta.glob('../content/notes/*.md', { query: '?raw', import: 'default', eager: true })
const loadedPosts = Object.keys(mdFiles).map(filePath => {
  const rawContent = mdFiles[filePath]
  const parsed = fm(rawContent)
  const slug = filePath.match(/\/([^/]+)\.md$/)[1]
  return { id: slug, path: `/post/${slug}`, type: parsed.attributes.type || 'article', body: parsed.body, ...parsed.attributes }
})
const articlePosts = loadedPosts.filter(post => post.type === 'article').sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
const posts = ref(articlePosts)
const fragmentPosts = loadedPosts.filter(post => post.type === 'fragment')
const randomFragment = ref(null)
if (fragmentPosts.length > 0) randomFragment.value = fragmentPosts[Math.floor(Math.random() * fragmentPosts.length)]
const featuredPosts = ref(articlePosts.slice(0, 3).map(p => ({ title: p.title, path: p.path })))
</script>

<style scoped>
.home-wrapper { max-width: 1200px; margin: 0 auto; padding: 20px; }

.hero-section { padding: 60px 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 40px; }
.hero-title { font-size: 48px; color: #0f172a; font-weight: 800; letter-spacing: -2px; margin: 0; }
.hero-subtitle { font-size: 18px; color: #64748b; margin-top: 10px; }

.sidebar { display: flex; flex-direction: column; gap: 32px; }
.profile-mini-card { text-align: center; }
.user-name { margin: 16px 0 8px; font-size: 20px; font-weight: 700; color: #0f172a; }
.stats-row { display: flex; justify-content: center; gap: 24px; }
.stat-box strong { display: block; font-size: 20px; color: #6366f1; }
.stat-box span { font-size: 12px; color: #94a3b8; }

.avatar-shadow { border: 4px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

.review-box { background: #eff6ff; padding: 24px; border-radius: 20px; border-left: 4px solid #6366f1; }
.box-tag { font-size: 12px; font-weight: bold; color: #6366f1; margin-bottom: 8px; }
.box-title { margin: 0 0 8px; font-size: 15px; color: #1e293b; font-weight: 700; }
.box-content { font-size: 13px; line-height: 1.6; color: #475569; }

.nav-section { display: flex; flex-direction: column; gap: 12px; }
.nav-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 700; }
.nav-item { font-size: 14px; color: #475569 !important; }
.nav-item:hover { color: #6366f1 !important; text-decoration: underline !important; }

.post-feed { display: flex; flex-direction: column; gap: 32px; }
.feed-card { min-height: 250px; border: none !important; }
.feed-cover { width: 35%; background-size: cover; background-position: center; flex-shrink: 0; }
.feed-body { width: 65%; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; }
.feed-title { margin: 12px 0; font-size: 24px; font-weight: 800; line-height: 1.3; }
.feed-title a { color: #0f172a !important; }
.feed-summary { font-size: 15px; line-height: 1.7; color: #475569; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2;line-clamp: 2; -webkit-box-orient: vertical; }
.feed-footer { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #94a3b8; padding-top: 16px; border-top: 1px solid #f1f5f9; }
.read-btn { font-weight: 700; color: #6366f1 !important; }

@media (max-width: 768px) {
  .feed-card { flex-direction: column; }
  .feed-cover { width: 100%; height: 200px; }
  .feed-body { width: 100%; }
}
</style>