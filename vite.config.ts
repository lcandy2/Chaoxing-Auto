import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import monkey, {cdn} from 'vite-plugin-monkey';
import {resolve} from 'path'
import * as TopicConfig from "./src/topic/config";
import AutoImport from 'unplugin-auto-import/vite'

const matchUrl = (url: URL) => `${url.toString()}*`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        namespace: 'lcandy2/chaoxing-auto',
        match: [
          // Topic
          matchUrl(TopicConfig.LEGACY_LIST), // Legacy List
          matchUrl(TopicConfig.LEGACY_LIST_MOOC), // Legacy List Mooc
          matchUrl(TopicConfig.LEGACY_DETAIL), // Legacy Detail
          matchUrl(TopicConfig.LEGACY_DETAIL_MOOC), // Legacy Detail Mooc
          matchUrl(TopicConfig.NEW_LIST), // New List
          matchUrl(TopicConfig.NEW_DETAIL), // New Detail
        ],
      },
      build: {
        externalGlobals: {
          preact: cdn.npmmirror('preact', 'dist/preact.min.js'),
          // "react-draggable": cdn.npmmirror('ReactDraggable', 'build/web/react-draggable.min.js'),
          // zustand: cdn.npmmirror('zustand', 'umd/index.production.js'),
          // "@emotion/react": cdn.npmmirror('emotionReact', 'dist/emotion-react.umd.min.js'),
          // "@mui/material": cdn.npmmirror('@mui/material', 'umd/material-ui.production.min.js'),
        },
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, './src')
      },
      {
        find: "@topic",
        replacement: resolve(__dirname, './src/topic')
      }
    ]
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: true, // 禁用压缩
      mangle: true, // 启用变量名和函数名混淆
      format: {
        beautify: true, // 保持代码格式化
        comments: false // 删除所有注释
      }
    },
  },
});
