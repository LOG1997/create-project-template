import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteEslint from "vite-plugin-eslint";
import path from "path";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint({
      failOnError: false,
    }),
    // * 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/gloable.scss";', //引入scss文件
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4523/m1/2223235-0-default",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
