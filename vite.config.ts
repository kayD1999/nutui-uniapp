/*
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2024-03-04 13:45:31
 * @FilePath: \kstar-app-build\vite.config.ts
 */
import uni from '@dcloudio/vite-plugin-uni';
import Components from '@uni-helper/vite-plugin-uni-components';
import { NutResolver } from 'nutui-uniapp';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
const targetUrl = 'http://192.168.200.80:8014/'; // uat环境-uat库

export default defineConfig({
  plugins: [
    Components({
      resolvers: [NutResolver()],
    }),
    AutoImport({
      imports: [
        {
          'nutui-uniapp/composables': [
            // 在这里添加需要自动导入的API
            'useToast',
          ],
        },
      ],
    }),
    uni(),
    UnoCSS(),
  ],
  base: './', // 基础路径Y
  server: {
    open: false, // 服务启动时自动在浏览器中打开应用
    host: '0.0.0.0',
    port: 8088,
    // 反向代理配置
    proxy: {
      '/mobile-uat/': {
        target: targetUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mobile-uat/, ''),
      },
      '/api': {
        target: targetUrl, // 目标服务器地址
        changeOrigin: true, // 是否修改请求头中的 Origin 字段
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import 'nutui-uniapp/styles/variables.scss';",
      },
    },
  },
});
