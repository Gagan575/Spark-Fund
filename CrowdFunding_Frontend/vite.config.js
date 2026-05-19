// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows external access
    port: 5173,
    strictPort: false,
    hmr: {
      host: 'horary-rueben-unbattling.ngrok-free.dev', // your ngrok URL
      protocol: 'wss',
    },
    allowedHosts: ['horary-rueben-unbattling.ngrok-free.dev'],
  },
})
