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
    // 【新增】实验室/武器库路由
    {
      path: '/lab',         // 当浏览器地址变成 /lab 时
      name: 'lab',          // 给这个路由起个名字，方便以后调用
      // 懒加载：用户只有点击这个页面，才会去下载这个页面的代码，让首页加载更快
      component: () => import('../views/LabView.vue') 
    },
    {
      path: '/post/:slug', // :slug 对应文件名，比如 /post/my-first-post
      name: 'post',
      component: () => import('../views/PostView.vue')
    }
  ]
})

export default router