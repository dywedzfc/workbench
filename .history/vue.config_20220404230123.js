const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 9800,
    // proxy: {
    //   '/SchoolBus': {
    //     target: 'http://192.168.11.240:8080/SchoolBus/',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/SchoolBus': ''
    //     }
    //   }
    // }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '工作台',
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        api: resolve('src/api'),
        util: resolve('src/util/index.js'),
        entity: resolve('src/entity'),
        assets: resolve('src/renderer/assets'),
        images: resolve('src/renderer/assets/image'),
        views: resolve('src/renderer/views'),
        mixins: resolve('src/renderer/mixins'),
        components: resolve('src/renderer/components'),
      },
    },
    externals: {
      AMap: 'AMap',
      AMapUI: 'AMapUI',
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'net.latestday',
        productName: 'workbench',
        mac: {
          icon: './public/icon.ico',
        },
      },
    },
  },
  productionSourceMap: false,
}
