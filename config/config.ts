import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  title: '基于Web端的计算机图形学',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
});
