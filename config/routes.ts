export default [
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
        path: 'Lines',
        component: '@/pages/Lines/index',
        routes: [
          {
            path: 'Wireframe',
            component: '@/pages/Lines/wireframe',
          },
        ],
      },
      {
        path: 'Layers',
        component: '@/pages/Lines',
      },
    ],
  },
];
