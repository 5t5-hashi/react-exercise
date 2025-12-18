import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 前端项目启动端口（默认 5173，这里不需要改，改了也不能和 Java 一样）
    port: 5173, 
    proxy: {
      // 代理配置：遇到 /api 开头的请求，转发给 Java 后端
      '/api': {
        target: 'http://localhost:8080', // Java 后端地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 /api 前缀，例如 /api/hello -> /hello
      },
    },
  },
})
