import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/global.scss";',
        },
      },
    },
    server: {
      host: "localhost",
      port: 8080,
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          // 是否跨域
          changeOrigin: true,
          // 路径重写
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
