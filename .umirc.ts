import { defineConfig } from 'umi'

export default defineConfig({
    mode: 'site',
    title: 'site的前端文档',
    navs: [
        {
          title: 'Cli',
          path: '/cli',
        },
        {
          title: 'Hook',
          path: '/hook',
        },
        {
          title: '组件',
          path: '/component',
        },
        {
          title: 'Eslint',
          path: '/eslint',
        },
    ],
});