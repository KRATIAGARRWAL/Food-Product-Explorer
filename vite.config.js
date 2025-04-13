import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    esbuild: {
      loader: 'jsx', // Apply JSX transformation to .js files (globally!)
    //   include: /\.js$/, // Optional: target only .js files
    },
  })