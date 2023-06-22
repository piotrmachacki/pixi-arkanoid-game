import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    base: '/',
    server: {
        port: 5000,
    },
    build: {
        target: 'esnext',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json', '.vue', '.jsx', '.d.ts'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [vue({})],
});
