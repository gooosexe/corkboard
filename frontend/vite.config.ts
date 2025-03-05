import path from "path"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // or your local IP address, e.g., '192.168.x.x'
    port: 5173, // optional, you can specify another port if needed
  },
})
