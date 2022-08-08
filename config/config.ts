import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layout',
      routes: [
        {
          path: 'Geometry',
          component: '@/pages/Geometry',
        },
      ],
    },
  ],
  fastRefresh: {},
});
