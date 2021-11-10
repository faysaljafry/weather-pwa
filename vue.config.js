import { GenerateSW } from 'workbox-webpack-plugin';

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '',

  configureWebpack: {
    plugins: [new GenerateSW()],
  },
};
