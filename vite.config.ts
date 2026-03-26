import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@/' 로 src 루트 접근 가능: import { foo } from '@/lib/...'
      '@': path.resolve(__dirname, './src'),
    },
  },
})
