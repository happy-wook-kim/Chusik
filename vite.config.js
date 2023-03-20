import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

process.env = {...process.env, ...loadEnv('', process.cwd())}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8470,
    proxy: {
      '/api' : {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '/')
      }
    }
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src")}
    ]
  },
})
