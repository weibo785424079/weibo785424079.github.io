export default {
    publicPath: process.env.NODE_ENV === 'production' ? '/monorepo/' : '/',
    title: '@tms/site-monorepo',
    description: 'cli,react,component',
    outputPath: "docs_dist",
    base: '/monorepo/'
};