import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monkey, { cdn } from "vite-plugin-monkey";
import { resolve } from "path";
import * as TopicConfig from "./src/topic/config";

const matchUrl = (url: URL) => `${url.toString()}*`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: "超兴学习通自动化 ——— Chaoxing Auto",
        description:
          "超兴学习通自动化脚本，能自动完成讨论，具备自动完成讨论任务、一键回复指定话题、批量回复和创建话题等功能，让讨论任务变得轻松简单。",
        namespace: "https://github.com/lcandy2/Chaoxing-Auto",
        homepage: "https://greasyfork.org/scripts/489933",
        source: "https://github.com/lcandy2/user.js",
        match: [
          // Topic
          matchUrl(TopicConfig.LEGACY_LIST), // Legacy List
          matchUrl(TopicConfig.LEGACY_LIST_MOOC), // Legacy List Mooc
          matchUrl(TopicConfig.LEGACY_DETAIL), // Legacy Detail
          matchUrl(TopicConfig.LEGACY_DETAIL_MOOC), // Legacy Detail Mooc
          matchUrl(TopicConfig.NEW_LIST), // New List
          matchUrl(TopicConfig.NEW_DETAIL), // New Detail
        ],
        license: "None",
      },
      build: {
        externalGlobals: {
          react: cdn.npmmirror("React", "umd/react.production.min.js"),
          "react-dom": cdn.npmmirror(
            "ReactDOM",
            "umd/react-dom.production.min.js",
          ),
          "react-draggable": cdn.npmmirror(
            "ReactDraggable",
            "build/web/react-draggable.min.js",
          ),
          "@emotion/react": cdn.npmmirror(
            "emotionReact",
            "dist/emotion-react.umd.min.js",
          ),
          "@emotion/styled": cdn.npmmirror(
            "emotionStyled",
            "dist/emotion-styled.umd.min.js",
          ),
          "@mui/material": cdn.npmmirror(
            "MaterialUI",
            "umd/material-ui.production.min.js",
          ),
        },
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
      {
        find: "@topic",
        replacement: resolve(__dirname, "./src/topic"),
      },
    ],
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: true, // 禁用压缩
      mangle: true, // 启用变量名和函数名混淆
      format: {
        beautify: true, // 保持代码格式化
        comments: false, // 删除所有注释
      },
    },
  },
});
