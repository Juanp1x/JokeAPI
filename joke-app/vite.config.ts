import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  base: '/JokeAPI/',   // 👈 debe coincidir con el basename del BrowserRouter
})
 