import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{
            find: '@components',
            replacement: resolve(__dirname, './src/components'),
        }, {
            find: '@pages',
            replacement: resolve(__dirname, './src/pages'),
        }, {
            find: '@utils',
            replacement: resolve(__dirname, './src/utils'),
        }, {
            find: '@assets',
            replacement: resolve(__dirname, './src/assets'),
        }, {
            find: '@hooks',
            replacement: resolve(__dirname, './src/hooks'),
        }, {
            find: '@store',
            replacement: resolve(__dirname, './src/store'),
        }, {
            find: '@services',
            replacement: resolve(__dirname, './src/services'),
        }, {
            find: '@types',
            replacement: resolve(__dirname, './src/types'),
        }, {
            find: '@constants',
            replacement: resolve(__dirname, './src/constants'),
        }, {
            find: '@models',
            replacement: resolve(__dirname, './src/models'),
        }, {
            find: '@hooks',
            replacement: resolve(__dirname, './src/hooks'),
        },
        {
            find: '@features',
            replacement: resolve(__dirname, './src/features'),
        },
        {
            find: '@interfaces',
            replacement: resolve(__dirname, './src/interfaces'),
        },
        {
            find: '@context',
            replacement: resolve(__dirname, './src/context'),
        },
        ],
    },
});
