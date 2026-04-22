<!-- src/views/LabView.vue -->
<template>
  <div class="lab-container">
    <div class="lab-header">
      <h1 class="lab-title">🛠️ 项目实验室 & 武器库</h1>
      <p class="lab-desc">
        这里记录了本网站构建过程中使用的技术栈、开源库以及我的踩坑心得。<br>
        这是干中学的循环，也是向面试官展示工程思维的“底层逻辑”。
      </p>
    </div>

    <!-- 折叠面板组件，v-model 绑定当前展开的面板 -->
    <el-collapse v-model="activeNames" class="tech-collapse">
      
      <!-- v-for 循环渲染我们的技术栈数据 -->
      <el-collapse-item 
        v-for="(tech, index) in techStack" 
        :key="index" 
        :name="index"
      >
        <!-- 自定义折叠面板的标题 -->
        <template #title>
          <div class="panel-title">
            <!-- 这里原本可以放个小图标，比如 :src="tech.icon" -->
            <span class="tech-name">{{ tech.name }}</span>
            <el-tag size="small" type="info" effect="plain" class="tech-type">{{ tech.type }}</el-tag>
          </div>
        </template>
        
        <!-- 展开后的详细内容区 -->
        <div class="panel-content">
          <p class="tech-reason"><strong>🤔 为什么选择它？</strong><br> {{ tech.reason }}</p>
          <p class="tech-learning"><strong>💡 踩坑与心得：</strong><br> {{ tech.learning }}</p>
          
          <div class="tech-footer">
            <el-link :href="tech.link" target="_blank" type="primary">查看官方文档 <el-icon><ArrowRight /></el-icon></el-link>
          </div>
        </div>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue' // 引入向右的小箭头图标

// activeNames 控制默认展开哪个面板，[0] 代表默认展开第一个
const activeNames = ref([0])

// 核心数据驱动：把你的武器库定义在这里
const techStack = ref([
  {
    name: 'Vue 3 (Composition API)',
    type: '前端核心框架',
    reason: '相比于 React 的灵活性，Vue 更容易上手，指令系统（v-if, v-for）非常符合直觉。采用最新的组合式 API (setup)，让逻辑复用变得极其简单。',
    learning: '刚开始总是搞混 ref 和 reactive，后来总结出：基本类型无脑用 ref，对象/数组也可以用 ref，不用纠结。响应式数据是 Vue 的灵魂。',
    link: 'https://cn.vuejs.org/'
  },
  {
    name: 'Vite',
    type: '前端构建工具',
    reason: '天下武功，唯快不破。相比于传统的 Webpack，Vite 在开发环境下的冷启动和热更新速度是碾压级别的。',
    learning: '最大的踩坑点在于理解 import.meta.glob。这是 Vite 独有的功能，让我得以零成本实现了前端自动读取 Markdown 文件的神仙操作，直接省去了写 Node.js 后端的麻烦。',
    link: 'https://cn.vitejs.dev/'
  },
  {
    name: 'Element Plus',
    type: 'UI 组件库',
    reason: '国内生态最好、文档最全的 Vue 3 组件库。它的栅格系统（el-row/el-col）帮我迅速搞定了响应式布局。',
    learning: '不要自己手写花里胡哨的样式，学会“拿来主义”。比如现在的折叠面板（Collapse），自己写交互要半天，用 Element 只需要几行代码。',
    link: 'https://element-plus.org/'
  },
  {
    name: 'front-matter & markdown-it',
    type: 'Markdown 解析器',
    reason: '为了实现“纯前端构建博客”，必须要在浏览器里解析 .md 文件。',
    learning: '踩了一个大坑：原本想用 gray-matter，结果发现它依赖 Node.js 环境，在浏览器会报错。果断换成了 front-matter，顺利提取了文章的标题、封面等元数据。',
    link: 'https://github.com/markdown-it/markdown-it'
  }
])
</script>

<style scoped>
.lab-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.lab-header {
  text-align: center;
  margin-bottom: 40px;
}

.lab-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 16px;
}

.lab-desc {
  font-size: 15px;
  color: #606266;
  line-height: 1.6;
}

/* 改造 Element Plus 折叠面板的默认样式，让它更干净 */
.tech-collapse {
  border-top: none;
  border-bottom: none;
}

/* :deep() 是 Vue 特有的，用来穿透组件修改 Element 内部的样式 */
.tech-collapse :deep(.el-collapse-item__header) {
  font-size: 16px;
  border-bottom: 1px dashed #ebeef5;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tech-name {
  font-weight: bold;
  color: #303133;
}

.panel-content {
  padding: 10px 0;
  color: #606266;
  line-height: 1.8;
  font-size: 14px;
}

.panel-content p {
  margin: 8px 0;
}

.tech-footer {
  margin-top: 16px;
  text-align: right;
}
</style>