import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Enable normal dependency discovery and pre-bundling
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router",
      "react-router-dom",
      "cookie",
    ],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },

  server: {
    port: 5173,
    host: true,

    proxy: {
      "/api": {
        target: "https://stackgsb-studio.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
