import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],


  server: {
    https: {
      key:'../../server/cert/key.pem',
      cert:'../../server/cert/cert.pem'      
    }
  }
})
