import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host : process.env.VITE_CLIENT_HOST || '0.0.0.0',
    port: parseInt(process.env.VITE_APP_PORT) || 5000
  },
  preview: {
    host : process.env.VITE_CLIENT_HOST || '0.0.0.0',
    port: parseInt(process.env.VITE_APP_PORT) || 5000
  }
})
