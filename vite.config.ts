import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: "./",
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
          ],
        },
      }),
    ],
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
    build: {
      target: "es2015",
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      port: parseInt(env.VITE_PORT || '5173'),
      proxy: {
        "/api": {
          target: `http://localhost:${env.PORT}`,
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
  };
});
