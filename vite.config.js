import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import { resolve } from 'path';
import { LEGACY_LIST as TOPIC_LEGACY_LIST, LEGACY_LIST_MOOC as TOPIC_LEGACY_LIST_MOOC, LEGACY_DETAIL as TOPIC_LEGACY_DETAIL, LEGACY_DETAIL_MOOC as TOPIC_LEGACY_DETAIL_MOOC, NEW_LIST as TOPIC_NEW_LIST, NEW_DETAIL as TOPIC_NEW_DETAIL } from "./src/topic/config";
var matchUrl = function (url) { return "".concat(url.toString(), "*"); };
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
                    matchUrl(TOPIC_LEGACY_LIST), // Legacy List
                    matchUrl(TOPIC_LEGACY_LIST_MOOC), // Legacy List Mooc
                    matchUrl(TOPIC_LEGACY_DETAIL), // Legacy Detail
                    matchUrl(TOPIC_LEGACY_DETAIL_MOOC), // Legacy Detail Mooc
                    matchUrl(TOPIC_NEW_LIST), // New List
                    matchUrl(TOPIC_NEW_DETAIL), // New Detail
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
