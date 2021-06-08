import { defineConfig } from 'umi';

export default defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? '/hook/' : '/',
    title: '@tms/site-hook',
    description: 'hooks',
    outputPath: "docs_dist",
    base: '/hook/'
});