import { defineConfig } from 'umi';

export default defineConfig({
  title: '基于Web端的计算机图形学',
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
        {
          path: 'Light',
          component: '@/pages/Light/index',
          routes: [
            {
              path: 'Physical',
              component: '@/pages/Light/physical',
            },
            {
              path: 'PointLight',
              component: '@/pages/Light/pointLight',
            },
            {
              path: 'SpotLight',
              component: '@/pages/Light/spotLight',
            },
            {
              path: 'RectAreaLight',
              component: '@/pages/Light/rectAreaLight',
            },
          ],
        },
        {
          path: 'Layers',
          component: '@/pages/Layers',
        },
      ],
    },
  ],
  fastRefresh: {},
});
