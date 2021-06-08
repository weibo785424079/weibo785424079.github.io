import { defineConfig } from 'umi';

export default defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? '/monorepo/' : '/',
    title: '@tms/site-hook',
    description: 'hooks',
    outputPath: "docs_dist",
    base: '/monorepo/'
});