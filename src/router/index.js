// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // base 路径要和 vite.config.js 里的 base 保持一致
  history: createWebHashHistory('/my-website/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/notes',
      name: 'notes',
      // 懒加载：只有访问这个页面时才加载代码，首页打开更快
      component: () => import('../views/NotesView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // 新增：文章详情页动态路由
    {
      path: '/post/:slug', // :slug 对应文件名，比如 /post/my-first-post
      name: 'post',
      component: () => import('../views/PostView.vue')
    }
  ]
})

export default router