import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/OmneNest-Trade/',
  server: {
    proxy: {
      '/v1': {
        target: 'https://preprodapisix.omnenest.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});