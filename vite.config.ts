import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import monkey, {cdn} from 'vite-plugin-monkey';
import {resolve} from 'path'
import * as TopicConfig from "./src/topic/config";

const matchUrl = (url: URL) => `${url.toString()}*`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
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
          preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
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
});
