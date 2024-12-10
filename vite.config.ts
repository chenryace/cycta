import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // 指定根目录为当前目录
  build: {
    outDir: 'dist', // 输出目录
  },
  server: {
    open: true, // 启动时自动打开浏览器
  },
});
