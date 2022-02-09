const path = require('path')

module.exports = {
  assetsDir: 'file_static',
  outputDir: path.resolve(__dirname, process.env.VUE_APP_BUILD_PATH),
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_PATH,
  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
  },
  configureWebpack: {
    name: '에어비엔비 - 클론코딩',
  },
  devServer: {
    open: true,
    // host: process.env.VUE_APP_ENV === 'local' ? process.env.VUE_APP_DOMAIN : '0.0.0.0',
    port: process.env.VUE_APP_PORT,
    disableHostCheck: true,
  },
  // transpileDependencies: [],
}
