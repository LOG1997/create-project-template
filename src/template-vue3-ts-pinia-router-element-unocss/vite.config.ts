/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  const chunkName = mode == 'prebuild' ? '[name]' : 'chunk';

  return {
    plugins: [
      vue(),
      ElementPlus(),
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
      UnoCSS(),
      
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver(), // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          ElementPlusResolver(), // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
        dts: path.resolve(path.resolve(__dirname, 'src'), 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
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
      host: 'localhost',
      port: 6719,
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          // 是否跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
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
