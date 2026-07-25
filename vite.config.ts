import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Lets the dev server be reached through a tunnel (trycloudflare.com) for
    // phone preview when LAN access is blocked by router-side isolation.
    // Vite rejects unrecognized Host headers by default as a security measure.
    allowedHosts: ['.trycloudflare.com'],
  },
})
