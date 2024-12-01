import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("🔥 proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("🔄 Sending Request to:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("✨ Received Response from:", req.url);
          });
        },
      },
    },
  },
});
