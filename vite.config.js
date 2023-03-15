import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

react({ plugins: [["@swc/plugin-styled-components", {}]] });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8470
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src")}
    ]
  }
})
