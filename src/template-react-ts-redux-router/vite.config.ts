/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import path from 'path';
// import vitePluginRouteGet from 'vite-plugin-routes-get'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import WindiCSS from 'vite-plugin-windicss';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  const chunkName = mode == 'prebuild' ? '[name]' : 'chunk';

  return {
    plugins: [
      react(),
      WindiCSS(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      visualizer({
        emitFile: true, //是否被触摸
        filename: 'test.html', //生成分析网页文件名
        open: true, //在默认用户代理中打开生成的文件
        gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
        brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
      }),
      viteEslint({
        failOnError: false,
      }),
      // * 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
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
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.tsx', '.json'],
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:4523/m1/1902803-0-default',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
      //   关闭文件计算
      reportCompressedSize: false,
      //   关闭生成map文件 可以达到缩小打包体积
      sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
      rollupOptions: {
        output: {
          chunkFileNames: `js/${chunkName}-[hash].js`, // 引入文件名的名称
          entryFileNames: `js/${chunkName}-[hash].js`, // 包的入口文件名称
          assetFileNames: `[ext]/${chunkName}-[hash].[ext]`, // 资源文件像 字体，图片等
          manualChunks(id: any): string {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },
    // 使用这个必须在上面加/// <reference types="vitest" /> 不然会有类型报错
    test: {
      globals: true, // --> 0.8.1+  请修改成globals
      environment: 'jsdom',
      // include: ['**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      // passWithNoTests: true,
      transformMode: {
        web: [/\.[jt]sx$/],
      },
    },
  };
});
