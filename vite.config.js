import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.BASE_URL || '/' // 讓 GitHub Pages 能正確載入
});
