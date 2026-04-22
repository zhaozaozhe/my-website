<!-- src/views/NotesView.vue -->
<template>
  <div class="notes-container">
    <div class="page-header">
      <h1 class="page-title">📝 碎片与灵感</h1>
      <p class="page-desc">
        不想写长篇大论的时候，就把这里当成技术版的朋友圈吧。<br>
        记录瞬间的灵感、踩坑的吐槽，或是日常的发呆。
      </p>
    </div>

    <!-- 数据为空时的状态 -->
    <el-empty v-if="fragmentPosts.length === 0" description="暂无碎片记录" />

    <!-- Element Plus 的时间线组件 -->
    <el-timeline v-else class="fragment-timeline">
      <!-- 循环渲染每一条碎碎念 -->
      <!-- timestamp 控制时间，placement="top" 让时间显示在卡片上方 -->
      <el-timeline-item
        v-for="item in fragmentPosts"
        :key="item.id"
        :timestamp="item.date"
        placement="top"
        type="primary"
        size="large"
      >
        <!-- 使用卡片包裹内容，增加立体感 -->
        <el-card shadow="hover" class="fragment-card">
          <h4 class="fragment-title">{{ item.title }}</h4>
          <!-- white-space: pre-wrap 可以保留 Markdown 里的换行符 -->
          <p class="fragment-body">{{ item.body }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import fm from 'front-matter'

// 1. 再次使用我们熟悉的自动扫描魔法
const mdFiles = import.meta.glob('../content/notes/*.md', { query: '?raw', import: 'default', eager: true })

const loadedPosts = Object.keys(mdFiles).map(filePath => {
  const rawContent = mdFiles[filePath]
  const parsed = fm(rawContent)
  const slug = filePath.match(/\/([^/]+)\.md$/)[1]
  
  return {
    id: slug,
    type: parsed.attributes.type || 'article', // 提取类型
    body: parsed.body, // 提取正文
    ...parsed.attributes
  }
})

// 2. 数据分流：这次我们【只要】碎片
const fragments = loadedPosts
  .filter(post => post.type === 'fragment')
  // 按日期降序排列，最新的发在最上面（符合朋友圈直觉）
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))

// 3. 变成响应式数据交给模板渲染
const fragmentPosts = ref(fragments)
</script>

<style scoped>
.notes-container {
  max-width: 768px; /* 限制阅读宽度，让排版像一本书 */
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 16px;
}

.page-desc {
  font-size: 15px;
  color: #606266;
  line-height: 1.8;
}

/* 时间线样式微调 */
.fragment-timeline {
  padding-left: 2px;
}

/* 穿透修改 Element Plus 默认的时间戳样式，让它稍微大一点、清楚一点 */
.fragment-timeline :deep(.el-timeline-item__timestamp) {
  font-size: 14px;
  color: #909399;
  margin-bottom: 12px;
}

.fragment-card {
  border-radius: 8px; /* 更圆润的边角 */
  border: 1px solid #ebeef5;
}

.fragment-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #303133;
}

.fragment-body {
  margin: 0;
  font-size: 15px;
  color: #606266;
  line-height: 1.8;
  white-space: pre-wrap; /* 关键属性：让 Markdown 中的回车换行生效 */
}
</style>