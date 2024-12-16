import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    target: "es2015",
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("🔥 proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            console.log("🔄 Sending Request to:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log("✨ Received Response from:", proxyRes.url);
          });
        },
      },
    },
  },
});
