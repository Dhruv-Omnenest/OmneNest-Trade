import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
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
      '/v2': {
    target: 'https://preprodapisix.omnenest.com',
    changeOrigin: true,
  },
    },
  },
});