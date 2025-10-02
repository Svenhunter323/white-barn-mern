import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Convert import.meta.url to a file path for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'backend/dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Ensure consistent hashed filenames for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  // Ensure public assets are properly referenced
  base: '/',
  server: {
    port: 5173,
    strictPort: true
  },
  preview: {
    port: 5000,
    strictPort: true
  }
})
