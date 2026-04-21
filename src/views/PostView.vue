<!-- src/views/PostView.vue -->
<template>
  <div class="post-detail-container" v-if="postMeta">
    <!-- 文章头部 -->
    <el-card shadow="never" class="post-header">
      <h1 class="title">{{ postMeta.title }}</h1>
      <div class="meta">
        <span><el-icon><User /></el-icon> {{ postMeta.author }}</span>
        <span><el-icon><Calendar /></el-icon> {{ postMeta.date }}</span>
        <el-tag size="small">{{ postMeta.category }}</el-tag>
      </div>
    </el-card>

    <!-- 文章正文 (Markdown 渲染区) -->
    <el-card shadow="never" class="post-content">
      <div class="markdown-body" v-html="parsedHtml"></div>
    </el-card>
  </div>
  <el-empty v-else description="文章加载中或不存在..." />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { User, Calendar } from '@element-plus/icons-vue'
import fm from 'front-matter'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const md = new MarkdownIt({ html: true }) // 允许在 MD 中写 HTML

const postMeta = ref(null)
const parsedHtml = ref('')

// 动态读取所有 md 文件（懒加载模式）
const mdFiles = import.meta.glob('../content/notes/*.md', { query: '?raw', import: 'default' })

onMounted(async () => {
  const slug = route.params.slug
  const filePath = `../content/notes/${slug}.md`

  if (mdFiles[filePath]) {
    // 读取文件原始内容
    const rawContent = await mdFiles[filePath]()
    // 解析 Frontmatter
    const parsed = fm(rawContent)
    
    postMeta.value = parsed.attributes
    // 将正文转换为 HTML
    parsedHtml.value = md.render(parsed.body)
  }
})
</script>

<style scoped>
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
}
.post-header {
  margin-bottom: 20px;
  text-align: center;
}
.title {
  margin-top: 0;
  font-size: 28px;
  color: #303133;
}
.meta {
  display: flex;
  justify-content: center;
  gap: 15px;
  color: #909399;
  font-size: 14px;
  margin-top: 10px;
}
.post-content {
  line-height: 1.8;
  color: #333;
}
/* 简单的 markdown 样式重置，后续你可以引入类似 github-markdown-css */
.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
.markdown-body :deep(pre) {
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}
</style>