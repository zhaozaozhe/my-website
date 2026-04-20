import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/my-website/', // 这里必须和你 GitHub 仓库的名字一模一样
})
