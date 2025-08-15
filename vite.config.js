import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // <-- TAMBAHKAN BARIS INI
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})